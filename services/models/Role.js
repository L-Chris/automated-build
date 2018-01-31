import {groupBy} from '~/utils'
import {BaseURL, Memorize} from '~/utils/decorators'
import Base from './Base'

@BaseURL('/role')
class Role extends Base {
  constructor (args) {
    super(args.id)

    this.id = args.id
    this.name = args.name
    this.description = args.description
    this.level = args.level
    this.modules = args.modules
  }
  find ({page = 1, size = 10, name} = {}) {
    return super.find({page, size, name})
  }
  save ({id, name, description, level, moduleIds = ['']} = {}) {
    moduleIds = moduleIds.join(',')
    return super.save({id, name, description, level, moduleIds})
  }
  delete ({id}) {
    return super.delete({id})
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
  description: '',
  level: '',
  modules: []
})
export {Role, initModules}
