const Controller = require('egg').Controller;

class SessionController extends Controller {
  async deleteSession() {
    this.ctx.session = null;
    this.ctx.redirect(`/`);
  }
};

module.exports = SessionController;