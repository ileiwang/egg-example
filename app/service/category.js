// app/service/user.js
const Service = require('egg').Service;

class CategoryService extends Service {

  async add(name,summary) {
    const result = await this.app.mysql.insert('category', { name: name,summary:summary });
    return result;
  }

  async delete(id) {
  	const result = await this.app.mysql.delete('category', { id: id});
    return result;
  } 

  async update(id,name,summary) {
    const category = await this.app.mysql.update('category', { id:id,name: name,summary:summary });
    return { category };
  }

  async find(id) {
  	//查询全部
    const category = await this.app.mysql.get('category',{id:id});
    return { category };
  }

  async findAll() {
    //查询全部
    const categorys = await this.app.mysql.select('category');
    return { categorys };
  }

  async findBy() {
  	//查询全部
    const categorys = await this.app.mysql.select('category',{
    	where: { id: ['1', '5'] }, // WHERE 条件
		  columns: ['id','name', 'summary'], // 要查询的表字段
		  orders: [['name','desc'], ['id','desc']], // 排序方式
		  limit: 10, // 返回数据量
		  offset: 0, // 数据偏移量
    });
    return { categorys };
  }
}
module.exports = CategoryService;