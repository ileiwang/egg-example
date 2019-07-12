// app/controller/proxy.js
const Controller = require('egg').Controller;

class ProxyController extends Controller {
  async proxy() {
    const ctx = this.ctx;
    let url = 'https://dldir1.qq.com/qqfile/qq/PCQQ9.1.1/24953/QQ9.1.1.24953.exe';
    const result = await ctx.curl(url, {
      streaming: true,
    });
    ctx.set(result.header);
    // result.res 是一个 stream
    ctx.body = result.res;
  }
};

module.exports = ProxyController;