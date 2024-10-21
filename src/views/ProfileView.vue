<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const examResults = ref();

const selectedResultIndex = ref();

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(`http://localhost:5053/api/ExamResults/${decodedToken.UserId}`, config); // placeholder until we have user id
    examResults.value = response.data;
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
});

</script>


<template>
  <div class="profile flex justify-center mt-10" style="margin: 50px auto; max-width: 2000px;">
    <div class="card-background-color w-10/12 rounded-lg border border-sky-500" v-if="examResults">

      <div class="top-bar flex flex-wrap justify-evenly bg-slate-700 p-5 rounded-lg">
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Exams Taken: 0</h1>
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Average Score: 0</h1>
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Biggest Strength: 0</h1>  
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Biggest Weakness: 0</h1>  
        <!-- Could also be best exam score and worst -->
      </div>

      <div class="exam-board-container">
        <div class="exam-board grid grid-cols-4">
            <div class="exam-board-exams border-r-4 border-sky-500">
                <div class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-500" v-for="(examResult, index) in examResults" :key="examResult.id" @click="selectedResultIndex = index">
                    <p class="paragraph-font ml-5 mb-1 text-white">{{ examResult.name }} / {{ examResult.score }}</p>
                </div>
            </div>
            <div class="exam-board-results col-span-3" v-if="selectedResultIndex >= 0"> 
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">{{ examResults[selectedResultIndex].category_1 }}: {{ examResults[selectedResultIndex].category_1_score }}</h1>
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">{{ examResults[selectedResultIndex].category_2 }}: {{ examResults[selectedResultIndex].category_2_score }}</h1>
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">{{ examResults[selectedResultIndex].category_3 }}: {{ examResults[selectedResultIndex].category_3_score }}</h1>
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">{{ examResults[selectedResultIndex].category_4 }}: {{ examResults[selectedResultIndex].category_4_score }}</h1>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

