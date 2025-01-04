import axiosIns from '@axios'

interface State {
  lead: Lead | {}
  leads: Lead[] | []
  statuses: any[] | [];
 tabs: { icon: string; title: string; value: string }[];
  tab: string;
}

export const useLeadStore = defineStore('LeadStore', {
  state: (): State => ({
    lead: {},
    leads: [],
    statuses: [
      {id: 'NEW', name: 'New'},
      {id: 'IN_PROGRESS', name: 'In Progress'},
      {id: 'QUALIFIED', name: 'Qualified'},
      {id: 'UNQUALIFIED', name: 'Unqualified'},
      {id: 'CONVERTED', name: 'Converted'},
    ],
    tabs: [
      {title: 'Contacts', value: 'contacts', icon: 'tabler-users'},
      {title: 'Notes', value: 'notes', icon: 'tabler-alien'},
      {title: 'Reminders', value: 'reminders', icon: 'tabler-user-circle'},
    ],
    tab: 'contacts',
  }),
  actions: {
    async getLeads(params = {}) {
      const { data} = await axiosIns.get<ApiResponse<Lead[]>>('/leads/', { params })
      this.leads = data!
    },
    async getLead(id: string) {
      const { data } = await axiosIns.get<ApiResponse<Lead>>(`/leads/${id}/`)

      this.lead = data!
    },
    async postLead() {
      await axiosIns.post<ApiResponse<Lead>>('/leads/', this.lead)
    },
    async updateLead() {
      await axiosIns.put<ApiResponse<Lead>>(`/leads/${this.lead.id}/`, this.lead)
    },
  },
})
