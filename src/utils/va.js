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

// var ruleCheckers = {
//   // type:regList[rule.type],
//   noEmpty: noEmpty(),
//   min: min(),
//   max: max()
// }

function checkRule(forms, rule, value_) {
  var ruleCheckers = {
    // type: regList[rule.type],
    noEmpty: noEmpty,
    min: min,
    max: max
  }
}

// Rule构造器
function Rule(ruleType, ruleValue, errMsg) {
    this.ruleType = ruleType
    this.ruleValue = ruleValue
    this.errMsg = `${errMsg}不能为空` || ''
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
      for (var i = 0; i < formDOM.elements.length; i++) {
        var prop = formDOM.elements[i];
        if (prop.attributes["prop"]) {
          var item = prop.attributes["prop"].value.split(',');
          formName.push(item[0]);
          formMsg.push(item[1]);
          validate[item[0]] = false;
        }
      }
      var rule_item = JSON.parse(JSON.stringify(ruleValidate));
	  let trst = {};
	  
      for (let i = 0; i < formName.length; i++) {
        if (ruleValidate[formName[i]]) { //验证规则
		  var value_ = me[formName[i]];
		  var find = new Rule(ruleValidate[formName[i]],value_,formMsg[i])
        //   checkRule(rule_item[formName[i]], ruleValidate[formName[i]], value_)
        }
	  }
	  log(find)
      vm[item_form + '_valid'] = validate;
    }

  })
  // 3. 注入一些组件选项
  Vue.mixin({
    mounted: function () {

    }

  })
  // 4. 添加一个实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 一些逻辑……
  }
}

module.exports = MyPlugin;


// email:[type,min,max];
// name:[type,required,message,trigger];
// var list = {
// 	email:{
// 		type:false,
// 		min:false,
// 		max:false,
// 	},
// 	name:{
// 		type:false,
// 		required:false,
// 		message:false,
// 		trigger:false,
// 	},
// }
