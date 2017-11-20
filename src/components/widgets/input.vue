<template>
    <div>
        <input type="text" @input="input($event)" ref="input"/>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
export default {
    name: 'w-input',
    data () {
        return {
            inputCurrentCursor:1//每次输入的光标位置
        };
    },
    components:{},
    created() {
        
    },
    methods : {
        input(e){
            let value = e.target.value;
            this.inputcurrentCursor = this.$refs.input.selectionStart;
        }
    },
}

</script>

<style scoped>

</style>