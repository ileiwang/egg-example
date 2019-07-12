// app/controller/view.js
exports.register = async ctx => {
  await ctx.render('/user/register.tpl');
};

exports.login = async ctx => {
	await ctx.render('/user/login.tpl');
};

exports.fileupload = async ctx => {
	await ctx.render('/file/upload.html');
};

exports.show = async ctx => {
	ctx.body = {
	  name: 'egg',
	  category: 'framework',
	  language: 'Node.js',
	};
};

exports.page = async ctx => {
	ctx.body = '<html><h1>Hello</h1></html>';
};

