<script setup>
import { api } from "@/service/api";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
const router = useRouter();

const user = reactive({
  username: "",
  email: "",
  password: "",
});

function register() {
  api
    .post("/register", {
      username: user.username,
      email: user.email,
      password: user.password,
    })

    .then(async () => {
      $toast.success("Berhasil buat akunmu!", {
        position: "top-right",
        duration: 3000,
      });

      await router.push("/login");
    })
    .catch((error) =>
      $toast.error(error.response.data.message, {
        position: "top-right",
        duration: 3000,
      })
    );
}
</script>
<template>
  <main>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="user.username"
          id="username"
          placeholder="Username"
          required
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          type="email"
          v-model="user.email"
          id="email"
          placeholder="Email"
          required
        />
      </div>

      <div>
        <label for="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          id="password"
          placeholder="Password"
          required
        />
      </div>

      <button>Register</button>
    </form>
  </main>
</template>
