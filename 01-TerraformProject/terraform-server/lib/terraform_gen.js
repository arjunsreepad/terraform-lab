var child_process = require('child_process');
var os = require('os');
var _ = require('underscore');
var tfvars_map = require('./config/terraform_vars_map');
var futil = require('./file_utils');
const path = require('path');
const { cmd_init, cmd_validate, cmd_fmt, cmd_plan, cmd_apply, cmd_destroy} = require('./constants/commands');

/**
 * Create folder in target with name 'infrarequest.appCI'.
 *  Copy terraform files from source to destination
 * 
 * @param {*} infrarequest 
 */
const generateTfFiles = (infrarequest) => {
    // Step-1: Create folder in target with name 'infrarequest.appCI'. Backup files if already exists.
    let destDir = tfvars_map.tf_target_folder;
    const srcDir = tfvars_map.tf_source_folder;
    destDir = futil.backUpandCreateDirectory(infrarequest, destDir);
    // Step-2: Copy terraform files from source to destination
    return futil.copyAllEligibleFiles(infrarequest, srcDir, destDir) ? destDir : '';
}

/**
 *  execute terraform scripts inside the target folder.
 * 
 * @param {*} destDir 
 */
const validateAndApplyTerraform = (destDir) => {
    // Step-2: execute terraform scripts inside the target folder.
    return (executeTerraformPlan(destDir) ?
        (futil.fileExists(destDir, 'terraform.tfstate')
            ? (executeTerraformDestroy(destDir) && executeTerraformApply(destDir))
            : executeTerraformApply(destDir))
        : false);
}



function executeTerraformPlan(destDir) {
    return executeCommand(cmd_init) ? executeCommand(`${cmd_plan} ${destDir}`) : false;
}

function executeTerraformApply(destDir) {
    const command = `cd ${destDir} && ${cmd_apply} ${destDir}`;
    return executeCommand(cmd_init) ? executeCommand(command) : false;
}

function executeTerraformDestroy(destDir) {
    const command = `cd ${destDir} && ${cmd_destroy} ${destDir}`;
    return executeCommand(cmd_init) ? executeCommand(command) : false;
}

function executeCommand(command, destDir) {
    let success = true;
    try {
        console.log(`Executing command ******************************* \n ${command} \n *******************************`);
        child_process.execSync(command, { env: process.env, stdio: 'inherit' });
    }
    catch (e) {
        console.log('error in command execution ', e);
        success = false;
    }

    return success;
}

module.exports = {
    generateTfFiles,
    validateAndApplyTerraform
}