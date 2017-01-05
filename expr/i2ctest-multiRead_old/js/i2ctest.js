var i2cTest = function(i2cPort,slaveAddress){
  this.i2cPort = i2cPort;
  this.slaveAddress = slaveAddress;
  this.sensor = [0,0,0,0,0];
  this.isPlay = false;
  this.i2cSlave = null;
  this.isLedOn = false;
  this.readRegisterNum = 0x10;
};

i2cTest.prototype = {
  init: function(){
    return new Promise((resolve, reject) => {
//      console.log("i2cTest.init() Start");
      this.i2cPort.open(this.slaveAddress).then((i2cSlave) => {
//        console.log("i2cTest.init() OK");
        this.i2cSlave = i2cSlave;
        resolve();
      },(error) => {
        console.log("i2cTest.init() Error: "+error.message);
        reject(error);
      });
    });
  },
  read : function(registerNumber){
    return new Promise((resolve, reject) => {
      if(this.i2cSlave){
        var rnum = registerNumber;
//        var rnum = this.readRegisterNum;
//        console.log("i2cTest.read() Start: 0x"+rnum.toString(16));
        this.i2cSlave.read8(rnum).then((v) => {
//          console.log("i2cTest.read() OK: 0x"+rnum.toString(16)+" : "+v);
          resolve(v);
        },(error) => {
          console.log("i2cTest.read() Error: "+error.message);
          reject(error);
        });
//        this.readRegisterNum ++;
//        if(this.readRegisterNum > 0x13){
//          this.readRegisterNum = 0x10;
//        }
      }else{
        console.log("i2cSlave is gone.....");
      }
    });
  },
  write : function(data){
    return new Promise((resolve, reject) => {
      if(this.i2cSlave){
//        console.log("i2cTest.write Start");
        this.i2cSlave.write8(0x00,data).then(()=>{
//          console.log("i2cTest.write OK");
          resolve();
        },(error)=>{
          console.log("i2cTest.write Error: "+error.message);
          reject(error);
        });
      }else{
        console.log("i2cSlave is gone.....");
      }
    });
  }
};
