const express = require("express")
const multer = require("multer")

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
app.get("/",(req, res) => {
  console.log(req.file)
  return res.send("server Running!!")
})
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return(
    res.status(200).json({
        "status": "success",
        message: "fetched top seller successfully",
        file: req.file,
    })
  )
})
//Multiple files    
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
  });


// app.listen(port, () => {
//     logger.info('Server running on port %d', port);
// });