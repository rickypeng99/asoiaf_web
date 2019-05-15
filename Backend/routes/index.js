module.exports = function (app, router) {
    app.use('/api/asoiaf/', require('./asoiaf.js')(router));
    app.use('/api/home/', require('./home.js')(router));
    app.use('/api/', require('./user.js')(router));
};