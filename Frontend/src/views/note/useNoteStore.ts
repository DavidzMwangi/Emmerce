import axiosIns from "@axios";

interface State {
  note: Note | {}
  notes: Note[] | []
}

export const useNoteStore = defineStore('NoteStore', {

  state: (): State => ({
    note: {},
    notes: []
  }),
  actions: {
    async getNotes(params = {}, leadId: string) {
      const { data } = await axiosIns.get<ApiResponse<Note[]>>('/notes/', { params })
      this.notes = data!
    },
    async getNote(id: string) {
      const { data } = await axiosIns.get<ApiResponse<Note>>(`/notes/${id}/`)
      this.note = data!
    },
    async postNote() {
      await axiosIns.post<ApiResponse<Note>>('/notes/', this.note)
    },
    async updateNote() {
      await axiosIns.put<ApiResponse<Note>>(`/notes/${this.note.id}/`, this.note)
    },
  },
})
