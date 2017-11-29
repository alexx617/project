<template>
    <div class="home-box">
        <Cleave :options='cleaveOptions' v-model='formatedValue'></Cleave>
    </div>
</template>

<script>
const log = console.log
import ajax from 'utils/ajax'
import Cleave from 'vue-cleave/src/Cleave.vue'
// import Cleave from '../utils/axcleave'
export default {
    data() {
        return {
            formatedValue: '',
            email: '',
            cleaveOptions: {
                delimiters: ['.', '.', '-'],
                blocks: [3, 3, 3, 2],
            }
        }
    },
    created(){
        // console.log(new Cleave('123123',this.cleaveOptions))
        // console.log(new Cleave('123123',this.cleaveOptions))
    },
    watch: {
        'formatedValue': (val) => {
            // console.log(val)
        }
    },
    components: {
        Cleave
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
