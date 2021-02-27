resource "aws_vpc" "vk_trfm_new_vpc" {
  cidr_block           = "${var.cidr_block}"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Environment = "${var.current_environment}"
    Name        = "${var.vpc_tag_name}"
  }

}
resource "aws_subnet" "vk_trfm_new_subnet" {
  cidr_block        = "${cidrsubnet(aws_vpc.vk_trfm_new_vpc.cidr_block, 3, 1)}"
  vpc_id            = "${aws_vpc.vk_trfm_new_vpc.id}"
  availability_zone = "${var.subnet_availability_zones}"
  tags = {
    Environment = "${var.current_environment}"
    Name        = "${var.subnet_tag_name}"
  }
}
resource "aws_eip" "vk_trfm_eip" {
  instance = "${aws_instance.vk_trfrm_ec2_ami.id}"
  vpc      = true

  provisioner "remote-exec" {
    inline = [
      "${var.ubuntu_update_os}",
      "${var.ubuntu_jdk_install}",
      "${var.ubuntu_nodejs_install}"
    ]
  }

  connection {
    type        = "ssh"
    user        = "${var.ubuntu_login_user}"
    password    = ""
    host        = "${aws_eip.vk_trfm_eip.public_ip}"
    private_key = "${file(var.ubuntu_ec2_ppk_file)}"
    timeout     = "${var.default_ssh_conn_time_out}"
  }

  tags = {
    Environment = "${var.current_environment}"
    Name        = "${var.eip_tag_name}"
  }
}

output "aws_ubuntu_public_ip" {
  value       = aws_eip.vk_trfm_eip.public_ip
  description = "The public IP of the instance instance."
}