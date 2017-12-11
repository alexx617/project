<template>
    <div>
        <div class="inputBox">
            <i v-for="(item,i) in length" :key="i" @click="change">
                {{num[i]}}
            </i>
            <input ref="input" v-model="num" type="tel" id="ipt" maxlength="8">
        </div>
        <div class="box">
            <i></i>
        </div>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
export default {
    data() {
        return {
            num: '',
            length: 8
        };
    },
    components: {},
    created() {

    },
    methods: {
        change() {
            this.$refs.input.focus();
        }
    },
}

</script>

<style lang="stylus" scoped>
div {
    padding: 20px;
}

.inputBox {
    position: relative;

    i {
        border: 1px solid #000;
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right 10px;
        vertical-align: top;
    }

    input {
        width: 0;
        opacity: 0;
    }
}
</style>