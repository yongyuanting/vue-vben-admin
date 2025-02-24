<script setup lang="ts">
import { ref } from 'vue';

import { ElMessage } from 'element-plus';

const imageFile = ref<File | null>(null);
const imageUrl = ref<string>('');
const selectedModel = ref<string>('');
const analysisResults = ref<{ action: string; confidence: number }[]>([]);

const models = ['ATFA', 'CoDATS', 'AdvSKM', 'DSAN', 'UCT'];

const fakeAnalysisResults = [
  { action: '跑步', confidence: 92.5 },
  { action: '跳跃', confidence: 85.7 },
  { action: '挥手', confidence: 78.2 },
  { action: '坐下', confidence: 88.4 },
  { action: '站立', confidence: 95.3 },
];

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0];
    imageUrl.value = URL.createObjectURL(imageFile.value);
  }
};

const analyzeImage = () => {
  if (!imageFile.value) {
    ElMessage.error('请先上传一张图片');
    return;
  }
  if (!selectedModel.value) {
    ElMessage.error('请选择一个模型');
    return;
  }

  // 模拟调用模型分析
  analysisResults.value = fakeAnalysisResults.sort(() => Math.random() - 0.5);
  ElMessage.success(`使用 ${selectedModel.value} 分析完成`);
};
</script>

<template>
  <div class="upload-container">
    <input type="file" @change="handleFileUpload" accept="image/*" />
    <el-select
      v-model="selectedModel"
      placeholder="选择模型"
      class="model-select"
    >
      <el-option
        v-for="model in models"
        :key="model"
        :label="model"
        :value="model"
      />
    </el-select>
    <el-button type="primary" @click="analyzeImage" class="analyze-btn">
      分析图片
    </el-button>
    <div v-if="imageUrl" class="image-preview">
      <img :src="imageUrl" alt="上传的图片" />
    </div>
    <el-table
      v-if="analysisResults.length > 0"
      :data="analysisResults"
      class="result-table"
      stripe
    >
      <el-table-column prop="action" label="动作类型" />
      <el-table-column prop="confidence" label="置信度(%)" />
    </el-table>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  background: #1e1e1e;
  border-radius: 8px;
}

.model-select {
  width: 200px;
  margin-top: 10px;
}

.analyze-btn {
  margin-top: 10px;
}

.image-preview img {
  max-width: 300px;
  margin-top: 15px;
  border-radius: 8px;
}

.result-table {
  width: 80%;
  margin-top: 20px;
}
</style>
