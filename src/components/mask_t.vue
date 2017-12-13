<template>
    <div>
        <div>
            
        </div>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
export default {
    data() {
        return {
            firstName: 'Foo',
            lastName: 'Bar'
        }
    },
    computed: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName
        }
    },
    watch: {

    },
    created() {
        // this.init();
    },
    methods: {
        init() {
            this.item_a + this.item_b;
        }
    },
}

</script>

<style lang="stylus" scoped>
input {
    border: 1px solid #000;
}
</style>