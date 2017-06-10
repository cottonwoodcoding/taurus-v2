const site = (state = {}, action) => {
  switch (action.type) {
    case 'SITE':
      return action.site;
    case 'UPDATE_SITE':
      return action.site;
    default:
      return state;
  }
}

export default site;
