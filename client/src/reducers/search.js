const search = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.results;
    case 'CLEAR_SEARCH':
      return []
    default:
      return state;
  }
}

export default search;
