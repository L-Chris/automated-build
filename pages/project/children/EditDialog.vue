<template>
  <ElDialog class="editDialog"
    title="编辑用户"
    :visible="visible"
    width="33%"
    @open="handleOpen"
    :before-close="handleClose">
    <ElForm ref="form" label-position="left" label-width="80px" :model="formData" :rules="rules">
      <ElFormItem label="名称">
        <ElInput v-model="formData.usrName"/>
      </ElFormItem>
      <ElFormItem label="手机">
        <ElInput v-model="formData.usrName"/>
      </ElFormItem>
      <ElFormItem label="邮箱">
        <ElInput v-model="formData.usrName"/>
      </ElFormItem>
      <ElFormItem label="角色" required>
        <ElSelect v-model="formData.roleId">
          <ElOption v-for="v in roleList" :key="v.roleId" :label="v.roleName" :value="v.roleId"/>
        </ElSelect>
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
import Role from '~/services/models/Role'
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
      roleList: [],
      rules: {
        ruleId: {
          required: true,
          message: '请选择用户角色',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    async handleOpen () {
      let {data} = await Role.find()
      this.roleList = data
    },
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