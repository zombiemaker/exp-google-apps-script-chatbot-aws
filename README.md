# Sample Google Chat Chatbot Using Google Apps Script

Sample chatbot to demonstrate various capabilities include:

- Receive messages from Google Chat
- Process slash commands
- Connect to AWS services

These instructions are based on Google Cloud Platform, Google Apps Script, and Google Chat as of October, 2020.

## Prerequisites

- Hava a valid AWS access key and secret key pair
- Have a developer user account at Google Cloud Platform (https://console.developers.google.com/)

## Create A Google Apps Script Project

. Navigate in a web browser to Google Apps Script - https://script.google.com/
. Select "My Projects"
. Select  "New project"
. Type in the name of your project
. Copy the files in this git repo over your Google Apps Script project using the same file names
. Select save button

## Configure Google Apps Script Script Properties 

. From your Apps Script project screen, select File > "Project Properties"
. Select the "Script properties" tab
. Select "Add row"
. In the property name field, type in "aws_accesskey"
. In the property value field, type in the AWS access key that you have access to
. Select "Add row"
. In the property name field, type in "aws_secretkey"
. In the property value field, type in the AWS secret key that is associated with the AWS access key
. Select "Save"

## Publish / Deploy Google Apps Script Project

. From your Apps Script project screen, select Publish > "Deploy from manifest"
. Note that there is a deployment called "Latest Version (Head)"
  . This will point to your latest published version.
  . Use the ID of this deployment to configure your Google Hangouts Chat API.
  . Get the ID for this deployment by selecting "Get ID"
  . Copy the "Deployment ID" value
  . Select "Close"
. Select "Create"
. Type in a name for the deployment
. Select "Save"

## Create A Google Cloud Platform (GCP) Project

. Read https://cloud.google.com/resource-manager/docs/creating-managing-projects
. Navigate in a web browser to GCP Resource Manager - https://console.cloud.google.com/cloud-resource-manager
. Select "Create Project"

## Create A Service Account On Google Cloud Platform (GCP)

. Navigate in a web browser to GCP Console - https://console.developers.google.com/
. Select Navigation Menu (upper lefthand corner) > IAM & Admin > Service Accounts
. Select the GCP project that you want to create the service account for
. Select "Create Service Account"
. Select "Add Key"

## Enable & Configure Google Hangouts Chat API

. Navigate in a web browser to GCP Console - https://console.developers.google.com/
. Select Navigation Menu (upper lefthand corner) > API & Services > Library
. Type "hangouts chat" in the search bar
. Select "Hangouts Chat API"
. If not already enabled, select "Enable"; otherwise, select "Manage"
. Select "Configuration"
. Set "Bot status" to "LIVE"
. Set "Bot name" that will be the name used for the bot as it appears in Google Chat - use something easy to type (e.g. "aws")
. Set "Functionality" to be enabled for both direct messages and rooms
. Set "Connection settings" to "Apps Script project"
. Set the Deployment ID for the deployment of your Google Apps Script implementation of your ChatBot (we recommend that you use the deployment ID that points to the Latest Version)
. Set slash commands as follows:
  . "/aws" = Command ID 1 with a description of "Issue AWS commands"
. Set permissions to the individual users or user groups that you want to allow access to install the bot
. Select "Save"

## Test ChatBot In Google Chat

. Navigate in a web browser to Google Chats - https://chat.google.com/
. Scroll down to the "Bots" section
. Select the "+" symbot to add a bot
. In the search bar, type in the name of the chatbot that you configured in the GCP Google Hangouts Chat API settings.
. Once added, test out the bot commands such as:
  . "/aws help"
  . "/aws iam"
  . "/aws vpc"
  . "/aws s3"
  . "/aws ec2"

## View Apps Script Execution Logs

. Navigate in a web browser to Google Apps Script Executions - https://script.google.com/home/executions
. Select "My Executions"
. Select the execution that you want to view - the details of the execution should expand
. View the log messages created from the Logger.log statements

## Reference Information

- ECMAscript - https://tc39.es/ecma262/#sec-intro
- V8 Engine - https://v8.dev/
- Google Apps Script Guide - https://developers.google.com/apps-script/overview
- Google Apps Script Reference - https://developers.google.com/apps-script/reference
- GCP Resource Manager - https://console.cloud.google.com/cloud-resource-manager
- GCP Developer Console - https://console.developers.google.com/
- AWS JavaScript Client - https://github.com/smithy545/aws-apps-scripts
- AWS JavaScript SDK (for reference - does not work in Google Apps Script) - https://github.com/aws/aws-sdk-js
