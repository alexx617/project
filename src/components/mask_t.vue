<template>
    <div class="div1">
        <div class="div2">{{this.showPercent}}</div>
    </div>
    <!-- <div>
        <div class="container" id="container">
            <div class="time" id="bar" :style="{width:this.width+'%'}">{{this.width}}</div>
        </div>
    </div> -->
</template>


<script>
let loadingTimer = 10;
const log = console.log.bind(console.log);
export default {
    data() {
        return {
            tryTimes: 5,//try_times
            // time: 20,//wait_seconds
            intervalTime: 20,//interval_seconds
            showPercent: 80,
            success: false,
        }
    },
    // computed: {
    //     fullName: function () {
    //         return this.firstName + ' ' + this.lastName
    //     }
    // },
    watch: {

    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let timer = null;
            this.tryTimes = 5;//每5秒
            this.intervalTime = 20;//请求20次
            clearInterval(timer)
            let intervalTime_ = this.intervalTime;
            timer = setInterval(() => {
                intervalTime_ -= 1;
                console.log('a', intervalTime_)
                if (intervalTime_ === 0 || intervalTime_ === 18) {
                    this.success = true;
                    clearInterval(timer);

                }
            }, this.tryTimes * 1000);

            let showTime = null;
            clearInterval(showTime);
            showTime = setInterval(() => {
                this.showPercent += 1;
                if (this.showPercent === 100 || this.success === true) {
                    if(this.success===true){
                        let one = null;
                        one = setInterval(()=>{
                            this.showPercent += 1;
                            if(this.showPercent === 100){
                                clearInterval(one);
                            }
                        },50)
                    }
                    clearInterval(showTime);
                }
            }, (this.tryTimes * this.intervalTime) * 10)
        },
        load() {

        }
    },
}

</script>

<style lang="stylus" scoped>
.div1 {
    width: 500px;
    height: 200px;
    position: relative;
    border: 1px solid red;
    margin: 0 auto;
    text-align: center;
}

.div2 {
    position: absolute;
    // left: 50%;
    // top: 50%;
    width: 200px;
    height: 100px;
    // margin-top: -50px;
    // margin-left: -100px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 1px solid blue;
}

.container {
    width: 400px;
    height: 20px;
    margin: 0 auto;
    margin-top: 100px;
    border: 2px solid #388bfb;
    line-height: 20px;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    overflow: hidden;
}

.time {
    background: #85B9FF;
    height: 100%;
    text-align: center;
    transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    color: #fff;
}
</style>