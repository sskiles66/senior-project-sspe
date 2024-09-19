<template>
  <nav class="navbar">
    <ul class="navbar-list flex justify-center p-3 bg-gray-800/10">
      <li class="main-blue-font-color nav-font m-5" v-for="item in items" :key="item.id">
        <router-link :to="item.link">{{ item.label }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, label: "Home", link: "/" },
        { id: 2, label: "About", link: "/about" },
        { id: 3, label: "Dashboard", link: "/dashboard" },
        { id: 4, label: "Profile", link: "/profile" },
        { id: 5, label: "Login", link: "/login" },
        { id: 6, label: "Exam", link: "/exam" },
        { id: 7, label: "Exam Results", link: "/exam-results" },
      ],
    };
  },
};
</script>

<!-- <style scoped>
.navbar {
  display: flex;
  justify-content: center;
  padding: 1rem;
  /* background-color: #f0f0f0; */
}

.navbar-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-list li {
  margin-right: 1rem;
}

.navbar-list a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style> -->
