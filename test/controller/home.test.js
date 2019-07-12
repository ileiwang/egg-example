// const assert = require('assert');
// const mock = require('egg-mock');
const { app, mock, assert } = require('egg-mock/bootstrap');
const fs = require('mz/fs');
// describe('test/controller/home.test.js', () => {
//     let app;
//     before(() => {
//         // 创建当前应用的 app 实例
//         app = mock.app();
//         // 等待 app 启动成功，才能执行测试用例
//         return app.ready();
//     });
// });

describe('test/controller/home.test.js', () => {
    describe('GET /', () => {
        it('should status 200 and get the body', () => {
            // 对 app 发起 `GET /` 请求
            return app.httpRequest()
                .get('/')
                .expect(200) // 期望返回 status 200
                .expect('hello world'); // 期望 body 是 hello world
        });

        it('should send multi requests', async () => {
            // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
            await app.httpRequest()
                .get('/')
                .expect(200) // 期望返回 status 200
                .expect('hello world'); // 期望 body 是 hello world

            // 再请求一次
            const result = await app.httpRequest()
                .get('/')
                .expect(200)
                .expect('hello world');

            // 也可以这样验证
            assert(result.status === 200);
        });
    });
});

it('should get a ctx', () => {
    const ctx = app.mockContext();
    assert(ctx.method === 'GET');
    assert(ctx.url === '/');
});

it('should mock ctx.user', () => {
    const ctx = app.mockContext({
        user: {
            name: 'fengmk2',
        },
    });
    assert(ctx.user);
    assert(ctx.user.name === 'fengmk2');
});

it('should status 200 and get the request body', () => {
    // 模拟 CSRF token，下文会详细说明
    app.mockCsrf();
    return app.httpRequest()
        .post('/post')
        .type('form')
        .send({
            foo: 'bar',
        })
        .expect(200)
        .expect({
            foo: 'bar',
        });
});

describe('get lru', () => {
    it('should get a lru and it work', () => {
        // 设置缓存
        app.lru.set('foo', 'bar');
        // 读取缓存
        assert(app.lru.get('foo') === 'bar');
    });
});

describe('isXHR()', () => {
    it('should true', () => {
        const ctx = app.mockContext({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        assert(ctx.isXHR === true);
    });

    it('should false', () => {
        const ctx = app.mockContext({
            headers: {
                'X-Requested-With': 'SuperAgent',
            },
        });
        assert(ctx.isXHR === false);
    });
});

describe('isChrome()', () => {
    it('should true', () => {
        const ctx = app.mockContext({
            headers: {
                'User-Agent': 'Chrome/56.0.2924.51',
            },
        });
        assert(ctx.request.isChrome === true);
    });

    it('should false', () => {
        const ctx = app.mockContext({
            headers: {
                'User-Agent': 'FireFox/1',
            },
        });
        assert(ctx.request.isChrome === false);
    });
});


describe('isSuccess()', () => {
    it('should true', () => {
        const ctx = app.mockContext();
        ctx.status = 200;
        assert(ctx.response.isSuccess === true);
    });

    it('should false', () => {
        const ctx = app.mockContext();
        ctx.status = 404;
        assert(ctx.response.isSuccess === false);
    });
});

describe('money()', () => {
    it('should RMB', () => {
        const ctx = app.mockContext({
            // 模拟 ctx 的 headers
            headers: {
                'Accept-Language': 'zh-CN,zh;q=0.5',
            },
        });
        assert(ctx.helper.money(100) === '￥ 100');
    });

    it('should US Dolar', () => {
        const ctx = app.mockContext();
        assert(ctx.helper.money(100) === '$ 100');
    });
});


// describe('some test', () => {
//     // before hook

//     afterEach(mock.restore);

//     // it tests
// });


describe('GET /session', () => {
    it('should mock session work', () => {
        app.mockSession({
            foo: 'bar',
            uid: 123,
        });
        return app.httpRequest()
            .get('/session')
            .expect(200)
            .expect({
                // session: {
                foo: 'bar',
                uid: 123,
                // },
            });
    });
});


// mock(app.config, 'baseDir', '/tmp/mockapp');
// assert(app.config.baseDir === '/tmp/mockapp');

// mock(fs, 'readFileSync', filename => {
//     return 'hello world';
// });
// assert(fs.readFileSync('foo.txt') === 'hello world');


//模拟 app/service/user 中的 find(id) 方法，让它返回一个本来不存在的用户数据。
it('should mock userid 3 exists', () => {
    app.mockService('user', 'find', () => {
        return {
            id: '3',
        };
    });

    return app.httpRequest()
        .get('/user/3')
        .expect(200)
        // 返回了原本不存在的用户信息
        .expect({
            id: '3',
        });
});

it('should mock service error', () => {
    app.mockServiceError('user', 'find', 'mock user service error');
    return app.httpRequest()
        .get('/user/3')
        // service 异常，触发 500 响应
        .expect(500)
        .expect(/mock user service error/);
});

describe('GET /httpclient', () => {
    it('should mock httpclient response', () => {
        app.mockHttpclient('https://eggjs.org', {
            // 模拟的参数，可以是 buffer / string / json，
            // 都会转换成 buffer
            // 按照请求时的 options.dataType 来做对应的转换
            data: 'mock eggjs.org response',
        });
        return app.httpRequest()
            .get('/httpclient')
            .expect('mock eggjs.org response');
    });
});