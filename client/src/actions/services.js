import { setFlash } from './flash';
import $ from 'jquery';

export const services = () => {
  return (dispatch) => {
    $.ajax({
      url: `/api/services`,
      type: 'GET',
      dataType: 'JSON',
    }).done( services => {
      dispatch({type: 'SERVICES', services});
    }).fail( data => {
      dispatch(setFlash('Failed Getting Services', 'error'));
    })
  }
}

export const addService = (categoryId, name, description) => {
  return(dispatch) => {
    $.ajax({
      url: `/api/service_categories/${categoryId}/services`,
      type: 'POST', dataType: 'JSON',
      data: { service: { name, description } }
    }).done( service => {
      dispatch({type: 'ADD_SERVICE', service});
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
      dispatch({type: 'DELETE_SERVICE', id });
    }).fail( data => {
      dispatch(setFlash('Failed Removing Service', 'error'));
    })
  }
}
