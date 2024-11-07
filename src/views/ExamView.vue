<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import ExamQuestionCard from "@/components/ExamQuestionCard.vue";
import ExamResult from "@/components/ExamResult.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const currentQuestionNum = ref(1);
const selectedAnswer = ref("");
const examQuestionFromApi = ref(); // whole current exam question
const currentCategory = ref();
const examAnswerOptions = ref(); // answer options that get put into their own object from the whole question that are shuffled
const categoryQueue = ref([]);
const numOfQuestions = ref();
const categoryData = ref([
  {
    categoryName: "",
    categoryLevel: 1,
    categoryScore: 0,
  },
  {
    categoryName: "",
    categoryLevel: 1,
    categoryScore: 0,
  },
  {
    categoryName: "",
    categoryLevel: 1,
    categoryScore: 0,
  },
  {
    categoryName: "",
    categoryLevel: 1,
    categoryScore: 0,
  },
]);
const allExamData = ref();
const maxLevelConstraint = ref();

onMounted(async () => {
  try {
    const exam = route.params.id;
    // console.log(examQuestionFromApi.value, "on mount before response");
    const response = await axios.get(
      `${import.meta.env.VITE_VUE_APP_API_URL}/api/Exams/${exam}`
    ); // Can populate based upon exam info
    currentCategory.value = response.data.category_1;
    allExamData.value = response.data;
    numOfQuestions.value = response.data.number_of_questions;
    const divisor = numOfQuestions.value / 4;
    maxLevelConstraint.value = divisor;

    const response2 = await axios.get(
      // `${import.meta.env.VITE_VUE_APP_API_URL}/api/Questions/${exam}/1/${response.data.category_1}`
      `${import.meta.env.VITE_VUE_APP_API_URL}/api/Ai/1/${
        maxLevelConstraint.value
      }/${response.data.category_1}`
    ); //This is the initial starting question

    // difference between this and db fetched questions is that response2.data can be used directly w/o parsing
    let parsedGptQuestion = parseGptResponse(response2.data);

    examQuestionFromApi.value = parsedGptQuestion;

    setExamAnswerOptions(parsedGptQuestion);

    shuffle(examAnswerOptions.value);

    // console.log(examQuestionFromApi.value, "after mount after response");

    // This is used for populating the data for my category stats
    const allCategories = [
      response.data.category_1,
      response.data.category_2,
      response.data.category_3,
      response.data.category_4,
    ];

    // populating the data for my category stats with the names
    for (let i = 0; i < allCategories.length; i++) {
      categoryData.value[i].categoryName = allCategories[i];
    }

    // Populating the queue of categories
    for (let i = 0; i < allCategories.length; i++) {
      for (let j = 0; j < divisor; j++) {
        categoryQueue.value.push(allCategories[i]);
      }
    }

    // take out the first item since first category was used for first question
    categoryQueue.value.splice(0, 1);

    // shuffle categorie queue
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
    // console.log(examQuestionFromApi.value, "on watch before response");

    // matching up our random category to a level value to know which level to get along with which category
    let level;
    const indexOfCurrentCategoryInCategoryStats = categoryData.value.findIndex(
      (obj) => obj.categoryName === currentCategory.value
    );
    if (indexOfCurrentCategoryInCategoryStats !== -1) {
      const categoryObject =
        categoryData.value[indexOfCurrentCategoryInCategoryStats];
      level = categoryObject.categoryLevel;
    }

    const exam = route.params.id;
    const response2 = await axios.get(
      // `${import.meta.env.VITE_VUE_APP_API_URL}/api/Questions/${exam}/${level}/${
      //   currentCategory.value
      // }`
      `${import.meta.env.VITE_VUE_APP_API_URL}/api/Ai/${level}/${
        maxLevelConstraint.value
      }/${currentCategory.value}`
    );

    // difference between this and db fetched questions is that response2.data can be used directly w/o parsing
    let parsedGptQuestion = parseGptResponse(response2.data);

    examQuestionFromApi.value = parsedGptQuestion;

    // console.log(examQuestionFromApi.value, "on watched after set");

    // Populate answer options and then shuffle them
    setExamAnswerOptions(parsedGptQuestion);
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

function parseGptResponse(text) {
  let jsonStartIndex = text.indexOf("{");
  let jsonEndIndex = text.lastIndexOf("}");
  let extractedJsonString = text.substring(jsonStartIndex, jsonEndIndex + 1);
  return JSON.parse(extractedJsonString);
}

const handleAnswerSubmission = (e) => {
  e.preventDefault();
  // With lower and upper limits of questionArray in mind, increase or decrease level
  // based upon correct or incorrect answer
  // Matching up random category (currentCategory)
  // categoryObject is passef with reference.

  const indexOfCurrentCategoryInCategoryStats = categoryData.value.findIndex(
    (obj) => obj.categoryName === currentCategory.value
  );
  if (indexOfCurrentCategoryInCategoryStats !== -1) {
    const categoryObject =
      categoryData.value[indexOfCurrentCategoryInCategoryStats];
    if (selectedAnswer.value === "correct") {
      if (categoryObject.categoryLevel < maxLevelConstraint.value) {
        categoryObject.categoryLevel++;
      }
      categoryObject.categoryScore++;
    } else {
      if (categoryObject.categoryLevel > 1) {
        categoryObject.categoryLevel--;
      }
      if (categoryObject.categoryScore > 0) {
        categoryObject.categoryScore--;
      }
    }
  }

  selectedAnswer.value = "";
  // For knowing when new question ic loading in
  examQuestionFromApi.value = undefined;
  currentQuestionNum.value++;
};

function handleSelectedAnswerChange(newAnswer) {
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
      <LoadingSpinner
        v-if="!examQuestionFromApi && currentQuestionNum <= numOfQuestions"
      />
      <ExamQuestionCard
        v-else-if="currentQuestionNum <= numOfQuestions"
        :current-question-num="currentQuestionNum"
        :num-of-questions="numOfQuestions"
        :exam-question-from-api="examQuestionFromApi"
        :exam-answer-options="examAnswerOptions"
        v-bind:selected-answer="selectedAnswer"
        @handle-answer-submission="handleAnswerSubmission"
        @update:selectedAnswer="handleSelectedAnswerChange"
      />
      <ExamResult
        v-else-if="currentQuestionNum > numOfQuestions"
        :categoryData="categoryData"
        :allExamData="allExamData"
      />
    </div>

    <!-- For development -->
    <p class="text-white paragraph-font ml-5">{{ selectedAnswer }}</p>
    <p class="text-white paragraph-font ml-5">{{ categoryData }}</p>
  </main>
</template>
