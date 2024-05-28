function requestLogging(request, response, next){
    const time = new Date();
    console.log(`[${request.method}] to ${request.path} from ${request.ip} at ${time.toLocaleTimeString()}`);
    next();
}

module.exports.requestLogging = requestLogging;