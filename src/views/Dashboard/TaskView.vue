<script setup>
import DefaultLayout from "@/layout/DefaultLayout.vue";
</script>
<template>
  <DefaultLayout>
    <h3 class="text-3xl font-medium text-gray-700">Manage Task</h3>
    <div>
      <div class="flex justify-center mt-14">
        <div
          class="bg-white max-w-sm rounded-2xl shadow-md p-4 md:p-8 inline-flex flex-col items-center"
        >
          <div
            class="rounded-full w-20 h-20 text-4xl flex items-center justify-center bg-blue-200 mb-6"
          >
            <i class="ai-schedule"></i>
          </div>
          <h5 class="text-2xl font-semibold mb-4 text-center">
            Oops! Belum ada catatan
          </h5>
          <p class="text-gray-500 text-center">
            Kamu mungkin harus membuat catatan, Cick disini
          </p>
          <button
            class="btn-primary mt-8"
            @click="showModal = true"
            id="show-modal"
          >
            Buat Catatan
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <!-- :to="'/dashboard/note/' + note._id" -->
        <!-- <CardNote
          v-for="note in notes"
          :key="note._id"
          :title="note.title"
          :content="note.content"
          :createdAt="note.createdAt"
        /> -->
      </div>
    </div>
  </DefaultLayout>
</template>
