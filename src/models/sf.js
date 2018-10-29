import { routerRedux } from 'dva/router';
import { addSF, deleteSF, updateSF, getSFs, getAllSFs, addInstance, scaleDown } from '../services/sf';

export default {
  namespace: 'sf',

  state: {
    SFs: [],
    selectSF: {},
  },

  effects: {
    *addSF({ payload, callback }, { call, put }) {
      const res = yield call(addSF, payload);
      if (callback) callback(res);
      yield put({
        type: 'getAllSFs',
      });
    },

    *deleteSF({ _id }, { call, put }) {
      const res = yield call(deleteSF, _id);
      yield put({
        type: 'getAllSFs',
      });
    },

    *updateSF({ payload, callback }, { call, put }) {
      const res = yield call(updateSF, payload);
      if (callback) callback(res);
      yield put({
        type: 'getAllSFs',
      });
    },

    *getSFs(_, { call, put }) {
      const res = yield call(getSFs);
      yield put({
        type: 'save',
        payload: res,
      });
    },

    *getAllSFs(_, { call, put }) {
      const res = yield call(getAllSFs);
      yield put({
        type: 'save',
        payload: res,
      });
    },

    *addInstance({ payload, callback }, { call, put }) {
      const res = yield call(addInstance, payload);
      if (callback) callback(res);
      yield put({
        type: 'getAllSFs',
      });
    },

    *scaleDown({ payload, callback }, { call, put }) {
      const res = yield call(scaleDown, payload);
      if (callback) callback(res);
      yield put({
        type: 'getAllSFs',
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        SFs: payload.data,
      };
    },
  },
};
