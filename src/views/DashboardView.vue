<script setup>
import ExamPreviewModal from "@/components/ExamPreviewModal.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const exams = ref(null);
const selectedExam = ref();

onMounted(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_API_URL}/api/Exams`
    );
    exams.value = response.data;
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
});

function onSelectExam(exam) {
  selectedExam.value = exam;
  console.log(exam);
}

function handleSelectedExamClose() {
  selectedExam.value = "";
}
</script>

<template>
  <div class="dashboard" style="margin: 0 auto; max-width: 2000px">
    <div class="m-10">
      <h1 class="main-blue-font-color title-font text-3xl">
        Recommended Exams
      </h1>
      <div class="flex overflow-x-auto scrollbar-x" v-if="exams">
        <div
          v-for="exam in exams"
          :key="exam.id"
          class="card-background-color text-left mt-5 rounded-lg border border-sky-500 mr-5 mb-2 hover:cursor-pointer"
          style="min-width: 400px"
          @click="onSelectExam(exam)"
        >
          <h2
            class="main-blue-font-color title-font text-2xl pt-10 ml-5 mr-5 mb-5 line-clamp-1"
          >
            {{ exam.name }}
          </h2>
          <p class="text-white pt-2 ml-5 mr-5 mb-2">{{ exam.category_1 }}</p>
          <p class="text-white pt-2 ml-5 mr-5 mb-2">{{ exam.category_2 }}</p>
          <p class="text-white pt-2 ml-5 mr-5 mb-2">{{ exam.category_3 }}</p>
          <p class="text-white pt-2 ml-5 mr-5 mb-5">{{ exam.category_4 }}</p>
          <div
            class="bg-white p-5 rounded-bl-0 rounded-br-0 rounded-bl rounded-br flex justify-evenly border border-sky-500"
          >
            <p>Tier: {{ exam.tier }}</p>
            <p># Of Questions: {{ exam.number_of_questions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ExamPreviewModal
    v-if="selectedExam"
    :exam = "selectedExam"
    @update:removeSelectedExam="handleSelectedExamClose"
  />
</template>
