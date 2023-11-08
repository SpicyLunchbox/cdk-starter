#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from "../lib/cdk-starter-stack";
import { PhotosStack } from "../lib/photos-stack";
import { PhotosHandlerStack } from "../lib/photos-handler-stack";
import { BucketTagger } from "./cdk-aspect";

// initializes app
const app = new cdk.App();

// initializes stack.  All stacks must belong to an app
// Note: The order here does not reflect the order in which the stacks will be deployed.
// If we used Fn to import and export dependencies between stacks, such as when
// PhotosHandlerStack references a resource that is created within PhotosStack,
// we will get an error if they are not deployed in the correct order.
// by passing values using the alternative pattern showed below,
// we are guaranteed no errors due to deployment order when deploying.
new CdkStarterStack(app, "CdkStarterStack");
const photoStack = new PhotosStack(app, "PhotosStack");
new PhotosHandlerStack(app, "PhotosHandlerStack", {
  targetBucketArn: photoStack.photosBucketArn,
});

// cdk aspect example
const tagger = new BucketTagger("level", "test");
// assigns the tagger class as an aspect of the "app"
cdk.Aspects.of(app).add(tagger);
