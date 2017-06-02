import { setFlash } from './flash';

export const serviceCategories = () => {
  return (dispatch) => {
    $.ajax({
      url: '/api/service_categories',
      type: 'GET'
    }).done( categories => {
      dispatch({ type: 'SERVICE_CATEGORIES', categories });
    });
  }
}

export const deleteServiceCategory = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/service_categories/${id}`,
      method: 'delete'
    }).done( () => {
      dispatch({ type: 'REMOVE_SERVICE_CATEGORY', id });
    })
  }
}

export const addServiceCategory = (name) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/service_categories',
      type: 'POST',
      data: { service_category: { name }}
    }).done( category => {
      dispatch({ type: 'ADD_SERVICE_CATEGORY', category })
    }).fail( err => {
      dispatch(setFlash(err.errors, 'error'))
    });
  }
}
