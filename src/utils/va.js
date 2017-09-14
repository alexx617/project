const log = console.log;
//常用正则表
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

//检测非空
function noEmpty(ruleValue) {
  return ruleValue.trim() ? true : false
}
//检测最大值
function max(ruleValue, max) {
  return ruleValue.lenth <= max ? true : false;
}
//检测最小值
function min(ruleValue, min) {
  return ruleValue.lenth >= min ? true : false;
}
// //检测正则
// function checkReg(ruleValue, vaForm, va) {
//     return ruleValue.test(vaForm.value) ? true : false
// }
// //检测数字区间
// function checkLimit(ruleValue, vaForm, va) {
//     var value = vaForm.value
//     return ((+value >= ruleValue[0]) && (+value <= ruleValue[1])) ? true : false
// }
// //检测相等
// function checkEqual(ruleValue, vaForm, va) {
//     var target = va.forms[ruleValue]
//     return target.value === vaForm.value ? true : false
// }
// //检测字符长度
// function checkCharLength(ruleValue, vaForm, va) {
//     var length = vaForm.value.length
//     return ((+length >= ruleValue[0]) && (+length <= ruleValue[1])) ? true : false
// }

// 断言函数
function assert(condition, message) {
  if (!condition) {
    console.error('[is-warn]:' + message)
  }
}


// 获得不同的报错信息
function getErrMsg(item, errMsg, ruleValue) {
  var errMsgs = {
    noEmpty: `${errMsg}不能为空`,
    max: `${errMsg}不能大于${ruleValue}`,
    min: `${errMsg}不能小于${ruleValue}`,
  }
  return errMsgs[item]
}

// Rule构造器(最后需要发给form的结果)
function Rule(ruleType, ruleValue, errMsg, check) {
  var chk_ = chk(check, ruleType, ruleValue, errMsg);
  this.check = chk_[0];
  this.errMsg = chk_[1];
  this.ruleType = ruleType;
  this.ruleValue = ruleValue;
}

// 循环需要验证的项目
function chk(me, ruleType, ruleValue, errMsg) {
  var cc = {};
  var firstErr = null;
  me.forEach(item => {
    var isPass = checkRule(item, ruleType, ruleValue);
    cc[item] = isPass;
    if (firstErr === null && isPass === false) {
      firstErr = getErrMsg(item, errMsg, ruleValue)
    }
  })
  return [cc, firstErr]
}

//验证每一项
function checkRule(item, ruleType, ruleValue) {
  var ruleCheckers = {
    noEmpty: noEmpty,
    min: min,
    max: max
  }
  var checker = ruleCheckers[item];
  var isPass = checker(ruleValue, ruleType);
  return isPass
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
      var validate = {}; //小项是否已全部通过
      var optionalRule = [];
      for (var i = 0; i < formDOM.elements.length; i++) {
        var prop = formDOM.elements[i];
        if (prop.attributes["prop"]) {
          var item = prop.attributes["prop"].value.split(',');
          formName.push(item[0]);
          formMsg.push(item[1]);
          validate[item[0]] = false;
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
