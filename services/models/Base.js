import axios from '~/services'
import {BaseURL, ReadOnly} from '~/utils/decorators'
@BaseURL('/api')
class Base {
  constructor (id = '') {
    this.id = id
  }

  @ReadOnly
  $get (
    url,
    params,
    options = {}
  ) {
    options = Object.assign({
      baseURL: `${Base.$name}${this.constructor.$name}`
    }, options, {params})
    return Base.$http.get(url, options)
  }
  @ReadOnly
  $post (
    url,
    data,
    options = {}
  ) {
    options = Object.assign({
      baseURL: `${Base.$name}${this.constructor.$name}`,
      params: data
    }, options)
    return Base.$http.post(url, {}, options)
  }
  async find (params, _url = '/list') {
    let res = await this.$get(_url, params)
    return {
      ...res,
      content: res.content.map(_ => new this.constructor(_))
    }
  }
  async findOne (params, _url = '/findOne') {
    let data = await this.$get(_url, params)
    return new this.constructor(data)
  }
  add (data, _url = '/add', options) {
    return this.$post(_url, data, options)
  }
  save (data, _url = '/save', options) {
    return this.$post(_url, data, options)
  }
  delete (data, _url = '/delete', options) {
    return this.$post(_url, data, options)
  }
}

Base.$http = axios
export default Base
