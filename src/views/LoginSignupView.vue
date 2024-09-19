<script setup>
    import { ref } from "vue";
    const isLoggingIn = ref(true);

    const handleFormChange = () => {
        isLoggingIn.value = !isLoggingIn.value;
    };

</script>

<template>
  <main class="container mx-auto p-4">
    <div class="flex flex-col items-center justify-center mt-20">
      <h1 class="main-blue-font-color text-4xl font-bold mb-4">Login/Signup</h1>
      <div class="w-full max-w-md">
        <form
          class="card-background-color shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div v-if="!isLoggingIn" class="mb-4">
            <label
              class="main-blue-font-color block font-bold mb-2"
              for="first name"
              >First Name</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first name"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div class="mb-4">
            <label class="main-blue-font-color block font-bold mb-2" for="email"
              >Email</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="mb-6">
            <label
              class="main-blue-font-color block font-bold mb-2"
              for="password"
              >Password</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="blue-background-color hover:bg-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              {{ isLoggingIn ? 'Log In' : 'Create Account' }}
            </button>
            <button
              @click="handleFormChange"
              class="main-blue-font-color inline-block align-baseline text-sm font-semibold hover:text-indigo-800"
              type="button"
            >
              {{ isLoggingIn ? 'Create An Account' : 'Log In' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
