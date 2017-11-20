<template>
    <div>
        <w-form :form="form"></w-form>
    </div>
</template>

<script>
const log = console.log.bind(console.log);
import { UI } from '../modules/one'
export default {
    data() {
        return {
            form: UI
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