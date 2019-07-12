// app/controller/user.js
const Controller = require('egg').Controller;

class CategoryController extends Controller {

  async add() {
    const ctx = this.ctx;
    const name = ctx.params.name;
    const summary = ctx.params.summary;
    const result = await ctx.service.category.add(name, summary);
    ctx.body = result;
  }

  async delete() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.category.delete(id);
    ctx.body = result;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const name = ctx.params.name;
    const summary = ctx.params.summary;
    const result = await ctx.service.category.update(id, name, summary);
    ctx.body = result;
  }

  async find() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.service.category.find(id);
    ctx.body = result;
  }

  async findAll() {
    const ctx = this.ctx;
    const results = await ctx.service.category.findAll();
    ctx.body = results;
  }
}

module.exports = CategoryController;