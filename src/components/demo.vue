<template>
    <div>
        <div class="box">
            <div class="item"></div>
        </div>
    </div>
</template>

<script>
// import moment from '../utils/moment'
const log = console.log;
export default {
    data() {
        return {
            date: 1509001170442,
            num1: 1,
            num2: 1,
            num1_total: 29,
            num2_total: 29,
            total: ''
        };
    },
    components: {},
    created() {
        // this.date = moment(new Date(), 'yyyy-MM-dd 第q季度 www HH:mm:ss:SSS');
    },
    methods: {
        
    },
}

</script>

<style lang='stylus' scoped>
.box{
    background #8D8DFD
    height 25rem /* 400/16 */
    padding 20px
}
.item{
    width 150px;
    height 150px
    background #F6F6F6;
    position: relative;
    &:before {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
		overflow: hidden;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
	}
}
</style>
