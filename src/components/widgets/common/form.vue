<template>
    <div :class="form.className">
        <div v-for="(item,i) in form.fileds" :key="item.tip">
            <w-input v-if="item.filedType==='input'"
            v-model="item.value"
            :requestType="item.requestType"
            :format="item.format"
            :type="item.inputType"
            ></w-input>
        </div>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
export default {
    name: 'w-form',
    props: {
        form: {
            type: Object
        }
    },
    data() {
        return {

        };
    },
    components: {},
    created() {

    },
    methods: {

    },
}

</script>

<style scoped>

</style>