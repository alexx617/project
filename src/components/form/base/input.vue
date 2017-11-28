<template>
    <div class="formItem">
        <p>{{tip}}</p>
        <input :type="type" @input="handleInput($event.target.value)" ref="input" :value="inputValue" :requestType="requestType" />
        <div class="close" :class="[value?'show':'hide']" @click="close(name)"></div>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
export default {
    name: 'w-input',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        requestType: {
            type: String,
        },
        format: {
            type: Object,
        },
        tip: {
            type: String,
        },
        className: {
            type: String,
        },
        name: {
            type: String,
        }
    },
    data() {
        return {
            currentValue: this.value,//原始value值
            inputCurrentCursor: 1,//每次输入的光标位置
            inputValue: this.value,//原始value值,格式化后的值
        };
    },
    components: {},
    created() {
        // log(this.value)
    },
    computed: {
        isNumber() {
            return this.requestType === 'number';
        },
        isMoney() {
            return this.requestType === 'money';
        },
        isDate() {
            return this.type === 'date' || this.type === 'month';
        },
    },
    watch: {
        value(val, oldValue) {
            if (val === null) {
                val = '';
            }
            this.setCurrentValue(val);
        },
    },
    methods: {
        close(me) {
            this.setCurrentValue('');
        },
        handleInput(value) {
            this.inputCurrentCursor = this.$refs.input.selectionStart;//保存光标位置
            this.setCurrentValue(value);
        },
        setCurrentValue(value) {
            if (value === this.currentValue) return;
            if (this.isNumber || this.isMoney) {
                value = value.toString().replace(/\D/g, '');
            }
            this.changeValue(value);
        },
        changeValue(value) {
            value = this.handleMoneyBefore(value);
            this.inputValue = value;
            this.currentValue = value;
            this.$emit('input', value);//实际输入的样式
            // this.formatInput(value);
        },
        handleMoneyBefore(value) {//如果为金额格式,默认头一位不能为零
            if (this.isMoney && (value.indexOf('0') === 0)) {
                value = '0';
            }
            return value;
        },
        // formatInput(val) {
        //     if (this.isDate) return;
        //     if (val) {
        //         let { delimiter, cleave, reverse } = this.format;
        //         val = this.handleFormatByCleave(val, delimiter, cleave, reverse);
        //     }
        //     this.inputValue = val;
        //     this.$refs.input.value = val;//格式化后输入框的样式
        //     // this.$emit('input', value);
        // },
        // handleFormatByCleave(val, delimiter, cleave, reverse) {
        //     // val = this.removeDelimiter(val, delimiter);
        //     let result = '';
        //     let valSegs = [];
        //     let cl = 0;
        //     let de = 0;
        //     for (let item of cleave) {
        //         let seg = (val).substr(cl, item);//0-3 , 3-3
        //         valSegs.push((delimiter[de - 1] || '') + seg);//undefined , 1
        //         cl += item;//3 6
        //         de++;//1 2
        //         if (cl >= val.length) break;//3>1,6>2
        //     }
        //     result = valSegs.join('');
        //     return result;
        // },
        // removeDelimiter(val, delimiter) {
        //     delimiter.forEach(e => {
        //         val = val.replace(/\${e}/g, '');
        //     })
        //     return val
        // }
    },
}

</script>

<style scoped>
.formItem {
  margin-bottom: 0.5rem;
  position: relative;
}
.formItem input {
  width: 100%;
  padding: 0.2rem;
  padding-right: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  margin-top: 0.1rem;
}
.close {
  width: 30px;
  height: 35px;
  text-align: center;
  bottom: 0;
  right: 0;
  z-index: 3;
  position: absolute;
  cursor: pointer;
  background: url("~assets/close.png") no-repeat center;
  background-size: 60%;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>