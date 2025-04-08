
export type RiskManagerDatabaseEnvironment = {
  stackName: string;
  securityGroupId:string;
  identifier: string;
};

export enum AwsAccount {
    HackFest = "609400232087",
}

export enum Region {
    UsWest2 = "us-west-2",
}

export type ApplicationEnvironmentEnv = {
  account: AwsAccount;
  region: Region;
};


export type ApplicationEnvironment = {
    rapidApiKey: string;
    env: ApplicationEnvironmentEnv;
};

