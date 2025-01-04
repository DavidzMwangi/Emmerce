<script setup lang="ts">
// 👉 Store
import LeadForm from "@/views/lead/LeadForm.vue";
import {useLeadStore} from "@/views/lead/useLeadStore";

const leadStore = useLeadStore()
const {getLeads, getLead} = leadStore
const {leads, statuses} = storeToRefs(leadStore)

const leadDialog = ref()

// 👉 Fetch Feedbacks
watchEffect(() => getLeads())

const edit = (id: string) => {
  getLead(id).then(() => leadDialog.value.open())
}

const resolveStatusVariant = (status: number) => {
  if (status === 0)
    return {color: 'primary', text: 'Pending'}
  else
    return {color: 'success', text: 'Resolved'}
}
</script>

<template>
  <VCard
    id="feedback-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">

      <div class="me-3">
        <LeadForm ref="leadDialog"/>
      </div>

      <VSpacer/>

    </VCardText>

    <VDivider/>

    <VTable class="text-no-wrap feedback-list-table">
      <thead class="text-uppercase">
      <tr>

        <th
          scope="col"
        >
          Title
        </th>

        <th scope="col">
          Company
        </th>

        <th scope="col">
          Description
        </th>

        <th scope="col">
          Status
        </th>


        <th scope="col">
          Created By
        </th>

        <th scope="col">
          Creation Time
        </th>
        <th
          scope="col"
        >
          Actions
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="lead in leads"
        :key="lead.id"
        style="height: 3.75rem;"
      >
        <td>{{ lead.title }}</td>
        <td>{{ lead.company }}</td>
        <td>{{ lead.description }}</td>
        <td>{{statuses.find((stat) => stat.id === lead.status)?.name || 'Unknown'}}</td>
        <td>{{ lead.created_by_name }}</td>
        <td>{{ useDateFormat(lead.created_at, "MMM, DD YYYY HH:mm").value }}</td>
        <td style="width: 8rem;">
          <VBtn
            icon
            variant="text"
            color="default"
            size="x-small"
            @click="edit(lead.id)"
          >
            <VIcon
              icon="tabler-pencil"
              :size="22"
            />
          </VBtn>
        </td>
      </tr>
      </tbody>
      <tfoot v-show="!leads.length">
      <tr>
        <td
          colspan="3"
          class="text-center text-body-1"
        >
          No data available
        </td>
      </tr>
      </tfoot>
    </VTable>

    <VDivider/>

  </VCard>
</template>

<style lang="scss">
#feedback-list {
  .feedback-list-actions {
    inline-size: 8rem;
  }

  .feedback-list-filter {
    inline-size: 12rem;
  }
}
</style>

