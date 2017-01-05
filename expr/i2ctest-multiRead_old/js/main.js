///////////////////////////////////////////////////////////////
// i2cTest 
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// minified.js

var MINI = require('minified'); 
var $ = MINI.$, $$ = MINI.$$, EE = MINI.EE;

$(function(){

var frame = 0;
var onOff = 0;

animate();

function animate(){
  frame ++;
  frame %= 60;
  requestAnimationFrame(animate);

  if((frame % 30) == 0){
    if(isReadDeviceEnable){
      var r1StartMs = +new Date();
//      console.log("read1:start");
      readDevice.read(0x10).then((v) => {
        var r1EndMs = +new Date();
        var r1DelayMs = r1EndMs - r1StartMs;
        console.log("read1:success:"+v);
        $("#t1").set("innerHTML",r1DelayMs);
        $("#v1").set("innerHTML",v);
      },(error) => {
        $("#t1").set("innerHTML","ERR");
        $("#v1").set("innerHTML","ERR");

//        console.log("read error:"+error);
      });
//      console.log("read2:start");
      var r2StartMs = +new Date();
      readDevice.read(0x10).then((v) => {
        var r2EndMs = +new Date();
        var r2DelayMs = r2EndMs - r2StartMs;
        console.log("read2:success:"+v);
        $("#t2").set("innerHTML",r2DelayMs);
        $("#v2").set("innerHTML",v);
      },(error) => {
        $("#t2").set("innerHTML","ERR");
        $("#v2").set("innerHTML","ERR");
//        console.log("read error:"+error);
      });
//      console.log("read3:start");
      var r3StartMs = +new Date();
      readDevice.read(0x10).then((v) => {
        var r3EndMs = +new Date();
        var r3DelayMs = r3EndMs - r3StartMs;
        console.log("read3:success:"+v);
        $("#t3").set("innerHTML",r3DelayMs);
        $("#v3").set("innerHTML",v);
      },(error) => {
        $("#t3").set("innerHTML","ERR");
        $("#v3").set("innerHTML","ERR");
//        console.log("read error:"+error);
      });
//      console.log("read4:start");
      var r4StartMs = +new Date();
      readDevice.read(0x10).then((v) => {
        var r4EndMs = +new Date();
        var r4DelayMs = r4EndMs - r4StartMs;
        console.log("read4:success:"+v);
        $("#t4").set("innerHTML",r4DelayMs);
        $("#v4").set("innerHTML",v);
      },(error) => {
        $("#t4").set("innerHTML","ERR");
        $("#v4").set("innerHTML","ERR");
//        console.log("read error:"+error);
      });
    }
    if(isWriteDeviceEnable){
      var wStartMs = +new Date();
      onOff ^= 1;
      writeDevice.write(onOff).then(() => {
        var wEndMs = +new Date();
        var wDelayMs = wEndMs - wStartMs;
//        console.log("delayMS:"+wDelayMs);
        $("#data2").set("innerHTML",wDelayMs);
      },(error) => {
        $("#data2").set("innerHTML","ERROR");
//        console.log("write error:"+error);
      });
    }
  }

}

///////////////////////////////////////////////////////////////
// WebI2C

var port = null;
var readDevice = null;
var writeDevice = null;
var isReadDeviceEnable = false;
var isWriteDeviceEnable = false;

navigator.requestI2CAccess().then((i2cAccess) => {
  port = i2cAccess.ports.get(0);
  readDevice = new i2cTest(port,0x30);
  readDevice.init().then(() => {
    console.log("readDevice.init() OK");
//    $("#data0").set("innerHTML","OK");
    isReadDeviceEnable = true;
    $("#data0").set("innerHTML","OK");
  },(v) => {
    $("#data0").set("innerHTML","ERROR");
    console.log("readDevice.init() error:"+v);
  });
  writeDevice = new i2cTest(port,0x31);
  writeDevice.init().then(() => {
    console.log("writeDevice.init() OK");
    isWriteDeviceEnable = true;
    $("#data1").set("innerHTML","OK");
  },(v) => {
    $("#data1").set("innerHTML","ERROR");
    console.log("readDevice.init() error:"+v);
  });

}).catch((e) => {
  console.error("I2C bus error!", e);
});



}); // $(function(){



