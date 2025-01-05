import type { HorizontalNavItems } from '@layouts/types'

export default [
    {
    title: 'Dashboard',
    to: { name: 'dashboard' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Lead',
    to: { name: 'lead' },
    icon: { icon: 'tabler-user' },
  },
] as HorizontalNavItems
