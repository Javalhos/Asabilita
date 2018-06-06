export default {
  _notifications: [],
  _push(title = '', body = '', type = '') {
    if (title == '' || body == '') {
      console.log(`Invalid parameters for notification: ${title}, ${body}, ${type}`);
      return;
    }
    this._notifications.push({ title, body, type });
  },
  success(title, body) {
    this._push(title, body, 'SUCCESS');
  },
  warning(title, body) {
    this._push(title, body, 'WARNING');
  },
  danger(title, body) {
    this._push(title, body, 'DANGER');
  },
  info(title, body) {
    this._push(title, body, 'INFO');
  }
}
