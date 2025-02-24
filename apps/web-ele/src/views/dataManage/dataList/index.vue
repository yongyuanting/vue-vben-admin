<script setup lang="ts">
import { computed, ref } from 'vue';

import { ElMessage, ElMessageBox } from 'element-plus';

interface FileData {
  fileName: string;
  fileSize: number;
  createdAt: string;
  uploadedAt: string;
  remarks: string;
}

const search = ref<string>('');
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);

const files = ref<FileData[]>([
  {
    fileName: '数据备份1.zip',
    fileSize: 350,
    createdAt: '2024-02-10',
    uploadedAt: '2024-02-11',
    remarks: '年度数据',
  },
  {
    fileName: '日志存档.log',
    fileSize: 420,
    createdAt: '2024-02-08',
    uploadedAt: '2024-02-09',
    remarks: '服务器日志',
  },
  {
    fileName: '视频素材.mp4',
    fileSize: 500,
    createdAt: '2024-02-05',
    uploadedAt: '2024-02-06',
    remarks: '宣传片',
  },
  {
    fileName: '数据库导出.sql',
    fileSize: 320,
    createdAt: '2024-02-03',
    uploadedAt: '2024-02-04',
    remarks: '数据库备份',
  },
  {
    fileName: '项目代码.zip',
    fileSize: 310,
    createdAt: '2024-02-01',
    uploadedAt: '2024-02-02',
    remarks: '代码归档',
  },
  {
    fileName: '大数据集.csv',
    fileSize: 600,
    createdAt: '2024-01-30',
    uploadedAt: '2024-01-31',
    remarks: 'AI训练数据',
  },
  {
    fileName: '系统日志.log',
    fileSize: 370,
    createdAt: '2024-01-25',
    uploadedAt: '2024-01-26',
    remarks: '系统运行日志',
  },
  {
    fileName: '应用程序.zip',
    fileSize: 490,
    createdAt: '2024-01-20',
    uploadedAt: '2024-01-21',
    remarks: '应用安装包',
  },
  {
    fileName: '数据集.json',
    fileSize: 330,
    createdAt: '2024-01-15',
    uploadedAt: '2024-01-16',
    remarks: 'JSON数据',
  },
  {
    fileName: '研究论文.pdf',
    fileSize: 360,
    createdAt: '2024-01-10',
    uploadedAt: '2024-01-11',
    remarks: '研究文献',
  },
  {
    fileName: '原始影像.tiff',
    fileSize: 450,
    createdAt: '2024-01-05',
    uploadedAt: '2024-01-06',
    remarks: '医学影像',
  },
  {
    fileName: '大规模数据.zip',
    fileSize: 550,
    createdAt: '2024-01-01',
    uploadedAt: '2024-01-02',
    remarks: '公司数据存档',
  },
  {
    fileName: '配置文件.xml',
    fileSize: 310,
    createdAt: '2023-12-28',
    uploadedAt: '2023-12-29',
    remarks: '系统配置',
  },
]);

const filteredFiles = computed(() => {
  return files.value.filter((file) => file.fileName.includes(search.value));
});

const paginatedFiles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredFiles.value.slice(start, start + pageSize.value);
});

const addFile = () => {
  ElMessage.success('上传文件功能待实现');
};

const editFile = (file: FileData) => {
  ElMessageBox.prompt(`编辑备注: ${file.fileName}`, '编辑备注', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: file.remarks,
  })
    .then(({ value }) => {
      file.remarks = value;
      ElMessage.success('文件备注已更新');
    })
    .catch(() => {
      ElMessage.info('取消编辑');
    });
};

const deleteFile = (index: number) => {
  ElMessageBox.confirm('确认删除该文件？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      files.value.splice(index, 1);
      ElMessage.success('文件已删除');
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
        placeholder="搜索文件名"
        clearable
        class="search-box"
      />
    </div>
    <el-table
      :data="paginatedFiles"
      border
      stripe
      style="width: 100%"
      class="dark-table"
    >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="fileName" label="文件名" width="200" />
      <el-table-column prop="fileSize" label="文件大小 (GB)" width="150" />
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="uploadedAt" label="上传时间" width="180" />
      <el-table-column prop="remarks" label="备注" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="editFile(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteFile(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="filteredFiles.length"
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
