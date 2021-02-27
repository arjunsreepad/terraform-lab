resource "aws_security_group" "ingress_ssh_connection" {
  name   = "allow-all-sg"
  vpc_id = "${aws_vpc.vk_trfm_new_vpc.id}"
  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = "${var.current_environment}"
    Name        = "${var.ssh_sg_tag_name}"
  }
}

resource "aws_security_group" "ingress_application_ports" {
  name   = "allowed-app-ports"
  vpc_id = "${aws_vpc.vk_trfm_new_vpc.id}"
  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = var.appln_port_range_from
    to_port   = var.appln_port_range_to
    protocol  = "tcp"
  }

  tags = {
    Environment = "${var.current_environment}"
    Name        = "${var.appln_sg_tag_name}"
  }
}

variable "ec2_security_groups_defn" {
  type    = "list"
  default = ["ingress_ssh_connection", "ingress_application_ports"]
}