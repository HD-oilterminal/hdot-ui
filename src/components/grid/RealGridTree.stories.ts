import type { Meta, StoryObj } from '@storybook/vue3'
import { CellIndex, ColumnLayoutDirection, GridBase, GridCell, TreeView } from 'realgrid'
import RealGridTree from 'hdot-tmaster-front/components/grid/RealGridTree.vue'
import type { ColumnLayout, Columns } from 'hdot-tmaster-front/types/grid'
import { useFormat } from 'hdot-tmaster-front/composables/useFormat'

// mock data
import rows from './RealGridTree.data.json'

const meta: Meta<typeof RealGridTree> = {
  title: 'grid/RealGridTree',
  component: RealGridTree,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text' },
    editable: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof RealGridTree>

const { numeric } = useFormat()

const columns: Columns = {
  number: {
    width: 70,
    header: 'No',
    displaying: (_, __, value) => {
      return value === '0' ? '' : String(value ?? '')
    }
  },
  id: {
    width: 120,
    header: {
      template: '${top}<i>${bottom}</i>',
      values: { top: '소설번호', bottom: '챕터번호' }
    },
    styling: (_, dataCell) => {
      if (Number.isNaN(parseInt(String(dataCell?.value)))) {
        return { styleName: 'grid-cell-pointer-text-blue' }
      }
    }
  },
  genreCode: {
    width: 70,
    header: {
      template: '${top}<i>${bottom}</i>',
      values: { top: '장르코드', bottom: '유형' }
    },
    values: [],
    labels: []
  },
  publisher: {
    header: '출판사'
  },
  statusDisplay: {
    width: 80,
    header: {
      template: '${top}<i>${bot}</i>',
      values: { top: '출판상태', bot: '열람상태' }
    },
    values: [],
    labels: []
  },
  status: {
    width: 80,
    header: '상태',
    visible: false
  },
  name: {
    width: 150,
    header: {
      template: '${top}<i>${bot}</i>',
      values: { top: '소설명', bot: '등장인물' }
    }
  },
  category: {
    width: 120,
    header: {
      template: '${top}<i>${bottom}</i>',
      values: { top: '시리즈', bottom: '장르' }
    }
  },
  dateOrQuantity: {
    displaying: (grid: GridBase, index: CellIndex, value: any) => {
      const row = grid.getDataSource().getJsonRow(index.dataRow ?? 0)
      if (row.number > 0) return String(value ?? '')
      return numeric(value)
    },
    spanning: (grid: GridBase, _, itemIndex: number) => {
      return (grid as TreeView).getParent(itemIndex) === -1 ? 2 : 1
    }
  },
  pageUnit: {
    width: 70
  },
  wordCount: {},
  wordCountUnit: {
    width: 70
  },
  startDate: {
    width: 120,
    header: {
      template: '${top}<i>${bottom}</i>',
      values: { top: '출판예정일', bottom: '열람시작일' }
    }
  },
  endDate: {
    width: 120,
    header: {
      template: '${top}<i>${bottom}</i>',
      values: { top: '발매예정일', bottom: '열람종료일' }
    }
  },
  option: {
    width: 120,
    header: '옵션'
  },
  memo: {
    width: 200,
    header: '메모'
  }
}

const layout: ColumnLayout = [
  'number',
  'id',
  'genreCode',
  'publisher',
  'statusDisplay',
  'status',
  'name',
  'category',
  {
    name: 'dateOrQuantityGroup',
    direction: ColumnLayoutDirection.HORIZONTAL,
    hideChildHeaders: true,
    items: ['dateOrQuantity', 'pageUnit'],
    header: {
      template: '${top}<i>${bottom}</i>',
      values: { top: '등록일', bottom: '페이지수' }
    }
  },
  {
    name: 'wordCountGroup',
    direction: ColumnLayoutDirection.HORIZONTAL,
    hideChildHeaders: true,
    items: ['wordCount', 'wordCountUnit'],
    header: '글자수'
  },
  'startDate',
  'endDate',
  'option',
  'memo'
]

export const Default: Story = {
  args: {
    columns,
    layout,
    rows,
    rowsProp: 'chapters',
    height: '400px',
    headerHeight: 50
  }
}
