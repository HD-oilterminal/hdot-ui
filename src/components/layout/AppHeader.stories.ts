import type { Meta, StoryObj } from '@storybook/vue3'
import { useMdiStore } from '@/stores/mdi'
import AppHeader from 'hdot-tmaster-front/components/layout/AppHeader.vue'

type Story = StoryObj<typeof AppHeader>

export default {
  title: 'Layout/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppHeader>

export const Default: Story = {
  decorators: [
    _ => ({
      setup() {
        const mdiStore = useMdiStore()
        mdiStore.tabs = [
          { id: 'a', menuId: 'a', title: '메인', closable: false },
          { id: 'b', menuId: 'b', title: '어떤 업무', closable: true },
          { id: 'c', menuId: 'c', title: '그런 작업', closable: true },
          { id: 'd', menuId: 'd', title: '저런 관리', closable: true },
        ]
        mdiStore.activeTabId = 'a'
        return {}
      },
      template: '<story />',
    }),
  ],
}
