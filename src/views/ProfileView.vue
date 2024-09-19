<template>
  <div class="profile flex justify-center mt-10">
    <div class="card-background-color w-10/12 rounded-lg border border-sky-500">
        
      <div class="top-bar flex flex-wrap justify-evenly bg-slate-700 p-5 rounded-lg">
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Exams Taken: 0</h1>
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Average Score: 0</h1>
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Biggest Strength: 0</h1>  
        <h1 class="main-blue-font-color title-font text-2xl mx-10">Biggest Weakness: 0</h1>  
        <!-- Could also be best exam score and worst -->
      </div>

      <div class="exam-board-container">
        <div class="exam-board grid grid-cols-4">
            <div class="exam-board-exams border-r-4 border-sky-500">
                <div class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-500">
                    <p class="paragraph-font ml-5 mb-1 text-white">General Competency Exam</p>
                </div>
                <div class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-500">
                    <p class="paragraph-font ml-5 mb-1 text-white">Fundamental Programming</p>
                </div>
                <div class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-500">
                    <p class="paragraph-font ml-5 mb-1 text-white">Languages/Frameworks/Tools</p>
                </div>
                <div class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-500">
                    <p class="paragraph-font ml-5 mb-1 text-white">Problem Solving</p>
                </div>
                <div class="exam border-b-4 border-sky-500 py-5 hover:bg-slate-500">
                    <p class="paragraph-font ml-5 mb-1 text-white">Software Development Processes</p>
                </div>
            </div>
            <div class="exam-board-results col-span-3"> 
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">Fundamantal Programming Category: 0</h1>
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">Languages/Framworks/Tools Category: 0</h1>
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">Problem Solving Category: 0</h1>
                <h1 class="main-blue-font-color title-font text-2xl mx-10 my-10">Software Development Processes Category: 0</h1>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
