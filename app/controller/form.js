// app/controller/form.js
exports.post = async ctx => {
  ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
};

exports.login = async ctx => {
	await ctx.render('/form.html');
};