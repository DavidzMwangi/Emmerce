<script setup lang="ts">
// 👉 Store
import ContactForm from "@/views/contact/ContactForm.vue";
import {useContactStore} from "@/views/contact/useContactStore";

const contactStore = useContactStore()
const {getContacts, getContact} = contactStore
const {contacts} = storeToRefs(contactStore)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const contactDialog = ref()

// 👉 Fetch Feedbacks
watchEffect(() => {
  if (props.id) {
    getContacts({}, props.id)
  }
})

const edit = (id: string) => {
  getContact(id).then(() => {
    contactDialog.value.open()
  })
}
</script>

<template>
  <VCard
    id="feedback-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">

      <div class="me-3">
        <ContactForm ref="contactDialog"/>
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
          First Name
        </th>

        <th scope="col">
          Last Name
        </th>

        <th scope="col">
          Email
        </th>

        <th scope="col">
          Phone
        </th>


        <th scope="col">
         Position
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
        v-for="contact in contacts"
        :key="contact.id"
        style="height: 3.75rem;"
      >
        <td>{{ contact.first_name }}</td>
        <td>{{ contact.last_name }}</td>
        <td>{{ contact.email }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.position }}</td>
        <td>{{ useDateFormat(contact.created_at, "MMM, DD YYYY HH:mm").value }}</td>
        <td style="width: 8rem;">
          <VBtn
            icon
            variant="text"
            color="default"
            size="x-small"
            @click="edit(contact.id)"
          >
            <VIcon
              icon="tabler-pencil"
              :size="22"
            />
          </VBtn>

        </td>
      </tr>
      </tbody>
      <tfoot v-show="!contacts.length">
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

