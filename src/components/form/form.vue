<template>
    <div class="isForm" :class="form.className">
        <form v-va="formData" errClass='err' :propCheck="propCheck">
            <div v-for="(item,i) in form.fileds" :key="item.tip" :class="item.style">
                <!-- <w-input v-if="item.filedType==='input'" v-model="item.value" :requestType="item.requestType" :format="item.format" :type="item.inputType" :tip="item.tip" :name="item.name" :className="item.className" :inputMaxLen="item.max"></w-input> -->
                <t-input v-if="item.filedType==='input'" v-model="item.value" :requestType="item.requestType" :format="item.format" :type="item.inputType" :tip="item.tip" :name="item.name" :className="item.className" :inputMaxLen="item.max"></t-input>
            </div>
        </form>
        <button class="btn">submit</button>
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
            formData: {},
            propCheck: 'false'
        };
    },
    watch: {
        form: {//监听form,把form的value值赋值给最终的formData
            handler(newValue, oldValue) {
                this.dataMap((item, i) => {
                    this.formData[item] = this.form.fileds[item].value;
                })
            },
            deep: true
        }
    },
    components: {},
    created() {
        Object.keys(this.form.fileds).map((item, i) => {
            this.formData[item] = this.form.fileds[item].value;
        })
    },
    methods: {
        dataMap(fn) {
            Object.keys(this.form.fileds).map(fn);
        }
    },
}

</script>

<style scoped>
.isForm {
  background: #fff;
  height: 100%;
  padding: 0.6rem 0.8rem;
  padding-bottom: 0;
}
.isForm form {
  width: 100%;
}
.btn {
  width: 100%;
  background: #36c426;
  padding: 0.2rem;
  color: #fff;
  border-radius: 0.2rem;
  cursor: pointer;
}
.isForm .width50 {
  display: inline-block;
  width: 49%;
}
.isForm .width50-last {
  display: inline-block;
  width: 50%;
  float: right;
}
</style>