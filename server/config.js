export default {
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
}