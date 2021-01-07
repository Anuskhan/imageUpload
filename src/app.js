const express = require("express")
const multer = require("multer")
const port = process.env.PORT;

const pino = require('pino');
const expressPino = require('express-pino-logger');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Upload successFully")
})
//Multiple files


app.listen(3001 || process.env.PORT, () => {
  console.log("Server on...")
})
app.listen(port, () => {
    logger.info('Server running on port %d', port);
});