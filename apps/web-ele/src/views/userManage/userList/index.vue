<script setup lang="ts">
import { computed, ref } from 'vue';

import { ElMessage, ElMessageBox } from 'element-plus';

import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/pagination/style/css';

interface User {
  username: string;
  account: string;
  address: string;
  createdAt: string;
  remark?: string;
}

const search = ref<string>('');
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);

const users = ref<User[]>([
  {
    username: '刘强东',
    account: 'jd001',
    address: '北京市',
    createdAt: '2024-02-24',
  },
  {
    username: '马化腾',
    account: 'tencent002',
    address: '深圳市',
    createdAt: '2024-02-23',
  },
  {
    username: '马云',
    account: 'alibaba003',
    address: '杭州市',
    createdAt: '2024-02-22',
    remark: '这是一个备注',
  },
  {
    username: '雷军',
    account: 'xiaomi004',
    address: '北京市',
    createdAt: '2024-02-21',
  },
  {
    username: '丁磊',
    account: 'netease005',
    address: '广州市',
    createdAt: '2024-02-20',
  },
  {
    username: '张朝阳',
    account: 'sohu006',
    address: '北京市',
    createdAt: '2024-02-19',
  },
  {
    username: '李彦宏',
    account: 'baidu007',
    address: '北京市',
    createdAt: '2024-02-18',
  },
  {
    username: '王兴',
    account: 'meituan008',
    address: '北京市',
    createdAt: '2024-02-17',
  },
  {
    username: '黄峥',
    account: 'pinduoduo009',
    address: '上海市',
    createdAt: '2024-02-16',
  },
  {
    username: '陈欧',
    account: 'jumei010',
    address: '北京市',
    createdAt: '2024-02-15',
  },
  {
    username: '王健林',
    account: 'wanda011',
    address: '大连市',
    createdAt: '2024-02-14',
  },
  {
    username: '许家印',
    account: 'evergrande012',
    address: '广州市',
    createdAt: '2024-02-13',
  },
  {
    username: '杨元庆',
    account: 'lenovo013',
    address: '北京市',
    createdAt: '2024-02-12',
  },
  {
    username: '周鸿祎',
    account: '360014',
    address: '北京市',
    createdAt: '2024-02-11',
  },
  {
    username: '张一鸣',
    account: 'bytedance015',
    address: '北京市',
    createdAt: '2024-02-10',
  },
  {
    username: '沈南鹏',
    account: 'sequoia016',
    address: '上海市',
    createdAt: '2024-02-09',
  },
  {
    username: '曹国伟',
    account: 'sina017',
    address: '北京市',
    createdAt: '2024-02-08',
  },
]);

const filteredUsers = computed<User[]>(() => {
  return users.value.filter((user) => user.username.includes(search.value));
});

const paginatedUsers = computed<User[]>(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredUsers.value.slice(start, start + pageSize.value);
});

const addUser = () => {
  users.value.push({
    username: '新用户',
    account: 'newuser',
    address: '未知',
    createdAt: new Date().toISOString().split('T')[0],
  });
  ElMessage.success('新增用户成功');
};

const editUser = (user: User) => {
  ElMessageBox.prompt('修改用户名', '编辑', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: user.username,
  }).then(({ value }) => {
    user.username = value;
    ElMessage.success('编辑成功');
  });
};

const deleteUser = (index: number) => {
  ElMessageBox.confirm('确定删除该用户吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    users.value.splice(index, 1);
    ElMessage.success('删除成功');
  });
};
</script>

<template>
  <div class="table-container">
    <div class="table-header">
      <el-input
        v-model="search"
        placeholder="搜索用户名"
        clearable
        class="search-box"
      />
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>
    <el-table :data="paginatedUsers" border stripe style="width: 100%">
      <el-table-column type="index" label="序列" width="60" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="account" label="用户账号" width="150" />
      <el-table-column prop="address" label="用户地址" width="200" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteUser(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="filteredUsers.length"
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
