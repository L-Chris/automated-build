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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

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
  session: {
    secretKey: '123'
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__(8);






const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].server.port;
const isProd = "development" === 'production';

let nuxtConfig = __webpack_require__(13);
nuxtConfig.dev = !(app.env === 'production');

const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](nuxtConfig);

if (nuxtConfig.dev) {
  const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build();
}

Object(__WEBPACK_IMPORTED_MODULE_3__middlewares__["a" /* default */])(app);
app.use(__WEBPACK_IMPORTED_MODULE_4__routes__["a" /* default */].routes());
app.use(ctx => {
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_bodyparser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_json__ = __webpack_require__(7);
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-json");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(9);


const router = __WEBPACK_IMPORTED_MODULE_0_koa_router___default()();

router.use('/api', __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].routes(), __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].allowedMethods());

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__children_project__ = __webpack_require__(10);


const router = __WEBPACK_IMPORTED_MODULE_0_koa_router___default()();

router.use('/project', __WEBPACK_IMPORTED_MODULE_1__children_project__["a" /* default */].routes(), __WEBPACK_IMPORTED_MODULE_1__children_project__["a" /* default */].allowedMethods());

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_git_promise__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_git_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_simple_git_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__const__ = __webpack_require__(15);




const router = __WEBPACK_IMPORTED_MODULE_1_koa_router___default()();

const initRepo = (git, remote) => git.init().then(() => git.addRemote('origin', remote));
const findRepoBranch = async project => {
  const inst = __WEBPACK_IMPORTED_MODULE_2_simple_git_promise___default()(`./projects/${project.id}`);
  let { all, current } = await inst.checkIsRepo().then(isRepo => !isRepo && initRepo(inst, project.url))
  // .then(() => inst.fetch())
  .then(() => inst.branch());
  return Object.assign({}, project, {
    current,
    branchList: all
  });
};

router.get('/list', async (ctx, next) => {
  ctx.type = 'json';
  let content = [];
  let list = await Promise.all(__WEBPACK_IMPORTED_MODULE_3__const__["a" /* projects */].map(_ => findRepoBranch(_)));
  ctx.body = {
    content: list,
    number: 1,
    total: 1,
    size: 10,
    totalElements: 10
  };
  console.log(ctx.body);
});

router.get('/build', async (ctx, next) => {
  ctx.type = 'json';
  let { id } = ctx.query;
  let message;
  const project = __WEBPACK_IMPORTED_MODULE_3__const__["a" /* projects */].find(_ => _.id === id);
  try {
    const inst = __WEBPACK_IMPORTED_MODULE_2_simple_git_promise___default()(`./projects/${project.id}`);
    // init reposity
    await inst.checkIsRepo().then(isRepo => !isRepo && initRepo(inst, project.url)).then(() => inst.fetch());
    // .then(() => inst.pull('origin', 'develop'))
    message = await inst.branch();
  } catch (e) {
    console.error('failed: ', e);
    message = 'error';
  }
  ctx.body = message;
});
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("simple-git/promise");

/***/ }),
/* 13 */
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
    postcss: [__webpack_require__(14)({
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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("autoprefixer");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const projects = [{ id: '1', name: 'tvi-trace-oa', url: 'https://gitee.com/tvi-center/tvi-trace-oa' }];
/* harmony export (immutable) */ __webpack_exports__["a"] = projects;


/***/ })
/******/ ]);
//# sourceMappingURL=main.map