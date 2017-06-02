const partCategories = (state = [], action) => {
  switch(action.type) {
    case 'PART_CATEGORIES':
      return action.categories;
    case 'ADD_PART_CATEGORY':
      return [
        ...state,
        action.category
      ]
    case 'EDIT_PART_CATEGORY':
      return state.map( c => {
        if (c.id === action.category.id)
          return action.category
        return c
      })
    case 'REMOVE_PART_CATEGORY':
      return state.filter( c => c.id !== action.id )
    default:
     return state;
  }
}

export default partCategories;
