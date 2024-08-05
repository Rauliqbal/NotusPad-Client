<script setup>
import modal from "@/components/Dashboard/Modal.vue";

import { ref } from "vue";

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

const modalDelete = ref(false);
</script>
<template>
  <div>
    <!-- Card Note -->
    <div
      class="bg-white shadow-md rounded-2xl transition-all duration-300 ease-out h-52 p-4 sm:p-6 flex flex-col justify-between"
    >
      <RouterLink :to="to">
        <div>
          <h4 class="font-medium text-xl capitalize">{{ title }}</h4>
          <p class="text-gray-600 line-clamp-3 mt-4" v-html="content"></p>
        </div>
      </RouterLink>
      <div class="flex items-center justify-between">
        <p class="font-light text-gray-500 text-sm">
          {{ formatDate(createdAt) }}
        </p>
        <button
          class="text-lg md:text-xl w-8 h-8 md:w-10 md:h-10 rounded-lg ring-1 ring-red-500 hover:bg-red-500 hover:text-white text-red-500 flext items-center justify-center transition-all duration-300"
          type="button"
          @click="modalDelete = true"
        >
          <i class="ai-trash-can"></i>
        </button>
      </div>
    </div>

    <!-- Modal Delete -->
    <Transition name="modal">
      <div
        v-if="modalDelete"
        class="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex p-6 transition-opacity duration-300"
        @click="modalDelete = false"
      >
        <div class="modal-container !max-w-md">
          <div class="modal-body">
            <p class="text-sm md:text-lg">yakin ingin hapus catatan ?</p>

            <div class="flex justify-end gap-4 mt-8">
              <button
                type="submit"
                @click="$emit('deleteNote')"
                class="btn-primary mt-8"
              >
                iyaa
              </button>
              <button class="btn-delete mt-8" @close="modalDelete = false">
                tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- <Teleport to="body">
      <modal :show="modalDelete">
        <template #header>
          <h3 class="text-2xl font-semibold">Buat Catatan</h3>
        </template>
        <template #body>
          <p>yakin ingin hapus catatan ?</p>

          <button
            type="submit"
            @click="$emit('deleteNote')"
            class="btn-primary mt-8"
          >
            iyaa
          </button>
          <button class="btn-delete mt-8" @close="modalDelete = false">
            tidak
          </button>
        </template>
      </modal>
    </Teleport> -->
  </div>
</template>
