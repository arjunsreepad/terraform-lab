const {review_req_row_attribute} = require('./../config/infra_request_attributes');

const empty_environmentAttribs = {
    env_name : '',
    env_value : '',
    infra_details : []
};

// to be used inside 'empty_infrarequest.envInfraObjList'
const empty_envInfraObj = {
    environment : '',
    provider : '',
    cloud_region : '',
    vpc : '',
    subnet : '',
    cidr_ips : '',
    subnet_zone : '',
    server_tag : '',
    server : '',
    serverAMI : '',
    amiKeyPair : '',
    applnPortRangeFrom : 3000, 
    applnPortRangeTo : 3000,
    selectedSoftwares : [],
    selectedEnvironments: []
};

// Input object type received from UI screen.
const empty_infrarequest = {
    appName: '',
    appCI : '',
    description: '',
    orgAccount : '',
    requestorId : '',
    attachments : [],
    envInfraObjList : [], // submitted along with req submit. refers 'envInfraObj'
    envInfraObjListFrReview : [] // populated during review-mode. refer 'empty_environmentAttribs'
};

const empty_tf_infr_req = {
    appName: '',
    appCI : '',
    description: '',
    orgAccount : '',
    provider : '',
    environment : '',
    cloud_region : '',
    vpc : '',
    subnet : '',
    cidr_ips : '',
    subnet_zone : '',
    server_tag : '',
    server : '',
    serverAMI : '',
    amiKeyPair : '',
    applnPortRangeFrom : 3000, 
    applnPortRangeTo : 3000,
    swCommandsToRun : ''   
};

module.exports = {
    empty_environmentAttribs,
    empty_infrarequest,
    empty_envInfraObj,
    empty_tf_infr_req
};