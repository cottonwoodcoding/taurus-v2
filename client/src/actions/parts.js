import $ from 'jquery';
import { setFlash } from './flash';

export const getParts = (id) => {
  return (dispatch) => {
    $.ajax({
      url: `/api/part_categories/${id}/parts`,
      method: 'GET',
    }).done( parts => {
      dispatch({ type: 'PARTS', parts })
    }).fail( (data) => {
      dispatch(setFlash('Failed to get parts', 'error'))
    });
  }
}

export const addPart = (part) => {
  return (dispatch) => {
    let data = JSON.stringify(part)
    $.ajax({
      url: `/api/part_categories/${part.part_category_id}/parts`,
      method: 'POST',
      data: { part: data }
    }).done( p => {
      dispatch(setFlash(`${p.name} was added`, 'success'))
      window.scrollTo(0,0)
    }).fail( (data) => {
      dispatch(setFlash('There was a problem adding the part', 'error'))
      window.scrollTo(0,0)
    });
  }
}

export const updatePart = (part, id) => {
  return (dispatch) => {
    let data = JSON.stringify(part)
    $.ajax({
      url: `/api/part_categories/${part.part_category_id}/parts/${id}`,
      method: 'PUT',
      data: { part: data }
    }).done( p => {
      dispatch(setFlash(`${p.name} was updated`, 'success'))
      dispatch({ type: 'PART', part: p })
      window.scrollTo(0,0)
    }).fail( (data) => {
      dispatch(setFlash('There was a problem adding the part', 'error'))
      window.scrollTo(0,0)
    });
  }
}
