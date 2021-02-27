resource "aws_instance" "vk_trfrm_ec2_ami" {
  ami           = "${var.ec2_ami_id}"
  instance_type = "${var.ec2_instance_type}"
  key_name      = "${var.ami_key_pair_name}"

  security_groups = ["${aws_security_group.ingress_ssh_connection.id}", "${aws_security_group.ingress_application_ports.id}"]
  tags = {
    Environment = "${var.ec2_tag_name}"
    Name        = "${var.ec2_tag_name}"
  }

  subnet_id = "${aws_subnet.vk_trfm_new_subnet.id}"

}