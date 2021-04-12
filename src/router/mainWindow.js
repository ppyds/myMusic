const Home = () => import('../views/mainWindow/Home')
const Player = () => import('../views/mainWindow/Player')
const Collect = () => import('../views/mainWindow/Collect')
const Search = () => import('../views/mainWindow/Search')
const MainWindowChildren = [
    {
        path: '',
        component: Home,
        name: 'Home'
    },
    {
        path: '/player',
        component: Player,
        name: 'Player'
    },
    {
        path: '/collect',
        component: Collect,
        name: 'Collect'
    },
    {
        path: '/search',
        component: Search,
        name: 'Search'
    }]
export default MainWindowChildren
