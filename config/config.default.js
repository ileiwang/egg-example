exports.keys = 'aKJSt5UqzPJWrULZMWgbaUJy';

// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

//中间件
exports.middleware = [
  'robot',
  'gzip',
  'uppercase',
  'lowercase',
  'errorHandler',
];
// robot's configurations
exports.robot = {
  ua: [
    /curl/i,
    /Baiduspider/i,
  ]
};

exports.gzip = {
  //压缩阈值
  threshold: 1024,
  //只对/static路径进行压缩
  match: '/static',
}

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'wanglei',
    // 数据库名
    database: 'bookmanagement',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};


//日志
exports.logger = {
  //保存目录
  dir: 'G:/logger',
  //日志级别
  level: 'DEBUG',
};

// module.exports = {
//   logger:{
//     dir:'G:/logger',
//     level: 'DEBUG',
//   }
// };


exports.security = {
  csrf: {
    enable: false,
    // ignoreJSON: true,
  },
  // domainWhiteList: ['http://localhost:7001'],
};

// exports.cors = {
//   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
// };


// module.exports = {
//   keys:'1234567890',

//   middleware:['gzip'],

//   gzip:{
//     threshold:1024,

//   },
// };

exports.bodyParser = {
  jsonLimit: '10mb',
  formLimit: '10mb',
  enable: true,
};

//上传文件
exports.multipart = {
  mode: 'stream',
  fileSize: '10mb',
  fileExtensions: [
    '.txt',
    '.jpg',
  ],
  whitelist: [
    // images
    '.jpg', '.jpeg', // image/jpeg
    '.png', // image/png, image/x-png
    '.gif', // image/gif
    '.bmp', // image/bmp
    '.wbmp', // image/vnd.wap.wbmp
    '.webp',
    '.tif',
    '.psd',
    // text
    '.svg',
    '.js', '.jsx',
    '.json',
    '.css', '.less',
    '.html', '.htm',
    '.xml',
    // tar
    '.zip',
    '.gz', '.tgz', '.gzip',
    // video
    '.mp3',
    '.mp4',
    '.avi',
    '.txt',
  ],
  // tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
  cleanSchedule: {
    // run tmpdir clean job on every day 04:30 am
    // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
    cron: '0 30 4 * * *',
  },
};


// module.exports = {
//   key: 'EGG_SESS', // 承载 Session 的 Cookie 键值对名字
//   maxAge: 60, // Session 的最大有效时间
// };

exports.session = {
  key: 'EGG_SESS',  //eggjs默认session的key
  // maxAge: 24 * 3600 * 1000,  // 1 day
  maxAge: 30 * 1000,  // 30 s
  httpOnly: true,
  encrypt: true,
  renew: false  //每次访问页面都会给session会话延长时间
};

exports.jsonp = {
  callback: 'callback', // 识别 query 中的 `callback` 参数
  limit: 100, // 函数名最长为 100 个字符
  //csrf: true,
  //whiteList: /^https?:\/\/test.com\//,
  // whiteList: '.test.com',
  // whiteList: 'sub.test.com',
  // whiteList: [ 'sub.test.com', 'sub2.test.com' ],
};

exports.i18n = {
  // 默认语言，默认 "en_US"
  defaultLocale: 'zh-CN',
  // URL 参数，默认 "locale"
  queryField: 'locale',
  // Cookie 记录的 key, 默认："locale"
  cookieField: 'locale',
  // Cookie 的 domain 配置，默认为空，代表当前域名有效
  cookieDomain: '',
  // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
  cookieMaxAge: '1y',
};

exports.errorHandler = {
  // 只对 /api 前缀的 url 路径生效
  match: '/api',
}


exports.passportGithub = {
  key: 'your_clientID',
  secret: 'your_clientSecret',
  // callbackURL: '/passport/github/callback',
  // proxy: false,
};

exports.io = {
  init: { wsEngine: 'ws' }, // passed to engine.io
  namespace: {
    '/': {
      connectionMiddleware: ['connection'],
      packetMiddleware: ['packet'],
    },
    '/example': {
      connectionMiddleware: ['connection'],
      packetMiddleware: ['packet'],
    },
  },
  // redis: {
  //   host: { redis server host },
  //   port: { redis server port },
  //   auth_pass: { redis server password },
  //   db: 0,
  // },
};