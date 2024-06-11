import { api } from "@/service/api";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
const token = Cookies.get("auth");

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: null,
  }),
  getters: {},
  actions: {
    // Get All Notes
    async fetchNotes() {
      api.defaults.headers.common["Authorization"] = token;

      try {
        const response = await api.get("/note");
        const { data } = response.data;

        this.notes = data;
      } catch (error) {
        console.log(error);
        this.notes = null;
      }
    },

    // Create Note
  },
});
