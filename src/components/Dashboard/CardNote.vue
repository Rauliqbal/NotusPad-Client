<script setup>
defineProps({
  title: String,
  content: String,
  createdAt: String,
  to: String,
});

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
</script>
<template>
  <RouterLink
    :to="to"
    class="bg-white shadow-md rounded-2xl transition-all duration-300 ease-out h-52"
  >
    <div class="flex flex-col justify-between p-6 w-full h-full">
      <div>
        <h4 class="font-medium text-xl capitalize">{{ title }}</h4>

        <p class="text-gray-600 line-clamp-3 mt-4" v-html="content"></p>
      </div>

      <div class="flex items-center justify-between mt-4">
        <p class="font-light text-gray-500 text-sm">
          {{ formatDate(createdAt) }}
        </p>
        <button
          class="text-lg md:text-xl w-8 h-8 md:w-10 md:h-10 rounded-lg ring-1 ring-red-500 hover:bg-red-500 hover:text-white text-red-500 flext items-center justify-center transition-all duration-300"
          @click="$emit('deleteNote')"
        >
          <i class="ai-trash-can"></i>
        </button>
      </div>
    </div>
  </RouterLink>
</template>
