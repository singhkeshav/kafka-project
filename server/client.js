const { Kafka } = require("kafkajs");
let { IP_ADDRESS } = require('./config');
//kafka client
exports.kafka = new Kafka({
  clientId: "email-producer",
  brokers: [IP_ADDRESS],
});




