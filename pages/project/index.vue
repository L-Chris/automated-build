<template>
  <ElContainer class="user tu-container">
    <ElHeader class="tu-head">
      <ElInput v-model="params.userName" placeholder="项目名称"/>
      <SearchButton @click.native="handleSearch"/>
    </ElHeader>
    <ElMain class="tu-main">
      <ElTable :data="tableData.content">
        <ElTableColumn type="index" label="序号" align="center" width="100"/>
        <ElTableColumn prop="name" label="名称" align="center"/>
        <ElTableColumn prop="current" label="当前分支" align="center"/>
        <ElTableColumn prop="backup.name" label="当前备份" align="center"/>
        <ElTableColumn label="操作" align="center" width="280">
          <template slot-scope="scope">
            <EditButton size="mini" title="编辑" @click.native="handleEdit(scope.row)"/>
            <EditButton size="mini" title="构建" @click.native="handleBuild(scope.row)"/>
            <EditButton size="mini" title="还原" @click.native="handleRestore(scope.row)"/>
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
    <EditDialog :visible.sync="editDialogVisible" :formData.sync="projectInfo" @post:user="saveUser"/>
    <RestoreDialog :visible.sync="restoreDialogVisible" :formData.sync="projectInfo"/>
  </ElContainer>
</template>

<script>
import SearchButton from '~/components/button/SearchButton'
import EditButton from '~/components/button/EditButton'
import EditDialog from './children/EditDialog'
import RestoreDialog from './children/RestoreDialog'
import Project from '~/services/models/Project'
export default {
  async asyncData ({ app }) {
    let tableData = await Project.find()
    return {
      tableData
    }
  },
  components: {
    SearchButton, EditButton, EditDialog, RestoreDialog
  },
  data () {
    return {
      tableData: {},
      params: {
        userName: '',
        roleName: '',
        mobile: '',
        currentPage: 1,
        size: 10
      },
      projectInfo: {
        id: '',
        name: '',
        url: '',
        backup: {}
      },
      editDialogVisible: false,
      restoreDialogVisible: false
    }
  },
  methods: {
    selectProject (row) {
      Object.assign(this.projectInfo, row)
    },
    async handleBuild ({id}) {
      await Project.build({id})
    },
    handleRestore (row) {
      this.selectProject(row)
      this.restoreDialogVisible = true
    },
    async loadData (params = this.params) {
      this.tableData = await Project.find(params)
    },
    async saveUser () {
      const {usrId: userId, roleId} = this.projectInfo
      await Project.save({userId, roleId}).then(res => {
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
    handleSizeChange (size) {
      this.params.size = size
      this.params.currentPage = 1
      this.loadData()
    },
    handleCurrentChange (page) {
      let currentPage = page
      this.params.currentPage = currentPage
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
}
</style>
