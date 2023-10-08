// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const sendBulkEmail = require('./producer');

const getIp = require("./get_ip");
const cors = require('cors')
const app = express();
const port = 3001;
const jobs = {}
app.use(bodyParser.json());
app.use(cors());
getIp.init();

/**
 * @method POST
 */
app.post('/sendEmail', async (req, res) => {
  const  numEmails  = isNaN(req.body?.payload) ? 0 : Number(req.body?.payload);
  const jobId = Date.now().toString();
  jobs[jobId] = { status: 'pending', emailsSent: 0 };
  res.status(200).json({ jobId });
  // kafka producer calling..
  await sendBulkEmail(jobs, jobId, numEmails);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
