locals {
  
  frontend_port = 8081
  
  
  additional_policy_arns = {for idx, arn in [aws_iam_policy.ecs_exec_custom_policy.arn] : idx => arn}
}




module "frontend" {
  name = "${local.name}-frontend"
  # checkov:skip=CKV_SECRET_4:Skip secret check as these have to be used within the Github Action
  # checkov:skip=CKV_TF_1: We're using semantic versions instead of commit hash
  #source                      = "../../i-dot-ai-core-terraform-modules//modules/infrastructure/ecs" # For testing local changes
  source                       = "git::https://github.com/i-dot-ai/i-dot-ai-core-terraform-modules.git//modules/infrastructure/ecs?ref=v7.1.1-ecs"
  image_tag                    = var.image_tag
  ecr_repository_uri           = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com/i-ai-design-system-frontend"
  vpc_id                       = data.terraform_remote_state.vpc.outputs.vpc_id
  private_subnets              = data.terraform_remote_state.vpc.outputs.private_subnets
  host                         = local.host
  public_host                  = var.edge_networking_enabled ? local.public_host : null
  load_balancer_security_group = module.load_balancer.load_balancer_security_group_id
  aws_lb_arn                   = module.load_balancer.alb_arn
  ecs_cluster_id               = module.ecs_cluster.ecs_cluster_id
  ecs_cluster_name             = module.ecs_cluster.ecs_cluster_name
  task_additional_iam_policies = local.additional_policy_arns
  create_listener              = true
  certificate_arn              = module.acm_certificate.arn
  target_group_name_override   = "i-ai-design-system-fe-${var.env}-tg"
  task_role_name_override      = "i-dot-ai-${var.env}-i-ai-design-system-fe-ecs-exec-task-role"
  permissions_boundary_name    = "infra/i-dot-ai-${var.env}-i-ai-design-system-perms-boundary-app"

  environment_variables = {
    "ENVIRONMENT" : terraform.workspace,
    "APP_NAME" : "${local.name}-frontend"
    "PORT" : local.frontend_port,
    "REPO" : "i-ai-design-system",
    "DOCKER_BUILDER_CONTAINER": "i-ai-design-system",
    "AUTH_API_URL": data.aws_ssm_parameter.auth_api_invoke_url.value,
    
  }
  secrets = [
    for k, v in aws_ssm_parameter.env_secrets : {
      name = regex("([^/]+$)", v.arn)[0], # Extract right-most string (param name) after the final slash
      valueFrom = v.arn
    }
  ]

  container_port             = local.frontend_port

  health_check = {
    accepted_response   = 200
    path                = "/"
    interval            = 60
    timeout             = 70
    healthy_threshold   = 2
    unhealthy_threshold = 5
    port                = local.frontend_port
  }

  authenticate_gds_internal_access = {
    
    enabled : true,
        
    client_id : aws_ssm_parameter.oidc_secrets["client_id"].value,
    client_secret : aws_ssm_parameter.oidc_secrets["client_secret"].value,
  }
}




module "sns_topic" {
  # checkov:skip=CKV_TF_1: We're using semantic versions instead of commit hash
  # source                       = "../../i-dot-ai-core-terraform-modules/modules/observability/cloudwatch-slack-integration"
  source                       = "git::https://github.com/i-dot-ai/i-dot-ai-core-terraform-modules.git//modules/observability/cloudwatch-slack-integration?ref=v2.0.1-cloudwatch-slack-integration"
  name                         = local.name
  slack_webhook                = data.aws_secretsmanager_secret_version.platform_slack_webhook.secret_string

  permissions_boundary_name    = "infra/i-dot-ai-${var.env}-i-ai-design-system-perms-boundary-app"
}

module "frontend-ecs-alarm" {
  # checkov:skip=CKV_TF_1: We're using semantic versions instead of commit hash
  # source         = "../../i-dot-ai-core-terraform-modules/modules/observability/ecs-alarms"
  source         = "git::https://github.com/i-dot-ai/i-dot-ai-core-terraform-modules.git//modules/observability/ecs-alarms?ref=v2.0.0-ecs-alarms"
  name           = "${local.name}-frontend"
  sns_topic_arns = [module.sns_topic.sns_topic_arn]

  ecs_metadata = {
    cluster_name               = data.terraform_remote_state.platform.outputs.ecs_cluster_name
    container_insights_enabled = data.terraform_remote_state.platform.outputs.container_insights_enabled
    service_name               = module.frontend.ecs_service_name
    is_fargate                 = module.frontend.is_fargate
    task_cpu                   = module.frontend.task_cpu
    task_memory_mib            = module.frontend.task_memory_mib
    ephemeral_storage_gib      = module.frontend.ephemeral_storage_gib
  }
}
module "frontend-alb-alarm" {
  # checkov:skip=CKV_TF_1: We're using semantic versions instead of commit hash
  # source                       = "../../i-dot-ai-core-terraform-modules/modules/observability/alb-alarms"
  source                       = "git::https://github.com/i-dot-ai/i-dot-ai-core-terraform-modules.git//modules/observability/alb-alarms?ref=v3.0.0-alb-alarms"
  name                         = "${local.name}-frontend"
  alb_arn                      = module.load_balancer.alb_arn
  target_group_arn             = module.frontend.aws_lb_target_group_arn
  sns_topic_arn                = [module.sns_topic.sns_topic_arn]
}


module "ecs_cluster" {
  # checkov:skip=CKV_TF_1: We're using semantic versions instead of commit hash
  # source                       = "../../i-dot-ai-core-terraform-modules/modules/infrastructure/ecs-cluster"
  source = "git::https://github.com/i-dot-ai/i-dot-ai-core-terraform-modules.git//modules/infrastructure/ecs-cluster?ref=v1.0.0-ecs-cluster"
  name   = local.name
}

resource "aws_ecs_cluster_capacity_providers" "cluster" {
  cluster_name = module.ecs_cluster.ecs_cluster_name

  capacity_providers = compact([
      "FARGATE",
      module.frontend.gpu_capacity_provider_name,
    ])

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE"
  }
}
