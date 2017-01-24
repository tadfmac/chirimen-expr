'use strict';

var commandSequence = [
  {value:0, str:"stop"},
  {value:1, str:"back"},
  {value:0, str:"stop"},
  {value:2, str:"forward"}
  ];

var commandPosition = 0;

window.addEventListener('load', function (){
  var head = document.querySelector('#head');
  
  // WebI2C Initialized
  navigator.requestI2CAccess()
    .then(function(i2cAccess){
      var port = i2cAccess.ports.get(0);
      var motor = new DRV8830(port);
      motor.init().then(()=>{
        console.log("DRV8830.init OK");
        setInterval(() => {
          motor.write(commandSequence[commandPosition].value, 0x3F).then((value) => {
            head.innerHTML = commandSequence[commandPosition].str;
            commandPosition ++;
            commandPosition %= commandSequence.length;
          }, (err) => {
            head.innerHTML = "ERROR";
            console.log('error: code:'+err.code+" message:"+err.message);
          });
        },1000);
      }, (err)=> {
        console.log("DRV8830.init error"+err.message);
      });
    });
}, false);