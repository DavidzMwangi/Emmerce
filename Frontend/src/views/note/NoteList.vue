<script setup lang="ts">
// 👉 Store
import {useNoteStore} from "@/views/note/useNoteStore";
import NoteForm from "@/views/note/NoteForm.vue";

const noteStore = useNoteStore()
const {getNote, getNotes} = noteStore
const {notes} = storeToRefs(noteStore)

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const noteDialog = ref()

// 👉 Fetch notes
watchEffect(() => {
  if (props.id) {
    getNotes({}, props.id)
  }
})

const edit = (id: string) => {
  getNote(id).then(() => {
    noteDialog.value.open()
  })
}
</script>

<template>
  <VCard
    id="feedback-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-4">

      <div class="me-3">
        <NoteForm ref="noteDialog"/>
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
         Content
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
        v-for="note in notes"
        :key="note.id"
        style="height: 3.75rem;"
      >
        <td>{{ note.content }}</td>
        <td>{{ note.created_by_name }}</td>
        <td>{{ useDateFormat(note.created_at, "MMM, DD YYYY HH:mm").value }}</td>
        <td style="width: 8rem;">
          <VBtn
            icon
            variant="text"
            color="default"
            size="x-small"
            @click="edit(note.id)"
          >
            <VIcon
              icon="tabler-pencil"
              :size="22"
            />
          </VBtn>

        </td>
      </tr>
      </tbody>
      <tfoot v-show="!notes.length">
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

