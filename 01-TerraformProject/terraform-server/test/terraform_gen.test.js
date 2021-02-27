const terraformgen = require('../lib/terraform_gen');
var tfvars_map = require('../lib/config/terraform_vars_map');
const path = require('path');

test('Test - generate_variables - Install JAVA', () => {
    const dev_env = {
        appName: 'CPG',
        appCI : 'S.A.CPG',
        description: 'Corporate Projects',
        orgAccount : 'ekdev',
        provider : 'aws',
        environment : 'dev',
        region : 'us-east-2',
        vpc : 'cpg-vpc-1',
        subnet : 'cpg-vpc-1-subnet-1',
        cidr_ips : '10.0.0.0/16',
        subnet_zone : 'us-east-2b',
        server_tag : 'cpg-dev',
        server : 't2.micro',
        serverAMI : 'ami-05c1fa8df71875112',
        amiKeyPair : 'vk-ubuntu-ec2pair',
        applnPortRangeFrom : 3000, 
        applnPortRangeTo : 3000,
        nodeJsSwCommand : 'sleep 1',
        jdkSwCommand : 'sudo apt-get install -y default-jre',
        javaVersion : '',
        nodeJsVersion : ''
    };

    // Avoid running INFRA Generation All the times.

    // let dirName = terraformgen.generateTfFiles(dev_env);
    // console.log(`DEV dirName = ${dirName}`);
});

test('Test - generate_variables - Install NodeJS', () => {
    const test_Env = {
        appName: 'CPG',
        appCI : 'S.A.CPG',
        description: 'Corporate Projects',
        orgAccount : 'ektest',
        provider : 'aws',
        environment : 'test',
        region : 'us-east-2',
        vpc : 'cpg-vpc-test',
        subnet : 'cpg-vpc-test-subnet-1',
        cidr_ips : '10.0.0.0/16',
        subnet_zone : 'us-east-2b',
        server_tag : 'cpg-test',
        server : 't2.micro',
        serverAMI : 'ami-05c1fa8df71875112',
        amiKeyPair : 'vk-ubuntu-ec2pair',
        applnPortRangeFrom : 3000, 
        applnPortRangeTo : 3000,
        nodeJsSwCommand : 'sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 12 && cd ~/test/myprojects/02-nodejs/ && sudo npm start',
        jdkSwCommand : 'sleep 1'
    };

    //let dirName = terraformgen.generateTfFiles(test_Env);
    //console.log(`TEST dirName = ${dirName}`);
});

test('Test - validateAndApplyTerraform', () => {
    const dirName = path.join(tfvars_map.tf_target_folder, 'S.A.CPG', 'dev');

    // Avoid running INFRA Generation All the times.

    //let operationSuccess = terraformgen.validateAndApplyTerraform(dirName);
    //console.log(`operationSuccess = ${operationSuccess}`);

});

test('Test - validateAndApplyTerraform', () => {
    const dirName = path.join(tfvars_map.tf_target_folder, 'S.A.CPG', 'test');

    // Avoid running INFRA Generation All the times.

    //let operationSuccess = terraformgen.validateAndApplyTerraform(dirName);
    //console.log(`operationSuccess = ${operationSuccess}`);

});