<script setup lang="ts">
import { ref } from 'vue';

import { ElMessage } from 'element-plus';

const modelName = ref('');
const modelDescription = ref('');

const handleSuccess = (response: any) => {
  ElMessage.success('文件上传成功');
};

const submitUpload = () => {
  if (!modelName.value) {
    ElMessage.error('请输入模型名称');
    return;
  }
  ElMessage.success('模型上传成功');
};
</script>

<template>
  <div class="upload-container">
    <el-card class="upload-card">
      <h2>上传分析模型</h2>
      <el-form label-width="120px">
        <el-form-item label="模型名称">
          <el-input v-model="modelName" placeholder="请输入模型名称" />
        </el-form-item>
        <el-form-item label="模型描述">
          <el-input
            v-model="modelDescription"
            type="textarea"
            placeholder="请输入模型描述"
          />
        </el-form-item>
        <el-form-item label="上传文件">
          <el-upload
            class="upload-demo"
            drag
            action="/api/upload"
            multiple
            :on-success="handleSuccess"
          >
            <div class="el-upload__text">拖拽文件或 <em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpload">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #1e1e1e;
}

.upload-card {
  width: 500px;
  padding: 20px;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(255 255 255 / 10%);
}

.upload-demo {
  color: #fff;

  /* background: #333; */

  /* border: 1px dashed #aaa; */
}

h2 {
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
}
</style>
