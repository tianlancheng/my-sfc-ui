import { stringify } from 'qs';
import request from '../utils/request';

// 增
export async function addSFC(params) {
  // return request(`/logapi/_cat/indices?pretty${stringify(params)}`);
  return request('/api/SFC', {
    method: 'POST',
    body: params,
  });
}

// 删除
export async function deleteSFC(id) {
  // return request(`/logapi/_cat/indices?pretty${stringify(params)}`);
  return request(`/api/SFC/${id}`, {
    method: 'DELETE',
  });
}

// 改
export async function updateSFC(params) {
  return request('/api/SFC', {
    method: 'PUT',
    body: params,
  });
}

// 查
export async function getSFCs() {
  return request('/api/SFCs');
}

export async function insertSF(params) {
  return request('/api/insertSF', {
    method: 'POST',
    body: params,
  });
}

export async function removeSF(params) {
  return request('/api/removeSF', {
    method: 'POST',
    body: params,
  });
}
