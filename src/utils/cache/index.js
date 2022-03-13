import { WebStorage } from './storageCache';
import { DEFAULT_CACHE_TIME } from '../../setting/storageSetting';

export const ss = new WebStorage({
  storage: sessionStorage,
  timeout: DEFAULT_CACHE_TIME,
  prefixKey: 'web_',
});
