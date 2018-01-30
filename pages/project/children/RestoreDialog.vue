<template>
  <ElDialog class="restoreDialog"
    title="还原"
    :visible="visible"
    width="33%"
    @open="handleOpen"
    :before-close="handleClose">
    <ElForm ref="form" label-position="left" label-width="80px" :model="formData" :rules="rules">
      <ElFormItem label="备份" prop="id" required>
        <ElSelect v-model="formData.id">
          <ElOption v-for="v in backups.content" :key="v.id" :label="v.name" :value="v.id"/>
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <span slot="footer" class="restoreDialog-footer">
      <CancelButton @click.native="handleClose"/>
      <SaveButton @click.native="handleSave('form')"/>
    </span>
  </ElDialog>
</template>

<script>
import SaveButton from '~/components/button/SaveButton'
import CancelButton from '~/components/button/CancelButton'
import Project from '~/services/models/Project'
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
      backups: {},
      rules: {
        id: {
          required: true,
          message: '请选择备份',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    async handleOpen () {
      this.backups = await Project.findBackup({id: this.formData.projectId})
    },
    handleClose () {
      this.$emit('update:visible', false)
    },
    async handleSave (formName) {
      this.$refs[formName].validate(valid => {
        this.$emit('post:backup')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.restoreDialog {
  .el-select {
    text-align: left;
  }
}
</style>