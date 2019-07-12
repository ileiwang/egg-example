// app/controller/user.js
const Controller = require('egg').Controller;
const ms = require('ms');

//注册规则
const createRule = {
  username: {
    type: 'email',
    required: true,
    max: 30,
  },
  password: {
    type: 'password',
    required: 'true',
    max: 18,
  },
};


class UserController extends Controller {

  //查看用户信息
  async info() {
    // const {ctx} = this;
    const ctx = this.ctx;
    const id = ctx.params.id;
    const user = await ctx.service.user.find(id);
    ctx.body = user;
    // ctx.body = {
    // 	name:`hello ${ctx.params.id}`,
    // }
  }

  //注册
  async register() {
    const ctx = this.ctx;
    ctx.validate(createRule);
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const result = await ctx.service.user.create(username, password);
    if (result == true) {
      ctx.body = "注册成功";
    }
    else {
      ctx.body = "注册失败";
    }
  }

  //登录
  async login() {
    const ctx = this.ctx;
    try {
      ctx.validate(createRule);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = { success: false };
      return;
    }

    //ctx.body = ctx.request.body;
    const { username, password, rememberMe } = ctx.request.body;

    const user = await ctx.service.user.find('1')
    ctx.session.userId = 1;
    ctx.session.username = user.username;
    ctx.session.user = user;
    // 如果用户勾选了 `记住我`，设置 30 天的过期时间
    if (rememberMe) {
      ctx.session.maxAge = ms('30d');
      console.log("rememberMe Selected");
    }
    await this.ctx.render('user/user.tpl', user);
  }

  //删除
  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const user = await ctx.service.user.find(id);
    // const userObj = parseJSON(user);
    // console.log("用户名："+userObj.username);
    ctx.body = user;

  }
}

module.exports = UserController;