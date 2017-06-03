const parts = ( state = [], action ) => {
  switch (action.type) {
    case 'PARTS':
      return action.parts;
    default:
      return state;
  }
}

export default parts;
