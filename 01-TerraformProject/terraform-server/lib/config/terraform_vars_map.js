/* Below is syntax description of 'tfvarsmap'
    '<provider>' : {
        name : '<Just a description of provider for reference>',
        <inp_field_from_ui_form> : {
            varskey : '<variable_name_from_tfvars>' ,
            files : ['<tf_file_name_to_integrate>']
        }
    }
    '<variable_name_from_tfvars>' will be replaced with corresponding value in terraform.tfvars file.
    if '<tf_file_name_to_integrate>' is empty, then no action on file copy.
*/
const tfvarsmap = { 
    aws : {
        name : 'Amazon Webservices',
        environment: {varskey : 'current_environment', files : []},
        cloud_region : {varskey : 'region_name', files : ['connections.tf']},
        vpc : {varskey : 'vpc_name', files : ['network.tf', 'gateway.tf']},
        subnet : {varskey : 'subnet_name', files : ['subnets.tf']},
        cidr_ips : {varskey : 'cidr_block', files : []},
        subnet_zone : {varskey : 'subnet_availability_zones', files : []},
        server_tag : {varskey : 'ec2_tag_name', files: []},
        server : {varskey : 'ec2_instance_type', files : ['servers.tf']},
        serverAMI: {varskey : 'ec2_ami_id', files : []},
        amiKeyPair: {varskey : 'ami_key_pair_name', files: []},
        applnPortRangeFrom : {varskey : 'appln_port_range_from', files: ['security.tf']},
        applnPortRangeTo : {varskey : 'appln_port_range_to', files: ['security.tf']},
        swCommandsToRun : {varskey : 'sw_install_commands', 'files' : []}
    },
    azure : {
        name : 'Microsoft Azure Cloud',
        provider : {},
        server : {},
    }
}


const tf_ec2_stack_names =  {
    ubuntu_ec2_micro : {
        description : 'Ubuntu t2.micro instance. 2gb RAM',
        server : 't2.micro',
        serverAMI : 'i-393847474',
        amiKeyPair : 'vk-ec2-pair'
    },
    ubuntu_ec2_max : {
        description : 'Ubuntu t3.micro instance. 4gb RAM',
        server : 't3.micro',
        serverAMI : 'i-393847474',
        amiKeyPair : 'vk-ec2-pair'
    },
    rhel_ec2_micro : {
        description : 'Ubuntu t3.micro instance. 4gb RAM',
        server : 't3.micro',
        serverAMI : 'i-393847474',
        amiKeyPair : 'vk-ec2-pair'
    },
    rhel_ec2_max : {
        description : 'Ubuntu t3.micro instance. 4gb RAM',
        server : 't3.micro',
        serverAMI : 'i-393847474',
        amiKeyPair : 'vk-ec2-pair'
    }
};

const tf_source_folder = 'C:\\Users\\S417466\\Venkat\\_Trainings\\00-online-git-codebases\\01-Personal\\technicalexamples\\02-Projects\\01-TerraformProj\\terraform-files\\source';
const tf_target_folder = 'C:\\Users\\S417466\\Venkat\\_Trainings\\00-online-git-codebases\\01-Personal\\technicalexamples\\02-Projects\\01-TerraformProj\\terraform-files\\projects';

module.exports = {
    tf_source_folder,
    tf_target_folder,
    tfvarsmap,
    tf_ec2_stack_names
}