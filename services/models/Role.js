import {groupBy} from '~/utils'
import {BaseURL, Memorize} from '~/utils/decorators'
import Base from './Base'

@BaseURL('/role')
class Role extends Base {
  constructor (args) {
    super(args.id)

    this.id = args.id
    this.name = args.name
    this.moduleIds = args.moduleIds || []
    this.modules = args.modules
    this.modules = initModules(this.modules, this.moduleIds)
    this.moduleNames = this.modules.filter(_ => this.moduleIds.includes(_.id)).map(_ => _.name).join('，')
    this.moduleNames = this.modules.map(_ => {
      return `${_.label}（${_.children.filter(c => c.value).map(c => c.label).join('、')}）`
    }).join('，')
    this.desc = args.desc
  }
  find ({currentPage = 1, size = 10, roleName} = {}) {
    return super.find({currentPage, size, roleName})
  }
  @Memorize()
  findAllModule () {
    return this.$get('/getAllModule')
  }
  add ({roleName, des, moduleIds = ['']} = {}) {
    moduleIds = moduleIds.join(',')
    return super.add({roleName, des, moduleIds})
  }
  save ({roleId, roleName, des, moduleIds = ['']} = {}) {
    moduleIds = moduleIds.join(',')
    return super.save({roleId, roleName, des, moduleIds}, '/edit')
  }
  delete ({roleId}) {
    return super.delete({roleId})
  }
}

const initModules = (modules, moduleIds) => {
  let moduleGroups = groupBy(modules, 'parentId')
  let res = []
  for (const key in moduleGroups) {
    if (!key || key === 'undefined') continue
    const obj = modules.find(_ => _.id === key)
    res.push({
      id: key,
      label: obj.name,
      children: moduleGroups[key].map(_ => ({
        id: _.id,
        label: _.name,
        value: moduleIds.includes(_.id)
      }))
    })
  }
  return res
}

export default new Role({
  id: '',
  name: '',
  modules: [],
  moduleIds: [],
  desc: ''
})
export {Role, initModules}
