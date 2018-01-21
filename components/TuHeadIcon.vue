<template>
  <ElDropdown class="tu-headicon" trigger="click">
    <div class="tu-headicon-desc">
      <img :src="avatar" v-if="avatar"/>
      <i class="iconfont icon-user_fill" v-else/>
      {{value}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <ElDropdownMenu slot="dropdown">
      <ElDropdownItem @click.native="handleLogout">注销</ElDropdownItem>
    </ElDropdownMenu>
  </ElDropdown>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: {
    value: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout () {
      await this.logout()
      this.linkTo('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.tu-headicon {
  &-desc {
    display: flex;
    align-items: center;
    color: #ffffff;
    .icon-user_fill {
      font-size: 3rem;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }
}
</style>

