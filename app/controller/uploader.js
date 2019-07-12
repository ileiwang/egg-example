// app/controller/uploader.js
//以stream方式上传
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
const fs = require('mz/fs');
const awaitReadStream = require('await-stream-ready').read;
const awaitWriteStream = require('await-stream-ready').write;
const dayjs = require('dayjs');
//const awaitStreamReady = require('await-stream-ready');
class UploaderController extends Controller {

  //上传单个文件
  async upload() {
    const ctx = this.ctx;
    // 上传基础目录
    const uplaodBasePath = 'app/public/upload/';
    // 生成文件夹
    const dirName = dayjs(Date.now()).format('YYYYMMDD');

    const stream = await ctx.getFileStream();
    //const name = 'egg-multipart-test/' + Date.now() + '' + Number.parseInt(Math.random() * 10000) +path.basename(stream.filename);
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) +path.basename(stream.filename);
    if(!fs.existsSync(path.join(this.config.baseDir,uplaodBasePath,dirName))){
      fs.mkdirSync(path.join(this.config.baseDir,uplaodBasePath,dirName));
    }
    const target = path.join(this.config.baseDir,uplaodBasePath,dirName,filename);
    // 文件处理，上传到云存储等等
    const writeStream = fs.createWriteStream(target);
    console.log('field: ' + stream.fieldname);
    console.log('filename: ' + stream.filename);
    console.log('encoding: ' + stream.encoding);
    console.log('transferEncoding: ' + stream.transferEncoding);
    console.log('mime: ' + stream.mime);
    console.log('mimeType: ' + stream.mimeType);
    console.log('tmp filepath: ' + stream.filepath);
    console.log('fields: ' + stream.fields);
    let result;
    try {
      // result = await ctx.oss.put(name, stream);
       await awaitWriteStream(stream.pipe(writeStream));

    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      //url: result.url,
      // 所有表单字段都能通过 `stream.fields` 获取到
      //当表单的 enctype 设置成 multipart/form-data 之后，便不能使用 ctx.request.body 获取其他字段，现在是个空对象。
      fields: stream.fields,
    };
  }

  //上传多个文件
  async uploads() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    // parts() 返回 promise 对象
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这是 busboy 的字段
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // 文件处理，上传到云存储等等
        let result;
        try {
          result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        console.log(result);
      }
    }
    console.log('and we are done parsing the form!');
  }
}

module.exports = UploaderController;