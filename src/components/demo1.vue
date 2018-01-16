<template>
    <div>

    </div>
</template>

<script>
const log = console.log;
export default {
    data() {
        return {

        };
    },
    components: {},
    created() {
        function sleep(second) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(' enough sleep~');
                }, second);
            })
        }
        function normalFunc() {
            console.log('normalFunc');
        }
        async function awaitDemo() {
            await normalFunc();
            console.log('something, ~~');
            let result = await sleep(2000);
            console.log(result);// 两秒之后会被打印出来
        }
        awaitDemo();
    },
    methods: {
        // async awaitDemo(){
        //     await normalFunc();
        //     console.log('2')
        //     let time = await sleep(2000);
        //     console.log(time)
        // }
    },
}

</script>

<style scoped>

</style>