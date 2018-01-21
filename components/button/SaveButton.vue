<template>
  <ElButton type="primary" :size="size">{{title}}</ElButton>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '保存'
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

