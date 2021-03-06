var fs = require('fs');
var client = require(__dirname + "/card-server-socket-io-client.js");
var connections = 0;
var myArgs = process.argv.slice(2);

var connectionCount = myArgs[0];
var connectionUrl = myArgs[1];
if(!connectionCount)
    connectionCount = 1;

if(!connectionUrl)
    connectionUrl = "ws://chat-Publi-MYR76686FFYG-287595339.us-east-1.elb.amazonaws.com:8080";

console.log('connectionCount: ', connectionCount);
console.log('connectionUrl: ', connectionUrl);

//var clientFilePath = __dirname + "/card-server-socket-io-client.js";
//var clientFileContents = fs.readFileSync(clientFilePath).toString();

this.io = require("socket.io-client");

function announceConnection(){
    connections++;
    //console.log(connections + " clients connected");
}

if(connectionCount){
    for(var x = 0;x<connectionCount;x++){
        var connector = client.getConnector();
        //console.log(connector);
        connector.setNumber(x);
        
        if(connectionUrl)
            connector.setUrl(connectionUrl);
        
        connector.connect(function(){
            announceConnection();
        });
        //eval(clientFileContents);
    }
}
