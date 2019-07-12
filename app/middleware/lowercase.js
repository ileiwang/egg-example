// app/middleware/lowercase.js
module.exports = () => {
  return async function uppercase(ctx, next) {
    ctx.query.q = ctx.query.q&&ctx.query.q.toLowerCase();
    await next();
  };
};