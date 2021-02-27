#This configuration was set using AWS-CLI aws configure 
provider "aws" {
  region = "${var.region_name}"

  //shared_credentials_file = "/Users/tf_user/.aws/creds"
  //profile                 = "customprofile"
}
