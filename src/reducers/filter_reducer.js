import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map(p => p.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state, all_products: [...action.payload], filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {
    const { filtered_products: products, sort } = state
    let temporaryArry = [...products]

    if (sort === "price-lowest") {
      temporaryArry = temporaryArry.sort((a, b) => a.price - b.price)
    }

    if (sort === "price-highest") {
      temporaryArry = temporaryArry.sort((a, b) => b.price - a.price)
    }

    if (sort === "name-a") {
      temporaryArry = temporaryArry.sort((a, b) => a.name.localeCompare(b.name))
    }

    if (sort === "name-z") {
      temporaryArry = temporaryArry.sort((a, b) => b.name.localeCompare(a.name))
    }

    return { ...state, filtered_products: temporaryArry }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        colors: 'all',
        shipping: false,
        price: state.filters.max_price
      }
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text,
      category,
      company,
      colors,
      price,
      shipping } = state.filters
    let tempProducts = [...all_products]

    if (text) {
      tempProducts = tempProducts.filter(p => {
        return p.name.toLowerCase().startsWith(text)
      })
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter(p => {
        return p.company.toLowerCase() === company
      })
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter(p => {
        return p.category.toLowerCase() === category
      })
    }

    if (shipping) {
      tempProducts = tempProducts.filter(p => {
        return p.shipping === true
      })
    }

    tempProducts = tempProducts.filter(p => p.price <= price)

    if (colors !== 'all') {
      tempProducts = tempProducts.filter(p => {
        return p.colors.find(c => c === colors)
      })
    }

    return { ...state, filtered_products: tempProducts }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
