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
    class="relative flex justify-between gap-10 p-6 bg-white shadow-md rounded-2xl transition-all duration-300 ease-out h-52"
  >
    <div class="">
      <h4 class="font-medium text-xl capitalize">{{ title }}</h4>

      <p class="text-gray-600 line-clamp-3 mt-4">{{ content }}</p>
    </div>
    <p class="absolute bottom-4 font-light text-sm mt-1">
      {{ formatDate(createdAt) }}
    </p>
    <!-- <div class="inline-flex items-center">
      <button class="btn-delete">Delete</button>
    </div> -->
  </RouterLink>
</template>
