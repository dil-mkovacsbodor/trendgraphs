import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

type UiStackProps = cdk.StackProps & {
  applicationEnvironment: {
    env: {
      account: string;
      region: string;
    };
  };
  deploymentScope: string;
};

export class TrendGraphUiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: UiStackProps) {
    super(scope, id, props);

    const { applicationEnvironment } = props;

    // Create an S3 bucket to host the UI
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `trendgraphs-ui-${applicationEnvironment.env.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // For SPA routing
      publicReadAccess: false, // We'll use CloudFront for access
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // // Create an Origin Access Identity for CloudFront -- Removed for OAC
    // const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI');
    // websiteBucket.grantRead(originAccessIdentity); // Grant read access to the OAI -- Removed for OAC

    // Create a CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        // eslint-disable-next-line @typescript-eslint/no-deprecation
        origin: new origins.S3Origin(websiteBucket, {
          // originAccessIdentity: originAccessIdentity, // <-- Removed: Use OAC implicitly
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Deploy the UI to the S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(path.join(__dirname, '../../ui/dist'))],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
    });
  }
} 