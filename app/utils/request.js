// import { Toast } from 'dan-components';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const res = await response.json();
  // if (response.status === 400) {
  //   Toast.error(res.message);
  // }
  // if (response.status === 401) {
  //   Toast.error('未登录, 请重新登录');
  //   // window.location.href = '/login';
  // }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
const baseUrl = 'http://localhost:3000';
class Request {
  request(url, options) {
    return fetch(url, options).then(checkStatus).then(parseJSON);
  }

  post(url, data) {
    return fetch(`${baseUrl}${url}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    }).then(checkStatus).then(parseJSON);
  }

  get(url) {
    return fetch(`${baseUrl}${url}`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }).then(checkStatus).then(parseJSON);
  }

  put(url, data) {
    return fetch(`${baseUrl}${url}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    }).then(checkStatus).then(parseJSON);
  }

  delete(url) {
    return fetch(`${baseUrl}${url}`, {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }).then(checkStatus).then(parseJSON);
  }
}

export default new Request();

// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON);
// }
