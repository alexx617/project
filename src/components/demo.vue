<template>
    <div>
        <p>date:{{this.date}}</p>
        <el-row :gutter="24">
            <el-col :span="10">
                <el-button type="primary" @click="all('num1','num1_total')">结算win1</el-button>
        <br/>
        <br/>
                <div class="grid-content bg-purple">
                    <el-button-group>
                        <el-button type="primary" @click="add('num1_total',-1,'num1')">+1</el-button>
                        <el-button type="primary" @click="add('num1_total',+1,'num1')">-1</el-button>
                    </el-button-group>
                    <h2>{{this.num1_total}}</h2>
                </div>
            </el-col>
            <el-col :span="4" style="text-align:center;padding-top: 50px;">
                <div class="grid-content bg-purple" style="padding: 20px;">
                    <h3 style="float:left">{{this.num1}}</h3>
                    <h3 style="float:right">{{this.num2}}</h3>
                </div>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="all('num2','num2_total')">结算win2</el-button>
        <br/>
        <br/>
                <div class="grid-content bg-purple">
                    <el-button-group>
                        <el-button type="primary" @click="add('num2_total',-1,'num2')">+1</el-button>
                        <el-button type="primary" @click="add('num2_total',+1,'num2')">-1</el-button>
                    </el-button-group>
                    <h2>{{this.num2_total}}</h2>
                </div>
            </el-col>
        </el-row>
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
        add(me,item,ou) {
            this[me] = this[me]+item;
            this[ou] = this[ou]-item;
        },
        all(num,total){
            // this[total] = this[num]+
        }
    },
}

</script>

<style lang='stylus' scoped>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>