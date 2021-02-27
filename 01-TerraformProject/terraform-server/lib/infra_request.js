var _ = require('underscore');
var extend = require('util')._extend;

const { all_infra_attributes, all_software_attributes } = require('./config/infra_request_attributes');
const terraformgen = require('./terraform_gen');
const { empty_envInfraObj, empty_infrarequest, empty_environmentAttribs, empty_tf_infr_req } = require('./constants/empty_objs');
const { software_install_commands } = require('./constants/commands');
const { tf_ec2_stack_names } = require('./config/terraform_vars_map');

let infraReqObj_local = undefined;

const createRequest = (req, res, infraReqObj) => {
    let copied = extend({}, infraReqObj)
    copied.envInfraObjListFrReview = [];
    // Store into local instance. DB capabilities to be enhanced
    infraReqObj_local = copied;
};

const reviewRequest = (req, res) => {

    let tmpObj = infraReqObj_local ? infraReqObj_local : empty_infrarequest;
    let copied = extend({}, tmpObj);
    copied.envInfraObjListFrReview = [];

    _.map(copied.envInfraObjList, function (envInfa) {
        _.map(envInfa.selectedEnvironments, function (envStr) {
            let environmentAttrib = extend({}, empty_environmentAttribs); // for each tab
            environmentAttrib.env_name = envStr;
            environmentAttrib.env_value = envStr;
            envInfa.server_tag = `${copied.appCI}_${envStr}`;
            environmentAttrib.infra_details = _.filter(_.map(all_infra_attributes, function (attributeObj) {
                let tmp = extend({}, attributeObj);
                if ('array' === tmp.value_type) {
                    if (envInfa[tmp.attribute_type] !== undefined) {
                        tmp.cur_value = envInfa[tmp.attribute_type].join(',');
                    }
                }
                else {
                    tmp.cur_value = envInfa[tmp.attribute_type];
                }

                return tmp;
            }), function (finalObj) {
                return finalObj.cur_value !== undefined && finalObj.cur_value.length > 0;
            });
            copied.envInfraObjListFrReview.push(environmentAttrib);
        });
    });

    return copied;

};

const validateRequest = (req, res, infraReqObj) => {
    // TODO 
    return infraReqObj;
};

const applyRequest = (req, res, infraReqObj) => {

    let finalList = [];

    _.map(infraReqObj.envInfraObjListFrReview, function (envAttribsObj) {
        let basicDetails = {
            appCI: infraReqObj.appCI,
            appName: infraReqObj.appName,
            description: infraReqObj.description,
            orgAccount: infraReqObj.orgAccount,
        };
        let reqObjByEnv = extend(extend({}, empty_tf_infr_req), basicDetails);
        reqObjByEnv.environment = envAttribsObj.env_value;

        _.map(envAttribsObj.infra_details, function (infraAttribObj) {
            if ('array' === infraAttribObj.value_type) {
                if (infraAttribObj.cur_value) {
                    reqObjByEnv[infraAttribObj.target_attrib_name] = _.map(infraAttribObj.cur_value.split(','), function (strval) {
                        return software_install_commands[strval.toLowerCase()];
                    }).join(' && ');
                }
            }
            else if ('stack' === infraAttribObj.value_type) {
                if (infraAttribObj.cur_value) {
                    let stackObj = tf_ec2_stack_names[infraAttribObj.cur_value];
                    if (stackObj) {
                        _.map(infraAttribObj.target_attrib_type, function (targtAttrib) {
                            reqObjByEnv[targtAttrib] = stackObj[targtAttrib];
                        });
                    }
                }
            }
            else {
                reqObjByEnv[infraAttribObj.attribute_type] = infraAttribObj.cur_value;
            }
        });

        console.log('BEFORE PUSHING ****** \n ', reqObjByEnv);
        finalList.push(reqObjByEnv);
    });

    _.map(finalList, function (obj) {
        let destDir = terraformgen.generateTfFiles(obj);
        if (destDir) {
            //terraformgen.validateAndApplyTerraform(destDir);
        }
    });

    console.log('********************************************************************************');
    console.log('************ Terraform APPLY On Infra Request SUCCESS \n ***********************');
    console.log('********************************************************************************');

    return infraReqObj;

};

const scheduleRequest = (req, res, infraReqObj) => {
    // TODO - Store state into DB to schedule later.
    return infraReqObj;
};

module.exports = {
    createRequest,
    reviewRequest,
    applyRequest,
    validateRequest,
    scheduleRequest
};