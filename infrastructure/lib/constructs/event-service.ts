import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
// import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class EventService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Create a DynamoDB table to store event data
        const eventTable = new dynamodb.Table(this, 'EventTable', {
            tableName: 'Events',
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
        });

        // Create a Lambda function to handle API requests
        const eventHandler = new lambda.Function(this, 'EventHandler', {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'index.handler',
            environment: {
                EVENT_TABLE: eventTable.tableName
            }
        });

        // Grant the Lambda function permissions to access the DynamoDB table
        eventTable.grantReadWriteData(eventHandler);

        // Create an API Gateway
        const api = new apigateway.RestApi(this, 'EventApi', {
            restApiName: 'Event Service',
            deployOptions: {
                stageName: 'dev'
            }
        });

        // Create a resource and method for the API
        const events = api.root.addResource('events');
        events.addMethod('GET', new apigateway.LambdaIntegration(eventHandler));
    }
}