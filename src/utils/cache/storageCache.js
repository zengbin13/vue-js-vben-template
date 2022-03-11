export class WebStorage {
  // 存储类型,过期时间,前缀字段,是否加密
  constructor({
    storage = sessionStorage,
    timeout = null,
    prefixKey = '',
    hasEncrypt = false,
  }) {
    this.storage = storage;
    this.timeout = timeout;
    this.prefixKey = prefixKey;
    this.hasEncrypt = hasEncrypt;
  }
  getKey(key) {
    return `${this.prefixKey}${key}`;
  }
  set(key, value, expire = this.timeout) {
    let time = Date.now();
    let stringData = JSON.stringify({
      value,
      time,
      expire: expire ? time + expire * 1000 : null,
    });
    // 进行加密后字符串 - 未完成
    this.storage.setItem(this.getKey(key), stringData);
  }
  get(key, def) {
    // 判断是否过期
    let stringData = this.storage.getItem(this.getKey(key));
    if (!stringData) return def;
    let { expire, value } = JSON.parse(stringData);
    // 进行解密 - 未完成
    if (!expire || expire >= Date.now()) {
      return value;
    }
    this.remove(key);
    return def;
  }
  remove(key) {
    this.storage.removeItem(this.getKey(key));
  }
  clear(key) {
    this.storage.clear();
  }
}
