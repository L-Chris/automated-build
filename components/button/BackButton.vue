<template>
  <ElButton icon="back" :size="size">{{title}}</ElButton>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '返回'
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
