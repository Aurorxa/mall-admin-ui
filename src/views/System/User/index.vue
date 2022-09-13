<template>
  <!-- 搜索 -->
  <el-row :gutter="10">
    <el-col :span="4">
      <el-form-item label="用户名">
        <el-input />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="邮箱">
        <el-input />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="手机号码">
        <el-input />
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="状态">
        <el-select>
          <el-option label="禁止" value="0" />
          <el-option label="启用" value="1" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="1">
      <el-button type="primary">
        <el-icon class="i-ep-search"></el-icon>
        搜索
      </el-button>
    </el-col>
    <el-col :span="1" style="margin-left: 15px">
      <el-button type="primary">
        <el-icon class="i-ep-refresh"></el-icon>
        重置
      </el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-button plain type="primary" size="default" icon="i-ep-plus">新增</el-button>
    <el-button plain type="success" size="default" icon="i-ep-edit">修改</el-button>
    <el-button plain type="danger" size="default" icon="i-ep-delete">删除</el-button>
    <el-button color="#909399" plain icon="i-ep-upload">导入</el-button>
    <el-button color="#feb926" plain icon="i-ep-download">导出</el-button>
  </el-row>
  <!-- 表格 -->
  <el-table :data="tableData" style="width: 100%" :table-layout="auto">
    <el-table-column label="Date">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Name">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <el-pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="500"
      :page-sizes="[5, 10, 15, 20]"
      class="mt-4"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
  />
</template>

<script setup lang="ts">
// 页码
const currentPage = ref<number>(1)
// 每页显示条数
const pageSize = ref<number>(10)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
