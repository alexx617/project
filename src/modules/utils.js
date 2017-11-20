export default {
  init(e) {
    Object.keys(e.fileds).map(item => {
      let item_ = e.fileds[item];
      item_.value = item_.value || '';
    })
    return e;
  }
}
