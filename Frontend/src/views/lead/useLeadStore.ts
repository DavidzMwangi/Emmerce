import axiosIns from '@axios'

interface State {
  // eslint-disable-next-line @typescript-eslint/ban-types
  lead: Lead | {}
  leads: Lead[] | []
  statuses: any[] | [];

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
