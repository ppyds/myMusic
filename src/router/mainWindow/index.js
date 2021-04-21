import search from "@/router/mainWindow/search";

const Home = () => import('../../views/mainWindow/Home')
const Player = () => import('../../views/mainWindow/Player')
const Collect = () => import('../../views/mainWindow/Collect')
const Search = () => import('../../views/mainWindow/Search')
const PATH = '/mainWindow'
const MainWindowChildren = [
    {
        path: PATH,
        redirect: PATH + '/home'
    },
    {
        path: PATH + '/home',
        component: Home,
        name: 'Home',
    },
    {
        path: PATH + '/player',
        component: Player,
        name: 'Player',
    },
    {
        path: PATH + '/collect',
        component: Collect,
        name: 'Collect'
    },
    {
        path: PATH + '/search',
        component: Search,
        redirect: '/mainWindow/search/single/null',
        children: search,
    }]
export default MainWindowChildren
