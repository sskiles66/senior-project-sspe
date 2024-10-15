<script setup>
import { jwtDecode } from 'jwt-decode';

const items = [
  { id: 1, label: "Home", link: "/" },
  { id: 2, label: "About", link: "/about" },
  { id: 3, label: "Dashboard", link: "/dashboard" },
  { id: 4, label: "Profile", link: "/profile" },
  { id: 5, label: "Login", link: "/login" },
  { id: 7, label: "Exam Results", link: "/exam-results" },
];

const decodedToken = jwtDecode(localStorage.getItem('token'));
console.log(decodedToken);
</script>

<template>
  <nav class="navbar">
    <ul class="navbar-list flex justify-center p-3 bg-gray-800/10">
      <li class="main-blue-font-color nav-font m-5" v-for="item in items" :key="item.id">
        <router-link :to="item.link">{{ item.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>

