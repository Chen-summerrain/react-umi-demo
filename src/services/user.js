/* eslint-disable import/prefer-default-export */
import request from '@/utils/request';

export function users() {
  return request({
    url: '',
    serve: 'users',
    method: 'GET',
  });
}

export function updateUser({id,...rest}) {
  return request({
    url: `/${id}`,
    serve: 'users',
    method: 'PUT',
    data:rest
  });
}

export function deleteUser(id) {
  return request({
    url: `/${id}`,
    serve: 'users',
    method: 'DELETE',
  });
}
