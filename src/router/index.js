import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '@/components/home'
const home = r => require.ensure([], () => r(require('components/home')), 'home')
const demo = r => require.ensure([], () => r(require('components/demo')), 'home')
const input = r => require.ensure([], () => r(require('components/widgets/input')), 'home')
const form = r => require.ensure([], () => r(require('components/form')), 'home')

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'home', component: home },
	{ path: '/demo', name: 'demo', component: demo },
	{ path: '/input', name: 'input', component: input },
	{ path: '/form', name: 'form', component: form },
	{ path: '*', redirect: '/' }
]

const router = new VueRouter({ routes });

router.afterEach(() => {
    document.body.scrollTop = 0;
});

export default router;