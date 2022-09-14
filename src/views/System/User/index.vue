<template>
  <!-- 搜索 -->
  <el-form :inline="true" :model="searchOptions">
    <el-form-item label="用户名">
      <el-input v-model="searchOptions.username" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="searchOptions.email" />
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
      <el-button type="primary">
        <el-icon class="i-ep-search"></el-icon>
        搜索
      </el-button>
      <el-button type="primary">
        <el-icon class="i-ep-refresh"></el-icon>
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <!-- 新增、导入、导出 -->
  <el-row>
    <el-button plain type="primary" size="default" icon="i-ep-plus">新增</el-button>
    <el-button color="#909399" plain icon="i-ep-upload">导入</el-button>
    <el-button color="#feb926" plain icon="i-ep-download">导出</el-button>
  </el-row>
  <!-- 表格 -->
  <el-table :data="tableData"
            style="width: 100%"
            stripe border size="large"
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
    <el-table-column label="操作" fixed="right" width="120">
      <template #default="scope">
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
            content="删除"
            placement="top">
          <el-button
              type="danger"
              icon="i-ep-delete"
              link
              @click="handleDelete(scope.$index, scope.row)">
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
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <el-pagination
      :currentPage="searchOptions.pageNo"
      :pageSize="searchOptions.pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[5, 10, 15, 20]"
      class="mt-4"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
  />
</template>

<script setup lang="ts">

import {PageListReturnType, QueryFormType} from "@/types/ums/admin";
import {pageList} from "@/api/ums/admin";
import {PaginationReturn} from "@/utils/global";

// 搜索条件
const searchOptions = reactive<QueryFormType>({
  username: '',
  email: '',
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
  const result: PaginationReturn<PageListReturnType> = await pageList(searchOptions)
  total.value = result.total
  tableData.value = result.records
}

onMounted(async () => {
  await paginationQuery()
})

const handleSizeChange = (val: number) => {
  searchOptions.pageSize = val
}
const handleCurrentChange = (val: number) => {
  searchOptions.pageNo = val
}

const handleEdit = (index: number, row: PageListReturnType) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: PageListReturnType) => {
  console.log(index, row)
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
