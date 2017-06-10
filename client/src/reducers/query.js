const query = (state = '', action) => {
  switch(action.type) {
    case 'QUERY':
      return action.query;
    default:
      return state;
  }
}

export default query;
