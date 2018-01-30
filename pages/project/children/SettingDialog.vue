<template>
  <ElDialog class="editDialog"
    title="编辑项目"
    :visible="visible"
    width="33%"
    :before-close="handleClose">
    <ElForm ref="form" label-position="left" label-width="80px" :model="formData" :rules="rules">
      <ElFormItem label="名称">
        <ElInput v-model="formData.name"/>
      </ElFormItem>
      <ElFormItem label="来源">
        <ElInput v-model="formData.url"/>
      </ElFormItem>
    </ElForm>
    <span slot="footer" class="editDialog-footer">
      <CancelButton @click.native="handleClose"/>
      <SaveButton @click.native="handleSave('form')"/>
    </span>
  </ElDialog>
</template>

<script>
import SaveButton from '~/components/button/SaveButton'
import CancelButton from '~/components/button/CancelButton'
export default {
  components: {
    SaveButton,
    CancelButton
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rules: {
        name: {
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        },
        url: {
          required: true,
          message: '请输入项目来源',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    },
    async handleSave (formName) {
      this.$refs[formName].validate(valid => {
        this.$emit('post:user')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editDialog {
  .el-select {
    text-align: left;
  }
}
</style>