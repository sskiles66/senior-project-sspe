<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  currentQuestionNum: {
    type: Number,
    required: true,
  },
  numOfQuestions: {
    type: Number,
    required: true,
  },
  examQuestionFromApi: {
    type: Object,
  },
  examAnswerOptions: {
    type: Array,
  },
  selectedAnswer: {
    type: String,
  },
});

const emit = defineEmits(['update:selectedAnswer', 'handle-answer-submission']);

function updateSelectedAnswer(event) {
  emit('update:selectedAnswer', event.target.value);
}

function handleAnswerSubmission(event) {
  emit('handle-answer-submission', event);
}
</script>

<template>
  <div
    class="exam-question card-background-color w-10/12 rounded-lg border border-sky-500 p-5"
  >
    <h1 class="question-num title-font main-blue-font-color text-4xl mb-5">
      Question: {{ currentQuestionNum }}/{{ numOfQuestions }}
    </h1>
    <h2
      v-if="examQuestionFromApi"
      class="question title-font text-white text-2xl"
    >
      {{ examQuestionFromApi.question_text }}
    </h2>
    <hr class="my-4 border border-sky-500" />
    <div v-if="examAnswerOptions" class="quiz-answers flex flex-col space-y-4">
      <label
        class="quiz-option flex items-center"
        v-for="option in examAnswerOptions"
        :key="option.value"
      >
      <!-- Had to reset checked becuase check was still active after answer submission -->
        <input
          @change="updateSelectedAnswer"
          type="radio"
          :name="selectedAnswer"
          :value="option.value"
          class="mr-2"
          :checked="selectedAnswer === option.value"
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
</template>
