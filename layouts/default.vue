<template>
  <ElContainer class="home">
    <ElHeader class="home-head">
      <img src="~assets/img/logo.png"/>
      <TuHeadIcon :value="user.name" :avatar="user.avatar"/>
    </ElHeader>
    <ElContainer>
      <ElAside class="home-aside" style="width:240px;">
        <TuMenu :routes="menuList"/>
      </ElAside>
      <ElMain class="home-main">
        <nuxt class="home-main-content"/>
      </ElMain>      
    </ElContainer>
  </ElContainer>
</template>

<script>
import TuMenu from '@/components/TuMenu'
import TuHeadIcon from '@/components/TuHeadIcon'
import {mapState, mapGetters} from 'vuex'
export default {
  components: {
    TuMenu, TuHeadIcon
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['menuList'])
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100%;
  flex-direction: column;
  &-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #666666;
    img {
      width: 10rem;
    }
  }
  &-aside {
    background-color: #545c64;
  }
  &-main {
    background-color: #eeeeee;
    &-content {
      height: 100%;
    }
  }
}
</style>


