import curry from 'lodash.curryright'

// 设置localStorage
export const setLocalStorage = (key, obj) => {
  if (typeof obj === 'string') {
    window.localStorage.setItem(key, obj)
  } else {
    window.localStorage.setItem(key, JSON.stringify(obj))
  }
}
// 获取localStorage
export const getLocalStorage = (key) => {
  let obj = window.localStorage.getItem(key)
  if (!obj) { return }
  try {
    return JSON.parse(obj)
  } catch (e) {
    return obj
  }
}
/**
 * 存储localStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getSessionStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeSessionStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

/**
 * @description 函数式 - 组合
 * @param {any} funcs
 */
export const compose = (...funcs) => x => funcs.reduceRight((pre, cur, i, arr) => cur(pre), x)

export const groupBy = (collection, iteratee) => {
  if (typeof iteratee === 'string') {
    let key = iteratee
    iteratee = _ => _[key]
  }
  return collection.reduce((pre, cur, i, arr) => {
    const key = iteratee(cur)
    pre[key] = pre[key] || []
    pre[key].push(cur)
    return pre
  }, {})
}

export const replaceIf = curry((str, reg, chars) => reg.test(str) ? chars : str)

// 对对象解析路径下的属性
const bailRE = /[^\w.$]/
export const parsePath = path => {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return obj => {
    for (let segment of segments) {
      if (!obj) return
      obj = obj[segment]
    }
    return obj
  }
}

export function filterBy (list, check = () => true) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (!check(item)) {
      list.splice(i, 1)
      i--
    }
    if (item.children) {
      return filterBy(item.children, check)
    }
  }
}
// 数组降维
function flatten (routes, list) {
  for (let route of routes) {
    const {name, path, meta, children} = route
    if (route.meta && route.meta.menu) {
      const {icon, menu} = meta
      list.push({name, path, icon, menu})
    }
    if (children) {
      return flatten(children, list)
    }
  }
  return list.sort((a, b) => {
    a = a.menu.split('-')
    b = b.menu.split('-')
    const maxLen = Math.max(a.length, b.length)
    for (let i = 0; i < maxLen; i++) {
      return a[i] - b[i]
    }
  })
}

export const parseRoutesToMenu = (routes) => {
  const list = flatten(routes, [])
  const res = []
  for (let item of list) {
    if (item.menu.length === 1) {
      res.push(item)
    } else {
      let parent = res.find(v => new RegExp(`^(${v.menu})`).test(item.menu))
      if (!parent) { return }
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
  }
  return res
}

/**
 * Create a cached version of a pure function.
 */
export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached(str => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

// 插值
export const resample = (x1, y1, x2, y2) => val => {
  let a = (x2 - x1) / (y2 - y1)
  let b = x1 - a * y1
  b = x2 - a * y2
  return a * val + b
}

// 求和
export const sumBy = (collection, iteratee) => {
  if (typeof iteratee === 'string') {
    let key = iteratee
    iteratee = _ => _[key]
  }
  return collection.reduce((pre, cur) => iteratee(cur) + pre, 0)
}

// 遍历对象
export const forIn = (object, iteratee) => {
  let res = {}
  for (let key in object) {
    res[key] = iteratee(object[key], key)
  }
  return res
}

export const pluck = (collection, keys) => {
  keys = keys.split(',')
  return collection.map(_ => keys.reduce((pre, cur) => {
    pre[cur] = _[cur]
    return pre
  }, {}))
}
