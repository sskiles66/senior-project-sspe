<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import ExamQuestionCard from "@/components/ExamQuestionCard.vue";
import ExamResult from "@/components/ExamResult.vue";

const route = useRoute();
const currentQuestionNum = ref(1);
const selectedAnswer = ref("");
const examQuestionFromApi = ref();
const currentCategory = ref();
const examAnswerOptions = ref();

const categoryQueue = ref([]);

const numOfQuestions = ref();

const categoryOneLevel = ref(1);
const categoryTwoLevel = ref(1);
const categoryThreeLevel = ref(1);
const categoryFourLevel = ref(1);

const allCategoriesEh = ref([]);

const allExamData = ref();

// Need to get rid of hardcoded num of questions (60) when we actually put in questions
// have categories randomized (maybe use a queue system where the queue is made onMount)    done but very very messy
// Exams aare mostly dynamic meaning many exam objects can work this component. Except number of questions
// separated this view into components, need to try to simplify the logic if possible

onMounted(async () => {
  try {
    const exam = route.params.id;
    const response = await axios.get(`http://localhost:5053/api/Exams/${exam}`); // Can populate based upon exam info
    currentCategory.value = response.data.category_1;
    allExamData.value = response.data;
    numOfQuestions.value = response.data.number_of_questions;
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
    // Fisher-Yates Shuffle algorithm, shuffling answer choices
    for (let i = examAnswerOptions.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [examAnswerOptions.value[i], examAnswerOptions.value[j]] = [
        examAnswerOptions.value[j],
        examAnswerOptions.value[i],
      ];
    }
    const allCategories = [
      response.data.category_1,
      response.data.category_2,
      response.data.category_3,
      response.data.category_4,
    ];
    // repetition here to solve later. this is here for another place maybe watch

    allCategoriesEh.value = [
      response.data.category_1,
      response.data.category_2,
      response.data.category_3,
      response.data.category_4,
    ];

    const divisor = numOfQuestions.value / 4;
    for (let i = 0; i < allCategories.length; i++) {
      for (let j = 0; j < divisor; j++) {
        categoryQueue.value.push(allCategories[i]);
      }
    }
    categoryQueue.value.splice(0, 1);
    // Fisher-Yates Shuffle algorithm, shuffling category queue
    for (let i = categoryQueue.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [categoryQueue.value[i], categoryQueue.value[j]] = [
        categoryQueue.value[j],
        categoryQueue.value[i],
      ];
    }
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
  // Get inital question based upon the first level
});

// When currentQuestionNum changes, get new question based upon level
watch(currentQuestionNum, async () => {
  // console.log(categoryQueue);
  // getting top category from the queue, basically random category
  currentCategory.value = categoryQueue.value.pop();
  // console.log(currentCategory.value);
  // console.log(categoryQueue);
  // matching up our random category to a level value to know which level to get along with which category
  let level;
  if (currentCategory.value == allCategoriesEh.value[0]) {
    level = categoryOneLevel.value;
  }
  if (currentCategory.value == allCategoriesEh.value[1]) {
    level = categoryTwoLevel.value;
  }
  if (currentCategory.value == allCategoriesEh.value[2]) {
    level = categoryThreeLevel.value;
  }
  if (currentCategory.value == allCategoriesEh.value[3]) {
    level = categoryFourLevel.value;
  }

  const exam = route.params.id;
  const response2 = await axios.get(
    `http://localhost:5053/api/Questions/${exam}/${level}/${currentCategory.value}`
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
  // Matching up random category (currentCategory)
  // and syncing it up with our declared categories (eh)
  // and updating correct level value
  if (selectedAnswer.value == "correct") {
    if (
      currentCategory.value == allCategoriesEh.value[0] &&
      categoryOneLevel.value < 3
    ) {
      categoryOneLevel.value++;
    } else if (
      currentCategory.value == allCategoriesEh.value[1] &&
      categoryTwoLevel.value < 3
    ) {
      categoryTwoLevel.value++;
    } else if (
      currentCategory.value == allCategoriesEh.value[2] &&
      categoryThreeLevel.value < 3
    ) {
      categoryThreeLevel.value++;
    } else if (
      currentCategory.value == allCategoriesEh.value[3] &&
      categoryFourLevel.value < 3
    ) {
      categoryFourLevel.value++;
    }
  }
  if (selectedAnswer.value != "correct") {
    if (
      currentCategory.value == allCategoriesEh.value[0] &&
      categoryOneLevel.value > 1
    ) {
      categoryOneLevel.value--;
    } else if (
      currentCategory.value == allCategoriesEh.value[1] &&
      categoryTwoLevel.value > 1
    ) {
      categoryTwoLevel.value--;
    } else if (
      currentCategory.value == allCategoriesEh.value[2] &&
      categoryThreeLevel.value > 1
    ) {
      categoryThreeLevel.value--;
    } else if (
      currentCategory.value == allCategoriesEh.value[3] &&
      categoryFourLevel.value > 1
    ) {
      categoryFourLevel.value--;
    }
  }
  selectedAnswer.value = "";
  currentQuestionNum.value++;
};

function handleSelectedAnswerChange(newAnswer) {
  // Do something with the new answer
  selectedAnswer.value = newAnswer;
}
</script>

<template>
  <main>
    <div class="exam-question-container flex justify-center mt-10">
      <!-- Most of the below reactive values are fed in from from the watch hook that triggiers from the handleAnswerSubmission event and the function itself -->
      <!-- : is a shortcut for v-bind -->
      <ExamQuestionCard
        v-if="currentQuestionNum <= numOfQuestions"
        :current-question-num="currentQuestionNum"
        :num-of-questions="numOfQuestions"
        :exam-question-from-api="examQuestionFromApi"
        :exam-answer-options="examAnswerOptions"
        v-bind:selected-answer="selectedAnswer"
        @handle-answer-submission="handleAnswerSubmission"
        @update:selectedAnswer="handleSelectedAnswerChange"
      />

      <ExamResult 
        v-else
        :categoryOneLevel="categoryOneLevel"
        :categoryTwoLevel="categoryTwoLevel"
        :categoryThreeLevel="categoryThreeLevel"
        :categoryFourLevel="categoryFourLevel"
        :allCategoriesEh="allCategoriesEh"
        :allExamData="allExamData"
      />

    </div>
    <p class="text-white paragraph-font ml-5">{{ selectedAnswer }}</p>
    <p class="text-white paragraph-font ml-5">{{ categoryOneLevel }}</p>
    <p class="text-white paragraph-font ml-5">{{ categoryTwoLevel }}</p>
    <p class="text-white paragraph-font ml-5">{{ categoryThreeLevel }}</p>
    <p class="text-white paragraph-font ml-5">{{ categoryFourLevel }}</p>
  </main>
</template>
