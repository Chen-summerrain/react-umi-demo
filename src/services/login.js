/* eslint-disable import/prefer-default-export */
import request from '@/utils/request';

export function login({ ...rest }) {
  return request({
    url: '/login',
    serve: 'auth',
    method: 'POST',
    data: rest,
  });
}

export function register({ ...rest }) {
  return request({
    url: '/register',
    serve: 'auth',
    method: 'POST',
    data: rest,
  });
}

export function check() {
  return request({
    url: '/check',
    serve: 'auth',
    method: 'GET',
  });
}
