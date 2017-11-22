<template>
    <div>
        <input :type="type" @input="handleInput($event)" ref="input" :value="inputValue" :requestType="requestType" />
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
            type: String
        },
        format: {
            type: Object,
        }
    },
    data() {
        return {
            currentValue: this.value,//原始value值
            inputCurrentCursor: 1,//每次输入的光标位置
            inputValue: this.value,//原始value值
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
    methods: {
        handleInput(e) {
            let value = e.target.value;
            this.inputCurrentCursor = this.$refs.input.selectionStart;
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
            value = this.handleMoney(value);
            this.inputValue = value;
            this.currentValue = value;
            this.$emit('input', value);
            this.formatInput();
        },
        handleMoney(value) {
            if (this.isMoney) {
                if (value.indexOf('0') === 0) {
                    value = '';
                }
            }
            return value;
        },
        formatInput() {
            if (this.isDate) return;
            let val = this.inputValue;
            if (val) {
                let { delimiter, cleave, repeat } = this.format;
                val = this.handleFormatByCleave(val, delimiter, cleave, repeat);
            }
        },
        handleFormatByCleave(val, delimiter, cleave, repeat) {
            let reLength = val.length;//输入的值的长度
            let result = '';
            let realityBegin = 0;//开始裁剪长度
            cleave.every((ele, i) => {
                if (reLength > ele) {
                    if (this.format.repeat) {
                        result += val.substr(realityBegin, reLength - ele) + (de || '');
                        realityBegin = reLength - ele;
                    } else {
                        result += val.substr(realityBegin, ele) + (de || '');
                        realityBegin += ele;
                    }
                    reLength -= ele;
                    return true;
                }
            });
            log(result)
            return result;
        }
    },
}

</script>

<style scoped>

</style>