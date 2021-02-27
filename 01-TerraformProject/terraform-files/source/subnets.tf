resource "aws_route_table" "vk_route_table_test_env" {
  vpc_id = "${aws_vpc.vk_trfm_new_vpc.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.vk_test_env_gw.id}"
  }
  tags = {
    Name = "vk_test_env_route_table"
  }
}
resource "aws_route_table_association" "subnet-association" {
  subnet_id      = "${aws_subnet.vk_trfm_new_subnet.id}"
  route_table_id = "${aws_route_table.vk_route_table_test_env.id}"
}