import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MenuLv1Item, MenuLv2Item } from '@/types/menu'

export const useMenuStore = defineStore('menu', () => {
  const menuLv1 = ref<MenuLv1Item[]>([])
  const menuLv2 = ref<MenuLv2Item[]>([])

  const getSubMenus = (upperMenuId: string): MenuLv2Item[] =>
    menuLv2.value.filter(m => m.upper_menu_id === upperMenuId)

  return { menuLv1, menuLv2, getSubMenus }
})
