<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const currentQuestionNum = ref(1);
const selectedAnswer = ref("");
const examQuestionFromApi = ref();
const level = ref(1);
const currentCategory = ref();
const examAnswerOptions = ref();

// have categories randomized (maybe use a queue system where the queue is made onMount)
// Calculate score and category scores and havbe something happen after all questions have been answered. (POST result)

onMounted(async () => {
  try {
    const exam = route.params.id;
    const response = await axios.get(`http://localhost:5053/api/Exams/${exam}`); // Can populate based upon exam info
    currentCategory.value = response.data.category_1;
    const response2 = await axios.get(
      `http://localhost:5053/api/Questions/${exam}/1/${response.data.category_1}`
    ); //This is the initial starting question
    examQuestionFromApi.value = response2.data;
    // Populate answer options and then shuffle them
    examAnswerOptions.value = [
      {
        value: "correct",
        text: response2.data.correct_answer,
      },
      {
        value: "incorrec1",
        text: response2.data.wrong_answer_1,
      },
      {
        value: "incorrect2",
        text: response2.data.wrong_answer_2,
      },
      {
        value: "inconrrect4",
        text: response2.data.wrong_answer_3,
      },
    ];
    // Fisher-Yates Shuffle algorithm
    for (let i = examAnswerOptions.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [examAnswerOptions.value[i], examAnswerOptions.value[j]] = [
        examAnswerOptions.value[j],
        examAnswerOptions.value[i],
      ];
    }
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
  // Get inital question based upon the first level
});

// When currentQuestionNum changes, get new question based upon level
watch(currentQuestionNum, async () => {
  const exam = route.params.id;
  const response2 = await axios.get(
    `http://localhost:5053/api/Questions/${exam}/${level.value}/${currentCategory.value}`
  ); //This is the initial starting question
  examQuestionFromApi.value = response2.data;
  // Populate answer options and then shuffle them
  examAnswerOptions.value = [
    {
      value: "correct",
      text: response2.data.correct_answer,
    },
    {
      value: "incorrec1",
      text: response2.data.wrong_answer_1,
    },
    {
      value: "incorrect2",
      text: response2.data.wrong_answer_2,
    },
    {
      value: "inconrrect4",
      text: response2.data.wrong_answer_3,
    },
  ];
  // Fisher-Yates Shuffle algorithm
  for (let i = examAnswerOptions.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [examAnswerOptions.value[i], examAnswerOptions.value[j]] = [
      examAnswerOptions.value[j],
      examAnswerOptions.value[i],
    ];
  }
});

const handleAnswerSubmission = (e) => {
  e.preventDefault();
  // With lower and upper limits of questionArray in mind, increase or decrease level
  // based upon correct or incorrect answer
  if (selectedAnswer.value == "correct" && level.value != 3) {
    level.value++;
  }
  if (selectedAnswer.value != "correct" && level.value != 1) {
    level.value--;
  }
  selectedAnswer.value = "";
  currentQuestionNum.value++;
};
</script>

<template>
  <main>
    <div class="exam-question-container flex justify-center mt-10">
      <div
        class="exam-question card-background-color w-10/12 rounded-lg border border-sky-500 p-5"
      >
        <h1 class="question-num title-font main-blue-font-color text-4xl mb-5">
          Question: {{ currentQuestionNum }}/60
        </h1>
        <h2
          v-if="examQuestionFromApi"
          class="question title-font text-white text-2xl"
        >
          {{ examQuestionFromApi.question_text }}
        </h2>
        <hr class="my-4 border border-sky-500" />
        <div
          v-if="examAnswerOptions"
          class="quiz-answers flex flex-col space-y-4"
        >
          <label
            class="quiz-option flex items-center"
            v-for="option in examAnswerOptions"
            :key="option.value"
          >
            <input
              v-model="selectedAnswer"
              type="radio"
              :name="question1"
              :value="option.value"
              class="mr-2"
            />
            <span class="text-white paragraph-font">{{ option.text }}</span>
          </label>
        </div>
        <button
          @click="handleAnswerSubmission"
          class="blue-background-color paragraph-font p-4 mt-10 rounded-lg"
        >
          Next Question
        </button>
      </div>
    </div>
    <p>{{ selectedAnswer }}</p>
  </main>
</template>
