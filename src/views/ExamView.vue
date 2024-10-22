<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import ExamQuestionCard from "@/components/ExamQuestionCard.vue";
import ExamResult from "@/components/ExamResult.vue";

const route = useRoute();
const currentQuestionNum = ref(1);
const selectedAnswer = ref("");

const examQuestionFromApi = ref(); // whole current exam question

const currentCategory = ref();

const examAnswerOptions = ref();

const categoryQueue = ref([]);
const numOfQuestions = ref();
const categoryOneLevel = ref(1);
const categoryTwoLevel = ref(1);
const categoryThreeLevel = ref(1);
const categoryFourLevel = ref(1);
const allCategories = ref([]);
const allExamData = ref();

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

    setExamAnswerOptions(response2.data);

    shuffle(examAnswerOptions.value);

    allCategories.value = [
      response.data.category_1,
      response.data.category_2,
      response.data.category_3,
      response.data.category_4,
    ];

    const divisor = numOfQuestions.value / 4;
    for (let i = 0; i < allCategories.value.length; i++) {
      for (let j = 0; j < divisor; j++) {
        categoryQueue.value.push(allCategories.value[i]);
      }
    }

    // take out the first item since first category was used for first question
    categoryQueue.value.splice(0, 1);

    shuffle(categoryQueue.value);
  } catch (error) {
    console.error("Error fetching exam data:", error);
  }
  // Get inital question based upon the first level
});

// When currentQuestionNum changes, get new question based upon level
watch(currentQuestionNum, async () => {
  if (currentQuestionNum.value <= numOfQuestions.value) {
    // getting top category from the queue, basically random category
    currentCategory.value = categoryQueue.value.pop();
    // matching up our random category to a level value to know which level to get along with which category
    let level;
    if (currentCategory.value == allCategories.value[0]) {
      level = categoryOneLevel.value;
    }
    if (currentCategory.value == allCategories.value[1]) {
      level = categoryTwoLevel.value;
    }
    if (currentCategory.value == allCategories.value[2]) {
      level = categoryThreeLevel.value;
    }
    if (currentCategory.value == allCategories.value[3]) {
      level = categoryFourLevel.value;
    }

    const exam = route.params.id;
    const response2 = await axios.get(
      `http://localhost:5053/api/Questions/${exam}/${level}/${currentCategory.value}`
    ); //This is the initial starting question
    examQuestionFromApi.value = response2.data;

    // Populate answer options and then shuffle them
    setExamAnswerOptions(response2.data);

    shuffle(examAnswerOptions.value);
  }
});

function setExamAnswerOptions(data) {
  examAnswerOptions.value = [
    {
      value: "correct",
      text: data.correct_answer,
    },
    {
      value: "incorrec1",
      text: data.wrong_answer_1,
    },
    {
      value: "incorrect2",
      text: data.wrong_answer_2,
    },
    {
      value: "inconrrect4",
      text: data.wrong_answer_3,
    },
  ];
}

function shuffle(array) {
  // Fisher-Yates Shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const handleAnswerSubmission = (e) => {
  e.preventDefault();
  // With lower and upper limits of questionArray in mind, increase or decrease level
  // based upon correct or incorrect answer
  // Matching up random category (currentCategory)
  // and syncing it up with our declared categories (eh)
  // and updating correct level value
  if (selectedAnswer.value == "correct") {
    if (
      currentCategory.value == allCategories.value[0] &&
      categoryOneLevel.value < 3
    ) {
      categoryOneLevel.value++;
    } else if (
      currentCategory.value == allCategories.value[1] &&
      categoryTwoLevel.value < 3
    ) {
      categoryTwoLevel.value++;
    } else if (
      currentCategory.value == allCategories.value[2] &&
      categoryThreeLevel.value < 3
    ) {
      categoryThreeLevel.value++;
    } else if (
      currentCategory.value == allCategories.value[3] &&
      categoryFourLevel.value < 3
    ) {
      categoryFourLevel.value++;
    }
  }
  if (selectedAnswer.value != "correct") {
    if (
      currentCategory.value == allCategories.value[0] &&
      categoryOneLevel.value > 1
    ) {
      categoryOneLevel.value--;
    } else if (
      currentCategory.value == allCategories.value[1] &&
      categoryTwoLevel.value > 1
    ) {
      categoryTwoLevel.value--;
    } else if (
      currentCategory.value == allCategories.value[2] &&
      categoryThreeLevel.value > 1
    ) {
      categoryThreeLevel.value--;
    } else if (
      currentCategory.value == allCategories.value[3] &&
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
    <div
      class="exam-question-container flex justify-center mt-10"
      style="margin: 50px auto; max-width: 2000px"
    >
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
        :allCategories="allCategories"
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
