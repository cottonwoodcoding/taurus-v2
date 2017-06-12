import { setFlash } from './flash';
import $ from 'jquery';

export const partCategories = () => {
  return (dispatch) => {
    $.ajax({
      url: '/api/part_categories',
      type: 'GET'
    }).done( categories => {
      dispatch({ type: 'PART_CATEGORIES', categories });
    });
  }
}

export const deletePartCategory = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/part_categories/${id}`,
      method: 'delete'
    }).done( () => {
      dispatch({ type: 'REMOVE_PART_CATEGORY', id });
    })
  }
}

export const addPartCategory = (name, cb = null) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/part_categories',
      type: 'POST',
      data: { part_category: { name }}
    }).done( category => {
      dispatch({ type: 'ADD_PART_CATEGORY', category })
      if (cb)
        cb(category)
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.errors, 'error'))
    });
  }
}

export const editPartCategory = (id, name) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/part_categories/${id}`,
      type: 'PUT',
      data: { part_category: { name }}
    }).done( category => {
      dispatch({ type: 'EDIT_PART_CATEGORY', category })
    }).fail( err => {
      dispatch(setFlash(err.responseJSON.errors, 'error'))
    });
  }
}

export const uploadPartImage = (category) => {
  return ({ type: 'EDIT_PART_CATEGORY', category });
}
