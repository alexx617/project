import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '@/components/home'
const home = r => require.ensure([], () => r(require('components/home')), 'home')
const demo = r => require.ensure([], () => r(require('components/demo')), 'home')
const form = r => require.ensure([], () => r(require('components/form/form')), 'home')
const one = r => require.ensure([], () => r(require('components/form/one')), 'home')
const mask = r => require.ensure([], () => r(require('components/mask')), 'home')
const mask_t = r => require.ensure([], () => r(require('components/mask_t')), 'home')
const pic = r => require.ensure([], () => r(require('components/pic')), 'home')

Vue.use(VueRouter)

const routes = [
	{ path: '/home', name: 'home', component: home },
	{ path: '/demo', name: 'demo', component: demo },
	{ path: '/form', name: 'form', component: form },
	{ path: '/mask', name: 'mask', component: mask },
	{ path: '/mask_t', name: 'mask_t', component: mask_t },
	{ path: '/pic', name: 'pic', component: pic },
	{ path: '/', name: 'one', component: one },
	{ path: '*', redirect: '/' }
]

const router = new VueRouter({ routes });

router.afterEach(() => {
    document.body.scrollTop = 0;
});

export default router;