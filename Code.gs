/*
    Google Apps Script for implementing a Google Chat Chatbot

    Prerequisites:
        - Configure Google Apps Script Project script properties with the following properties:
          - aws_accesskey
          - aws_secretkey
          - aws_default_region
        - Configure Google Hangouts Chat API slash commands as follows
            Command ID 1 = /aws
        - AWS object is defined from the aws.gs script or included as an Apps Script library resource with the title "AWS"
*/


/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */

// Global variables
var debug = true;

function onMessage(event) {
  if (debug) { Logger.log("function onMessage: Enter"); }
  Logger.log(`function onMessage: Called by ${event.user.displayName} in ${event.space.type} space ${event.space.name}`);

  var userName = "";
  
  if (event.space.type == "DM") {
    userName = "You";
  } else {
    userName = event.user.displayName;
  }
  
  var inMessage = event.message;

  // if simple text message, outMessage.text should contain a string (https://developers.google.com/hangouts/chat/reference/message-formats/basic)
  // if card message, outmessage.cards should contain a card object (https://developers.google.com/hangouts/chat/reference/message-formats/cards)
  var outMessage = {};
  
  if (inMessage.slashCommand) {
    switch (inMessage.slashCommand.commandId) {
      case 1:  // /aws
        if (debug) { Logger.log("Slash command ID 1 called (/aws)"); }

        outMessage = handleSlashCommand_aws(event);
        break;
      
      default:
        msg = inMessage.text.split(" ");
        outMessage.text = `Message contained ${msg.length} parts; 0 = ${msg[0]}`;
    }
  } else {
    outMessage.text = "Type \"/aws help\" for more information";
  }
  
  if (debug) { Logger.log(`function onMessage: outMessage = ${JSON.stringify(outMessage)}`); }
  if (debug) { Logger.log("function onMessage: Exit"); }
  return outMessage;
}

/**
 * Responds to an ADDED_TO_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onAddToSpace(event) {
  if (debug) { Logger.log("function onAddToSpace: Enter"); }
  var outMessage = {};

  if (event.space.singleUserBotDm) {
    outMessage.text = `Hey buddy! What can I do for you, ${event.user.displayName }?`;
  } else {
    outMessage.text = "Hey buddy! What can I do for you in this chat?";
  }

  if (event.message) {
    // Bot added through @mention.
    outMessage.text = `${outMessage.text} and you said: \"${event.message.text}\"`;
  }

  if (debug) { Logger.log("function onAddToSpace: Exit"); }
  return outMessage;
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
  if (debug) { Logger.log("function onRemoveFromSpace: Enter"); }

  console.info("aws.buddy bot removed from ", (event.space.name ? event.space.name : "this chat"));
  if (debug) { Logger.log("function onRemoveFromSpace: Exit"); }
}

/*
  AWS Service Handler Routing
*/
function handleSlashCommand_aws(event) {
  if (debug) { Logger.log("function handleSlashCommand_aws: Enter"); }

  var outMessage = {};
  var scriptProperties = PropertiesService.getScriptProperties();
  var awsScriptProperties = {
    default_region: scriptProperties.getProperty('aws_default_region'),
    iam_accesskey: scriptProperties.getProperty('aws_iam_accesskey'),
    iam_secretkey: scriptProperties.getProperty('aws_iam_secretkey')
  }

  var inMessage = event.message;
  var commandArguments = inMessage.text.split(" ");

  if (debug) {
    var logMsg = "Command arguments";

    for (var i = 0; i < commandArguments.length; i++) {
      logMsg = 
`${logMsg}
  Argument ${i}: ${commandArguments[i]}`;
    }

    Logger.log(logMsg);
  }

  switch (commandArguments[1]) {
    case "help":  // /aws help
      if (debug) { Logger.log("/aws help command called"); }
      
      outMessage = handle_aws_help(commandArguments);
      break;
    
    case "iam":  // /aws iam
      if (debug) { Logger.log("/aws iam service command called"); }

      outMessage = handle_aws_iam(commandArguments);
      break;

    case "vpc":  // /aws vpc
      if (debug) { Logger.log("/aws vpc service command called"); }

      outMessage = handle_aws_vpc(commandArguments);
      break;

    case "s3":  // /aws s3
      if (debug) { Logger.log("/aws s3 service command called"); }

      outMessage = handle_aws_s3({ awsScriptProperties: awsScriptProperties, commandArguments: commandArguments });
      break;

    case "ec2":  // /aws ec2
      if (debug) { Logger.log("/aws ec2 service command called"); }

      outMessage = handle_aws_ec2(commandArguments);
      break;
      
    case undefined:
      if (debug) { Logger.log("/aws called without specified AWS service"); }

      outMessage.text = 
`/aws called without specified AWS service
Type \"/aws help\" for more information`;
      break;

    default:
      outMessage.text = 
`Unrecognized aws sub-command ${commandArguments[1]}
Type \"/aws help\" for more information`;
  }

  if (debug) { Logger.log("function handleSlashCommand_aws: Exit"); }

  return outMessage;
}

/*
  Bot Help Command Handler
*/
function handle_aws_help({awsScriptProperties, commandArguments}) {
  if (debug) { Logger.log("function handle_aws_help: Enter"); }
  var outMessage = {};

  outMessage.text = `Usage: /aws <service> <command> [parameters]
This bot will use similar command conventions that the AWS CLI provides.
  /aws help = get this help message
  /aws <service> help = get help for commands for a specific AWS service

AWS services supported:
  - iam = AWS IAM service commands
  - vpc = AWS VPC service commands
  - s3 = AWS S3 commands
  - ec2 = AWS EC2 commands`;

  if (debug) { Logger.log("function handle_aws_help: Exit"); }
  return outMessage;
}

/*
  AWS IAM Service Command Handler Routing
*/
function handle_aws_iam({awsScriptProperties, commandArguments}) {
  if (debug) { Logger.log("function handle_aws_iam: Enter"); }
  var outMessage = {};
  outMessage.text = "/aws iam COMMAND NOT IMPLEMENTED"

  if (debug) { Logger.log("function handle_aws_iam: Exit"); }
  return outMessage
}

/*
  AWS VPC Service Command Handler Routing
*/
function handle_aws_vpc({awsScriptProperties, commandArguments}) {
  if (debug) { Logger.log("function handle_aws_vpc: Enter"); }
  var outMessage = {};
  outMessage.text = "/aws vpc COMMAND NOT IMPLEMENTED"

  if (debug) { Logger.log("function handle_aws_vpc: Exit"); }
  return outMessage
}

/*
  AWS S3 Service Command Handler Routing
*/
function handle_aws_s3({awsScriptProperties, commandArguments}) {
  if (debug) { Logger.log("function handle_aws_s3: Enter"); }
  var outMessage = {};
  
  switch (commandArguments[2]) {
    case "help":  // /aws s3 help
      if (debug) { Logger.log("/aws s3 help command called"); }

      outMessage = handle_aws_s3_help({ awsScriptProperties: awsScriptProperties, commandArguments: commandArguments });
      break;
    
    case "ls":  // /aws s3 ls
      if (debug) { Logger.log("/aws s3 ls command called"); }

      outMessage = handle_aws_s3_ls({ awsScriptProperties: awsScriptProperties, commandArguments: commandArguments });
      break;

    case undefined:
      if (debug) { Logger.log("/aws s3 called without command"); }

      outMessage.text = 
`/aws s3 called without specified service command
Type \"/aws s3 help\" for more information`;
      break;
        
    default:
      outMessage.text = 
`Unrecognized aws s3 service command ${commandArguments[2]}
Type \"/aws s3 help\" for more information`;
  }

  if (debug) { Logger.log("function handle_aws_s3: Exit"); }
  return outMessage
}

function handle_aws_ec2({awsScriptProperties, commandArguments}) {
  if (debug) { Logger.log("function handle_aws_ec2: Enter"); }
  var outMessage = {};
  outMessage.text = "/aws ec2 COMMAND NOT IMPLEMENTED"

  if (debug) { Logger.log("function handle_aws_ec2: Exit"); }
  return outMessage
}

function handle_aws_s3_help({ awsScriptProperties, commandArguments }) {
  if (debug) { Logger.log("function handle_aws_s3_help: Enter"); }
  var outMessage = { cards: [] };

  outMessage.text = 
`Usage: /aws s3 <command> [parameters]

  /aws s3 help = get this help message

AWS s3 commands supported:
  - ls = list S3 resources`;

  if (debug) { Logger.log("function handle_aws_s3_help: Exit"); }
  return outMessage;
}

/***************** AWS S3 Command Handlers *****************/
function handle_aws_s3_ls({awsScriptProperties,commandArguments}) {
  if (debug) { Logger.log("function aws_s3_ls: Enter"); }
  var outMessage = { cards: [] };
  var card1 = {
      header: {},
      sections: [
        { widgets: [] }
      ]
    };

  
  card1.header.title = "AWS S3";
  card1.header.subtitle = "List Buckets";
  card1.header.imageUrl = "";
  card1.header.imageStyle = "IMAGE";  // "IMAGE" or "AVATAR"

  var awsRegionWidget = {
    textParagraph: {
      text: `<b>AWS Region:</b> ${awsScriptProperties.default_region}`
    }
  };
  card1.sections[0].widgets.push(awsRegionWidget);


  // Call AWS Service
  AWS.init(awsScriptProperties.iam_accesskey, awsScriptProperties.iam_secretkey);

  var awsResult = AWS.request({
    service: 's3',
    region: awsScriptProperties.default_region,
    method: 'GET', 
    action: 'ListBuckets'
  });
  
  if (debug) { Logger.log(awsResult.getResponseCode()); }
  var awsResponseCodeWidget = {
    textParagraph: {
      text: `<b>HTTP Response Code:</b> ${awsResult.getResponseCode()}`
    }
  };
  card1.sections[0].widgets.push(awsResponseCodeWidget);


  if (debug) { Logger.log(awsResult.getContentText()); }
  
  var xmlDocument = XmlService.parse(awsResult.getContentText());
  var awsns = XmlService.getNamespace('http://s3.amazonaws.com/doc/2006-03-01/');
  var docRoot = xmlDocument.getRootElement();
  if (debug) { Logger.log(`Document root element name: ${docRoot.getName()}`); }
  
  var bucketsElement = docRoot.getChild('Buckets', awsns);
  if (debug) { Logger.log(`Buckets element: ${bucketsElement.getName()}`); }
  
  var bucketElements = bucketsElement.getChildren('Bucket',awsns);
  if (debug) { Logger.log(`Number of Bucket elements = ${bucketElements.length}`); }
  var numberOfBucketsWidget = {
    textParagraph: {
      text: `<b>Number of Buckets:</b> ${bucketElements.length}`
    }
  };
  card1.sections[0].widgets.push(numberOfBucketsWidget);

  var msgBuckets = "";
  
  for (var i = 0; i < bucketElements.length; i++) {
    if (debug) { Logger.log(`Element name: ${bucketElements[i].getName()} ${i}`); }
    
    var name = bucketElements[i].getChildText('Name', awsns);
    var creationDate = bucketElements[i].getChildText('CreationDate', awsns);
    
    if (debug) { Logger.log(`Bucket: ${name} created on ${creationDate}`); }
    
    if (i>0) { msgBuckets = msgBuckets + "<br>"; }
    msgBuckets = msgBuckets + name;
  }
  
  if (debug) { Logger.log(`function aws_s3_ls: msgBuckets = ${msgBuckets}`); }

  var bucketListWidget = {
    textParagraph: {
      text: msgBuckets
    }
  };
  card1.sections[0].widgets.push(bucketListWidget);

  outMessage.cards.push(card1);

  if (debug) { Logger.log("function aws_s3_ls: Exit"); }
  return outMessage;
}
