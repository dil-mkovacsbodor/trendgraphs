import { TrendGraphApiStack } from "../lib/api-stack";
import { ApplicationEnvironment, AwsAccount, Region } from "../types/applicationEnvironment";
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const applicationEnvironment: ApplicationEnvironment = {
    rapidApiKey: "rapidApiKey",
    env: {
        account: AwsAccount.HackFest,
        region: Region.UsWest2
    },
};

const apiStack = new TrendGraphApiStack(app, "TrendGraphApiStack", {
    applicationEnvironment,
    deploymentScope: "development"
});

