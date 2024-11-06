<template>
  <div class="spinner">
    <div class="spinner-inner"></div>
  </div>
</template>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top-color: #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

.spinner-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top-color: #3498db;
  animation: spin 2s linear infinite reverse;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
