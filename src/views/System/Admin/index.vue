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
        <el-option label="禁用" :value="0" />
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
    <el-button @click="handleAdd" icon="i-ep-plus" type="primary">添加</el-button>
    <el-button color="#909399" plain icon="i-ep-upload">导入</el-button>
    <el-button color="#feb926" plain icon="i-ep-download" @click="handleExport">导出</el-button>
  </el-row>
  <!-- 表格 -->
  <el-table :data="tableData"
            style="width: 100%"
            stripe
            border
            table-layout="fixed"
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
        <el-tooltip :content="scope.row.status ? '启用' : '禁用'" placement="top">
          <el-switch
              v-model="scope.row.status"
              class="ml-2"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949">
          </el-switch>
        </el-tooltip>
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
        <el-popconfirm :title="`确定删除${scope.row.username}吗？`" @confirm="handleDelete(scope.$index, scope.row)"
                       width="160">
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
      @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="tsx">
import {PageListReturnType, QueryFormType} from "@/types/ums/admin"
import {adminDeleteApi, adminEditApi, adminPageListApi} from "@/api/ums/admin"
import {PAGE_NO, PAGE_SIZE, PaginationReturn, ResponseData} from "@/utils/global"
import dialogService from '@caroundsky/el-plus-dialog-service'
import {DialogConfig} from '@caroundsky/el-plus-dialog-service/src/props'
import AdminView from '@/components/System/Admin/View/index.vue'
import AdminAdd from '@/components/System/Admin/Add/index.vue'
import AdminEdit from '@/components/System/Admin/Edit/index.vue'
import go from 'await-handler-ts'


// 搜索条件
const searchOptions = reactive<QueryFormType>({
  username: '',
  phone: '',
  status: null,
  pageNo: PAGE_NO, // 页码
  pageSize: PAGE_SIZE // 每页显示条数
})

// 总条数
const total = ref<number>(0)

// 分页查询数据
const tableData = ref<PageListReturnType[]>([])

// 分页查询
const paginationQuery = async () => {
  const result: ResponseData<PaginationReturn<PageListReturnType>> = await adminPageListApi(searchOptions)
  total.value = result.data?.total
  tableData.value = result.data?.records
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
  searchOptions.status = null
  searchOptions.pageNo = PAGE_NO
  searchOptions.pageSize = PAGE_SIZE
  // 分页查询
  await paginationQuery()
}

const handleSizeChange = async (val: number) => {
  searchOptions.pageSize = val
  // 分页查询
  await paginationQuery()
}
const handleCurrentChange: (val: number) => void = async (val) => {
  searchOptions.pageNo = val
  // 分页查询
  await paginationQuery()
}

// 编辑
const handleEdit = (index: number, row: PageListReturnType) => {
  dialogService({
    title: '用户编辑',
    height: '60vh',
    width: '50vw',
    content: <AdminEdit id={row.id} />,
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: async ({vm, ctx, component}: DialogConfig) => {
          try {
            const result: ResponseData<null> = await component.submitForm()
            if (result) {
              ElMessage.success(result.msg)
              // 分页查询
              await paginationQuery()
              vm.hide()
            }
          } catch (e) {
            console.log(e)
          }
        },
      }
    ],
  })
}

// 详情
const handleView = (index: number, row: PageListReturnType) => {
  dialogService({
    title: '用户详情',
    height: '60vh',
    width: '50vw',
    content: <AdminView id={row.id} />,
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: ({vm}: DialogConfig) => {
          vm.hide()
        },
      },
    ],
  })
}

// 删除
const handleDelete = async (index: number, row: PageListReturnType) => {
  const result: ResponseData<null> = await adminDeleteApi(row.id)
  ElMessage.success(result.msg)
  // 分页查询
  await paginationQuery()
}

// 导出
const handleExport = () => {
  dialogService({
    title: '导出',
    height: '50vh',
    width: '50vw',
    content: '暂未实现~',
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: ({vm}: DialogConfig) => {
          vm.hide()
        },
      },
    ],
  })
}

// 新增
const handleAdd = () => {
  dialogService({
    title: '添加用户',
    height: '60vh',
    width: '50vw',
    content: <AdminAdd />,
    buttons: [
      {
        label: '确定 ',
        type: 'primary',
        onClick: async ({vm, ctx, component}: DialogConfig) => {
          const result = await component.submitForm()
          if (result) {
            // 分页查询
            await paginationQuery()
            vm.hide()
          }
        }
      },
      {
        label: '重置',
        type: 'primary',
        onClick: ({vm, ctx, component}: DialogConfig) => {
          component.resetForm()
        }
      },
    ]
  })
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
