module.exports = function(app){
    app.use( require("./static") );
    app.use( require("./question") );
    app.use( require("./answer") );
    app.use( require("./topic") );
    app.use( require("./user") );
    app.use( require("./userInfo") );
};