<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const nonChangedExamResults = ref();
const examResults = ref();
const selectedResultIndex = ref();
const selectedTimeSortOption = ref("oldest");
const selectedTierFilterOption = ref("all");

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_API_URL}/api/ExamResults/${
        decodedToken.UserId
      }`,
      config
    ); // placeholder until we have user id
    examResults.value = response.data;
    nonChangedExamResults.value = response.data;
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
});

watch(selectedTimeSortOption, (newValue) => {
  if (newValue === "oldest") {
    examResults.value = examResults.value.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  } else if (newValue === "newest") {
    examResults.value = examResults.value.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }
});

watch(selectedTierFilterOption, (newValue) => {
  if (newValue === "all") {
    examResults.value = nonChangedExamResults.value;
  } else if (newValue === "one") {
    // This is so that examResults is back to normal before filtering again
    examResults.value = nonChangedExamResults.value;
    examResults.value = examResults.value.filter((result) => result.tier === 1);
  } else if (newValue === "two") {
    examResults.value = nonChangedExamResults.value;
    examResults.value = examResults.value.filter((result) => result.tier === 2);
  }
});

function getAverageScoreOfExams() {
  let sum = 0;
  for (let result of examResults.value) {
    sum += result.score;
  }
  if (sum == 0) {
    return 0;
  }
  return (sum / examResults.value.length).toFixed(2);
}

function formatDate(dateString) {
  const dtObj = new Date(dateString);

  // Basic formatting:
  const formattedStr = dtObj.toLocaleString();

  return formattedStr;
}
</script>

<template>
  <div
    class="profile flex justify-center mt-10"
    style="margin: 50px auto; max-width: 2000px"
  >
    <div
      class="card-background-color w-10/12 rounded-lg border border-sky-500"
      v-if="examResults"
    >
      <div
        class="top-bar flex flex-wrap justify-evenly p-5 rounded-lg items-center"
      >
        <h1 class="main-blue-font-color title-font text-2xl mx-10">
          Exams Taken: {{ examResults.length }}
        </h1>
        <h1 class="main-blue-font-color title-font text-2xl mx-10">
          Average Score: {{ getAverageScoreOfExams() }}
        </h1>
        <select
          v-model="selectedTimeSortOption"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="oldest">Oldest To Newest</option>
          <option value="newest">Newest To Oldest</option>
        </select>
        <select
          v-model="selectedTierFilterOption"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="one">Tier 1</option>
          <option value="two">Tier 2</option>
        </select>
      </div>

      <hr class="border border-sky-500" />

      <div class="exam-board-container">
        <div v-if="examResults.length > 0" class="exam-board grid grid-cols-4">
          <div
            class="exam-board-exams border-r-4 border-sky-500 h-[400px] overflow-y-auto scrollbar"
          >
            <div
              class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-800"
              v-for="(examResult, index) in examResults"
              :key="examResult.id"
              @click="selectedResultIndex = index"
            >
              <p class="paragraph-font ml-5 mr-5 mb-1 text-white">
                {{ examResult.name }}
              </p>
              <p class="paragraph-font ml-5 mr-5 mb-1 text-white">Score: {{ examResult.score }}</p>
              <p class="paragraph-font ml-5 mr-5 mb-1 text-white">{{ formatDate(examResult.created_at) }}</p>
            </div>
          </div>
          <div
            class="exam-board-results col-span-3"
            v-if="selectedResultIndex >= 0"
          >
            <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">
              {{ examResults[selectedResultIndex].category_1 }}:
              {{ examResults[selectedResultIndex].category_1_score }}
            </h1>
            <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">
              {{ examResults[selectedResultIndex].category_2 }}:
              {{ examResults[selectedResultIndex].category_2_score }}
            </h1>
            <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">
              {{ examResults[selectedResultIndex].category_3 }}:
              {{ examResults[selectedResultIndex].category_3_score }}
            </h1>
            <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">
              {{ examResults[selectedResultIndex].category_4 }}:
              {{ examResults[selectedResultIndex].category_4_score }}
            </h1>
          </div>
          <div v-else class="col-span-3">
            <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">
              Click on an exam to see the results.
            </h1>
          </div>
        </div>
        <div v-else>
          <h1
            class="main-blue-font-color title-font text-3xl mx-10 my-10 text-center"
          >
            You have not taken any exams yet. Go to the dashboard to take your
            first exam.
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
