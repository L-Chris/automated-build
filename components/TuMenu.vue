<script>
export default {
  components: {
    'tu-menu-content': {
      name: 'tu-menu-content',
      props: {
        list: {
          type: Array
        }
      },
      render (h) {
        return (
          <div class="tu-menu-content">
            {
              this.list.map(x => x.children
              ? (
                  <el-submenu index={x.path}>
                    <template slot="title">
                      {x.icon && <i class={`iconfont ${x.icon}`}/>}{x.name}
                    </template>
                    <tu-menu-content list={x.children}/>
                  </el-submenu>
                )
              : (
                  <el-menu-item index={x.path}>
                    {x.icon && <i class={`iconfont ${x.icon}`}/>}{x.name}
                  </el-menu-item>
                )
              )
            }
          </div>
        )
      }
    }
  },
  props: {
    mode: {
      type: String
    },
    routes: {
      type: Array
    }
  },
  render (h) {
    return (
      <el-menu class="tu-menu" mode={this.mode} router unique-opened background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <tu-menu-content list={this.routes}/>
      </el-menu>
    )
  }
}
</script>

<style lang="scss" scoped>
.tu-menu {
  border-right: none;
}
</style>

<style lang="scss">
.tu-menu-content {
  .iconfont {
    margin-right: 1rem;
    color: #eeeeee;
  }
}
</style>
