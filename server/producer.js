// backend/producer.js
const { kafka } = require("./client");
const producer = kafka.producer();


const sendBulkEmail = async (jobs,jobId, numEmails) => {
  const job = jobs[jobId];
  job.status = 'in progress';
  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");
  let arr = Array.from({ length: numEmails });
  // send emails...
  arr.forEach(async (_, i) => {
    await producer.send({
      topic: 'bulk-email-topic',
      messages: [{ value: JSON.stringify({ jobId, emailIndex: i }) }],
    });
    
     if(arr?.length === i+1) {
       console.log("Disconnecting Producer");
       job.status = 'completed';
       job.emailsSent = numEmails;
       await producer.disconnect();
       console.log("Producer Disconnected Successfully");
     }
  });
};

module.exports = sendBulkEmail;
