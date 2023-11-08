import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// the below is an L3 construct configuration
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, "MyL3Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration),
        },
      ],
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // the below is an L1 construct
    // the first param is the scope, passing this connects the bucket to this stack
    // second param is the ID
    // third param is configuration options
    new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 1,
            status: "enabled",
          },
        ],
      },
    });

    // below is a way to create parameters that can be fed into other constructs
    // parameters can also be set at the cli command level.  for example, cdk deploy --parameters duration=7 would
    // deploy the stack with duration set at 7.
    const duration = new cdk.CfnParameter(this, "duration", {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: "Number",
    });

    // the below is an L2 construct
    // below I've created a reference to the bucket for later logging.
    const MyL2Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        {
          // notice the above duration parameter
          expiration: cdk.Duration.days(duration.valueAsNumber),
        },
      ],
    });

    // below is a way to console log information that is only available at the CloudFormation Deployement stage
    // CfnOutput can also be used to share information between stacks
    new cdk.CfnOutput(this, "MyL2BucketName", {
      value: MyL2Bucket.bucketName,
    });

    // the below is an L3 construct
    new L3Bucket(this, "MyL3Bucket", 3);
  }
}
