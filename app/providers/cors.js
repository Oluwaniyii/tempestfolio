const cors = require('cors');

module.exports = function(app){
    app.use(cors({origin: process.env.APP_HOME_URL}));
}