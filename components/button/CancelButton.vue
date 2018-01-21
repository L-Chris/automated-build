<template>
  <ElButton :size="size">{{title}}</ElButton>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '取消'
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

