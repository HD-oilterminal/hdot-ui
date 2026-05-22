import type { Meta, StoryObj } from '@storybook/vue3'
import { useMenuStore } from '@/stores/menu'
import AppSidebar from 'hdot-tmaster-front/components/layout/AppSidebar.vue'

const meta: Meta<typeof AppSidebar> = {
  title: 'Layout/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppSidebar>

const mockMenuLv1 = [
  { menu_id: 'MNU01000', menu_nm: '선박 정보', dsply_ordr: 1 },
  { menu_id: 'MNU02000', menu_nm: '계약 관리', dsply_ordr: 2 },
  { menu_id: 'MNU04000', menu_nm: '선박 운항', dsply_ordr: 3 },
  { menu_id: 'MNU05000', menu_nm: '오퍼레이션', dsply_ordr: 4 },
  { menu_id: 'MNU92000', menu_nm: '유틸리티', dsply_ordr: 99 },
]

const mockMenuLv2 = [
  {
    menu_id: 'MNU01001',
    upper_menu_id: 'MNU01000',
    menu_nm: '선박 목록',
    page_url: '/ship/list',
    dsply_ordr: 1,
  },
  {
    menu_id: 'MNU01002',
    upper_menu_id: 'MNU01000',
    menu_nm: '선박 상세',
    page_url: '/ship/detail',
    dsply_ordr: 2,
  },
  {
    menu_id: 'MNU02001',
    upper_menu_id: 'MNU02000',
    menu_nm: '계약 목록',
    page_url: '/contract/list',
    dsply_ordr: 1,
  },
]

export const Default: Story = {
  decorators: [
    _story => ({
      setup() {
        const menuStore = useMenuStore()
        menuStore.menuLv1 = mockMenuLv1
        menuStore.menuLv2 = mockMenuLv2
        return {}
      },
      template: '<div style="height: 100vh; display: flex;"><story /></div>',
    }),
  ],
}
