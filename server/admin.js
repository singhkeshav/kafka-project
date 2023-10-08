const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [bulk-email-topic]");

  try{
    await admin.createTopics({
        topics: [
          {
            topic: "bulk-email-topic",
            numPartitions: 2,
          },
        ],
      });
  } catch(e) {
    console.log(e?.message);
  }
  
  console.log("Topic Created Successfully...");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}


exports.init = init;