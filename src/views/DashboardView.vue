<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const exams = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5053/api/Exams");
    exams.value = response.data;
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
});
</script>

<template>
  <div class="dashboard">
    <div class="m-10">
      <h1 class="main-blue-font-color title-font text-3xl">
        Recommended Tests
      </h1>
      <div class="flex flex-wrap justify-between" v-if="exams">
        <router-link v-for="exam in exams" :key="exam.id" :to="{ path: `/exam/${exam.id}` }">
          <div
            class="card-background-color w-96 text-center p-10 mt-5 rounded-lg border border-sky-500"
          >
            <p class="text-white text-2xl">{{ exam.name }}</p>
            <p class="text-white text-2xl">Tier: {{ exam.tier }}</p>
            <p class="text-white text-2xl">
              Number of questions: {{ exam.number_of_questions }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <p v-if="examData">{{ examData[0].name }}</p> -->
  </div>
</template>
