import { TrendGraphUiStack } from "../lib/ui-stack";
import { ApplicationEnvironment, AwsAccount, Region } from "../types/applicationEnvironment";
import * as cdk from 'aws-cdk-lib';

const app = new cdk.App();

const applicationEnvironment: ApplicationEnvironment = {
    rapidApiKey: "test",
    eventRegistryApiKey: "test",
    newsApiKey: "test",
    env: {
        account: AwsAccount.HackFest,
        region: Region.UsWest2
    },
};

const uiStack = new TrendGraphUiStack(app, "TrendGraphUiStack", {
    applicationEnvironment,
    deploymentScope: "development"
}); 