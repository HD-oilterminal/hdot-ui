import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import RealGrid, { CalendarMode, SelectionStyle } from 'realgrid'
import '../src/assets/tailwind.css'
import kr from '../src/i18n/kr'

RealGrid.setLicenseKey(import.meta.env.VITE_REALGRID_KEY)
RealGrid.setDefault({
  editor: {
    dateCellEditor: {
      viewMode: CalendarMode.MONTH,
    },
    numberCellEditor: {
      showStepButton: true,
    },
  },
  edit: {
    editable: false,
    checkable: true,
    commitByCell: true,
    commitWhenLeave: true,
    columnEditableFirst: false,
    movable: false,
  },
  rowIndicator: {
    visible: false,
  },
  stateBar: {
    visible: false,
  },
  checkBar: {
    visible: true,
  },
  header: {
    height: 30,
  },
  footer: {
    visible: false,
  },
  display: {
    rowHeight: -1,
    minRowHeight: 28,
    maxRowHeight: 26,
    rowResizable: true,
    eachRowResizable: true,
    selectionStyle: SelectionStyle.ROWS,
    vscrollBar: true,
  },
})

const pinia = createPinia()
setActivePinia(pinia)

const i18n = createI18n({ legacy: false, locale: 'kr', messages: { kr } })

setup(app => {
  app.use(pinia)
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
