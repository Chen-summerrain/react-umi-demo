import * as service from '@/services/user';
import {responseStatus} from '@/utils/tools'

export default {
  namespace: 'user',
  state: {
    userList:[]
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getUserList({ payload }, { put, call }) {
      const res = yield call(service.users)
      
      if(res.success) {
        yield put({
          type:'setState',
          payload:{
            userList: res.data
          }
        })
      }else {
        responseStatus(res)
      }
    },
    *updateUser({ payload }, { put, call }) {
      const res = yield call(service.updateUser,payload)
      responseStatus(res)
      console.log('/user.js [31]--1','update',res);
      return res.success;
    },
    *deleteUser({ payload }, { put, call }) {
      const res = yield call(service.deleteUser,payload)
      responseStatus(res)
      console.log('/user.js [31]--1','del',res);
      return res.success;
    },
  }
}