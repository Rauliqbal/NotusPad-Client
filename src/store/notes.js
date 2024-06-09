import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [
      {
        title: "title 1",
        content: "content 1",
      },
      {
        title: "title 2",
        content: "content 2",
      },
    ],
  }),
  getters: {},
  actions: {},
});
