import {BaseURL} from '~/utils/decorators'
import Base from './Base'
import {permissionType} from '~/utils/const'

@BaseURL('/project')
class Project extends Base {
  constructor (args) {
    super(args.id)

    this.name = args.name
    this.url = args.url
    this.current = args.current
    this.branchList = args.branchList
    this.backup = args.backup
  }

  find ({page = 1, size = 10, name = ''} = {}) {
    return super.find({page, size, name})
  }
  findBackup ({page = 1, size = 10} = {}) {
    return super.find({page, size}, '/backup/list')
  }
  build ({id}) {
    return super.$get('/build', {id})
  }
  save ({id, name, url}) {
    return super.save({id, name, url})
  }
}
export default new Project({
})
export {Project}
