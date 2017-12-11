<template>
    <div class="formItem" :class="className">
        <p>{{tip}}</p>
        <span class="isMoney" v-if="isMoney">$</span>
        <input :type="type" @input="setCurrentValue($event.target.value)" ref="input" :value="inputValue" :requestType="requestType" :class="[isMoney?'moneyL':'']" :maxlength="this.max" />
        <div class="close" :class="[value?'show':'hide']" @click="close(name)"></div>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
import Cleave from 'cleave.js'
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
        inputMaxLen: {
            type: String,
        },
        name: {
            type: String,
        }
    },
    data() {
        let max_;
        if(this.format&&this.format.delimiters){
            max_ = Number(this.inputMaxLen)+Number(this.format.delimiters.length)
        }else{
            max_ = Number(this.inputMaxLen) || '';
        }
        return {
            inputCurrentCursor: 1,//每次输入的光标位置
            inputValue: this.value,//格式化后的value值
            cleave: null,
            max:max_
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
        format: {
            deep: true,
            handler (val) {
                this.cleave.destroy()
                this.cleave = new Cleave(this.$refs.input, this.format)
            }
        }
    },
    methods: {
        close(me) {
            this.setCurrentValue('');
        },
        setCurrentValue(value) {
            // this.inputCurrentCursor = this.$refs.input.selectionStart;//保存光标位置
            if (value === this.inputValue) return;
            if (this.isNumber || this.isMoney) {
                value = value.toString().replace(/\D/g, '');
            }
            this.changeValue(value);
        },
        changeValue(value) {
            value = this.handleMoneyBefore(value);
            this.inputValue = value;
            this.$emit('input', value);//实际输入的样式
            if (this.format) {
                this.formatInput(value);
            }
        },
        handleMoneyBefore(value) {//如果为金额格式,默认头一位不能为零
            if (this.isMoney && (value.indexOf('0') === 0)) {
                value = '0';
            }
            return value;
        },
        formatInput(val) {
            if (this.isDate) return;
            // this.cleave.destroy();
            if (val) {
                this.cleave = new Cleave(this.$refs.input, this.format)//格式化输入框
                console.log(this.cleave)
            }
            // this.inputValue = val;
            // this.$refs.input.value = val;//格式化后输入框的样式
            // this.$emit('input', val);//实际输入的样式
        },
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
  width: 0.8rem;
  height: 0.9rem;
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
.isMoney {
  position: absolute;
  bottom: 0.3rem;
  left: 0.2rem;
}
.moneyL {
  padding-left: 0.5rem !important;
}
</style>