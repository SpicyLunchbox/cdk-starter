import { IAspect } from "aws-cdk-lib";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { IConstruct } from "constructs";

// the below CDK Aspect will set tags on all S3 Buckets within your app
export class BucketTagger implements IAspect {
  private key: string;
  private value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  // iterates over all constructs
  visit(node: IConstruct): void {
    // node.node.id is the construct id
    // console log will run during "cdk synth" command
    console.log("visiting: " + node.node.id);
    if (node instanceof CfnBucket) {
      node.tags.setTag(this.key, this.value);
    }
  }
}
