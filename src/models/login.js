import * as service from '@/services/login';
import {responseStatus} from '@/utils/tools';

// const isLogin = !!localStorage.getItem('token');

export default {
  namespace: 'login',
  state: {
    
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
    resetState() {
      return {};
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
      console.log('/login.js [42]--1','logout');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      yield put({
        type:'resetState',
      })
    },

    *check({ payload }, { put,call }) {
      const res = yield call(service.check);
      // const _res = responseStatus(res);
      if(res.success) {
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
      }else {
        // check false run logout
        yield put({
          type:'logout'
        })
      }
    }
  }
}