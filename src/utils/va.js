const log = console.log;

//常用正则
var regList = {
  ImgCode: /^[0-9a-zA-Z]{4}$/,
  SmsCode: /^\d{4}$/,
  MailCode: /^\d{4}$/,
  UserName: /^[\w|\d]{4,16}$/,
  Password: /^[\w!@#$%^&*.]{6,16}$/,
  Mobile: /^1[3|4|5|7|8]\d{9}$/,
  RealName: /^[\u4e00-\u9fa5|·]{2,16}$|^[a-zA-Z|\s]{2,20}$/,
  BankNum: /^\d{10,19}$/,
  Money: /^([1-9]\d*|[0-9]\d*\.\d{1,2}|0)$/,
  Answer: /^\S+$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// 4.检测
//检测非空
function noEmpty(value) {
  return value.trim() ? true : false
}
//检测最大值
function max(value, rule) {
  return value <= rule ? true : false;
}
//检测最小值
function min(value, rule) {
  return value >= rule ? true : false;
}
//检测正则
function type(value, rule) {
  return regList[rule].test(value) ? true : false
}
//检测相等
function equal(value, rule) {
  log(value)
  // return regList[rule].test(value) ? true : false
}

// 断言函数
function assert(condition, message) {
  if (!condition) {
    console.error('[is-warn]:' + message)
  }
}



// 1.Rule构造器(最后需要发给form的结果)
function Rule(ruleType, ruleValue, errMsg, check) {
  var chk_ = chk(check, ruleType, ruleValue, errMsg);
  this.check = chk_[0];
  this.errMsg = chk_[1];
  this.ruleType = ruleType;
  this.ruleValue = ruleValue;
}

// 2.循环需要验证的项目
function chk(me, ruleType, ruleValue, errMsg) {
  var cc = {};
  var firstErr = null;
  me.forEach(item => {
    var isPass = checkRule(item, ruleType, ruleValue);
    cc[item] = isPass;
    if (firstErr === null && isPass === false) {
      firstErr = getErrMsg(item, errMsg, ruleValue, ruleType)
    }
  })
  return [cc, firstErr]
}

//3.验证每一项
function checkRule(item, ruleType, ruleValue) {
  var ruleCheckers = { //这里添加验证规则
    type: type,
    noEmpty: noEmpty,
    min: min,
    max: max,
    equal: equal
  }
  var checker = ruleCheckers[item];
  var isPass = checker(ruleValue, ruleType[item]);
  return isPass
}


// 5.获得不同的报错信息
function getErrMsg(item, errMsg, ruleValue, ruleType) {
  var errMsgs = { //验证错误后提示信息
    type: `${errMsg}格式不正确`,
    noEmpty: `${errMsg}不能为空`,
    max: `${errMsg}不能大于${ruleType[item]}`,
    min: `${errMsg}不能小于${ruleType[item]}`,
    equal: `两次${errMsg}不相同`,
  }
  return errMsgs[item]
}


var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  Vue.directive('va', {
    bind(el, binding, vnode, oldVnode) {
      var vm = vnode.context //当前的vue实例
      var ruleValidate = vm.ruleValidate; //验证规则
      var item_form = binding.expression; //model到哪个表单里
      var me = vm[item_form]; //各个数据
      var formName = []; //需要验证的表单名称
      var formMsg = []; //需要验证的表单消息
      var formDOM = el; //获取表单下面的所有表单数据
      var optionalRule = [];
      for (var i = 0; i < formDOM.elements.length; i++) { //获取所有需要验证项
        var prop = formDOM.elements[i];
        if (prop.attributes["prop"]) {
          var item = prop.attributes["prop"].value.split(',');
          formName.push(item[0]);
          formMsg.push(item[1]);
        }
      }
      for (let i = 0; i < formName.length; i++) {
        if (ruleValidate[formName[i]]) { //验证规则
          var value_ = me[formName[i]];
          var item_ = []; //需要验证的项目
          for (let j in ruleValidate[formName[i]]) {
            item_.push(j)
          }
          optionalRule.push(new Rule(ruleValidate[formName[i]], value_, formMsg[i], item_));
        }
      }
      log(optionalRule)
      vm[item_form + '_valid'] = optionalRule;
    }
  })
}

module.exports = MyPlugin;
