#Default values of variables read by terraform during init refers to 'variables.tf'
current_environment       = "dev"
region_name               = "us-east-2"
vpc_name                  = "vk-vpc-2"
subnet_name               = "vk-vpc-subnet-2"
cidr_block                = "10.0.0.0/16"
subnet_availability_zones = "us-east-2b"
ec2_ami_id                = "ami-05c1fa8df71875112"
ami_key_pair_name         = "vk-ubuntu-ec2pair"
appln_port_range_from     = 3000
appln_port_range_to       = 3000
ec2_tag_name              = "cpg-dev"
ec2_instance_type         = "t2.micro"
ubuntu_nodejs_install     = "sudo apt-get install -y nodejs && mkdir test && cd test && git clone https://github.com/nvkkgithub/myprojects.git && cd myprojects/02-nodejs/ && sudo npm install && sleep 12 && echo 'Dynamic Variables -- Starting Node Server...' && cd ~/test/myprojects/02-nodejs/ && sudo npm start"
ubuntu_jdk_install = "sudo apt-get install -y default-jre"