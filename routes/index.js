const authApi = require('./routers/auth.router');
const routerV1 = require('./versions/v1');

function routerApi(app) {
	routerV1(app);
	authApi(app);
}

module.exports = routerApi;
