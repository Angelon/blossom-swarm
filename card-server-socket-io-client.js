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
        clientUrl:"localhost:8090",
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
            
            socket.on('connect', function(){
                //console.log("Connected");
                socket.emit("action", {type:"ADD_CARD_USER", clientNumber:self.clientNumber});
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
                        console.log(self.clientNumber + " is a winner!");
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

