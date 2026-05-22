import type { Meta, StoryObj } from '@storybook/vue3'
import PlaceholderPage from 'hdot-tmaster-front/components/mdi/PlaceholderPage.vue'

const meta: Meta<typeof PlaceholderPage> = {
  title: 'MDI/PlaceholderPage',
  component: PlaceholderPage,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PlaceholderPage>

export const Default: Story = {}

export const WithTitle: Story = {
  args: { title: '선박 정보' },
}
