const part = (state = {}, action ) => {
  switch (action.type) {
    case 'PART':
      return action.part
    default:
      return state;
  }
}

export default part;
