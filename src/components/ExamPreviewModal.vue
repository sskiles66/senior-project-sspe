<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  exam: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['update:removeSelectedExam']);

function removeSelectedExam() {
  emit('update:removeSelectedExam');
}

</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-75"
  >
    <div class="relative sm:w-full w-5/6 max-w-md card-background-color rounded-lg shadow-lg">
      <div
        class="flex items-start justify-between p-4 border-b border-gray-200 rounded-t"
      >
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          @click="removeSelectedExam"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <div class="p-6">
        <h1 class="main-blue-font-color title-font text-2xl mb-5">{{ props.exam.name }}</h1>
        <p class="main-blue-font-color mb-2">{{ props.exam.category_1 }}</p>
        <p class="main-blue-font-color mb-2">{{ props.exam.category_2  }}</p>
        <p class="main-blue-font-color mb-2">{{ props.exam.category_3  }}</p>
        <p class="main-blue-font-color mb-2">{{ props.exam.category_4  }}</p>
        <p class="text-white mb-2 mt-4">When you take this exam, each question is AI generated and is based upon each category above as well as difficulty. Each correct answer results in the next question for that given category to be a more difficult question. Each wrong answer does the opposite. Click the button below to get started.</p>
        <router-link :to="{ path: `/exam/${props.exam.id}` }">
            <button class="blue-background-color paragraph-font hover:bg-blue-400 p-4 my-5 rounded-lg">Take Exam</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
