import axiosIns from "@axios";

interface State {
  contact: Contact | {}
  contacts: Contact[] | []
}

export const useContactStore = defineStore('ContactStore', {

  state: (): State => ({
    contact: {},
    contacts: []
  }),
  actions: {
    async getContacts(params = {}, leadId: string) {
      const { data } = await axiosIns.get<ApiResponse<Contact[]>>('/contacts/', { params })
      this.contacts = data!
    },
    async getContact(id: string) {
      const { data } = await axiosIns.get<ApiResponse<Contact>>(`/contacts/${id}/`)

      this.contact = data!
    },
    async postContact() {
      await axiosIns.post<ApiResponse<Contact>>('/contacts/', this.contact)
    },
    async updateContact() {
      await axiosIns.put<ApiResponse<Contact>>(`/contacts/${this.contact.id}/`, this.contact)
    },
  },
})
