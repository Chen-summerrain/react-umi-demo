import * as service from '@/services/login';
import {responseStatus} from '@/utils/tools';

const isLogin = !!localStorage.getItem('token');

export default {
  namespace: 'login',
  state: {
    isLogin
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },

  },
  effects: {
    *login({ payload }, { put, call }) {
      const res = yield call(service.login, payload);
      localStorage.setItem('token',res.token)
      yield put({
        type:'setState',
        payload:{
          isLogin:true
        }
      })
      // responseStatus(res);
      // return res.success
      
    },

    *register({ payload }, { call }) {
      const res = yield call(service.register, payload);
      responseStatus(res);
      return res.success;
      // return res.success;
    },

    *logout({ payload }, { put }) {
      localStorage.removeItem('token');
      yield put({
        type:'setState',
        payload:{
          isLogin:false
        }
      })
    },

    *check({ payload }, { put,call }) {
      const res = yield call(service.check);
      // const _res = responseStatus(res);
      if(res) {
        localStorage.setItem('userId',res.data.id);
        yield put({
          type:'setState',
          payload:{
            user:res.data.name,
            userId: res.data.id,
            isAdmin: res.data.isAdmin,
            isLogin:true,
          }
        })
      }
    }
  }
}