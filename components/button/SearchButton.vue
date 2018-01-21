<template>
  <ElButton type="primary" icon="search" :size="size">{{title}}</ElButton>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '查询'
    },
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
