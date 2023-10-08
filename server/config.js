
const {networkInterfaces} = require('os');
// get private IP address.
const getPrivateIpAddress =  () => {
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

exports.IP_ADDRESS = `${getPrivateIpAddress()}:9092`