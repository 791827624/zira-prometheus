import { ajax } from '@/api/ajax';
/**
 * 异步请求管理
 * @param query
 * @returns {*}
 */
//查询请求
export const reqQuery = query => ajax('/api/v1/query', query, 'GET');