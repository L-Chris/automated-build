<template>
  <ElButton type="success" icon="plus" :size="size">{{title}}</ElButton>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '新增'
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
