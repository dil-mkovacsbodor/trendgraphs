import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { ApplicationEnvironment } from '../types/applicationEnvironment';
import { Construct } from 'constructs';
import { Role, ServicePrincipal, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';

type ApiStackProps = cdk.StackProps & {
    applicationEnvironment: ApplicationEnvironment;
    deploymentScope: string;
};
  
export class TrendGraphApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const { applicationEnvironment } = props;
  
        const appConfig = {
            rapidApiKey: applicationEnvironment.rapidApiKey,
        };
        
        const projectRoot = path.join(__dirname, '../../api');
        
        // Create a CloudWatch Log Group for the Lambda function
        const logGroup = new logs.LogGroup(this, 'TrendGraphApiLogGroup', {
            logGroupName: '/aws/lambda/trendGraphApi',
            retention: logs.RetentionDays.ONE_MONTH,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        
        // Create IAM role for Lambda with CloudWatch Logs permissions
        const lambdaRole = new Role(this, "lambda-role", {
            assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
            path: "/external/",
        });
        
        // Add CloudWatch Logs permissions to the role
        lambdaRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                'logs:CreateLogGroup',
                'logs:CreateLogStream',
                'logs:PutLogEvents',
                'logs:DescribeLogStreams'
            ],
            resources: [logGroup.logGroupArn + ':*'],
        }));
        
        const lambda = new NodejsFunction(this, "trendGraphApi-lambda", {
            functionName: "trendGraphApi",
            entry: path.join(projectRoot, "src/lambda.ts"),
            projectRoot,
            depsLockFilePath: path.join(projectRoot, "package-lock.json"),
            runtime: cdk.aws_lambda.Runtime.NODEJS_22_X,
            role: lambdaRole,
            environment: {
                NODE_OPTIONS: "--enable-source-maps",
                NODE_ENV: "production",
                ...appConfig,
            },
            bundling: {
                externalModules: [],
                nodeModules: ['aws-lambda-router'],
                minify: false,
                sourceMap: true,
                target: 'node22',
                format: cdk.aws_lambda_nodejs.OutputFormat.ESM,
            },
        });

        // Create API Gateway REST API
        const api = new apigateway.RestApi(this, 'TrendGraphApi', {
            restApiName: 'TrendGraph API',
            description: 'API for TrendGraph application',
            deployOptions: {
                stageName: 'prod',
            },
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
                allowHeaders: [
                    'Content-Type',
                    'X-Amz-Date',
                    'Authorization',
                    'X-Api-Key',
                    'X-Amz-Security-Token',
                    'X-Amz-User-Agent',
                ],
            },
        });

        // Add a health endpoint
        const healthResource = api.root.addResource('health');
        healthResource.addMethod('GET', new apigateway.LambdaIntegration(lambda, {
            requestTemplates: { 'application/json': '{ "statusCode": 200 }' }
        }));

        // Create companies endpoints
        const companiesResource = api.root.addResource('companies');
        
        // Add search endpoint
        const searchResource = companiesResource.addResource('search');
        searchResource.addMethod('POST', new apigateway.LambdaIntegration(lambda, {
            requestTemplates: { 'application/json': '{ "statusCode": 200 }' }
        }));
        
        // Add search by registration number endpoint
        const searchByRegResource = companiesResource.addResource('searchbyreg');
        searchByRegResource.addMethod('GET', new apigateway.LambdaIntegration(lambda, {
            requestTemplates: { 'application/json': '{ "statusCode": 200 }' }
        }));
        
        // Create industries endpoints
        const industriesResource = api.root.addResource('industries');
        
        // Add get all industries endpoint
        industriesResource.addMethod('GET', new apigateway.LambdaIntegration(lambda, {
            requestTemplates: { 'application/json': '{ "statusCode": 200 }' }
        }));
        
        // Add search industries endpoint
        const searchIndustriesResource = industriesResource.addResource('search');
        searchIndustriesResource.addMethod('GET', new apigateway.LambdaIntegration(lambda, {
            requestTemplates: { 'application/json': '{ "statusCode": 200 }' }
        }));

        // Output the API URL
        new cdk.CfnOutput(this, 'ApiUrl', {
            value: api.url,
            description: 'API Gateway URL',
        });
        
        // Output the CloudWatch Log Group name
        new cdk.CfnOutput(this, 'LogGroupName', {
            value: logGroup.logGroupName,
            description: 'CloudWatch Log Group Name',
        });
    }
}