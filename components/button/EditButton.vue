<template>
  <ElButton type="primary" icon="edit" :size="size">{{title}}</ElButton>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '编辑'
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

