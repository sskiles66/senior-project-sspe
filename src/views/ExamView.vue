<script setup></script>

<template>
  <main>
    <div class="exam-question-container flex justify-center mt-10">
      <div
        class="exam-question card-background-color w-10/12 rounded-lg border border-sky-500 p-5"
      >
        <h1 class="question-num title-font main-blue-font-color text-4xl mb-5">
          Question: 1/60
        </h1>
        <h2 class="question title-font text-white text-2xl">
          What is the difference between "==" and "===" operators?
        </h2>
        <hr class="my-4 border border-sky-500" />
        <div class="quiz-answers flex flex-col space-y-4">
          <label class="quiz-option flex items-center">
            <input type="radio" name="question1" value="option1" class="mr-2" />
            <span class="text-white paragraph-font">The == operator compares values after potential type conversions, while === compares both values and types directly.</span>
          </label>
          <label class="quiz-option flex items-center">
            <input type="radio" name="question1" value="option2" class="mr-2" />
            <span class="text-white paragraph-font">Both operators are the same.</span>
          </label>
          <label class="quiz-option flex items-center">
            <input type="radio" name="question1" value="option3" class="mr-2" />
            <span class="text-white paragraph-font">== is faster than ===.</span>
          </label>
          <label class="quiz-option flex items-center">
            <input type="radio" name="question1" value="option4" class="mr-2" />
            <span class="text-white paragraph-font">== is faster than ===.</span>
          </label>
        </div>
        <button class="blue-background-color paragraph-font p-4 mt-10 rounded-lg">Next Question</button>
      </div>
    </div>
  </main>
</template>
