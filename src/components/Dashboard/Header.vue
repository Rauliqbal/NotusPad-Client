<script setup>
import { computed, onMounted, ref } from "vue";
import { useSidebar } from "../composables/useSidebar";
import { api } from "@/service/api";
import { useUserStore } from "@/store/user";
import { useToast } from "vue-toast-notification";

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();
const $toast = useToast();

function logout() {
  localStorage.removeItem("access_token");

  $toast.info("Logout success", {
    position: "top-right",
    duration: 3000,
  });
  window.location.reload();
}

function getInitials(name) {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
}

const userStore = useUserStore();
const user = computed(() => userStore.user);

onMounted(() => userStore.fetcUser());
</script>

<template>
  <header class="p-4">
    <div
      class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600 rounded-2xl"
    >
      <div class="flex items-center">
        <button
          class="text-gray-500 focus:outline-none lg:hidden"
          @click="isOpen = true"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="relative mx-4 lg:mx-0">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <input
            class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div class="flex items-center">
        <div class="relative">
          <div class="flex items-center gap-4">
            <p class="text-gray-600 font-medium hidden md:block capitalize">
              Hi! {{ user?.username }}
            </p>
            <button
              class="z-10 block w-10 h-10 bg-gray-200 overflow-hidden rounded-full shadow focus:outline-none"
              @click="dropdownOpen = !dropdownOpen"
            >
              <span class="text-xl font-bold text-indigo-500">
                {{ getInitials(user?.username) }}
              </span>
            </button>
          </div>

          <div
            v-show="dropdownOpen"
            class="fixed inset-0 z-10 w-full h-full"
            @click="dropdownOpen = false"
          />

          <transition
            enter-active-class="transition duration-150 ease-out transform"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in transform"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
          >
            <div
              v-show="dropdownOpen"
              class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
            >
              <RouterLink
                to="/dashboard/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                >Profile
              </RouterLink>

              <button
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white w-full text-left"
              >
                Log out
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>
