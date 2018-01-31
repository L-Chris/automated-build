import {BaseURL} from '~/utils/decorators'
import Base from './Base'
import {permissionType} from '~/utils/const'

@BaseURL('/user')
class User extends Base {
  constructor (args) {
    super(args.id)

    this.name = args.name
    this.wxName = args.wxName
    this.avatar = args.avatar
    this.sex = args.sex
    this.telephone = args.telephone
    this.email = args.email
    this.role = args.role
  }

  async login ({account, password}) {
    let res = await super.$get('/login', {account, password})
    return res
  }
  async logout () {
    let res = await super.$get('/logout')
    return res
  }
  find ({page = 1, size = 10, name} = {}) {
    return super.find({page, size, name})
  }
  save ({id, name, avatar}) {
    return super.save({id, name, avatar})
  }
  async findCurrent () {
    let res = {id: 1, name: 'Tricker'}
    let modules = permissionType.map(_ => _.id)
    let permissionMap = permissionType.filter(_ => modules.includes(_.id)).reduce((pre, {name}) => {
      pre[name] = true
      return pre
    }, {})
    return {
      ...res,
      permissionMap
    }
  }
}

export default new User({
  name: '',
  wxName: '',
  image: '',
  sex: ''
})
export {User}
