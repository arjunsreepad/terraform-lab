const cmd_init = 'terraform init';
const cmd_validate = 'terraform validate';
const cmd_fmt = 'terraform fmt';
const cmd_plan = 'terraform plan';
const cmd_apply = 'terraform apply -auto-approve';
const cmd_destroy = 'terraform destroy -auto-approve';

const software_install_commands = {
    java : 'sudo install jdk',
    jdk : 'sudo install jdk',
    nodejs : 'sudo install nodejs',
    jboss : 'sudo install jboss',
    tomcat : 'sudo install tomcat'
}

module.exports = {
    cmd_init, cmd_validate, cmd_fmt, cmd_plan, cmd_apply, cmd_destroy, software_install_commands
};