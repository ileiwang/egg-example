// app/router.js
module.exports = app => {

  const { router, controller, io } = app;
  const gzip = app.middleware.gzip({ threshold: 1 });
  const jsonp = app.jsonp();

  router.get('home', '/', controller.home.index);
  router.redirect('/index', '/', 302);
  router.get('/news', controller.news.list);
  router.get('/user/:id', controller.user.info);
  router.get('/user/delete/:id', controller.user.delete);
  router.get('/category/add/:name/:summary', controller.category.add);
  router.get('/category/delete/:id', controller.category.delete);
  router.get('/category/update/:id/:name/:summary', controller.category.update);
  router.get('/category/find/:id', controller.category.find);
  router.get('/category/all', controller.category.findAll);
  // app.router.get('/findcategorygzip/:id',gzip,app.controller.category.find);
  //router.get('/home', controller.home);
  // router.post('/admin', isAdmin, controller.admin);
  // router.post('/user', isLoginUser, hasAdminPermission, controller.user.create);
  // router.post('/api/v1/comments', controller.v1.comments.create); // app/controller/v1/comments.js
  router.resources('blogs', '/blogs', controller.blogs);
  app.router.get('/myblog/', app.controller.blogs.fetchPosts);
  app.router.get('s', '/search', app.middlewares.uppercase(), app.middlewares.lowercase(), app.controller.search.index);
  app.router.post('/login', app.controller.user.login);
  app.router.get('/login', app.controller.view.login);
  app.router.post('/register', app.controller.user.register);
  app.router.get('/register', app.controller.view.register);
  app.router.get('/file/upload', app.controller.view.fileupload);
  app.router.post('/file/upload', app.controller.uploader.upload);

  app.router.get('/cookie/add', app.controller.cookie.add);
  app.router.get('/cookie/remove', app.controller.cookie.remove);

  app.router.get('/logoff', app.controller.session.deleteSession);
  app.router.get('/show', jsonp, app.controller.view.show);
  app.router.get('/page', app.controller.view.page);
  app.router.get('/download', app.controller.proxy.proxy);

  app.router.post('/post', app.controller.home.post);

  app.router.get('/session', app.controller.home.session);

  app.router.get('/httpclient', app.controller.home.httpclient);

  // socket.io
  io.of('/').route('server', io.controller.default.ping);
  io.of('/').route('exchange', io.controller.nsp.exchange);
  app.router.get('/chat', app.controller.chat.index);
};