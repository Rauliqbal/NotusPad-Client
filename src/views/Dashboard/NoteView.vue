<script setup>
import DefaultLayout from "@/layout/DefaultLayout.vue";
import { useNotesStore } from "@/store/notes";
import { computed, onMounted, ref } from "vue";
import CardNote from "@/components/Dashboard/CardNote.vue";
import modal from "@/components/Dashboard/Modal.vue";

const noteStore = useNotesStore();
const notes = computed(() => noteStore.notes);
const showModal = ref(false);

onMounted(() => {
  noteStore.fetchNotes();
});
</script>
<template>
  <DefaultLayout>
    <h3 class="text-3xl font-medium text-gray-700">Manage Note</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      <CardNote
        v-for="note in notes"
        :to="'/dashboard/note/' + note._id"
        :key="note._id"
        :title="note.title"
        :content="note.content"
        :createdAt="note.createdAt"
      />
    </div>

    <button
      class="absolute bottom-6 right-6 flex items-center justify-center bg-indigo-500 text-white text-2xl rounded-md w-10 h-10 md:w-14 md:h-14 md:text-3xl"
      id="show-modal"
      @click="showModal = true"
    >
      <i class="ai-plus"></i>
    </button>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="showModal" @close="showModal = false">
        <template #header>
          <h3 class="text-2xl font-semibold">Buat Catatan</h3>
        </template>
        <template #body>
          <form action="">
            <!-- Input Title -->
            <div class="flex flex-col">
              <input
                type="text"
                id="title"
                class="outline-none border-b-2 focus:border-indigo-500 text-xl mt-1"
                placeholder="Judul Catatan"
              />
            </div>
            <!-- Input Content -->
            <div class="flex flex-col mt-4">
              <textarea
                id="content"
                rows="5"
                class="outline-none border-b-2 focus:border-indigo-500 mt-1 bg-slate-100 p-2 rounded-lg"
                placeholder="Apa yang ingin kamu catat?"
              ></textarea>
            </div>
          </form>
        </template>
        <template #footer>
          <button class="btn-primary">Simpan</button>
        </template>
      </modal>
    </Teleport>
  </DefaultLayout>
</template>
