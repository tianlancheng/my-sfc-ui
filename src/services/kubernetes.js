import { stringify } from 'qs';
import request from '../utils/request';

export async function getNodes() {
  return request('/kubernetes/api/v1/nodes');
}
