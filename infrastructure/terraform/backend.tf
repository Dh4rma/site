terraform {
  backend "s3" {
    key                    = "s3-esbuild-hyperapp.tfstate"
    bucket                 = "kis9a-terraform-states"
    region                 = "ap-northeast-1"
    encrypt                = true
    skip_region_validation = true
  }
}
