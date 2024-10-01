<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const questions = [
  {
    question: "111What is the difference between '==' and '===' operators?",
    correctAnswer: {
      value: "correct",
      text: "The '==' operator compares values after potential type conversions, while '===' compares both values and types directly.",
    },
    incorrectAnswers: [
      { value: "incorrect", text: "Both operators are the same." },
      { value: "incorrect2", text: "==' is faster than '==='." },
      { value: "incorrect3", text: "'===' is always preferable to '=='." },
    ],
  },
  // Add more questions here
];

const questions2 = [
  {
    question: "222What is the difference between '==' and '===' operators?",
    correctAnswer: {
      value: "correct",
      text: "2The '==' operator compares values after potential type conversions, while '===' compares both values and types directly.",
    },
    incorrectAnswers: [
      { value: "incorrect", text: "2Both operators are the same." },
      { value: "incorrect2", text: "2==' is faster than '==='." },
      { value: "incorrect3", text: "'2===' is always preferable to '=='." },
    ],
  },
  // Add more questions here
];

const questions3 = [
  {
    question: "333What is the difference between '==' and '===' operators?",
    correctAnswer: {
      value: "correct",
      text: "3The '==' operator compares values after potential type conversions, while '===' compares both values and types directly.",
    },
    incorrectAnswers: [
      { value: "incorrect", text: "3Both operators are the same." },
      { value: "incorrect2", text: "3==' is faster than '==='." },
      { value: "incorrect3", text: "3'===' is always preferable to '=='." },
    ],
  },
  // Add more questions here
];

const questionArray = [questions, questions2, questions3];

const currentQuestionNum = ref(1);
const currentQuestionLevel = ref(0); // may not need this
const selectedAnswer = ref("");
const currentQuestion = ref(); // This is used for the template

const examQuestionFromApi = ref();

const level = ref(1);

const currentCategory = ref();

onMounted(async () => {
  try {
    const exam = route.params.id;
    const response = await axios.get(`http://localhost:5053/api/Exams/${exam}`); // Can populate based upon exam info
    currentCategory.value = response.data.category_1;
    const response2 = await axios.get(`http://localhost:5053/api/Questions/${exam}/1/${response.data.category_1}`); //This is the initial starting question
    examQuestionFromApi.value = response2.data;
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
  // Get inital question based upon the first level
  currentQuestion.value = questionArray[currentQuestionLevel.value];
});

// When currentQuestionNum changes, get new question based upon level
watch(currentQuestionNum, async () => {
  const exam = route.params.id;
  const response2 = await axios.get(`http://localhost:5053/api/Questions/${exam}/${level.value}/${currentCategory.value}`); //This is the initial starting question
  currentQuestion.value = questionArray[currentQuestionLevel.value];
});

const handleAnswerSubmission = (e) => {
  e.preventDefault();
  // With lower and upper limits of questionArray in mind, increase or decrease level
  // based upon correct or incorrect answer
  if (selectedAnswer.value == "correct" && currentQuestionLevel.value != 2) {
    currentQuestionLevel.value++;
    level.value++;
  }
  if (selectedAnswer.value != "correct" && currentQuestionLevel.value != 0) {
    currentQuestionLevel.value--;
    level.value--;
  }
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
          v-if="currentQuestion"
          class="question title-font text-white text-2xl"
        >
          {{ currentQuestion[0].question }}
        </h2>
        <hr class="my-4 border border-sky-500" />
        <div
          v-if="currentQuestion"
          class="quiz-answers flex flex-col space-y-4"
        >
          <label class="quiz-option flex items-center">
            <input
              v-model="selectedAnswer"
              type="radio"
              name="question1"
              :value="currentQuestion[0].correctAnswer.value"
              class="mr-2"
            />
            <span class="text-white paragraph-font">{{
              currentQuestion[0].correctAnswer.text
            }}</span>
          </label>
          <label class="quiz-option flex items-center">
            <input
              v-model="selectedAnswer"
              type="radio"
              name="question1"
              :value="currentQuestion[0].incorrectAnswers[0].value"
              class="mr-2"
            />
            <span class="text-white paragraph-font">{{
              currentQuestion[0].incorrectAnswers[0].text
            }}</span>
          </label>
          <label class="quiz-option flex items-center">
            <input
              v-model="selectedAnswer"
              type="radio"
              name="question1"
              :value="currentQuestion[0].incorrectAnswers[1].value"
              class="mr-2"
            />
            <span class="text-white paragraph-font">{{
              currentQuestion[0].incorrectAnswers[1].text
            }}</span>
          </label>
          <label class="quiz-option flex items-center">
            <input
              v-model="selectedAnswer"
              type="radio"
              name="question1"
              :value="currentQuestion[0].incorrectAnswers[2].value"
              class="mr-2"
            />
            <span class="text-white paragraph-font">{{
              currentQuestion[0].incorrectAnswers[2].text
            }}</span>
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
