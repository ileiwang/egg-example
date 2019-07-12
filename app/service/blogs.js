// app/service/user.js
const Service = require('egg').Service;

class BlogService extends Service {

  async find(id) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const blog = await this.app.mysql.get('blog', { id: id });
    return { blog };
  }

  async update(id,title,content) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const result = await this.app.mysql.update('blog', { id: id,title:title,content:content});
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      console.log("修改成功");
    }
    
    return "修改成功";
  }

  async destroy(id) {
    // 插入
    const result = await this.app.mysql.delete('blog', { id: id});
    // 判断删除成功
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      console.log("删除成功");
    }
    
    return "删除成功";
  }

  async create(title,content) {
  	// 插入
  	const result = await this.app.mysql.insert('blog', { title: title,content:content});
  	// 判断插入成功
  	const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      console.log("添加成功");
    }
  	
  	return "添加成功";
  }

  async create(req) {
    // 插入
    const result = await this.app.mysql.insert('blog', { title: req.title,content:req.content,user_id:req.user_id});
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if(insertSuccess){
      console.log("添加成功");
    }
    
    return {id:result.insertId};
  }

  //查询全部
  async findAll() {
  	//查询全部
    const blogs = await this.app.mysql.select('blog');
    return { blogs };
  }

  //按条件查询
  async findByCondition(userId) {
    const blogs = await this.app.mysql.select('blog',{
    	// where: { user_id: userId, author: ['author1', 'author2'] }, // WHERE 条件
      where: { user_id: userId}, // WHERE 条件
		  columns: ['id', 'title','content','createdate','user_id'], // 要查询的表字段
		  orders: [['createdate','desc'], ['id','desc']], // 排序方式
		  limit: 10, // 返回数据量
		  offset: 0, // 数据偏移量
    });
    return { blogs };
  }
}
module.exports = BlogService;