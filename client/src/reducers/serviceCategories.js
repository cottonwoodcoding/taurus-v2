const serviceCategories = (state = [], action) => {
  switch(action.type) {
    case 'SERVICE_CATEGORIES':
      return action.categories;
    case 'ADD_SERVICE_CATEGORY':
      return [
        ...state,
        action.category
      ]
    case 'EDIT_SERVICE_CATEGORY':
      return state.map( c => {
        if (c.id === action.category.id)
          return action.category
        return c
      })
    case 'REMOVE_SERVICE_CATEGORY':
      return state.filter( c => c.id !== action.id )
    default:
     return state;
  }
}

export default serviceCategories;
