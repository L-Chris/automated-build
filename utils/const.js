export const routes = [
  {
    path: '/login'
  },
  {
    path: '/',
    children: [
      {
        name: '用户管理',
        path: '/user',
        meta: {
          menu: '2',
          permission: 'user_view',
          icon: 'icon-user_manage'
        }
      },
      {
        name: '项目管理',
        path: '/project',
        meta: {
          menu: '1',
          permission: 'client_view',
          icon: 'icon-client'
        }
      },
      {
        name: '角色管理',
        path: '/role',
        meta: {
          menu: '3',
          permission: 'role_view',
          icon: 'icon-role'
        }
      }
    ]
  }
]

export const permissionType = [
  {id: '1', name: 'user', label: '用户管理'},
  {id: '2', name: 'user_view', label: '用户查看'},
  {id: '3', name: 'user_edit', label: '用户修改'},
  {id: '4', name: 'client', label: '客户管理'},
  {id: '5', name: 'client_view', label: '客户查看'},
  {id: '6', name: 'client_edit', label: '客户修改'},
  {id: '7', name: 'role', label: '角色管理'},
  {id: '8', name: 'role_view', label: '角色查看'},
  {id: '9', name: 'role_add', label: '角色新增'},
  {id: '10', name: 'role_delete', label: '角色删除'},
  {id: '11', name: 'role_edit', label: '角色修改'},
  {id: '12', name: 'article', label: '文章管理'},
  {id: '13', name: 'article_view', label: '文章查看'},
  {id: '14', name: 'article_add', label: '文章新增'},
  {id: '15', name: 'article_delete', label: '文章删除'},
  {id: '16', name: 'article_edit', label: '文章修改'},
  {id: '17', name: 'message_view', label: '任务查看'},
  {id: '18', name: 'message_edit', label: '任务修改'},
  {id: '19', name: 'tag_view', label: '标签查看'},
  {id: '20', name: 'tag_add', label: '标签新增'},
  {id: '21', name: 'tag_delete', label: '标签删除'},
  {id: '22', name: 'tag_edit', label: '标签修改'}
]
