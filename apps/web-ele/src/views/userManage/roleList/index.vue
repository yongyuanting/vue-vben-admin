<script setup lang="ts">
import { computed, ref } from 'vue';

import { ElMessage, ElMessageBox } from 'element-plus';

interface Role {
  roleName: string;
  description: string;
  permissions: string;
  createdAt: string;
  remark?: string;
}

const search = ref<string>('');
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);

const roles = ref<Role[]>([
  {
    roleName: '管理员',
    description: '拥有所有权限',
    permissions: '高级',
    createdAt: '2024-02-24',
    remark: '所有权限',
  },
  {
    roleName: '编辑',
    description: '可以编辑内容',
    permissions: '中级',
    createdAt: '2024-02-23',
  },
  {
    roleName: '审核员',
    description: '负责审核内容',
    permissions: '中级',
    createdAt: '2024-02-22',
  },
  {
    roleName: '用户',
    description: '普通用户权限',
    permissions: '基础',
    createdAt: '2024-02-21',
  },
  {
    roleName: '访客',
    description: '仅可查看公开内容',
    permissions: '最低',
    createdAt: '2024-02-20',
  },
]);

const filteredRoles = computed(() => {
  return roles.value.filter((role) => role.roleName.includes(search.value));
});

const paginatedRoles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredRoles.value.slice(start, start + pageSize.value);
});

const addRole = () => {
  ElMessage.success('新增角色功能待实现');
};

const editRole = (role: Role) => {
  ElMessageBox.prompt(`编辑角色: ${role.roleName}`, '编辑角色', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: role.description,
  })
    .then(({ value }) => {
      role.description = value;
      ElMessage.success('角色信息已更新');
    })
    .catch(() => {
      ElMessage.info('取消编辑');
    });
};

const deleteRole = (index: number) => {
  ElMessageBox.confirm('确认删除该角色？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      roles.value.splice(index, 1);
      ElMessage.success('角色已删除');
    })
    .catch(() => {
      ElMessage.info('取消删除');
    });
};
</script>

<template>
  <div class="table-container">
    <div class="table-header">
      <el-input
        v-model="search"
        placeholder="搜索角色名称"
        clearable
        class="search-box"
      />
      <el-button type="primary" @click="addRole">新增角色</el-button>
    </div>
    <el-table
      :data="paginatedRoles"
      border
      stripe
      style="width: 100%"
      class="dark-table"
    >
      <el-table-column type="index" label="序列" width="60" />
      <el-table-column prop="roleName" label="角色名称" width="150" />
      <el-table-column prop="description" label="角色描述" width="250" />
      <el-table-column prop="permissions" label="权限级别" width="150" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="editRole(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteRole(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="filteredRoles.length"
      layout="prev, pager, next"
      class="pagination-bar"
    />
  </div>
</template>

<style scoped>
.table-container {
  padding: 20px;
  color: #fff;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(255 255 255 / 10%);
}

.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.search-box {
  width: 250px;
  color: #fff;
  background: #333;
}

.el-input__inner {
  color: #fff;
  background: #333;
}

.dark-table :deep(.el-table),
.dark-table :deep(th),
.dark-table :deep(td) {
  color: #fff;
  background: #2b2b2b;
}

.pagination-bar {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>
