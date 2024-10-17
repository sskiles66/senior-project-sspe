<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const props = defineProps({
  categoryOneLevel: {
    type: Number,
    required: true,
  },
  categoryTwoLevel: {
    type: Number,
    required: true,
  },
  categoryThreeLevel: {
    type: Number,
    required: true,
  },
  categoryFourLevel: {
    type: Number,
    required: true,
  },
  allExamData: {
    type: Object,
  },
  allCategoriesEh: {
    type: Array,
  },
});

const hasSubmitButtonBeenPressed = ref(false);
const hasToken = ref(false);
const jwt = ref();
const decodedToken = ref();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token){
    jwt.value = token;
    decodedToken.value = jwtDecode(token);
    hasToken.value = true;
  }
});

//button here POST
async function handleExamResultSubmission(e) {
  e.preventDefault();
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt.value}` },
    };
    const createExamResultResponse = await axios.post(
      `http://localhost:5053/api/ExamResults`,
      {
        user_id: decodedToken.value.UserId,
        exam_id: props.allExamData.id,
        score:
          props.categoryOneLevel +
          props.categoryTwoLevel +
          props.categoryThreeLevel +
          props.categoryFourLevel,
        category_1_score: props.categoryOneLevel,
        category_2_score: props.categoryTwoLevel,
        category_3_score: props.categoryThreeLevel,
        category_4_score: props.categoryFourLevel,
      },
      config
    );
    if (createExamResultResponse.status == 200) {
      // setMessage({messageType: "Good", message: ["Game has been saved to the leaderboard"]})
      hasSubmitButtonBeenPressed.value = true;
      console.log("Success");
    }
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}
</script>

<template>
  <div class="w-10/12">
    <div class="general-results">
      <h1 class="title-font main-blue-font-color text-4xl">Results</h1>
      <h2 class="title-font main-blue-font-color text-2xl my-10">
        Time Taken: 45:23
      </h2>
      <h2 class="title-font main-blue-font-color text-2xl my-10">
        Overall Score:
        {{
          categoryOneLevel +
          categoryTwoLevel +
          categoryThreeLevel +
          categoryFourLevel
        }}
      </h2>
    </div>
    <div class="category-results-container">
      <div
        class="category-results card-background-color rounded-lg border border-sky-500 p-5 flex justify-between"
      >
        <h3 class="paragraph-font text-white">
          {{ allCategoriesEh[0] }}: {{ categoryOneLevel }}
        </h3>
        <h3 class="paragraph-font text-white">
          {{ allCategoriesEh[1] }}: {{ categoryTwoLevel }}
        </h3>
        <h3 class="paragraph-font text-white">
          {{ allCategoriesEh[2] }}: {{ categoryThreeLevel }}
        </h3>
        <h3 class="paragraph-font text-white">
          {{ allCategoriesEh[3] }}: {{ categoryFourLevel }}
        </h3>
      </div>
    </div>
    <button
      @click="handleExamResultSubmission"
      class="blue-background-color paragraph-font p-4 mt-10 rounded-lg"
      :disabled="hasSubmitButtonBeenPressed || !hasToken"
    >
      Submit Exam Result
    </button>
    <p v-if="!hasToken" class="paragraph-font text-white mt-5">Must be logged in to submit exam result.</p>
  </div>
</template>
