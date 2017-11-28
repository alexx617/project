<template>
    <div class="isForm" :class="form.className">
        <form v-va="formData" errClass='err' :propCheck="propCheck">
            <div v-for="(item,i) in form.fileds" :key="item.tip">
                <w-input v-if="item.filedType==='input'" v-model="item.value" :requestType="item.requestType" :format="item.format" :type="item.inputType" :tip="item.tip" :name="item.name"></w-input>
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
            propCheck:'false'
        };
    },
    components: {},
    created() {
        Object.keys(this.form.fileds).map((item, i) => {
            this.formData[item] = this.form.fileds[item].value;
        })
    },
    methods: {
        
    },
}

</script>

<style scoped>
.isForm {
  background: #fff;
  height: 100%;
  padding: 0.6rem .8rem;
  padding-bottom: 0;
}
.btn {
  width: 100%;
  background: #36C426;
  padding: 0.2rem;
  color: #fff;
  border-radius: 0.2rem;
  cursor: pointer;
}
</style>