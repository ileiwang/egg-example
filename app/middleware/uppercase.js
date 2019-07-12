// app/middleware/uppercase.js
module.exports = () => {
  return async function uppercase(ctx, next) {
    ctx.query.q = ctx.query.q&&ctx.query.q.toUpperCase();
    await next();
  };
};