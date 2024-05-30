// src/webhooks/webhookListener.js
const express = require('express');
const bodyParser = require('body-parser');
const { processWebhookData } = require('./webhookController');
require('dotenv').config();

const app = express();
const port = process.env.WEBHOOK_PORT || 3000;

// JSON 바디 파싱 미들웨어 설정
app.use(bodyParser.json());

// 웹훅 엔드포인트 설정
app.post('/webhook/notifications', (req, res) => {
    console.log('Received webhook:', req.body);
    processWebhookData(req.body);
    res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {
    console.log(`Webhook listener server running at http://localhost:${port}`);
});
