const morgan = require("morgan");
const rfs = require("rotating-file-stream");

const rfsStream = rfs.createStream("./logs/nsfw-service.log", {
    size: '1G', // rotate every 1 GigaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
 })

module.exports = {
    fileLogger : morgan('combined', {
        stream: rfsStream
    })
}