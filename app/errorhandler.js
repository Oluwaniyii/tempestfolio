const logger = require('./logger');

function logError(err, req){
    // log only server errors
    if(!err.status || err.status > 499){
        logger.error(err.toString(), `stack: ${err.stack}`);

        // set locals, only providing error in development
        if(req.app.get('env') === 'development') {
            console.log(err);
        }
    }
}



async function handleErrorProduction(err, req, res){
    if(err.status === 404){
        res.status(404).render('errors/404');
    }
    else if(!err.status || err.status > 499 ){
        // Log error 
        logError(err, req);
        // return a user friendly response about the error
        res.status(500).render('errors/500');

        // safely exit application
        process.kill(process.pid, 'SIGTERM');
    }
}



async function handleErrorDebug (err, req, res, displayErrorDetails=true){
    logError(err, req);

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.setHeader('Content-Type', 'text/html');

    const status = err.status || 500;

    if(displayErrorDetails){
        if(status === 404) return res.status(status).render('errors/404');
        return res.status(status).render('error', {errorcode: res.status});
    }

    return res.status(status).render(`errors/${status}`);
}



async function handleError (err, req, res) {
    if(req.app.get('env') === "development") await handleErrorDebug(err, req, res, true);
    else await handleErrorProduction(err, req, res);
}


module.exports.handleError = handleError;

