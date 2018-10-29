import { routerRedux } from 'dva/router';
import { getNodes } from '../services/kubernetes';

export default {
  namespace: 'kubernetes',

  state: {
    nodes: [],
  },

  effects: {
    *getNodes(_, { call, put }) {
      const res = yield call(getNodes);
      yield put({
        type: 'save',
        payload: res,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        nodes: payload.items,
      };
    },
  },
};
