<template>
  <!-- 搜索 -->
  <el-form :inline="true" :model="searchOptions">
    <el-form-item label="用户名">
      <el-input v-model="searchOptions.username" />
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="searchOptions.phone" />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="searchOptions.status">
        <el-option label="禁止" :value="0" />
        <el-option label="启用" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch" icon="i-ep-search">
        搜索
      </el-button>
      <el-button type="primary" @click="handleReset" icon="i-ep-refresh">
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <!-- 新增、导入、导出 -->
  <el-row>
    <el-button plain type="primary" icon="i-ep-plus">新增</el-button>
    <el-button color="#909399" plain icon="i-ep-upload">导入</el-button>
    <el-button color="#feb926" plain icon="i-ep-download">导出</el-button>
  </el-row>
  <!-- 表格 -->
  <el-table :data="tableData"
            style="width: 100%"
            stripe
            border
            :header-cell-style="{background:'#e3e3e7',color:'#515a6d'}">
    <el-table-column type="index" label="#" />
    <el-table-column label="用户名">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="真实姓名">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.realName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="昵称">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="手机号码">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="邮箱">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template #default="scope">
        <el-switch
            v-model="scope.row.status"
            class="ml-2"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="排序">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.sort }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="150">
      <template #default="scope">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="详情"
            placement="top">
          <el-button
              link
              icon="i-ep-info-filled"
              @click="handleView(scope.$index, scope.row)">
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="编辑"
            placement="top">
          <el-button
              link
              icon="i-ep-edit"
              @click="handleEdit(scope.$index, scope.row)">
          </el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="分配角色"
            placement="top">
          <el-button
              type="success"
              link
              icon="i-ep-position"
              @click="handleDelete(scope.$index, scope.row)">
          </el-button>
        </el-tooltip>
        <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
          <template #reference>
            <el-button
                type="danger"
                icon="i-ep-delete"
                link>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <el-pagination
      :currentPage="searchOptions.pageNo"
      :pageSize="searchOptions.pageSize"
      background
      small
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[5, 10, 15, 20]"
      class="mt-4"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import {PageListReturnType, QueryFormType} from "@/types/ums/admin"
import {adminDelete, adminPageList} from "@/api/ums/admin"
import {PaginationReturn} from "@/utils/global"

// 搜索条件
const searchOptions = reactive<QueryFormType>({
  username: '',
  phone: '',
  status: 1,
  pageNo: 1, // 页码
  pageSize: 10 // 每页显示条数
})

// 总条数
const total = ref<number>(0)

// 分页查询数据
const tableData = ref<PageListReturnType[]>([])

// 分页查询
const paginationQuery = async () => {
  const result: PaginationReturn<PageListReturnType> = await adminPageList(searchOptions)
  total.value = result.total
  tableData.value = result.records
}

onMounted(async () => {
  await paginationQuery()
})

// 查询
const handleSearch = async () => {
  await paginationQuery()
}

// 重置
const handleReset = async () => {
  // 查询条件重置
  searchOptions.username = ''
  searchOptions.email = ''
  searchOptions.phone = ''
  searchOptions.status = 1
  searchOptions.pageNo = 1
  searchOptions.pageSize = 10
  // 分页查询
  await paginationQuery()
}

const handleSizeChange = async (val: number) => {
  searchOptions.pageSize = val
  // 分页查询
  await paginationQuery()
}
const handleCurrentChange = async (val: number) => {
  searchOptions.pageNo = val
  // 分页查询
  await paginationQuery()
}

// 编辑
const handleEdit = (index: number, row: PageListReturnType) => {
  console.log(index, row)
}

// 详情
const handleView = (index: number, row: PageListReturnType) => {
  console.log(index, row)
}

// 删除
const handleDelete = async (index: number, row: PageListReturnType) => {
  await adminDelete(row.id)
  // 分页查询
  await paginationQuery()
}

</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

</style>
