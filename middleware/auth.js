import User from '~/services/models/User'
import * as types from '~/store/mutation-types'

export default async function ({store, req}) {
 if (process.server && !req) return
 let res = await User.findCurrent()
 store.commit(types.SET_USER, res)
}