<script lang="ts" setup>
import {VForm} from "vuetify/components";
import {emailValidator, integerValidator, numberValidator, requiredValidator} from '@validators'
import {useNoteStore} from "@/views/note/useNoteStore";

interface DialogEmit {
  (e: 'update:isDialogVisible', value: boolean): void
}

const noteStore = useNoteStore()
const {getNotes, getNote, updateNote, postNote} = noteStore
const {note} = storeToRefs(noteStore)

const route = useRoute()
const lead_id = computed(() => route.params.id ? String(route.params.id) : null)

const isDialogVisible = ref<boolean>(false)
const errors = ref<Record<string, string | undefined>>({})
const noteForm = ref<VForm>()
const open = () => {
  isDialogVisible.value = true
}

const emit = defineEmits<DialogEmit>()

const dialogUpdate = (val: boolean) => {
  isDialogVisible.value = val
  if (!val) {
    noteStore.note = {}
  }
}
const user = computed(() => localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : {})
const isProcessing = ref(false)
const save = () => {
  note.value.created_by = user.value.id
  note.value.lead = lead_id.value
  noteForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      isProcessing.value = true;
      (note.value?.id ? updateNote : postNote)().then(() => {
        isProcessing.value = false
        getNotes({}, lead_id)
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
              Create Note
            </VBtn>
    </template>

     <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogUpdate(false)" />

       <!-- Dialog Content -->
    <VCard title="Note Form">
      <VForm ref="noteForm" @submit.prevent="save">
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="note.content"
                label="Content"
                :rules="[requiredValidator]"
                :error-messages="errors.content"
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
