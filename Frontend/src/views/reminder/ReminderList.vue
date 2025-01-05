<script setup lang="ts">
// 👉 Store
import ReminderForm from "@/views/reminder/ReminderForm.vue";
import {useReminderStore} from "@/views/reminder/useReminderStore";

const reminderStore = useReminderStore()
const {getReminder, getReminders} = reminderStore
const {reminders} = storeToRefs(reminderStore)

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const reminderDialog = ref()

// 👉 Fetch reminders
watchEffect(() => {
  if (props.id) {
    getReminders({}, props.id)
  }
})

const edit = (id: string) => {
  getReminder(id).then(() => {
    reminderDialog.value.open()
  })
}
const resolveCompleteVariant = (completed: boolean) => {
  if (completed)
    return {color: 'primary', text: 'Completed'}
  else
    return {color: 'warning', text: 'In-Complete'}
}
</script>

<template>
  <VCard
    id="feedback-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">

      <div class="me-3">
        <ReminderForm ref="reminderDialog"/>
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
        <th
          scope="col"
        >
         Description
        </th>
        <th
          scope="col"
        >
         Due Date
        </th>
        <th
          scope="col"
        >
         Completion Status
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
        v-for="reminder in reminders"
        :key="reminder.id"
        style="height: 3.75rem;"
      >
        <td>{{ reminder.title }}</td>
        <td>{{ reminder.description }}</td>
        <td>{{ useDateFormat(reminder.due_date, "MMM, DD YYYY HH:mm").value  }}</td>
        <td>
           <VChip
            :color="resolveCompleteVariant(reminder.completed).color"
            density="comfortable"
            class="font-weight-medium"
            size="small"
          >
            {{ resolveCompleteVariant(reminder.completed).text }}
          </VChip>

        </td>


        <td>{{ reminder.created_by_name }}</td>
        <td>{{ useDateFormat(reminder.created_at, "MMM, DD YYYY HH:mm").value }}</td>
        <td style="width: 8rem;">
          <VBtn
            icon
            variant="text"
            color="default"
            size="x-small"
            @click="edit(reminder.id)"
          >
            <VIcon
              icon="tabler-pencil"
              :size="22"
            />
          </VBtn>

        </td>
      </tr>
      </tbody>
      <tfoot v-show="!reminders.length">
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

