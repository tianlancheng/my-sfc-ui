import { routerRedux } from 'dva/router';
import { addSFC, deleteSFC, updateSFC, getSFCs, insertSF, removeSF } from '../services/sfc';

export default {
  namespace: 'sfc',

  state: {
    SFCs: null,
  },

  effects: {
    *addSFC({ payload, callback }, { call, put }) {
      const res = yield call(addSFC, payload);
      if (callback) callback(res);
      // yield put({
      //   type: 'getSFCs',
      // });
    },

    *deleteSFC({ _id }, { call, put }) {
      const res = yield call(deleteSFC, _id);
      yield put({
        type: 'getSFCs',
      });
    },

    *updateSFC({ payload }, { call, put }) {
      const res = yield call(updateSFC, payload);
      yield put({
        type: 'getSFCs',
      });
    },

    *getSFCs(_, { call, put }) {
      const res = yield call(getSFCs);
      yield put({
        type: 'save',
        payload: res,
      });
    },

    *insertSF({ payload, callback }, { call, put }) {
      const res = yield call(insertSF, payload);
      if (callback) callback(res);
      yield put({
        type: 'getSFCs',
      });
    },

    *removeSF({ payload, callback }, { call, put }) {
      const res = yield call(removeSF, payload);
      if (callback) callback(res);
      yield put({
        type: 'getSFCs',
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        SFCs: payload.data,
      };
    },
  },
};
