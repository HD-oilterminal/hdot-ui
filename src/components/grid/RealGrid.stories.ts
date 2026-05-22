import type { Meta, StoryObj } from '@storybook/vue3'
import RealGrid from 'hdot-tmaster-front/components/grid/RealGrid.vue'
import { ValueType } from 'realgrid'
import rows from './ReadGrid.data.json'

const meta: Meta<typeof RealGrid> = {
  title: 'grid/RealGrid',
  component: RealGrid,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text' },
    editable: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof RealGrid>

const columns = {
  artist: { name: '아티스트', width: 120 },
  title: { name: '곡명', width: 180 },
  album: { name: '앨범', width: 160 },
  plays: { name: '재생수', width: 90, type: ValueType.NUMBER }
}

export const Default: Story = {
  args: {
    columns,
    rows,
    height: '300px',
    editable: false
  }
}
