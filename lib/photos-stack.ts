import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  // variable setup to export value
  public readonly photosBucketArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initializeSuffix();

    // note: If you change a construct ID, AWS will create a new construct, then delete the old construct
    const photosBucket = new Bucket(this, "PhotosBucket", {
      // a way to manually set a physical ID
      bucketName: `photos-bucket-${this.stackSuffix}`,
    });
    // assignment of the above variable
    this.photosBucketArn = photosBucket.bucketArn;

    // below is an easy way to pass information from one stack to another
    // check photo-stack-handler.ts to see usage
    //* new cdk.CfnOutput(this, "photos-bucket", {
    //*   value: photosBucket.bucketArn,
    //*   exportName: "photos-bucket",
    //* });

    // a way to manually set the logical ID of a construct
    //* (photosBucket.node.defaultChild as CfnBucket).overrideLogicalId(
    //*   "PhotosBucket2"
    //* );
  }

  // the below is a good pattern to set a physical ID on a resource that easily displays which stack
  // it belongs to.  The Stack ID is within scope at the time of initialization, so we can reference it using this.stackId
  // "this" being the stack in question.
  private initializeSuffix() {
    // CloudFormation intrinsic functions are used below to grab the desired substring within the stackId
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
    this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split("-", shortStackId));
  }
}
