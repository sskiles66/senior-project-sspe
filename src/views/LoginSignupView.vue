<script setup>
import { ref } from "vue";
import axios from "axios";
const isLoggingIn = ref(true);
const nameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const message = ref();
const firstNameError = ref("");
const emailError = ref("");
const passwordError = ref("");

const validateFirstName = () => {
  firstNameError.value = nameInput.value.trim() === '' ? 'First name is required.' : '';
};

const validateEmail = () => {
  emailError.value = emailInput.value.trim() === '' ? 'Email is required and needs to be a valid email.' : '';
};

const validatePassword = () => {
  passwordError.value = passwordInput.value.length < 8 ? 'Password must be at least 8 characters long.' : '';
};

const handleFormChange = () => {
  isLoggingIn.value = !isLoggingIn.value;
  message.value = "";
  nameInput.value = "";
  firstNameError.value = "";
  emailInput.value = "";
  emailError.value = "";
  passwordInput.value = "";
  passwordError.value = "";
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (isLoggingIn.value) {
    console.log("logging in ");
    try {
      const loginUserResponse = await axios.post(
        `http://localhost:5053/api/Auth`,
        {
          password_hash: passwordInput.value,
          email: emailInput.value,
        }
      );
      if (loginUserResponse.status == 200) {
        console.log("Success login now generating token");
        try {
          const createTokenResponse = await axios.post(
            `http://localhost:5053/api/Auth/${loginUserResponse.data.id}`
          );
          // console.log(createTokenResponse.data);
          localStorage.setItem("token", createTokenResponse.data);
          window.location.href = "/Profile";
        } catch (error) {
          console.log(error, "test2");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status == 404) {
        message.value = {
          messageType: "error",
          messageText: "User not found.",
        };
      } else if (error.status == 401) {
        message.value = {
          messageType: "error",
          messageText: "Incorrect password.",
        };
      }
      if (error.response.status == 400) {
        let messageText = "";
        if (error.response.data.errors) {
          for (const key in error.response.data.errors) {
            const errorMessages = error.response.data.errors[key];
            // Iterate over each error message in the array
            errorMessages.forEach((errorMessage) => {
              messageText += errorMessage;
            });
          }
        }else{
          messageText = error.response.data
        }
        message.value = {
          messageType: "error",
          messageText: messageText,
        };
      }
    }
  } else {
    console.log("signing up");
    try {
      const createUserResponse = await axios.post(
        `http://localhost:5053/api/Users`,
        {
          password_hash: passwordInput.value,
          name: nameInput.value,
          email: emailInput.value,
        }
      );
      if (createUserResponse.status == 200) {
        console.log("Success creation now generating token");
        try {
          const createTokenResponse = await axios.post(
            `http://localhost:5053/api/Auth/${createUserResponse.data.id}`
          );
          // console.log(createTokenResponse.data);
          localStorage.setItem("token", createTokenResponse.data);
          window.location.href = "/Profile";
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      if (error.response.status == 400) {
        let messageText = "";
        if (error.response.data.errors) {
          for (const key in error.response.data.errors) {
            const errorMessages = error.response.data.errors[key];
            // Iterate over each error message in the array
            errorMessages.forEach((errorMessage) => {
              messageText += errorMessage;
            });
          }
        }else{
          messageText = error.response.data
        }
        message.value = {
          messageType: "error",
          messageText: messageText,
        };
      }
      console.error("Error saving user data:", error);
    }
  }
};
</script>

<template>
  <main class="container mx-auto p-4">
    <div class="flex flex-col items-center justify-center mt-20">
      <h1 class="main-blue-font-color text-4xl font-bold mb-4 title-font">
        {{ isLoggingIn ? "Login" : "Sign Up" }}
      </h1>
      <div class="w-full max-w-md">
        <form
          class="card-background-color shadow-md rounded px-8 pt-6 pb-8 mb-4"
          @submit="handleFormSubmit"
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
              v-model="nameInput"
              required
              @input="validateFirstName"
            />
            <p v-if="firstNameError" class="error text-red-500 mt-2">{{ firstNameError }}</p>
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
              v-model="emailInput"
              required
              @input="validateEmail"
            />
            <p v-if="emailError" class="error text-red-500 mt-2">{{ emailError }}</p>
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
              v-model="passwordInput"
              required
              minlength="8"
              @input="validatePassword"
            />
            <p v-if="passwordError" class="error text-red-500 mt-2">{{ passwordError }}</p>
          </div>
          <p
            v-if="message"
            class="paragraph-font my-5"
            :class="[
              message.messageType === 'success'
                ? 'text-green-400'
                : 'text-red-500',
            ]"
          >
            {{ message.messageText }}
          </p>
          <div class="flex items-center justify-between">
            <button
              class="blue-background-color hover:bg-blue-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{ isLoggingIn ? "Log In" : "Create Account" }}
            </button>
            <button
              @click="handleFormChange"
              class="main-blue-font-color inline-block align-baseline text-sm font-semibold hover:text-blue-400"
              type="button"
            >
              {{ isLoggingIn ? "Create An Account" : "Log In" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
