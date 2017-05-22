/**
 * 简单API服务器
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (app) {

  var middlewares = require('../lib/middlewares');
  var utils = require('../lib/utils');


  // OAuth2授权
  var authorize = require('./authorize');
  // 2. 展示授权页面，请求用户是否授权
                              //判断用户是否登录       //校验client_id redirect_uri
                                                     //数据库 验证client_id是否正确，并查询应用的详细信息
                                                     // 验证redirect_uri是否符合该应用设置的回调地址规则
   app.get('/OAuth2/authorize', middlewares.ensureLogin, authorize.checkAuthorizeParams, authorize.showAppInfo);
                                                                                      //展示授权页面，提示用户是否授权

  // 3. 确认授权带着授权码回来,并跳回 第三方应用地址                                                                                    
                                                                                                        // 确认授权
                                                                                                          // 生成authorization_code
                                                         //form 表单 body 格式化                          // 跳转回来源应用 带着 authorization_code                           
  app.post('/OAuth2/authorize', middlewares.ensureLogin, middlewares.postBody, authorize.checkAuthorizeParams, authorize.confirmApp);
                                                            /** 
                                                             *             校验client_id redirect_uri
                                                                           数据库 验证client_id是否正确，并查询应用的详细信息
                                                                            验证redirect_uri是否符合该应用设置的回调地址规则
                                                            */

  // 5.获取access_token  [authorization_code,client_id,client_secret,redirect_uri]
  app.post('/OAuth2/access_token', middlewares.postBody, authorize.getAccessToken);


  app.post('/OAuth2/login',middlewares.postBody,function(req,res,next){
      // console.log(req.body)

      if(req.body.username=='doudou'&&req.body.password=='123456'){
          req.loginUserId = req.body.username;

          // return res.redirect(req.body.redirect_uri);
          return next();
      }else{
          return res.render('login');
      }
      
  },middlewares.ensureLogin, authorize.checkAuthorizeParams,authorize.showAppInfo)


  // 模拟客户端获得授权码
  var client = require('./client');

  // 1. //获取授权码 生成获取授权的跳转地址 导向授权地址 即服务器的' /OAuth2/authorize '
  // app.get('/example/auth', client.requestAuth);

  // 4.跳转到第三方应用接口，用authorization_code 请求服务器 '/OAuth2/access_token' 换取 access_token
  // app.get('/example/auth/callback', client.authCallback);
  // app.get('/example', client.example);

  // 提供的API列表 --------------------------------------------------------------
  var api = require('./api');

  // 生成请求限制key
  function generateHourRateLimiterKey (api) {
    return function (source) {
      return utils.md5(api + source) + ':' + utils.date('YmdH');
    };
  }


  
  app.get('/api/v1/articles.*',
    middlewares.verifyAccessToken,
    middlewares.generateRateLimiter(generateHourRateLimiterKey('/api/v1/articles'), 10000),
    api.getArticles);

  app.get('/api/v1/articles',
    middlewares.verifyAccessToken,
    middlewares.generateRateLimiter(generateHourRateLimiterKey('/api/v1/articles'), 10000),
    api.getArticles);

};
