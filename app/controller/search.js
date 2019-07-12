// app/controller/search.js
exports.index = async ctx => {
   // ctx.body = `search: ${ctx.query.q}`;
  const type = ctx.query.type;
  const q = ctx.query.q || 'nodejs';
  if (type === 'google') {
	ctx.redirect(`https://www.google.com/search?q=${q}`);    
  } else {
	ctx.redirect(`http://cn.bing.com/search?q=${q}`);
  }
};