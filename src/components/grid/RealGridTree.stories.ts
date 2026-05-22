import type { Meta, StoryObj } from '@storybook/vue3'
import {
  CellIndex,
  CellLayoutColumnItem,
  ColumnLayoutDirection,
  GridBase,
  GridCell,
  TreeView
} from 'realgrid'
import RealGridTree from 'hdot-tmaster-front/components/grid/RealGridTree.vue'
// @ts-ignore
import type { ColumnLayout, Columns } from 'hdot-tmaster-front/types/grid'
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

function formatVolume(value: unknown, decimals = 3): string | undefined {
  if (!value) return undefined
  const str = String(value)
  if (!str.replace(/\D/g, '')) return undefined
  const parts = Number(str).toFixed(decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const columns: Columns = {
  num: {
    name: 'num',
    width: 65,
    header: {
      text: 'No | .',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: 'No', bottom: '.' }
    },
    styleName: 'multiline-pre-line multiline-pre left-tab',
    displayCallback: (_: GridBase, __: CellIndex, value: unknown) => {
      return value === '0' ? '' : String(value ?? '')
    }
  },
  work_ord_no__task_id: {
    name: 'work_ord_no__task_id',
    width: 120,
    header: {
      text: '작업오더번호 | Task구분',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: '작업오더번호', bottom: 'Task구분' }
    },
    styleName: 'multiline-pre-line multiline-pre',
    styleCallback: (_view: TreeView, dataCell: GridCell) => {
      if (Number.isNaN(parseInt(String(dataCell?.value)))) {
        return { styleName: 'grid-cell-pointer-text-blue' }
      }
    }
  },
  ord_ty: {
    name: 'ord_ty',
    width: 70,
    header: {
      text: '오더유형 | 입출고구분',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: '오더유형', bottom: '입출고구분' }
    },
    styleName: 'multiline-pre-line multiline-pre',
    lookupDisplay: true,
    values: [],
    labels: []
  },
  cmpny_nm: {
    name: 'cmpny_nm',
    width: 240,
    header: { text: '거래처(화주)' },
    styleName: 'multiline-pre-line multiline-pre'
  },
  ord_sttus__work_sttus_display: {
    name: 'ord_sttus__work_sttus_display',
    width: 80,
    header: {
      text: '오더상태 | 작업상태',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bot}</span>",
      values: { top: '오더상태', bot: '작업상태' }
    },
    styleName: 'multiline-pre-line multiline-pre',
    lookupDisplay: true,
    values: [],
    labels: []
  },
  ord_sttus__work_sttus: {
    name: 'ord_sttus__work_sttus',
    width: 80,
    header: { text: '오더상태' },
    visible: false,
    styleName: 'multiline-pre-line multiline-pre'
  },
  vssl_nm__tank_nm: {
    name: 'vssl_nm__tank_nm',
    width: 150,
    header: {
      text: '선명/차량 | 탱크',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bot}</span>",
      values: { top: '선명/차량', bot: '탱크' }
    },
    styleName: 'multiline-pre-line multiline-pre'
  },
  quay_nm__cargo_nm: {
    name: 'quay_nm__cargo_nm',
    width: 120,
    header: {
      text: '부두/기사 | 화물',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: '부두/기사', bottom: '화물' }
    },
    styleName: 'multiline-pre-line multiline-pre'
  },
  reg_dt__ord_qy: {
    name: 'reg_dt__ord_qy',
    width: 100,
    header: { text: '' },
    styleName: 'multiline-pre-line multiline-pre',
    // 부모 행(오더)은 reg_dt, 자식 행(Task)은 ord_qy 포맷 출력
    displayCallback: (grid: GridBase, index: CellIndex, value: any) => {
      const g = grid as { getDataSource: () => { getJsonRow: (n: number) => { num: number } } }
      const row = g.getDataSource().getJsonRow(index.dataRow ?? 0)
      if (row.num > 0) return String(value ?? '')
      return formatVolume(value)
    },
    // 부모 행일 때 ord_qy_unit 열까지 span
    spanCallback: (grid: GridBase, layout: CellLayoutColumnItem, itemIndex: number) => {
      debugger
      return (grid as TreeView).getParent(itemIndex) === -1 ? 2 : 1
    }
  },
  ord_qy_unit: {
    name: 'ord_qy_unit',
    width: 70,
    header: { text: '' },
    styleName: 'multiline-pre-line multiline-pre'
  },
  gsv_input: {
    name: 'gsv_input',
    width: 100,
    header: { text: '' },
    styleName: 'multiline-pre-line multiline-pre',
    displayCallback: (grid: GridBase, index: CellIndex, value: any) => {
      const g = grid as { getDataSource: () => { getJsonRow: (n: number) => { num: number } } }
      const row = g.getDataSource().getJsonRow(index.dataRow ?? 0)
      if (row.num > 0) return String(value ?? '')
      return formatVolume(value)
    }
  },
  gsv_input_unit: {
    name: 'gsv_input_unit',
    width: 70,
    header: { text: '' },
    styleName: 'multiline-pre-line multiline-pre'
  },
  docking_plan_dt__work_begin_dt: {
    name: 'docking_plan_dt__work_begin_dt',
    width: 120,
    header: {
      text: '접안계획일시 | 작업시작일시',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: '접안계획일시', bottom: '작업시작일시' }
    },
    styleName: 'multiline-pre-line multiline-pre'
  },
  berthing_plan_dt__work_end_dt: {
    name: 'berthing_plan_dt__work_end_dt',
    width: 120,
    header: {
      text: '이안계획일시 | 작업종료일시',
      template:
        "<span style='display: block'>${top}</span><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: '이안계획일시', bottom: '작업종료일시' }
    },
    styleName: 'multiline-pre-line multiline-pre'
  },
  option_string: {
    name: 'option_string',
    width: 120,
    header: { text: '옵션' },
    styleName: 'multiline-pre-line multiline-pre'
  },
  memo: {
    name: 'memo',
    width: 200,
    header: { text: '메모' },
    styleName: 'multiline-pre-line multiline-pre'
  }
}

const layout: ColumnLayout = [
  'num',
  'work_ord_no__task_id',
  'ord_ty',
  'cmpny_nm',
  'ord_sttus__work_sttus_display',
  'ord_sttus__work_sttus',
  'vssl_nm__tank_nm',
  'quay_nm__cargo_nm',
  {
    name: 'reg_dt__ord_qy__ord_qy_unit',
    direction: ColumnLayoutDirection.HORIZONTAL,
    hideChildHeaders: true,
    items: ['reg_dt__ord_qy', 'ord_qy_unit'],
    header: {
      text: '오더요청일 | 오더물량',
      template: "<div>${top}</div><span style='color: #2a99be;'>${bottom}</span>",
      values: { top: '오더요청일', bottom: '오더물량' }
    }
  },
  {
    name: 'gsv_input__gsv_input_unit',
    direction: ColumnLayoutDirection.HORIZONTAL,
    hideChildHeaders: true,
    items: ['gsv_input', 'gsv_input_unit'],
    header: {
      text: '작업물량',
      template:
        "<span style='display: block'>&nbsp;</span><span style='color: #2a99be;'>${top}</span>",
      values: { top: '작업물량' }
    }
  },
  'docking_plan_dt__work_begin_dt',
  'berthing_plan_dt__work_end_dt',
  'option_string',
  'memo'
]

export const Default: Story = {
  args: {
    columns,
    layout,
    rows,
    rowsProp: 'task_list',
    height: '400px',
    headerHeight: 50
  }
}
