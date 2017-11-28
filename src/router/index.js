import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '@/components/home'
const home = r => require.ensure([], () => r(require('components/home')), 'home')
const demo = r => require.ensure([], () => r(require('components/demo')), 'home')
const form = r => require.ensure([], () => r(require('components/form/form')), 'home')
const one = r => require.ensure([], () => r(require('components/form/one')), 'home')

Vue.use(VueRouter)

const routes = [
	{ path: '/home', name: 'home', component: home },
	{ path: '/demo', name: 'demo', component: demo },
	{ path: '/form', name: 'form', component: form },
	{ path: '/', name: 'one', component: one },
	{ path: '*', redirect: '/' }
]

const router = new VueRouter({ routes });

router.afterEach(() => {
    document.body.scrollTop = 0;
});

export default router;