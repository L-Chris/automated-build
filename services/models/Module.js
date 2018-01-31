import {groupBy} from '~/utils'
import {BaseURL, Memorize} from '~/utils/decorators'
import Base from './Base'

@BaseURL('/module')
class Module extends Base {
  constructor (args) {
    super(args.id)

    this.id = args.id
    this.name = args.name
    this.parentId = args.parentId
    this.description = args.description
    
  }
  find ({page = 1, size = 10, name} = {}) {
    return super.find({page, size, name})
  }
  save ({id, name, description, parentId}) {
    return super.save({id, name, description, parentId, parentId})
  }
  delete ({id}) {
    return super.delete({id})
  }
}

export default new Module({
  id: '',
  name: '',
  description: '',
  parentId: ''
})
export {Module}
