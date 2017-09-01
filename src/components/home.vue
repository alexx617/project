<template>
    <div class="home-box">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="title"></el-table-column>
            <el-table-column prop="date" label="date"></el-table-column>
            <el-table-column prop="content" label="content"></el-table-column>
            <el-table-column prop="isPublish" label="isPublish"></el-table-column>
            <el-table-column prop="comment" label="comment"></el-table-column>
            <el-table-column prop="tags" label="tags"></el-table-column>
        </el-table>
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
                date: "",
                address: "",
                name: ""
            }
        }
    },
    created () {
        this.getAjax();
    },
    methods: {
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
