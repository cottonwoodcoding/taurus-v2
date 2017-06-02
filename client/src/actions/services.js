import { setFlash } from './flash';

export const addService = (categoryId, name, description) => {
  return(dispatch) => {
    $.ajax({
      url: `/api/service_categories/${categoryId}/services`,
      type: 'POST',
      dataType: 'JSON',
      data: { service: { name, description } }
    }).done( service => {
      dispatch({type: 'ADD_SERVICE', ...service});
    }).fail( data => {
      dispatch(setFlash('Failed Adding Service', 'error'));
    })
  }
}

export const deleteService = (categoryId, id) => {
  return(dispatch) => {
    $.ajax({
      url: `/api/service_categories/${categoryId}/services/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).done( () => {
      dispatch({type: 'DELETE_SERVICE', categoryId, id });
    }).fail( data => {
      dispatch(setFlash('Failed Removing Service', 'error'));
    })
  }
}
