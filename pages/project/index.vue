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
        <ElTableColumn label="操作" align="center" width="280">
          <template slot-scope="scope">
            <EditButton size="mini" @click.native="handleEdit(scope.row)"/>
            <EditButton size="mini" title="构建" @click.native="handleBuild(scope.row)"/>
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
  </ElContainer>
</template>

<script>
import SearchButton from '~/components/button/SearchButton'
import EditButton from '~/components/button/EditButton'
import EditDialog from './children/EditDialog'
import User from '~/services/models/User'
import axios from '~/services'
export default {
  components: {
    SearchButton, EditButton, EditDialog
  },
  async asyncData ({ params }) {
    let tableData = await axios.get(`/project/list`)
    return {
      tableData
    }
  },
  data () {
    return {
      params: {
        userName: '',
        roleName: '',
        mobile: '',
        currentPage: 1,
        size: 10
      },
      projectInfo: {
        usrId: '',
        usrName: '',
        roleId: '',
        roleName: ''
      },
      editDialogVisible: false
    }
  },
  methods: {
    handleBuild ({id}) {
      axios.get('/project/build', {
        params: {
          id
        }
      })
    },
    async loadData (params = this.params) {
      this.tableData = await User.find(params)
    },
    async saveUser () {
      const {usrId: userId, roleId} = this.projectInfo
      await User.save({userId, roleId}).then(res => {
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
      this.editDialogVisible = true
      let {usrId, usrName, roleId, roleName} = row
      Object.assign(this.projectInfo, {usrId, usrName, roleId, roleName})
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
