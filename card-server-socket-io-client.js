var uuid = require('uuid'); 
var min = 5;
var max = 10;
var getRandom = function(){
            return Math.floor(Math.random() * (+max - +min) + +min);
        };

var timer;

var clientNumber = 0;

exports.getConnector = function(){
    return {
        random:0,
        clientNumber:0,
        clientId:uuid.v4(),
        clientUrl:"localhost:8000",
        init:function(){
            //console.log("Hello");
            this.random = getRandom();
        },
        setNumber:function(number){
            this.clientNumber = number;
        },
        setUrl:function(url){
            this.clientUrl = url;
        },
        connect:function(callback){
            var self = this;
            var socket = require('socket.io-client')('http://'+self.clientUrl);
            console.log("Client attempting to connect at: ");
            console.log(self.clientUrl);
            
            socket.on('connect', function(){
                console.log(self.clientNumber + " connected");
                socket.emit("action", {type:"ADD_CARD_USER", clientId:self.clientId, clientNumber:self.clientNumber});
                callback();
            });
            socket.on('start-timer', function(data){
                //console.log("Starting timer");
                //console.log(data);
                //var random = getRandom();
                timer = setInterval(function(){ socket.emit("action", {type:"HEARTBEAT", clientNumber:self.clientNumber}) }, getRandom()*1000);
            });
            socket.on('state', function(data){
                //console.log("Recieving state");
                //console.log(data);
            });
            socket.on('setCode', function(data){
                    if(data.code){
                        console.log(self.clientNumber + "(" + self.clientId + ") is a winner(" + data.code + ")!");
                    }
                    else if(data.code === 0){
                        console.log(self.clientNumber + "(" + self.clientId + ") is not a winner(" + data.code + ")!");
                    }
                }
            );
            socket.on('disconnect', function(){
                //console.log("Disconnected");
                clearInterval(timer);
            });
        }
    }
}

