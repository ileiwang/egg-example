// app/controller/chat.js
const Controller = require('egg').Controller;

class ChatController extends Controller {
  async index() {
    await this.ctx.render('chat/browser.html');
  }
}

module.exports = ChatController;