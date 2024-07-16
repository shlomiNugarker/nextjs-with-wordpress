import { getApolloClient } from './apollo-client'
import { getTopLevelPages } from './pages'
import { QUERY_ALL_MENUS } from '../data/menus'

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'DEFAULT_NAVIGATION'

/**
 * getAllMenus
 */
export async function getAllMenus() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  })

  const menus = data?.data.menus.edges.map(mapMenuData)

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  })

  menus.push(defaultNavigation)

  return {
    menus,
  }
}

/**
 * mapMenuData
 */
interface MenuItemNode {
  id: string
  uri: string
  title: string
}

interface MenuNode {
  id: string
  menuItems: {
    edges: { node: MenuItemNode }[]
  }
  locations: string[]
}

interface Menu {
  node: MenuNode
}

export function mapMenuData(menu: Menu) {
  const { node } = menu
  const data = { ...node }

  data.menuItems.edges = data.menuItems.edges.map(({ node }) => {
    return { node }
  })

  return data
}

/**
 * mapPagesToMenuItems
 */
interface Page {
  id: string
  uri: string
  title: string
}

interface MenuItem {
  label: string
  path: string
  id: string
}

export function mapPagesToMenuItems(pages: Page[]): MenuItem[] {
  return pages.map(({ id, uri, title }) => {
    return {
      label: title,
      path: uri,
      id,
    }
  })
}

/**
 * createMenuFromPages
 */
interface CreateMenuFromPagesParams {
  locations: string[]
  pages: Page[]
}

export function createMenuFromPages({
  locations,
  pages,
}: CreateMenuFromPagesParams) {
  return {
    menuItems: mapPagesToMenuItems(pages),
    locations,
  }
}

/**
 * parseHierarchicalMenu
 */
interface ParseHierarchicalMenuOptions {
  idKey?: string
  parentKey?: string
  childrenKey?: string
}

export const parseHierarchicalMenu = (
  data: any[] = [],
  {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
  }: ParseHierarchicalMenuOptions = {}
) => {
  const tree: any[] = []
  const childrenOf: { [key: string]: any[] } = {}

  data.forEach((item) => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}

/**
 * findMenuByLocation
 */
interface MenuWithLocation {
  locations: string[]
  menuItems: any[]
}

export function findMenuByLocation(
  menus: MenuWithLocation[],
  location: string
) {
  if (typeof location !== 'string') {
    throw new Error(
      'Failed to find menu by location - location is not a string.'
    )
  }

  const menu = menus.find(({ locations }) => {
    return locations
      .map((loc) => loc.toUpperCase())
      .includes(location.toUpperCase())
  })

  return menu && parseHierarchicalMenu(menu.menuItems)
}
