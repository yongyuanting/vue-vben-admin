<script setup lang="ts">
import { ref } from 'vue';

import { ElMessage } from 'element-plus';

const models = ref([
  '深度神经网络 (DNN)',
  '随机森林 (Random Forest)',
  '支持向量机 (SVM)',
  '梯度提升树 (GBT)',
  '卷积神经网络 (CNN)',
]);

const datasets = ref([
  '用户行为数据集',
  '电商交易数据集',
  '社交媒体情感分析数据集',
  '金融市场预测数据集',
  '医疗影像分析数据集',
]);

const selectedModel = ref('');
const selectedData = ref('');
const analysisResults = ref([
  {
    id: 1,
    model: '深度神经网络 (DNN)',
    dataset: '用户行为数据集',
    result: '分析完成，预测准确率 92.5%',
  },
  {
    id: 2,
    model: '随机森林 (Random Forest)',
    dataset: '电商交易数据集',
    result: '分析完成，召回率达到 88.3%',
  },
  {
    id: 3,
    model: '支持向量机 (SVM)',
    dataset: '社交媒体情感分析数据集',
    result: '分析完成，F1 分数为 90.2%',
  },
  {
    id: 4,
    model: '梯度提升树 (GBT)',
    dataset: '金融市场预测数据集',
    result: '分析完成，结果稳定，误差在 3.1% 以内',
  },
  {
    id: 5,
    model: '卷积神经网络 (CNN)',
    dataset: '医疗影像分析数据集',
    result: '分析完成，AUC 值 0.94',
  },
]);

const analyze = () => {
  if (!selectedModel.value || !selectedData.value) {
    ElMessage.warning('请选择分析模型和数据集');
    return;
  }

  const resultsPool = [
    '分析完成，预测准确率 92.5%',
    '分析完成，召回率达到 88.3%',
    '分析完成，F1 分数为 90.2%',
    '分析完成，结果稳定，误差在 3.1% 以内',
    '分析完成，AUC 值 0.94',
  ];

  const newResult = {
    id: analysisResults.value.length + 1,
    model: selectedModel.value,
    dataset: selectedData.value,
    result: resultsPool[Math.floor(Math.random() * resultsPool.length)],
  };

  analysisResults.value.push(newResult);
  ElMessage.success('分析完成');
};

const viewDetails = (row: any) => {
  ElMessage.info(
    `查看 ${row.model} 在 ${row.dataset} 上的分析结果：${row.result}`,
  );
};
</script>

<template>
  <div class="analysis-container">
    <div class="control-panel">
      <el-select v-model="selectedModel" placeholder="选择分析模型">
        <el-option
          v-for="model in models"
          :key="model"
          :label="model"
          :value="model"
        />
      </el-select>
      <el-select v-model="selectedData" placeholder="选择数据集">
        <el-option
          v-for="data in datasets"
          :key="data"
          :label="data"
          :value="data"
        />
      </el-select>
      <el-button type="primary" @click="analyze">开始分析</el-button>
    </div>

    <el-table :data="analysisResults" style="width: 100%" class="dark-table">
      <el-table-column prop="id" label="序号" width="80" />
      <el-table-column prop="model" label="分析模型" />
      <el-table-column prop="dataset" label="数据集" />
      <el-table-column prop="result" label="分析结果" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="viewDetails(scope.row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.analysis-container {
  padding: 20px;
  color: #fff;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(255 255 255 / 10%);
}

.control-panel {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.dark-table :deep(.el-table) {
  color: #fff;
  background: #2b2b2b;
}

.dark-table :deep(.el-table th) {
  color: #fff;
  background: #333;
}

.dark-table :deep(.el-table td) {
  color: #fff;
}
</style>
