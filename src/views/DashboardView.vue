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
  <div class="dashboard" style="margin: 0 auto; max-width: 2000px;">
    <div class="m-10">
      <h1 class="main-blue-font-color title-font text-3xl">
        Recommended Tests
      </h1>
      <div class="flex flex-wrap justify-between" v-if="exams">
        <router-link v-for="exam in exams" :key="exam.id" :to="{ path: `/exam/${exam.id}` }">
          <div
            class="card-background-color w-96 text-left mt-5 rounded-lg border border-sky-500"
          >
            <h2 class="main-blue-font-color title-font text-2xl pt-10 ml-5 mr-5 mb-5">{{ exam.name }}</h2>
            <p class="text-white pt-2 ml-5 mr-5 mb-2">{{ exam.category_1 }}</p>
            <p class="text-white pt-2 ml-5 mr-5 mb-2">{{ exam.category_2 }}</p>
            <p class="text-white pt-2 ml-5 mr-5 mb-2">{{ exam.category_3 }}</p>
            <p class="text-white pt-2 ml-5 mr-5 mb-5">{{ exam.category_4 }}</p>
            <div class="bg-white p-5 rounded-bl-0 rounded-br-0 rounded-bl rounded-br flex justify-evenly border border-sky-500">
              <p>Tier: {{ exam.tier }}</p>
              <p># Of Questions: {{ exam.number_of_questions }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <!-- <p v-if="examData">{{ examData[0].name }}</p> -->
  </div>
</template>
