<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const props = defineProps({
  categoryData: {
    type: Array,
    required: true,
  },
  allExamData: {
    type: Object,
  },
});

const hasSubmitButtonBeenPressed = ref(false);
const hasToken = ref(false);
const jwt = ref();
const decodedToken = ref();
const message = ref();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
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
      `${import.meta.env.VITE_VUE_APP_API_URL}/api/ExamResults`,
      {
        user_id: decodedToken.value.UserId,
        exam_id: props.allExamData.id,
        score:
          props.categoryData[0].categoryScore +
          props.categoryData[1].categoryScore +
          props.categoryData[2].categoryScore +
          props.categoryData[3].categoryScore,
        category_1_score: props.categoryData[0].categoryScore,
        category_2_score: props.categoryData[1].categoryScore,
        category_3_score: props.categoryData[2].categoryScore,
        category_4_score: props.categoryData[3].categoryScore,
        created_at: new Date().toISOString()
      },
      config
    );
    if (createExamResultResponse.status == 200) {
      hasSubmitButtonBeenPressed.value = true;
      message.value = {
        messageText: "Score has been successfully saved to profile.",
        messageType: "success",
      };
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    message.value = {
      messageText: "Something went wrong.",
      messageType: "error",
    };
  }
}
</script>

<template>
  <div class="w-10/12">
    <div class="general-results">
      <h1 class="title-font main-blue-font-color text-4xl">Results</h1>
      <h2 class="title-font main-blue-font-color text-2xl my-10">
        Overall Score:
        {{
          categoryData[0].categoryScore +
          categoryData[1].categoryScore +
          categoryData[2].categoryScore +
          categoryData[3].categoryScore
        }}
      </h2>
    </div>
    <div class="category-results-container">
      <div
        class="category-results card-background-color rounded-lg border border-sky-500 p-5 sm:flex block justify-between"
      >
        <h3 class="paragraph-font text-white">
          {{ categoryData[0].categoryName }}:
          {{ categoryData[0].categoryScore }}
        </h3>
        <h3 class="paragraph-font text-white">
          {{ categoryData[1].categoryName }}:
          {{ categoryData[1].categoryScore }}
        </h3>
        <h3 class="paragraph-font text-white">
          {{ categoryData[2].categoryName }}:
          {{ categoryData[2].categoryScore }}
        </h3>
        <h3 class="paragraph-font text-white">
          {{ categoryData[3].categoryName }}:
          {{ categoryData[3].categoryScore }}
        </h3>
      </div>
    </div>
    <button
      @click="handleExamResultSubmission"
      class="blue-background-color paragraph-font hover:bg-blue-400 p-4 mt-10 rounded-lg"
      :disabled="hasSubmitButtonBeenPressed || !hasToken"
    >
      Submit Exam Result
    </button>
    <p
      v-if="message"
      class="paragraph-font mt-5"
      :class="[
        message.messageType === 'success' ? 'text-green-400' : 'text-red-500',
      ]"
    >
      {{ message.messageText }}
    </p>
    <p v-if="!hasToken" class="paragraph-font text-white mt-5">
      Must be logged in to submit exam result.
    </p>
  </div>
</template>
