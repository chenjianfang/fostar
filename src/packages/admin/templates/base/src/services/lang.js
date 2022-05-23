import { get } from 'services/http';

// 查询多语言
export const queryLanguage = (params) => get('/gettranslate', params, { baseURL: '', noCode: true });
