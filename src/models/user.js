import * as service from '@/services/user';
import {responseStatus} from '@/utils/tools'
import { publicDecrypt } from 'crypto';

export default {
  namespace: 'user',
  state: {
    userInfo:{}
  },
  reducers: {
    setState(state, { payload }) {
      console.log('/user.js [11]--1',payload);
      return { ...state, ...payload };
    },
  },
  effects: {
    *login({ payload }, { put, call }) {
      const res = yield call(service.login, payload);
      const _res = yield responseStatus(res);
      console.log('/user.js [17]--1',res,_res);
      if(_res) {
        localStorage.setItem('token',res.token);
        localStorage.setItem('userId',res.data.id);
        yield put({
          type:'setState',
          payload:{
            userInfo: {
              user:res.data.name
            }
          }
        })

      }
    },
    *register({ payload }, { call }) {
      const res = yield call(service.register, payload);
      responseStatus(res)
    }
  }
}