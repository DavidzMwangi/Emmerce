import axiosIns from "@axios";

interface State {
  reminder: Reminder | {}
  reminders: Reminder[] | []
}

export const useReminderStore = defineStore('ReminderStore', {

  state: (): State => ({
    reminder: {},
    reminders: []
  }),
  actions: {
    async getReminders(params = {}, leadId: string) {
      const { data } = await axiosIns.get<ApiResponse<Reminder[]>>('/reminders/', { params })
      this.reminders = data!
    },
    async getReminder(id: string) {
      const { data } = await axiosIns.get<ApiResponse<Reminder>>(`/reminders/${id}/`)
      this.reminder = data!
    },
    async postReminder() {
      await axiosIns.post<ApiResponse<Reminder>>('/reminders/', this.reminder)
    },
    async updateReminder() {
      await axiosIns.put<ApiResponse<Reminder>>(`/reminders/${this.reminder.id}/`, this.reminder)
    },
  },
})
