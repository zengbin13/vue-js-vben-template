export function resuleSuccess(data = {}, message = 'ok') {
  return {
    code: 0,
    message,
    data,
  };
}

export function resuleError(message = 'Request failed', code = 1, data = {}) {
  return {
    code,
    message,
    data,
  };
}

export function getRequestToken(headers) {
  return headers.authorization || '';
}
