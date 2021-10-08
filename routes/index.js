const routerV1 = require('./versions/v1')

function routerApi(app){
  routerV1(app)
}

module.exports = routerApi;
