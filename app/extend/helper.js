const moment = require('moment');
// exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

// 使用 helper 计算指定 url path
// ctx.helper.pathFor('home', { by: 'recent', limit: 20 })

module.exports = {

	relativeTime(time) {
		return moment(new Date(time * 1000)).fromNow();
	},

	// pathFor(ctx){
	// 	ctx.helper.pathFor('home', { by: 'recent', limit: 20 })
	// }

	money(val) {
		const lang = this.ctx.get('Accept-Language');
		if (lang.includes('zh-CN')) {
			return `￥ ${val}`;
		}
		return `$ ${val}`;
	},

	parseMsg(action, payload = {}, metadata = {}) {
		const meta = Object.assign({}, {
			timestamp: Date.now(),
		}, metadata);

		return {
			meta,
			data: {
				action,
				payload,
			},
		};
	},
}