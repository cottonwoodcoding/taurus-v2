import $ from 'jquery';

export const search = (query) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/parts/search',
      type: 'GET',
      data: { query }
    }).done( results => {
      dispatch({ type: 'SEARCH', results })
    });
  }
}

export const clearSearch = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_SEARCH' })
    dispatch({ type: 'QUERY', query: '' })
  }
}
