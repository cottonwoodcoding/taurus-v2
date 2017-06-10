import $ from 'jquery';
import { setFlash } from './flash';

export const setSite = () => {
  return(dispatch) => {
    $.ajax({
      url: '/api/site',
      type: 'GET',
    }).done( site => {
      dispatch({ type: "SITE", site })
    }).fail( data => {
      console.log(data);
    });
  }
}

export const updateSite = (site) => {
  return(dispatch) => {
    $.ajax({
      url: '/api/site',
      type: 'PUT',
      data: { site }
    }).done( site => {
      dispatch(setFlash('Site Updated Successfully!', 'success'));
      dispatch({ type: 'UPDATE_SITE', site });
    }).fail( data => {
      console.log(data);
    });
  }
}
