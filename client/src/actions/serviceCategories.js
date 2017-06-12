import { setFlash } from './flash';
import $ from 'jquery';

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

export const addServiceCategory = (name, cb = null) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/service_categories',
      type: 'POST',
      data: { service_category: { name }}
    }).done( category => {
      dispatch({ type: 'ADD_SERVICE_CATEGORY', category })
      if (cb)
        cb(category)
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.errors, 'error'))
    });
  }
}

export const editServiceCategory = (id, name) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/service_categories/${id}`,
      type: 'PUT',
      data: { service_category: { name }}
    }).done( category => {
      dispatch({ type: 'EDIT_SERVICE_CATEGORY', category })
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.errors, 'error'))
    });
  }
}

export const uploadServiceImage = (category) => {
  return ({ type: 'EDIT_SERVICE_CATEGORY', category });
}
