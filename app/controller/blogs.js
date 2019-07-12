// app/controller/blogs.js
// const Controller = require('egg').Controller;
// const { Controller } = require('egg');
const Controller = require('../core/base_controller');

class BlogController extends Controller {

  async index() {
    // const {ctx,service} = this;
    const ctx = this.ctx;
    const blogs = await ctx.service.blogs.findAll();
    ctx.body = blogs;
  }

  async new() {
    const ctx = this.ctx;
    // const title = ctx.params.title;
    // const content = ctx.params.content;
    // const result = await ctx.service.blogs.create(title,content);
    //ctx.body = 'new blog';
    await this.ctx.render('blog/new.tpl');
  }

  async create() {
    const ctx = this.ctx;

    //规则
    const createRule = {
      title: {
        type: 'string',
        required: 'true',
        max: 10,
      },
      content: {
        type: 'string',
        required: 'true',
        max: 100,
      },
    };

    // 校验参数
    // 如果不传第二个参数会自动校验 `ctx.request.body`
    ctx.validate(createRule);

    const title = ctx.request.body.title;
    const content = ctx.request.body.content;
    console.log(title);
    console.log(content);
    const user_id = '1';
    //const user_id = ctx.session.user.id;
    const req = Object.assign(ctx.request.body, { user_id });
    const res = await ctx.service.blogs.create(req);
    ctx.body = { id: res.id };
    ctx.status = 201;
  }

  async show() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const start = Date.now();
    const blog = await ctx.service.blogs.find(id);
    const used = Date.now() - start;
    // 设置一个响应头
    ctx.set('show-response-time', used.toString());
    ctx.body = blog;
  }

  async edit() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const blog = await ctx.service.blogs.find(id);
    await this.ctx.render('blog/edit.tpl', blog);
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const title = ctx.request.body.title;
    const content = ctx.request.body.content;

    //const qq = id+":"+title+":"+content;
    const result = await ctx.service.blogs.update(id, title, content);
    ctx.body = result;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.blogs.destroy(id);
    ctx.body = result;
  }

  async list() {
    const blogs = await this.service.blogs.listByUser(this.user);
    this.success(posts);
  }

  async fetchPosts() {
    const ctx = this.ctx;
    // 获取 Session 上的内容
    const userId = ctx.session.userId;
    console.log(userId);
    const blogs = await ctx.service.blogs.findByCondition(userId);
    // 修改 Session 的值
    ctx.session.visited = ctx.session.visited ? ++ctx.session.visited : 1;
    ctx.body = {
      success: true,
      blogs,
    };
  }

}

module.exports = BlogController;