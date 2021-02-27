const fs = require('fs');
const path = require('path');
const _ = require("underscore");
const tfvars_map = require("./config/terraform_vars_map");

// using COPYFILE_EXCL, the operation will fail if destfile exists.
const { COPYFILE_EXCL } = fs.constants;

function backUpandCreateDirectory(infrarequest, dirName) {
    let targetFolder = path.join(dirName, infrarequest.appCI);
    try {
        
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }
        targetFolder = path.join(dirName, path.join(infrarequest.appCI, infrarequest.environment));
        //check if folder needs to be created or integrated
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }
    }
    catch (e) {
        // Ignore this exception, Looks directory exists.
    }

    return targetFolder;
}

function copyAllEligibleFiles(infrarequest, srcDir, destDir) {
    //console.log('copyAllEligibleFiles, infrarequest :: ', infrarequest);
    let success = true;
    let tfvars_params = {};
    try {
        let skeleton_obj = tfvars_map.tfvarsmap[infrarequest.provider];
        _.map(_.filter(_.map(infrarequest, function (value, key) {
            return skeleton_obj[key] ? { reqval: value, paramsObj: skeleton_obj[key] } : {};
        }), function (obj1) {
            return obj1.reqval !== undefined;
        }), function (obj2) {
            let reqval = obj2.reqval;
            let paramsObj = obj2.paramsObj;
            _.map(paramsObj.files, function(obj) {
                copyFile(srcDir, destDir, obj);
            });
            tfvars_params[paramsObj.varskey] = reqval;
        });

        // Copy variables.tf
        success = copyFile(srcDir, destDir, 'variables.tf')
         && createTfvarsFromJson(tfvars_params, destDir, 'terraform.tfvars');
         
    }
    catch (e) {
        console.log('error in copyAllEligibleFiles ', e);
        success = false;
    }

    return success;
}

function createTfvarsFromJson(inpJson, dirName, fileName){
    let success = true;
    try{
        const contentsOfFile = _.map(inpJson, function(value, key){
            let finalVal = `"${value}"`;
            if(!isNaN(value)){
                finalVal = `${value}`;
            }
            return `${key}=${finalVal}`;    
        }).join('\n');

        fs.writeFileSync(path.join(dirName, fileName), contentsOfFile, function(err){
            if(err) throw err;
        });
    }
    catch(e){
        console.log('error in creating tfvars ', e);
        success = false;
    }
    return success;
}


function copyFile(srcDir, destDir, filename) {
    let success = true;
    if (!filename || filename.length < 1) {
        // not to be done, anyting.
        console.log('Copying File, NO input file !');
        return false;
    }
    try {
        let targetFile =  path.join(destDir, filename);
        //if target is a directory a new file with the same name will be created
        if (fs.existsSync(destDir)) {
            if (fs.lstatSync(destDir).isDirectory()) {
                targetFile = path.join(destDir, filename);
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(path.join(srcDir, filename)));
    }
    catch (e) {
        console.log('exception in copy file ', e);
        success = false;
    }

    return success;
}

function fileExists(dirName, fileName) {
    let found = false;
    try {
        if (!fileName) {
            fileName = '';
        }
        if (fs.existsSync(path.join(dirName, fileName))) {
            found = true;
        }
    } catch (err) {
        console.error(err)
    }
    return found;
}

/**
 * Create a folder with timestamp and move all contents of the directory.
 * 
 * @param {*} dirName 
 */
function backupExistingFiles(dirName) {

}


module.exports = {
    backUpandCreateDirectory,
    backupExistingFiles,
    copyAllEligibleFiles,
    copyFile,
    fileExists
}