var DRV8830 = function(i2cPort){
  this.i2cPort = i2cPort;
  this.slaveAddress = 0x64;
  this.i2cSlave = null;
  this.command = {stanby:0,back:1,forward:2};
  this.levelMax = 0x3F;
  this.levelMin = 0x06;
};

DRV8830.prototype = {
  init: function(){
    return new Promise((resolve, reject) => {
      this.i2cPort.open(this.slaveAddress).then((i2cSlave) => {
        console.log("DRV8830.init OK");
        this.i2cSlave = i2cSlave;
        this.i2cSlave.write8(0,0x80).then(() => {
          resolve();
        },(err) =>{
          err.code = 11;
          console.log("DRV8830.init() reset Error: "+err.message);
          reject(err);
        });
      },(err) => {
        err.code = 10;
        console.log("DRV8830.init() open Error: "+err.message);
        reject(err);
      });
    });
  },
  write: function(command, level){
    return new Promise((resolve, reject)=>{
      if(this.i2cSlave){
        if(command > this.command.forward){
          command = this.command.stanby;
        }
        if(level > this.levelMax){
          level = this.levelMax;
        }
        if(level < this.levelMin){
          level = this.levelMin;
        }
        var param = command | (level << 2);
        this.i2cSlave.write8(0x00, param).then(() => {
          resolve();
        }, (err) => {
          console.log("DRV8830.write() error : "+err.message);
          err.code = 2;
          reject(err.message);
        });
      }else{
        console.log("i2cSlave is gone.....");
        err.code = 1;
        reject(err.message);
      }
    });
  },
  reset: function(command, level){
    return new Promise((resolve, reject)=>{
      if(this.i2cSlave){
        this.i2cSlave.write8(0x00, 0x80).then(() => {
          resolve();
        }, (err) => {
          console.log("DRV8830.reset() error : "+err.message);
          err.code = 4;
          reject(err.message);
        });
      }else{
        console.log("i2cSlave is gone.....");
        err.code = 3;
        reject(err.message);
      }
    });
  }

};