<script lang="ts" setup>
import {VForm} from "vuetify/components";
import {emailValidator, integerValidator, numberValidator, requiredValidator} from '@validators'
import {useReminderStore} from "@/views/reminder/useReminderStore";

interface DialogEmit {
  (e: 'update:isDialogVisible', value: boolean): void
}

const reminderStore = useReminderStore()
const {getReminders, getReminder, updateReminder, postReminder} = reminderStore
const {reminder} = storeToRefs(reminderStore)



const route = useRoute()
const lead_id = computed(() => route.params.id ? String(route.params.id) : null)

const isDialogVisible = ref<boolean>(false)
const errors = ref<Record<string, string | undefined>>({})
const reminderForm = ref<VForm>()
const open = () => {
  isDialogVisible.value = true
}

const emit = defineEmits<DialogEmit>()

const dialogUpdate = (val: boolean) => {
  isDialogVisible.value = val
  if (!val) {
    reminderStore.reminder = {}
  }
}
const user = computed(() => localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : {})
const isProcessing = ref(false)
const save = () => {
  reminder.value.created_by = user.value.id
  reminder.value.lead = lead_id.value
  reminderForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      isProcessing.value = true;
      (reminder.value?.id ? updateReminder : postReminder)().then(() => {
        isProcessing.value = false
        getReminders({}, lead_id.value)
        dialogUpdate(false)
      })
    }
  })
}
const statuses = [
  {id: true, title: 'Mark Complete'},
  {id: false, title: 'Mark As InComplete'}
]

defineExpose({open})
</script>

<template>
  <VDialog v-model="isDialogVisible"
           max-width="600"
           @update:modelValue="dialogUpdate"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
            <VBtn v-bind="props" prepend-icon="tabler-plus">
              Create Reminder
            </VBtn>
    </template>

     <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogUpdate(false)" />

       <!-- Dialog Content -->
    <VCard title="Reminder Form">
      <VForm ref="reminderForm" @submit.prevent="save">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="reminder.title"
                label="Title"
                :rules="[requiredValidator]"
                :error-messages="errors.title"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="reminder.description"
                label="Description"
                :rules="[requiredValidator]"
                :error-messages="errors.description"
              />
            </VCol>
            <VCol cols="6">
              <AppDateTimePicker
                v-model="reminder.due_date"
                label="Due Date"
                :config="{ enableTime: true, dateFormat: 'Y-m-d H:i', inline:true }"
                class="calendar-date-picker"
              />
            </VCol>
            <VCol cols="6">
              <VRadioGroup
                v-model="reminder.completed"
                label="Status"
                inline
              >
                <VRadio
                  v-for="radio in statuses"
                  :key="radio"
                  :label="radio.title"
                  :value="radio.id"
                />
              </VRadioGroup>
            </VCol>
          </VRow>
        </VCardText>
      </VForm>

      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn
          variant="tonal"
          color="secondary"
          @click="dialogUpdate(false)"
        >
          Close
        </VBtn>
        <VBtn @click="save" :disabled="isProcessing" :loading="isProcessing">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>

</style>
