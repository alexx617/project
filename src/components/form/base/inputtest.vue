<template>
	<div class="formItem" :class="className">
		<p>{{tip}}</p>
		<input :type="type" @input="setCurrentValue($event.target.value)" ref="input" :value="inputValue" :requestType="requestType" :class="[isMoney?'moneyL':'']" :maxlength="this.max" />
	</div>
</template>

<script>
import Cleave from 'cleave.js'
export default {
	name: 't-input',
	props: {
		value: {
			type: [String, Number],
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		requestType: {
			type: String,
		},
		format: {
			type: Object,
			default: () => ({})
		},
		tip: {
			type: String,
		},
		className: {
			type: String,
		},
		inputMaxLen: {
			type: String,
		},
		name: {
			type: String,
		}
	},

	data() {
		return {
			cleave: null
		}
	},

	methods: {
		emitEvent() {
			this.$emit('input', this.$refs.input.value)
		},
		setCurrentValue(val) {

		}
	},

	mounted() {
		this.$refs.input.value = this.value
		this.cleave = new Cleave(this.$refs.input, this.format)
		this.$refs.input.addEventListener('input', this.emitEvent)
	},
	watch: {
		format: {
			deep: true,
			handler(val) {
				this.cleave.destroy()
				this.cleave = new Cleave(this.$refs.input, val)
			}
		}
	},

}
</script>
<style>
.formItem {
  margin-bottom: 0.5rem;
  position: relative;
}
.formItem input {
  width: 100%;
  padding: 0.2rem;
  padding-right: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
  margin-top: 0.1rem;
}
.close {
  width: 0.8rem;
  height: 0.9rem;
  text-align: center;
  bottom: 0;
  right: 0;
  z-index: 3;
  position: absolute;
  cursor: pointer;
  background: url("~assets/close.png") no-repeat center;
  background-size: 60%;
}
.hide {
  display: none;
}
.show {
  display: block;
}
.isMoney {
  position: absolute;
  bottom: 0.3rem;
  left: 0.2rem;
}
.moneyL {
  padding-left: 0.5rem !important;
}
</style>