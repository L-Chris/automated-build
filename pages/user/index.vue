<template>
  <ElContainer class="project tu-container">
    <ElHeader class="tu-head">
      <ElInput v-model="params.name" placeholder="用户名称"/>
      <SearchButton @click.native="handleSearch"/>
      <AddButton @click.native="handleAdd"/>
    </ElHeader>
    <ElMain class="tu-main">
      <ElTable :data="tableData.content">
        <ElTableColumn type="index" label="序号" align="center" width="100"/>
        <ElTableColumn prop="avatar" label="头像" align="center"/>
        <ElTableColumn prop="name" label="名称" align="center"/>
        <ElTableColumn label="操作" align="center" width="280">
          <template slot-scope="scope">
            <EditButton size="mini" title="编辑" @click.native="handleEdit(scope.row)"/>
            <DeleteButton size="mini" @click.native="handleDelete(scope.row)"/>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElMain>
    <ElFooter class="tu-foot">
      <ElPagination
        :total="tableData.totalElements"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="params.size"
        :page-sizes="[10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </ElFooter>
    <SettingDialog :visible.sync="editDialogVisible" :formData.sync="userInfo" @post:user="saveUser"/>
  </ElContainer>
</template>

<script>
import SearchButton from '~/components/button/SearchButton'
import AddButton from '~/components/button/AddButton'
import EditButton from '~/components/button/EditButton'
import DeleteButton from '~/components/button/DeleteButton'
import SettingDialog from './children/SettingDialog'
import User from '~/services/models/User'
export default {
  async asyncData ({ app }) {
    let tableData = await User.find()
    return {
      tableData
    }
  },
  components: {
    SearchButton, AddButton, EditButton, DeleteButton, SettingDialog
  },
  data () {
    return {
      tableData: {},
      params: {
        name: '',
        page: 1,
        size: 10
      },
      userInfo: {
        id: '',
        name: '',
        avatar: ''
      },
      backupInfo: {
        id: '',
        projectId: ''
      },
      editDialogVisible: false
    }
  },
  methods: {
    selectProject (row) {
      Object.assign(this.userInfo, row)
    },
    async loadData (params = this.params) {
      this.tableData = await User.find(params)
    },
    async saveUser () {
      await User.save(this.userInfo).then(res => {
        this.loadData()
        this.editDialogVisible = false
        this.$message.success('保存成功')
      }).catch(err => {
        this.$message.error('保存失败')
        console.log(err)
      })
    },
    handleSearch () {
      this.loadData(this.params)
    },
    handleEdit (row) {
      this.selectProject(row)
      this.editDialogVisible = true
    },
    handleAdd () {
      let row = {
        id: '',
        name: '',
        url: '',
        backup: {}
      }
      this.handleEdit(row)
    },
    handleDelete ({id}) {
      User.delete({id})
    },
    handleSizeChange (size) {
      this.params.size = size
      this.params.page = 1
      this.loadData()
    },
    handleCurrentChange (page) {
      this.params.page = page
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
}
</style>
