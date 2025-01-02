const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

// Configure Helmet for security headers
app.use(helmet());

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: process.env.REQUEST_PER_MINUTE || 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Serve a simple health check response
app.get('/health', (req, res) => {

    const receivedTime = Date.now();
    const requestIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.ip;

    console.log(`Request received from ${requestIP} @ ${new Date(receivedTime)} ... `)
    res.status(201).json({ result: 'OK' , timestamps: Date.now()});
});

app.get('*', (_req, res) => {
    res.status(404).json({ error: '404' })
});

app.listen(port, () => {
  console.log(`Health check server is running on port ${port}`);
});