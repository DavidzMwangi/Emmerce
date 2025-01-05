<script lang="ts" setup>
import {VForm} from "vuetify/components";
import {emailValidator, integerValidator, numberValidator, requiredValidator} from '@validators'
import {useContactStore} from "@/views/contact/useContactStore";

interface DialogEmit {
  (e: 'update:isDialogVisible', value: boolean): void
}

const contactStore = useContactStore()
const {getContacts, getContact, updateContact, postContact} = contactStore
const {contact} = storeToRefs(contactStore)

const route = useRoute()
const lead_id = computed(() => route.params.id ? String(route.params.id) : null)

const isDialogVisible = ref<boolean>(false)
const errors = ref<Record<string, string | undefined>>({})
const contactForm = ref<VForm>()
const open = () => {
  isDialogVisible.value = true
}

const emit = defineEmits<DialogEmit>()

const dialogUpdate = (val: boolean) => {
  isDialogVisible.value = val
  if (!val) {
    contactStore.contact = {}
  }
}
const user = computed(() => localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : {})
const isProcessing = ref(false)
const save = () => {
  contact.value.created_by = user.value.id
  contact.value.lead = lead_id.value
  contactForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      isProcessing.value = true;
      (contact.value?.id ? updateContact : postContact)().then(() => {
        isProcessing.value = false
        getContacts({}, lead_id.value)
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
              Create Contact
            </VBtn>
    </template>

     <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogUpdate(false)" />

       <!-- Dialog Content -->
    <VCard title="Contact Form">
      <VForm ref="contactForm" @submit.prevent="save">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="contact.first_name"
                label="First Name"
                :rules="[requiredValidator]"
                :error-messages="errors.first_name"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="contact.last_name"
                label="Last Name"
                :rules="[requiredValidator]"
                :error-messages="errors.last_name"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="contact.email"
                label="Email"
                :rules="[requiredValidator, emailValidator]"
                :error-messages="errors.email"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="contact.phone"
                label="Phone Number"
                :rules="[requiredValidator]"
                :error-messages="errors.phone"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="contact.position"
                label="Position"
                :rules="[requiredValidator]"
                :error-messages="errors.position"
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
