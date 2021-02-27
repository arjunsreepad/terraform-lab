variable "current_environment" {
  description = "Name of AWS Environment being provisioned"
  default     = "dev"
}
variable "gateway_tag_name" {
  default = "vk-test-env-gateway"
}
variable "vpc_tag_name" {
  default = "vk-test-vpc-env"
}
variable "subnet_tag_name" {
  default = "vk_trfm_new_subnet1"
}
variable "eip_tag_name" {
  default = "vk_trfm_new_eip"
}
variable "ssh_sg_tag_name" {
  default = "vk_trfm_ssh_sg"
}
variable "appln_sg_tag_name" {
  default = "vk_trfm_appln_sg"
}
variable "ec2_tag_name" {
  default = "vk_trfm_ec2_instance"
}
variable "cidr_block" {
  default = "10.0.0.0/16"
}
variable "region_name" {
  default = "us-east-2"
}
variable "vpc_name" {
  default = "vk-terraform-vpc-2"
}
variable "subnet_availability_zones" {
  default = "us-east-2a"
}
variable "environment" {
  default = "env"
}
variable "s3_terraform_bucket" {
  type    = "string"
  default = "testbucket"
}

variable "ec2_ami_id" {
  type    = "string"
  default = "ami-05c1fa8df71875112"
}

variable "ami_key_pair_name" {
  type    = "string"
  default = "vk-ubuntu-ec2pair"
}

variable "region" {
  default = "us-east-2"
}
variable "availability_zones" {
  type = "map"
  default = {
    zone1 = "us-east-2a"
    zone2 = "us-east-2b"
    zone3 = "us-east-2c"
  }

}

variable "appln_port_range_from" {
  default = 2050
}
variable "appln_port_range_to" {
  default = 3050
}

variable "availability_zones_list" {
  type    = "list"
  default = ["us-east-2a", "us-east-2b", "us-east-2c"]
}
variable "ec2_instance_type" {
  default = "t2.micro"
}
variable "ubuntu_login_user" {
  default = "ubuntu"
}
variable "default_ssh_conn_time_out" {
  default = "32s"
}
variable "ubuntu_ec2_ppk_file" {
  default = "C:\\Users\\S417466\\Venkat\\_Softwares\\Kubernetes\\_aws_private_key\\vk-ubuntu-ec2pair"
}

variable "ubuntu_update_os" {
  default = "sudo apt-get update && echo 'yes' | curl -sL https://deb.nodesource.com/setup_9.x | sudo bash -"
}
variable "ubuntu_jdk_install" {
  default = "sudo apt-get install -y default-jre"
}
variable "ubuntu_nodejs_install" {
  default = "sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 12 && echo 'Starting Node Server...' && cd ~/test/myprojects/02-nodejs/ && sudo npm start"
}
variable "ubuntu_git_install" {
  default = "sudo apt-get install -y git"
}
variable "ubuntu_softwares_install" {
  type = "list"
  default = [
    "sudo apt-get update",
    "sudo apt-get upgrade -y",
    "echo 'Installng GIT'",
    "sudo apt-get install -y git",
    "echo 'INSTALLING Deb NodeSource'",
    "echo 'yes' | curl -sL https://deb.nodesource.com/setup_9.x | sudo bash -",
    "echo 'Installng Default JRE'",
    "sudo apt-get install -y default-jre",
    "echo 'Installng NODEjs'",
    "sudo apt-get install -y nodejs"
  ]
}
