import {createRouter, createWebHashHistory} from 'vue-router'

const Home = () => import('../views/Home')
const Player = () => import('../views/Player')
const Collect = () => import('../views/Collect')
const Search = () => import('../views/Search')
const routes = [
    {
        path: '/',
        component: Home,
        name:'Home'
    },
    {
        path:'/player',
        component: Player,
        name:'Player'
    },
    {
        path:'/collect',
        component: Collect,
        name:'Collect'
    },
    {
        path:'/search',
        component: Search,
        name:'Search'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
