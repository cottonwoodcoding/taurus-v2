const services = (state = [], action) => {
  switch (action.type) {
    case 'SERVICES':
      return action.services;
    case 'ADD_SERVICE':
      return [...state, action.service]
    case 'DELETE_SERVICE':
      return state.filter( s => s.id !== action.id )
    default:
      return state;
  }
}

export default services;
