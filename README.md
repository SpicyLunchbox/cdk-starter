Repo Structure Notes:
    - bin folder contains code to initialize application
    - lib folder contains the actual stacks
    - cdk.json file configures the app and is the entry point
    - cdk.out folder contains the actual cloudformation template that is deployed

CloudFormation: Infrastructure as code
    - Resources are organized into stacks
    - Template file will be JSON or YAML
    - CloudFormation has intrinsic functions which can be seen being used in cdk.out files 

CDK Constructs: constructs are the actual AWS services
    - three levels of constructs: L1, L2, L3
    - L1 constructs have no preconfiguration
    - L2 constructs provide additional functionality, such as boilerplate (most commonly used)
    - L3 constructs are also called patterns, involve the combination of multiple services. It wraps L1 & L2 constructs

CDK IDs:
    - all CDK resources require an ID
    - Construct ID: the ID you pass the construct when creating it within a stack
    - Logical ID: used by Cloudformation to identify a resource internally
    - Physical ID: part of the ARN, so this ID will be referenced when accessing a resource outside of CloudFormation

CDK Aspects: check or modify resources after they were created
    - visitor pattern
    - simple usecase: add tags
    - popular usecase: enforce security or best practices

Useful CDK Commands:
    - cdk bootstrap: creates a starter enviroment for cdk deployments
    - cdk deploy: creates and deploys the cdk.out templates into the bootstrapped environment
    - cdk synth: creates the cdk.out templates without actually deploying anything
    - cdk list: creates, then lists all stacks in your cdk.out folder
    - cdk diff: shows the differences between your local changes and your remote deploy
    - cdk doctor: attempts to search for errors in your configurations
    - cdk destroy ${stackName}: deletes a deployed stack

Online Docs:
    - AWS construct library
    - AWS CDK Github page

Useful Library:
    - cdk-nag: library of predefined rule packs to be used as cdk aspects for security & best practices enforcement purposes