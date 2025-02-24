<script setup lang="ts">
import { ref } from 'vue';

import { ElMessage, ElMessageBox } from 'element-plus';

interface FileData {
  fileName: string;
  fileSize: number;
  progress: number;
}

const files = ref<FileData[]>([]);

const handleFileChange = (file: any) => {
  const newFile: FileData = {
    fileName: file.name,
    fileSize: Number.parseFloat((file.size / (1024 * 1024 * 1024)).toFixed(2)),
    progress: 0,
  };
  files.value.push(newFile);
  simulateUpload(newFile);
};

const simulateUpload = (file: FileData) => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    file.progress = progress;
    if (progress >= 100) {
      clearInterval(interval);
      ElMessage.success(`${file.fileName} 上传成功`);
    }
  }, 300);
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

const customProgressColor = (progress: number) => {
  return progress < 100 ? '#409eff' : '#67c23a';
};
</script>

<template>
  <div class="upload-container">
    <div class="upload-header">
      <el-upload
        class="upload-box"
        drag
        action="#"
        :auto-upload="false"
        :on-change="handleFileChange"
        multiple
      >
        <el-icon />
        <div class="el-upload__text">
          将文件拖拽到此处，或 <em>点击上传</em>
        </div>
      </el-upload>
    </div>

    <div class="file-list" v-if="files.length > 0">
      <div class="file-item" v-for="(file, index) in files" :key="index">
        <div class="file-info">
          <span class="file-name">{{ file.fileName }}</span>
          <span class="file-size">{{ file.fileSize }} GB</span>
        </div>
        <el-progress
          :percentage="file.progress"
          :color="customProgressColor(file.progress)"
        />
        <div class="file-actions">
          <el-button size="small" type="danger" @click="deleteFile(index)">
            删除
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  padding: 20px;
  color: #fff;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(255 255 255 / 10%);
}

.upload-header {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.upload-box {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  color: #fff;
  text-align: center;
  background: #333;
  border: 2px dashed #fff;
  border-radius: 8px;
}

.file-list {
  margin-top: 20px;
}

.file-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  background: #2b2b2b;
  border-radius: 6px;
}

.file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.file-name {
  font-weight: bold;
}

.file-size {
  font-size: 0.9em;
  color: #aaa;
}

.file-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
</style>
