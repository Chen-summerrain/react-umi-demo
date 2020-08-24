import * as service from '@/services/login';
import {responseStatus} from '@/utils/tools';

const isLogin = !!localStorage.getItem('token');

export default {
  namespace: 'login',
  state: {
    userInfo:{
      isLogin
    }
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
      responseStatus(res);
      return res.success
      
    },

    *register({ payload }, { call }) {
      const res = yield call(service.register, payload);
      responseStatus(res);
      return res.success;
    },

    *logout({ payload }, { put }) {
      localStorage.removeItem('token');
      yield put({
        type:'setState',
        payload:{
          userInfo:{
            isLogin:false
          }
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
            userInfo: {
              user:res.data.name,
              userId: res.data.id,
              isAdmin: res.data.isAdmin,
              isLogin:true,
            }
          }
        })
      }
    }
  }
}