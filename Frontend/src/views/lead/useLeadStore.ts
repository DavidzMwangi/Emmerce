import axiosIns from '@axios'

interface State {
  // eslint-disable-next-line @typescript-eslint/ban-types
  lead: Lead | {}
  leads: Lead[] | []
}

export const useLeadStore = defineStore('LeadStore', {
  state: (): State => ({
    lead: {},
    leads: [],
  }),
  actions: {
    async getLeads(params = {}) {
      const { data} = await axiosIns.get<ApiResponse<Lead[]>>('/leads/', { params })
      this.leads = data!
    },
    async getLead(id: string) {
      const { data } = await axiosIns.get<ApiResponse<Lead>>(`/lead/${id}`)

      this.lead = data.data!
    },
    async postLead() {
      await axiosIns.post<ApiResponse<Lead>>('/lead', this.lead)
    },
    async updateLead() {
      await axiosIns.put<ApiResponse<Lead>>(`/lead/${this.lead.id}`, this.lead)
    },
  },
})
