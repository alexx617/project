<template>
    <div class="home-box">
        <!-- <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="title"></el-table-column>
            <el-table-column prop="email" label="email"></el-table-column>
            <el-table-column prop="content" label="content"></el-table-column>
            <el-table-column prop="isPublish" label="isPublish"></el-table-column>
            <el-table-column prop="comment" label="comment"></el-table-column>
            <el-table-column prop="tags" label="tags"></el-table-column>
        </el-table> -->
        <form v-va='form'>
            <div>
                <input type="text" v-model="form.email" prop="email,邮箱" />
            </div>
            <input type="text" v-model="form.name" prop="name,姓名" />
            <select v-model="form.address">
                <option>1</option>
                <option>2</option>
            </select>
            <p @click="cli">123123123123</p>
        </form>
    </div>
</template>

<script>
const log = console.log
import ajax from 'utils/ajax'
export default {
    data() {
        return {
            tableData: [],
            form: {
                email: "2",
                address: "2",
                name: "8"
            },
            ruleValidate: {
                email: {
                    // type: "Mail",
                    noEmpty: true,
                    min: 1,
                    max: 4
                },
                name: {
                    noEmpty: true,
                    max: 5
                },
                // address:{
                //     noEmpty: true,
                //     min: 1,
                // }
            }
        }
    },
    created() {
        
    },
    methods: {
        cli(){
            log(this.form_valid)
        },
        getAjax() {
            ajax.login(this.form)
                .then(rs => {
                    console.log(rs);
                    this.$message(rs);
                })
                .catch(err => {
                    this.$message(err);
                })
        },
        getAjax_post() {
            ajax.home(this.form)
                .then(rs => {
                    this.$message(rs);
                })
                .catch(err => {
                    this.$message(err);
                })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
