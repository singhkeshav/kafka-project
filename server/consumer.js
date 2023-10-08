const { kafka } = require("./client");
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3002, perMessageDeflate: false });
async function init() {
  const consumer = kafka.consumer({ groupId: 'user-1' });
  await consumer.connect();
  await consumer.subscribe({ topics: ["bulk-email-topic"] });
  wss.on('connection', function (ws) {});
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      wss.clients.forEach(function (client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message.value.toString()));
        }
      });
    },
  });
}
exports.init = init;