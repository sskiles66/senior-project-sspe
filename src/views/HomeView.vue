<script setup>

const handleRedirect = () => {
  window.location.href = '/Dashboard';
}

</script>

<template>
  <main>
    <div class="mt-24 text-center">
      <h1 class="title-font main-blue-font-color text-6xl">Welcome To The Standardized Software Progress Exam!</h1>
      <h2 class="title-font text-white mt-12 text-3xl">Begin and grow as a develop while tracking your progress from beginner to expert levels.</h2>
      
      <div class="cardContainer flex flex-wrap justify-center mt-10">
        <div class="card p-10 m-10 text-left card-background-color rounded-lg border border-sky-500" style="width: 300px;">
          <h3 class="main-blue-font-color title-font text-2xl">Personalized Progress Tracking</h3>
          <p class="text-white paragraph-font mt-5">Create an account and take exams that measures your skills and gives you scores on categorized topics.</p>
        </div>
        <div class="card p-10 m-10 text-left card-background-color rounded-lg border border-sky-500" style="width: 300px;">
          <h3 class="main-blue-font-color title-font text-2xl">Start From Any Level</h3>
          <p class="text-white paragraph-font mt-5">The exams can be taken from any experience level so you can see progress over time.</p>
        </div>
        <div class="card p-10 m-10 text-left card-background-color rounded-lg border border-sky-500" style="width: 300px;">
          <h3 class="main-blue-font-color title-font text-2xl">Tier-based Exams</h3>
          <p class="text-white paragraph-font mt-5">Don't know where to start? Our exams are categorized by tiers.</p>
        </div>
        <div class="card p-10 m-10 text-left card-background-color rounded-lg border border-sky-500" style="width: 300px;">
          <h3 class="main-blue-font-color title-font text-2xl">Categorized Topics</h3>
          <p class="text-white paragraph-font mt-5">Exam results display strengths and weaknesses so you know where to improve.</p>
        </div>
      </div>

      <button @click="handleRedirect" class="blue-background-color paragraph-font p-4 mt-10 rounded-lg">See Our Exams</button>

    </div>
  </main>
</template>

<style>

.card:hover {
  transform: scale(1.1); /* Adjust the scale factor as needed */
  transition: transform 0.5s ease-in-out; /* Add a smooth transition */
}

</style>
