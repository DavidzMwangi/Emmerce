<script lang="ts" setup>
import {VForm} from "vuetify/components";
import {useLeadStore} from "@/views/lead/useLeadStore";
import {emailValidator, integerValidator, numberValidator, requiredValidator} from '@validators'

interface DialogEmit {
  (e: 'update:isDialogVisible', value: boolean): void
}
const leadStore = useLeadStore()
const {getLeads, getLead, updateLead, postLead} = leadStore
const {statuses, lead} = storeToRefs(leadStore)



const isDialogVisible = ref<boolean>(false)
const errors = ref<Record<string, string | undefined>>({})
const leadForm = ref<VForm>()
const open = () => {
  isDialogVisible.value = true
}

const emit = defineEmits<DialogEmit>()

const dialogUpdate = (val: boolean) => {
  isDialogVisible.value = val
  if (!val) {
    leadStore.lead = {}
  }
}
const user = computed(() => localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : {})
const isProcessing = ref(false)
const save = () => {
  lead.value.created_by = user.value.id
  leadForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      isProcessing.value = true;
      (lead.value?.id ? updateLead : postLead)().then(() => {
        isProcessing.value = false
        getLeads()
        dialogUpdate(false)
      })
    }
  })
}
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
              Create Lead
            </VBtn>
    </template>

     <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogUpdate(false)" />

       <!-- Dialog Content -->
    <VCard title="Lead Form">
      <VForm ref="leadForm" @submit.prevent="save">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="lead.title"
                label="Name"
                :rules="[requiredValidator]"
                :error-messages="errors.title"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="lead.company"
                label="Company"
                :rules="[requiredValidator]"
                :error-messages="errors.company"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="lead.description"
                label="Description"
                :rules="[requiredValidator]"
                :error-messages="errors.description"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="lead.estimated_value"
                label="Estimated Value"
                :rules="[requiredValidator, numberValidator]"
                :error-messages="errors.estimated_value"
              />
            </VCol>
            <VCol cols="12">
              <VSelect
                v-model="lead.status"
                label="Status"
                :items="statuses"
                item-title="name"
                item-value="id"
                :rules="[requiredValidator]"
                :error-messages="errors.status"
              />
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
