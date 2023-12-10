const morgan = require('morgan');

morgan.token('pid', function getPid() {
    return process.pid;
});

morgan.token('x-trace-id', function getTraceId(req) {
    return req.headers['X-Trace-Id'] || null;
})

const jsonFormat = (tokens, req, res) => {
    return JSON.stringify({
        'time': tokens['date'](req, res, 'iso'),
        'remote-address': tokens['remote-addr'](req, res),
        'x-trace-id': tokens['x-trace-id'](req, res),
        'method': tokens['method'](req, res),
        'url': tokens['url'](req, res),
        'http-version': tokens['http-version'](req, res),
        'status-code': tokens['status'](req, res),
        'content-length': tokens['res'](req, res, 'content-length'),
        'user-agent': tokens['user-agent'](req, res),
        'pid': tokens['pid'](req, res)
    });
}

module.exports = {
    jsonFormat
};
