
window.addEventListener('DOMContentLoaded', function() {
  var command;

  var host = "ws://mz4u.net:3003";
  
  var ws = new poorws(host);
  var status = 0;

  ws.onStatusChange = function(sts){
    status = sts;
    if(sts == 0){
      console.log("poorws:Connecting...");
    }else if(sts == 1){
      console.log("poorws:Connected");
    }else if(sts == 2){
      console.log("poorws:Disconnecting...");
    }else if(sts == 3){
      console.log("poorws:Disconnected(Re-Connecting...)");
    }
  };

  ws.onOpen = function(e){
    ws.send("master");
  };

  // Log errors
  ws.onError = function (error) {
    console.log('WebSocket Error ' + error);
  };

     // Log messages from the server
  ws.onMessage = function (e) {
    console.log('Server: ' + e.data);
    command = e.data;
    if (command === "0") {
      console.log(command);
    }
    navigator.requestGPIOAccess()
    .then(gpioAccess=>{
      var lP1 = gpioAccess.ports.get(245);
      var lP2 = gpioAccess.ports.get(246);
      var rP1 = gpioAccess.ports.get(163);
      var rP2 = gpioAccess.ports.get(193);
      var timer = null;

      function motorStop(time){
        if(timer != null){
          clearTimeout(timer);
        }
        timer = setTimeout(function(){
          lP1.write(0);
          lP2.write(0);
          rP1.write(0);
          rP2.write(0);
        },time);
      }

      return Promise.all([
        lP1.export("out"),
        lP2.export("out"),
        rP1.export("out"),
        rP2.export("out")
        ]).then(()=>{
        if (command == 0){
          console.log(command);
          lP1.write(0);
          lP2.write(0);
          rP1.write(0);
          rP2.write(0);
        }
        if (command == 1){
          console.log(command);
          lP1.write(1);
          lP2.write(0);
          rP1.write(0);
          rP2.write(1);
          motorStop(2000);
        }
        if (command == 2){
          console.log(command);
          lP1.write(0);
          lP2.write(1);
          rP1.write(0);
          rP2.write(1);
          motorStop(2000);
        }
        if (command == 3){
          console.log(command);
          lP1.write(1);
          lP2.write(0);
          rP1.write(1);
          rP2.write(0);
          motorStop(2000);
        }
        if (command == 4){
          console.log(command);
          lP1.write(0);
          lP2.write(1);
          rP1.write(1);
          rP2.write(0);
          motorStop(2000);
        }
      });
    });
  };
});
