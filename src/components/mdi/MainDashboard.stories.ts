import type { Meta, StoryObj } from '@storybook/vue3'
import MainDashboard from 'hdot-tmaster-front/components/mdi/MainDashboard.vue'

const meta: Meta<typeof MainDashboard> = {
  title: 'MDI/MainDashboard',
  component: MainDashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof MainDashboard>

export const Default: Story = {
  decorators: [
    story => ({
      template: '<div style="height: 100vh;"><story /></div>',
    }),
  ],
}
