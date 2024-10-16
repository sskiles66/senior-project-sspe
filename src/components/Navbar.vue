<script setup>
import { jwtDecode } from 'jwt-decode';
import { onMounted, ref } from 'vue';

const hasToken = ref(false);
const jwt = ref();

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token){
    const decodedToken = jwtDecode(token);
    jwt.value = decodedToken;
    hasToken.value = true;
    console.log(decodedToken);
  }
});

function logout(){
  localStorage.removeItem("token");
  window.location.href = '/';
}

</script>

<template>
  <nav class="navbar">
    <ul class="navbar-list flex justify-center p-3 bg-gray-800/10">
      <li class="main-blue-font-color nav-font m-5">
        <router-link to="/">Home</router-link>
      </li>
      <li class="main-blue-font-color nav-font m-5">
        <router-link to="/about">About</router-link>
      </li>
      <li class="main-blue-font-color nav-font m-5">
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li class="main-blue-font-color nav-font m-5">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="hasToken" class="main-blue-font-color nav-font m-5">
        <router-link to="/profile">Profile</router-link>
      </li>
      <li v-if="hasToken" @click="logout" class="main-blue-font-color nav-font m-5 hover:cursor-pointer">
        Logout
      </li>
      <!-- <li class="main-blue-font-color nav-font m-5">
        <router-link to="/exam-results">Exam Results</router-link>
      </li> -->
    </ul>
  </nav>
</template>

