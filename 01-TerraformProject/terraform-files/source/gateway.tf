resource "aws_internet_gateway" "vk_test_env_gw" {
  vpc_id = "${aws_vpc.vk_trfm_new_vpc.id}"
  tags = {
    Environment = "${var.current_environment}"
    Name        = "${var.gateway_tag_name}"
  }
}