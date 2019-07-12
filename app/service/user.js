// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {

  //添加
  async create(username,password) {
  	// 插入
  	const result = await this.app.mysql.insert('user', { username: username,password:password});
  	// 判断插入成功
  	const insertSuccess = result.affectedRows === 1;
  	console.log(result);
  	return insertSuccess;
  }

  //查询
  async find(id) {
    const user = await this.app.mysql.get('user', { id: id });
    return { user };
  }

  //查询全部
  async readAll() {

    const users = await this.app.mysql.select('users');
    return { users };
  }
  //按条件查询
  // async readByCondition() {
  // 	//查询全部
  //   const users = await this.app.mysql.select('users',{
  //   	  where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
		//   columns: ['author', 'title'], // 要查询的表字段
		//   orders: [['created_at','desc'], ['id','desc']], // 排序方式
		//   limit: 10, // 返回数据量
		//   offset: 0, // 数据偏移量
  //   });
  //   return { users };
  // }
}

module.exports = UserService;