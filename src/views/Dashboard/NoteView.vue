<script setup>
import DefaultLayout from "@/layout/DefaultLayout.vue";
import { useNotesStore } from "@/store/notes";
import { computed, onMounted, reactive, ref } from "vue";
import CardNote from "@/components/Dashboard/CardNote.vue";
import modal from "@/components/Dashboard/Modal.vue";
import { api } from "@/service/api";
import { useToast } from "vue-toast-notification";
import Cookies from "js-cookie";

const noteStore = useNotesStore();
const notes = computed(() => noteStore.notes);
const showModal = ref(false);
const form = reactive({
  title: "",
  content: "",
});
const $toast = useToast();
const token = Cookies.get("auth");

function createNote() {
  api.defaults.headers.common["Authorization"] = token;
  try {
    const response = api.post("/note", {
      title: form.title,
      content: form.content,
    });

    $toast.success("Catatan berhasil dibuat", {
      position: "top-right",
      duration: 3000,
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  noteStore.fetchNotes();
});
</script>
<template>
  <DefaultLayout>
    <h3 class="text-3xl font-medium text-gray-700">Manage Note</h3>

    <div>
      <div v-if="notes?.length == 0" class="flex justify-center mt-14">
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
        <CardNote
          v-for="note in notes"
          :key="note._id"
          :title="note.title"
          :content="note.content"
          :createdAt="note.createdAt"
        />
      </div>
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
          <form @submit="createNote">
            <!-- Input Title -->
            <div class="flex flex-col">
              <input
                type="text"
                id="title"
                class="outline-none border-b-2 focus:border-indigo-500 text-xl mt-1"
                placeholder="Judul Catatan"
                v-model="form.title"
              />
            </div>
            <!-- Input Content -->
            <div class="flex flex-col mt-4">
              <textarea
                id="content"
                rows="5"
                class="outline-none border-b-2 focus:border-indigo-500 mt-1 bg-slate-100 p-2 rounded-lg"
                placeholder="Apa yang ingin kamu catat?"
                v-model="form.content"
              ></textarea>
            </div>

            <button type="submit" class="btn-primary mt-8">Simpan</button>
          </form>
        </template>
      </modal>
    </Teleport>
  </DefaultLayout>
</template>
