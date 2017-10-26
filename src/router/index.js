import Vue from 'vue'
import VueRouter from 'vue-router'
// import home from '@/components/home'
const home = r => require.ensure([], () => r(require('components/home')), 'home')
const demo = r => require.ensure([], () => r(require('components/demo')), 'home')

Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'home', component: home },
	{ path: '/demo', name: 'demo', component: demo },
	{ path: '*', redirect: '/' }
]

const router = new VueRouter({ routes });

router.afterEach(() => {
    document.body.scrollTop = 0;
});

export default router;