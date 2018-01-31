require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  app: {
    name: 'demo',
    version: '1.0.0'
  },
  server: {
    port: 3000
  },
  static: {
    root: './static',
    options: {}
  },
  mongodb: {
    name: 'test',
    url: 'mongodb://localhost:27017/test',
    account: 'chris',
    password: '123456'
  },
  session: {
    secretKey: '123'
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mongodb__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middlewares__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes__ = __webpack_require__(10);







const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].server.port;
const isProd = "development" === 'production';

let nuxtConfig = __webpack_require__(23);
nuxtConfig.dev = !(app.env === 'production');

const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](nuxtConfig);

if (nuxtConfig.dev) {
  const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build();
}

Object(__WEBPACK_IMPORTED_MODULE_4__middlewares__["a" /* default */])(app);
app.use(__WEBPACK_IMPORTED_MODULE_5__routes__["a" /* default */].routes());
app.use(async (ctx, next) => {
  ctx.status = 200;
  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, promise => {
      promise.then(resolve).catch(reject);
    });
  });
});
app.listen(port, host);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);



__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].mongodb.url);
const db = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection;

db.on('error', err => {
  console.log('数据库连接失败：' + err);
});
db.once('open', () => {
  console.log('数据库连接成功');
});
db.on('disconnected', () => {
  console.log('数据哭连接断开');
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_bodyparser__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_json__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = (app => {
  app.use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404 && ctx.res.headersSent === false) {
        ctx.throw(404);
      }
      if (ctx.status === 200 && ctx.res.headersSent === false) {
        ctx.body = {
          status: 200,
          data: ctx.body
        };
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.type = 'json';
      ctx.body = {
        status: ctx.status,
        message: err.message
      };
      ctx.app.emit('error', err, ctx);
    }
  });
  app.use(__WEBPACK_IMPORTED_MODULE_0_koa_bodyparser___default()());
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-json");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(11);


const router = __WEBPACK_IMPORTED_MODULE_0_koa_router___default()();

router.use('/api', __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].routes(), __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].allowedMethods());

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__children_project__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__children_user__ = __webpack_require__(25);



const router = __WEBPACK_IMPORTED_MODULE_0_koa_router___default()();

router.use('/project', __WEBPACK_IMPORTED_MODULE_1__children_project__["a" /* default */].routes(), __WEBPACK_IMPORTED_MODULE_1__children_project__["a" /* default */].allowedMethods());
router.use('/user', __WEBPACK_IMPORTED_MODULE_2__children_user__["a" /* default */].routes(), __WEBPACK_IMPORTED_MODULE_2__children_user__["a" /* default */].allowedMethods());

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_project__ = __webpack_require__(13);


const router = __WEBPACK_IMPORTED_MODULE_0_koa_router___default()();

router.get('/list', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].find);
router.get('/get', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].findOne);
router.post('/save', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].save);
router.post('/delete/:id', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].remove);
router.get('/backup/list', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].findBackUp);
router.post('/backup/update', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].updateBackup);
router.get('/build', __WEBPACK_IMPORTED_MODULE_1__controllers_project__["a" /* default */].updateBackup);
// router.get('/build', async (ctx, next) => {
//   ctx.type = 'json'
//   let {id} = ctx.query
//   let message
//   const project = projects.find(_ => _.id === id)
//   try {
//     const inst = git(`./projects/${project.id}`)
//     // init reposity
//     await inst.checkIsRepo()
//       .then(isRepo => !isRepo && initRepo(inst, project.url))
//       .then(() => inst.fetch())
//       // .then(() => inst.pull('origin', 'develop'))
//     message = await inst.branch()
//   }
//   catch (e) {
//     console.error('failed: ', e)
//     message = 'error'
//   }
//   ctx.body = message
// })

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_git_promise__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_git_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_simple_git_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cuid__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__const__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mongodb_models_project__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mongodb_models_backup__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__base__ = __webpack_require__(22);








const initRepo = (git, remote) => git.init().then(() => git.addRemote('origin', remote));
const findRepoBranch = async project => {
  const path = `./projects/${project.id}`;
  if (!__WEBPACK_IMPORTED_MODULE_0_fs___default.a.existsSync(path)) {
    __WEBPACK_IMPORTED_MODULE_0_fs___default.a.mkdirSync(path);
  }
  const inst = __WEBPACK_IMPORTED_MODULE_1_simple_git_promise___default()(path);
  let { all, current } = await inst.checkIsRepo().then(isRepo => !isRepo && initRepo(inst, project.url)).then(() => inst.branch());
  return Object.assign({}, project, {
    current,
    branchList: all
  });
};

class ProjectController extends __WEBPACK_IMPORTED_MODULE_6__base__["a" /* default */] {
  constructor(params) {
    super(params);

    this.name = params.name;
    this.url = params.url;
  }
  // 保存项目信息
  static async save(ctx, next) {
    let requestBody = ctx.request.body;
    let { id, name, url } = requestBody;
    id = id || __WEBPACK_IMPORTED_MODULE_2_cuid___default()();
    let data = await __WEBPACK_IMPORTED_MODULE_4__mongodb_models_project__["a" /* default */].findOneAndUpdate({ id }, { id, name, url }, { new: true, upsert: true });
    ctx.body = data;
  }
  // 删除项目信息
  static async remove(ctx, next) {
    let { id } = ctx.params;
    let res = await __WEBPACK_IMPORTED_MODULE_4__mongodb_models_project__["a" /* default */].remove({ id });
    ctx.body = res;
  }
  // 获取项目信息
  static async findOne(ctx, next) {
    let { id } = ctx.params;
    let res = await __WEBPACK_IMPORTED_MODULE_4__mongodb_models_project__["a" /* default */].findOne({ id });
    ctx.body = res;
  }
  // 获取项目列表
  static async find(ctx, next) {
    let { name = '' } = ctx.query;
    let content = await __WEBPACK_IMPORTED_MODULE_4__mongodb_models_project__["a" /* default */].find({ name: new RegExp(name) });
    content = await Promise.all(content.map(_ => findRepoBranch(_._doc)));
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    };
  }
  // 获取项目备份列表
  static async findBackUp(ctx, next) {
    let { id } = ctx.query;
    let content = await __WEBPACK_IMPORTED_MODULE_5__mongodb_models_backup__["a" /* default */].find({ projectId: id });
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    };
  }
  static async updateBackup(ctx, next) {
    let requestBody = ctx.request.body;
    let { id, backupId } = requestBody;
    let backup = await __WEBPACK_IMPORTED_MODULE_5__mongodb_models_backup__["a" /* default */].findOne({ id: backupId, projectId: id });
    let res = await __WEBPACK_IMPORTED_MODULE_4__mongodb_models_project__["a" /* default */].findOneAndUpdate({ id }, { $set: { backup } });
    ctx.body = res;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ProjectController);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("simple-git/promise");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("cuid");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const projects = [{ id: '1', name: 'tvi-trace-oa', url: 'https://gitee.com/tvi-center/tvi-trace-oa' }, { id: '2', name: 'tvi-trace-admin', url: 'https://gitee.com/tvi-center/tvi-trace-admin' }];
/* unused harmony export projects */


const backups = [{ id: '1', name: '2018-01-27', date: '2018-01-27' }, { id: '2', name: '2018-01-28', date: '2018-01-28' }];
/* unused harmony export backups */


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schemas_project__ = __webpack_require__(19);



const Project = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Project', __WEBPACK_IMPORTED_MODULE_1__schemas_project__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Project);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

const Project = new Schema({
	id: { type: String, unique: true },
	name: { type: String },
	url: { type: String },
	backup: {
		id: String,
		name: String,
		createTime: Date
	}
});

/* harmony default export */ __webpack_exports__["a"] = (Project);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schemas_backup__ = __webpack_require__(21);



const Backup = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Backup', __WEBPACK_IMPORTED_MODULE_1__schemas_backup__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Backup);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

const Backup = new Schema({
  id: { type: String, unique: true },
  projectId: { type: String },
  name: { type: String },
  branch: {
    id: String,
    name: String
  },
  createTime: { type: Date }
});

/* harmony default export */ __webpack_exports__["a"] = (Backup);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BaseController {
	constructor({ id }) {
		this.id = id;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (BaseController);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  router: {
    middleware: 'auth'
  },
  head: {
    title: 'nuxt-element-demo',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js + element-ui DEMO' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  build: {
    vendor: ['element-ui', 'axios'],
    babel: {
      plugins: [['component', [{
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }]], 'transform-decorators-legacy']
    },
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }],
    postcss: [__webpack_require__(24)({
      browsers: ['last 3 versions']
    })]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://127.0.0.1:3000'
  },
  loading: { color: '#3B8070' },
  css: ['element-ui/lib/theme-chalk/index.css', { src: '~assets/css/index.scss', lang: 'scss' }, { src: '~assets/css/reset.scss', lang: 'scss' }],
  plugins: ['~plugins/element-ui']
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("autoprefixer");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_user__ = __webpack_require__(26);


const router = __WEBPACK_IMPORTED_MODULE_0_koa_router___default()();

router.get('/list', __WEBPACK_IMPORTED_MODULE_1__controllers_user__["a" /* default */].find);
router.get('/get/:id', __WEBPACK_IMPORTED_MODULE_1__controllers_user__["a" /* default */].findOne);
router.post('/save', __WEBPACK_IMPORTED_MODULE_1__controllers_user__["a" /* default */].save);
router.post('/delete/:id', __WEBPACK_IMPORTED_MODULE_1__controllers_user__["a" /* default */].remove);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cuid__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mongodb_models_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base__ = __webpack_require__(22);




class UserController extends __WEBPACK_IMPORTED_MODULE_2__base__["a" /* default */] {
  constructor(params) {
    super(params);

    this.account = params.account;
    this.password = params.password;
  }
  // 保存用户信息
  static async save(ctx, next) {
    let requestBody = ctx.request.body;
    let { id, name, avatar } = requestBody;
    id = id || __WEBPACK_IMPORTED_MODULE_0_cuid___default()();
    let res = await __WEBPACK_IMPORTED_MODULE_1__mongodb_models_user__["a" /* default */].findOneAndUpdate({ id }, { id, name, avatar }, { new: true, upsert: true });
    ctx.body = res;
  }
  // 删除用户信息
  static async remove(ctx, next) {
    let { id } = ctx.params;
    let res = await __WEBPACK_IMPORTED_MODULE_1__mongodb_models_user__["a" /* default */].remove({ id });
    ctx.body = res;
  }
  // 获取用户信息
  static async findOne(ctx, next) {
    let { id } = ctx.params;
    let res = await __WEBPACK_IMPORTED_MODULE_1__mongodb_models_user__["a" /* default */].findOne({ id });
    ctx.body = res;
  }
  // 获取用户列表
  static async find(ctx, next) {
    let { name } = ctx.query;
    let content = await __WEBPACK_IMPORTED_MODULE_1__mongodb_models_user__["a" /* default */].find({ name: new RegExp(name) });
    ctx.body = {
      content,
      number: 1,
      total: 1,
      size: 10,
      totalElements: 10
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (UserController);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schemas_user__ = __webpack_require__(28);



const User = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('User', __WEBPACK_IMPORTED_MODULE_1__schemas_user__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

const Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

const User = new Schema({
	id: { type: String, unique: true },
	account: { type: String, unique: true },
	password: { type: String },
	avatar: { type: String },
	name: { type: String },
	role: {
		id: String,
		name: String,
		level: Number,
		modules: Array
	}
});

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ })
/******/ ]);
//# sourceMappingURL=main.map