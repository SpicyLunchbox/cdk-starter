import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

interface PhotosHandlerProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotosHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerProps) {
    super(scope, id, props);

    // grabbing the exported output from photos-stack.ts
    //* const targetBucket = cdk.Fn.importValue("photos-bucket");

    new LambdaFunction(this, "PhotosHandler", {
      // defines the runtime for the Lambda Function
      runtime: Runtime.NODEJS_18_X,
      // not sure what this is
      handler: "index.handler",
      // code for the lambda can be inserted here.  In this case, we are just using
      // an inline value
      code: Code.fromInline(`
        exports.handler = async (event) => {
            console.log("hello!: " + process.env.TARGET_BUCKET)
        };
        `),
      environment: {
        // the bucket we want to access with this lambda
        TARGET_BUCKET: props.targetBucketArn,
      },
    });
  }
}
