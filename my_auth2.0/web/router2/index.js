
module.exports = function (app) {

  var middlewares = require('../lib/middlewares');
  var utils = require('../lib/utils');


  // OAuth2授权
  // var authorize = require('./authorize');
  // app.get('/OAuth2/authorize', middlewares.ensureLogin, authorize.checkAuthorizeParams, authorize.showAppInfo);
  // app.post('/OAuth2/authorize', middlewares.ensureLogin, middlewares.postBody, authorize.checkAuthorizeParams, authorize.confirmApp);
  // app.post('/OAuth2/access_token', middlewares.postBody, authorize.getAccessToken);

  // 模拟客户端获得授权码
  var client = require('./client');

  //获取授权码 生成获取授权的跳转地址 导向授权地址 即服务器的' /OAuth2/authorize '
  app.get('/example/auth', client.requestAuth);
  app.get('/example/auth/callback', client.authCallback);
  
  //
  app.get('/example', client.example);

};
