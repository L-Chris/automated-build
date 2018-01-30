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
  findBackup ({id, page = 1, size = 10} = {}) {
    return super.find({id, page, size}, '/backup/list')
  }
  setBackup ({id, backupId}) {
    return super.$post('/backup/update', {id, backupId})
  }
  build ({id}) {
    return super.$get('/build', {id})
  }
  save ({id, name, url}) {
    return super.save({id, name, url})
  }
  delete ({id}) {
    return super.delete({id})
  }
}
export default new Project({
})
export {Project}
