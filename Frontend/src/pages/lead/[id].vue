<script setup lang="ts">

import {useLeadStore} from "@/views/lead/useLeadStore";
import {useResponsiveLeftSidebar} from "@core/composable/useResponsiveSidebar";
import ContactList from "@/views/contact/ContactList.vue";
import NoteList from "@/views/note/NoteList.vue";
import ReminderList from "@/views/reminder/ReminderList.vue";

const leadStore = useLeadStore()
const {getLeads, getLead} = leadStore
const { statuses, tab, tabs, lead} = storeToRefs(leadStore)

const route = useRoute()
const id = computed(() => route.params.id ? String(route.params.id) : null)
// 👉 Store
watchEffect(() => {
  if (id.value) {
    getLead(id.value)
  }
})
const {isLeftSidebarOpen} = useResponsiveLeftSidebar()
</script>

<template>
<VCard>
    <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
    <VLayout style="z-index: 0;">
      <!-- 👉 Navigation drawer -->
      <VNavigationDrawer
        v-model="isLeftSidebarOpen"
        width="292"
        height="150"
        absolute
        touchless
        location="start"
        class="calendar-add-event-drawer"
        :temporary="$vuetify.display.mdAndDown"
      >
        <VToolbar color="primary" :title="lead.title"/>
        <VDivider/>
        <VList
          nav
          :lines="false"
        >
          <VListItem
            v-for="item in tabs"
            :key="item.value"
            :value="item.value"
            :active="tab === item.value"
            @click="tab = item.value"
          >
            <template #prepend>
              <VIcon :icon="item.icon"/>
            </template>

            <VListItemTitle>
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VNavigationDrawer>

      <VMain style="min-height: 60vh">
        <VToolbar flat>
          <VBtn
            icon
            variant="plain"
            @click="isLeftSidebarOpen = !isLeftSidebarOpen"
          >
            <VIcon :icon="isLeftSidebarOpen ? 'tabler-x' : 'tabler-menu-2'" />
          </VBtn>
          <VToolbarTitle class="text-capitalize">{{ tab }}</VToolbarTitle>
        </VToolbar>
        <VCard flat>
          <VCardText>
            <VWindow v-model="tab">
              <VWindowItem value="contacts">
                <ContactList :id="id"/>
              </VWindowItem>
              <VWindowItem value="notes">
                <NoteList :id="id"/>
              </VWindowItem>
              <VWindowItem value="reminders">
                <ReminderList :id="id"/>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCard>
      </VMain>
    </VLayout>
  </VCard>
</template>

<style scoped lang="scss">
#order-list {
  .order-list-actions {
    inline-size: 8rem;
  }

  .order-list-filter {
    inline-size: 12rem;
  }
}
</style>
