import type { Meta, StoryObj } from '@storybook/vue3'
import SearchInput from 'hdot-tmaster-front/components/commons/SearchInput.vue'

const meta: Meta<typeof SearchInput> = {
  title: 'Common/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    modelValue: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: {
    placeholder: '쓰시옵거나 찾으시거나',
    modelValue: '',
  },
}

export const WithValue: Story = {
  args: {
    placeholder: '쓰시옵거나 찾으시거나',
    modelValue: 'MNU01',
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: '쓰시옵거나 찾으시거나',
    modelValue: '',
  },
}
