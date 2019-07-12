// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    //this.ctx.body = 'hello world'
    await this.ctx.render('/index.tpl');
    //this.ctx.body = await this.ctx.renderString('<h1>hello, {{ name }}</h1>', { name: 'world' });
  }

  async post() {
    this.ctx.body = this.ctx.request.body;
  }


  async session() {
    this.ctx.body = this.ctx.session;
  }

  async httpclient () {
    const res = await this.ctx.curl('https://eggjs.org');
    this.ctx.body = res.data.toString();
  }
}

module.exports = HomeController;