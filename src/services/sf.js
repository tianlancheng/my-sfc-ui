import { stringify } from 'qs';
import request from '../utils/request';

// 增
export async function addSF(params) {
  // return request(`/logapi/_cat/indices?pretty${stringify(params)}`);
  return request('/api/SF', {
    method: 'POST',
    body: params,
  });
}

// 删除
export async function deleteSF(_id) {
  // return request(`/logapi/_cat/indices?pretty${stringify(params)}`);
  return request(`/api/SF/${_id}`, {
    method: 'DELETE',
  });
}

// 改
export async function updateSF(params) {
  return request('/api/SF', {
    method: 'PUT',
    body: params,
  });
}

// 查
export async function getSFs() {
  return request('/api/SFs');
}

export async function getAllSFs() {
  return request('/api/SFs/all');
}

export async function addInstance(params) {
  // return request(`/logapi/_cat/indices?pretty${stringify(params)}`);
  return request('/api/addInstance', {
    method: 'POST',
    body: params,
  });
}

export async function scaleDown(params) {
  // return request(`/logapi/_cat/indices?pretty${stringify(params)}`);
  return request('/api/scaleDown', {
    method: 'POST',
    body: params,
  });
}
