<script setup lang="ts">
import { computed, ref } from 'vue';

import { ElMessage } from 'element-plus';

const analysisResults = ref([
  {
    id: 1,
    model: '深度神经网络',
    dataset: '用户行为数据',
    accuracy: '95%',
    recall: '90%',
    f1score: '92%',
  },
  {
    id: 2,
    model: '随机森林',
    dataset: '电商交易数据',
    accuracy: '92%',
    recall: '85%',
    f1score: '88%',
  },
  {
    id: 3,
    model: '支持向量机',
    dataset: '图像识别数据',
    accuracy: '98%',
    recall: '95%',
    f1score: '96%',
  },
  {
    id: 4,
    model: '贝叶斯分类器',
    dataset: '文本情感分析数据',
    accuracy: '91%',
    recall: '86%',
    f1score: '88%',
  },
  {
    id: 5,
    model: 'K-Means 聚类',
    dataset: '社交媒体数据',
    accuracy: '94%',
    recall: '89%',
    f1score: '91%',
  },
  {
    id: 6,
    model: '梯度提升树',
    dataset: '金融市场数据',
    accuracy: '96%',
    recall: '92%',
    f1score: '94%',
  },
  {
    id: 7,
    model: '卷积神经网络',
    dataset: '医疗影像数据',
    accuracy: '93%',
    recall: '87%',
    f1score: '89%',
  },
  {
    id: 8,
    model: '长短时记忆网络',
    dataset: '天气预测数据',
    accuracy: '97%',
    recall: '94%',
    f1score: '95%',
  },
  {
    id: 9,
    model: 'Transformer',
    dataset: '自然语言处理数据',
    accuracy: '90%',
    recall: '84%',
    f1score: '87%',
  },
  {
    id: 10,
    model: '强化学习',
    dataset: '机器人控制数据',
    accuracy: '89%',
    recall: '83%',
    f1score: '85%',
  },
]);

const currentPage = ref(1);
const pageSize = ref(5);
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return analysisResults.value.slice(start, start + pageSize.value);
});

const viewDetails = (row: any) => {
  ElMessage.info(`查看 ${row.model} 在 ${row.dataset} 上的分析结果`);
};
</script>

<template>
  <div class="analysis-container">
    <el-table :data="paginatedResults" style="width: 100%" class="dark-table">
      <el-table-column prop="id" label="序号" width="80" />
      <el-table-column prop="model" label="分析模型" />
      <el-table-column prop="dataset" label="数据集" />
      <el-table-column prop="accuracy" label="准确率" />
      <el-table-column prop="recall" label="召回率" />
      <el-table-column prop="f1score" label="F1 分数" />
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
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="analysisResults.length"
      layout="prev, pager, next"
      class="pagination"
    />
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
