const log = console.log;

// 给错误的dom添加错误class
function addClass(dom, errClass) {
  var hasClass = !!dom.className.match(errClass)
  if (!hasClass) {
    dom.className += errClass;
  }
}
// 检验正确后去除错误class
function removeClass(dom, errClass) {
  var hasClass = !!dom.className.match(errClass)
  if (hasClass) {
    dom.className = dom.className.replace(errClass, '');
  }
}

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
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  Number: /^\d+$/,
}

// 4.检测
//检测非空
function noEmpty(value) {
  return value.toString().trim() ? true : false
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
function equal(value, rule, ruleType, formData) {
  return value === formData[rule] ? true : false
}
//检测相等
function unequal(value, rule, ruleType, formData) {
  return value !== formData[rule] ? true : false
}
//检测自定义规则
function pattern(value, rule, ruleType, formData) {
  return rule.test(value) ? true : false
}
//检测必须选择
function accepted(value, rule, ruleType, formData) {
  return value ? true : false
}

// 断言函数
function assert(condition, message) {
  if (!condition) {
    console.error('[va-warn]:' + message)
  }
}

// 1.Rule构造器(最后需要发给form的结果)
// ruleType:用户给的规则
// ruleValue:值
// errMsg:错误信息
// check:需要验证的项目
// formData:整个表信息
function Rule(ruleType, ruleValue, errMsg, check, formData, formName, dom_) {
  var chk_ = chk(check, ruleType, ruleValue, errMsg, formData, formName);
  this.check = chk_[0];
  this.errMsg = chk_[1];
  this.ruleType = ruleType;
  this.ruleValue = ruleValue;
  this.ruleName = formName;
  if (errClass) {
    if (this.errMsg) {
      addClass(dom_, errClass)
    } else {
      removeClass(dom_, errClass)
    }
  }
}

// 2.循环需要验证的项目
function chk(check, ruleType, ruleValue, errMsg, formData, formName) {
  var vaResult = {};
  var firstErr = null;
  check.forEach(item => {
    var isPass = checkRule(item, ruleType, ruleValue, formData);
    vaResult[item] = isPass;
    if (firstErr === null && isPass === false) {
      firstErr = getErrMsg(item, errMsg, ruleValue, ruleType);
    }
  })
  return [vaResult, firstErr] //各个项目是否通过,和第一个错误的报错信息,结果返回给1
}

//3.验证每一项
function checkRule(item, ruleType, ruleValue, formData) {
  var ruleCheckers = { //这里添加验证规则
    type: type,
    noEmpty: noEmpty,
    min: min,
    max: max,
    equal: equal,
    unequal: unequal,
    pattern: pattern,
    accepted: accepted,
  }
  if (item !== 'message') {
    var checker = ruleCheckers[item];
    var isPass = checker(ruleValue, ruleType[item], ruleType, formData); //这里开始校验
  }
  return isPass //是否通过,结果返回给2
}

// 5.获得不同的报错信息
function getErrMsg(item, errMsg, ruleValue, ruleType) {
  var errMsgs = {
    type: `${errMsg}格式不正确`,
    noEmpty: `${errMsg}不能为空`,
    max: `${errMsg}不能大于${ruleType[item]}`,
    min: `${errMsg}不能小于${ruleType[item]}`,
    equal: `两次${errMsg}不相同`,
    unequal: `${errMsg}不能相同`,
    pattern: `${errMsg}${ruleType.message}`,
    accepted: `${errMsg}${ruleType.message}`,
  }
  return errMsgs[item]
}


var MyPlugin = {};
var errClass = ''; //错误提示的class
MyPlugin.install = function (Vue, options) {
  Vue.directive('va', {
    update(el, binding, vnode, oldVnode) {
      var vm = vnode.context //当前的vue实例
      var ruleValidate = vm.ruleValidate; //验证规则
      var item_form = binding.expression; //model到哪个表单里
      var formData = vm[item_form]; //表单数据
      var formName = []; //需要验证的表单名称
      var formMsg = []; //需要验证的表单消息
      var formDOM = el; //获取表单DOM里面的所有表单
      var el_dom = []; //获取每一项的DOM
      var optionalRule = [];
      assert(formDOM, '未设置需要验证哪个表单 <form v-va="xxx"></form>')
      assert(formData, '未设置表单信息 ruleValidate:{}')
      if (formDOM.attributes["errClass"]) { //获取错误的class
        errClass = formDOM.attributes["errClass"].value;
      }
      for (var i = 0; i < formDOM.elements.length; i++) { //获取所有需要验证项
        var prop = formDOM.elements[i];
        if (prop.attributes["prop"]) {
          var item = prop.attributes["prop"].value.split(',');
          formName.push(item[0]);
          formMsg.push(item[1]);
          el_dom.push(prop)
        }
      }
      for (let i = 0; i < formName.length; i++) {
        if (ruleValidate[formName[i]]) { //验证规则
          var value_ = formData[formName[i]];
          var item_ = []; //需要验证的项目
          for (let j in ruleValidate[formName[i]]) {
            item_.push(j)
          }
          optionalRule.push(new Rule(ruleValidate[formName[i]], value_, formMsg[i], item_, formData, formName[i], el_dom[i]));
        }
      }
      log(optionalRule)
      vm[item_form + '_valid'] = optionalRule;
    }
  })
}

module.exports = MyPlugin;
