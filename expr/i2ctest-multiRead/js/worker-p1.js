// @@@@@ worker-p1.js by D.F.Mac.
// original : @MSakamaki : https://github.com/club-wot/WebGPIO (forked from Last Commit 6493b0d)

(function(){
var ab2jsonWorker = (dataBuffer) => JSON.parse(String.fromCharCode.apply(null, new Uint16Array(dataBuffer)));
var json2abWorker = (jsonData) => {
  var strJson = JSON.stringify(jsonData);
  var buf = new ArrayBuffer(strJson.length * 2);
  var uInt8Array = new Uint16Array(buf);
  for (var i = 0, strLen = strJson.length; i < strLen; i++) {
    uInt8Array[i] = strJson.charCodeAt(i);
  }

  return uInt8Array;
};

/**
* gpio監視イベント
**/
var onChangeIntervalEvent = ()=> {

  intervalPortList.forEach(port=> {
    Promise.resolve(navigator.mozGpio.getValue(port.portNumber)).then((value)=> {
      if (parseInt(port.value) !== parseInt(value)) {
        port.value = value;
        postMessage(json2abWorker({ method: `gpio.onchange.${port.portNumber}`, portNumber: port.portNumber, value: value, }));
      }
    });
  });
};

var intervalPortList = [];
var onchangeIntervalId = setInterval(onChangeIntervalEvent, 30);

onmessage =  (e) => {
  var data = ab2jsonWorker(e.data);
  switch (data.method) {
    /********************************/
    /**         GPIO                */
    /********************************/
    case 'gpio.export':
      navigator.mozGpio.export(data.portNumber);
      postMessage(json2abWorker({
        method: `${data.method}.${data.portNumber}`,
        portNumber: data.portNumber,
      }));
      break;
    case 'gpio.setDirection':
      navigator.mozGpio.setDirection(data.portNumber, data.direction);

      if (!data.direction) {
        intervalPortList.push({
          portNumber: data.portNumber,
          value: void 0,
        });
      } else {
        intervalPortList = intervalPortList.filter((v) => data.portNumber !== v.portNumber);
      }

      break;
    case 'gpio.setValue':
      navigator.mozGpio.setValue(data.portNumber, data.value);
      break;
    case 'gpio.getValue':
      navigator.mozGpio.getValue(data.portNumber).then((value)=> {

        postMessage(json2abWorker({
          method: `${data.method}.${data.portNumber}`,
          portNumber: data.portNumber,
          value: value,
        }));
      });
      break;
    /********************************/
    /**         I2C                 */
    /********************************/
    case 'i2c.open':
      navigator.mozI2c.open(data.portNumber);
      break;
    case 'i2c.setDeviceAddress':
      try{
        var slaveDevice = navigator.mozI2c.setDeviceAddress(data.portNumber, data.slaveAddress);
      }catch(err){
        postMessage(json2abWorker({
          method: `${data.method}.${data.portNumber}`,
          portNumber: data.portNumber,
          error: {name:err.name, message:err.message}
        }));
        break;        
      }
      postMessage(json2abWorker({
        method: `${data.method}.${data.portNumber}`,
        portNumber: data.portNumber,
        slaveDevice: slaveDevice,
//          error: {name:"dummy", message:"dummy-error"}
      }));
      break;
    case 'i2c.write':
      try{
        var value = navigator.mozI2c.write(data.portNumber, data.slaveAddress, data.registerNumber, data.value, data.aIsOctet);
      }catch(err) {
        postMessage(json2abWorker({
          method: `${data.method}.${data.xid}.${data.portNumber}.${data.slaveAddress}.${data.registerNumber}`,
          portNumber: data.portNumber,
          error: {name:err.name, message:err.message}
        }));
        break;        
      }
      postMessage(json2abWorker({
        method: `${data.method}.${data.xid}.${data.portNumber}.${data.slaveAddress}.${data.registerNumber}`,
        portNumber: data.portNumber,
        value: value,
      }));
      break;
    case 'i2c.read':
      try{
        var value = navigator.mozI2c.read(data.portNumber, data.slaveAddress, data.readRegistar, data.aIsOctet);
      }catch(err) {
        postMessage(json2abWorker({
          method: `${data.method}.${data.xid}.${data.portNumber}.${data.slaveAddress}.${data.readRegistar}`,
          portNumber: data.portNumber,
          error: {name:err.name, message:err.message}
        }));
        break;
      }
      postMessage(json2abWorker({
        method: `${data.method}.${data.xid}.${data.portNumber}.${data.slaveAddress}.${data.readRegistar}`,
        portNumber: data.portNumber,
        value: value,
      }));
      break;
    default:
      throw 'Unexpected case to worker method';
  }
};

/* istanbul ignore next */
if (!navigator.mozGpio) {
  navigator.mozGpio = new Object();
  navigator.mozGpio.direction = '';
  navigator.mozGpio.value = 0;
  navigator.mozGpio.export = function (portno) {
  };

  navigator.mozGpio.unexport = function (portno) {
  };

  navigator.mozGpio.setValue = function (portno, value) {
    console.log('setValue(' + portno + ',' + value + ')');
  };

  navigator.mozGpio.getValue = function (portNumber) {
    return navigator.mozGpio.value;
  };

  navigator.mozGpio.setDirection = function (portno, direction) {
    console.log('setDirection(' + portno + ',' + direction + ')');
    navigator.mozGpio.direction = direction;
  };

  navigator.mozGpio.getDirection = function () {
    return navigator.mozGpio.direction;
  };

  // x秒おきに値を変更する
  // onchange event test
  // setInterval(()=> {
  //   navigator.mozGpio.value = navigator.mozGpio.value ? 0 : 1;
  //   console.log('navigator.mozGpio.value change', navigator.mozGpio.value);
  // }, 10000);
}

/* istanbul ignore next */
if (!navigator.mozI2c) {
  navigator.mozI2c = new Object();
  navigator.mozI2c.open = () => void 0;
  navigator.mozI2c.setDeviceAddress = () => void 0;
  navigator.mozI2c.read = (portNumber, slaveAddress, readRegistar, aIsOctet) => {
    console.log(`mozI2c.read portNumber:${portNumber}, slaveAddress:${slaveAddress}, readRegistar:${readRegistar}, aIsOctet:${aIsOctet}`);
    return Promise.resolve(1);
  };

  navigator.mozI2c.write = (portNumber, slaveAddress, registerNumber, value, aIsOctet) => {
    console.log(`mozI2c.write portNumber:${portNumber}, slaveAddress:${slaveAddress}, registerNumber:${registerNumber}, value:${value}, aIsOctet:${aIsOctet}`);
    return Promise.resolve(void 0);
  };
}
})()