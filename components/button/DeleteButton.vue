<template>
  <ElButton :size="size" type="danger" icon="delete">{{title}}</ElButton>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '删除'
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

