import type { Meta, StoryObj } from '@storybook/vue3'
import Button from 'hdot-tmaster-front/components/commons/Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { label: '버튼', variant: 'primary' },
}

export const Secondary: Story = {
  args: { label: '버튼', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { label: '버튼', variant: 'ghost' },
}

export const Small: Story = {
  args: { label: '버튼', size: 'sm' },
}

export const Large: Story = {
  args: { label: '버튼', size: 'lg' },
}
