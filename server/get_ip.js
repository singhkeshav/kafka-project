const { Kafka } = require("kafkajs");
const {networkInterfaces} = require('os');
let config = require('./config');
const admin = require("./admin");
const consumer = require("./consumer");
/**
 * 
 * @returns 
 */
const getPrivateIpAddress =  async () => {
    const interfaces = networkInterfaces();
    for (const interfaceName in interfaces) {
      const iface = interfaces[interfaceName];
      for (const entry of iface) {
        if (!entry.internal && entry.family === 'IPv4') {
          return entry.address;
        }
      }
    }
    return '127.0.0.1';
  };

const init = async () => {
  let _ipAddress = await getPrivateIpAddress();
  config.IP_ADDRESS = `${_ipAddress}:9092`;
  admin.init();
  consumer.init();
}

exports.init = init;





