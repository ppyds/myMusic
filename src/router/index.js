import {createRouter, createWebHashHistory} from 'vue-router'
import mainWindowChildren from './mainWindow'
import logInRegisterWindowChildren from './logInRegisterWindow'

const MainWindow = () => import('@/views/mainWindow/mainWindow')
const LoginRegisterWindow = () => import('@/views/loginRegisterWindow/LoginRegisterWindow')
const routes = [

    {
        path: '/mainWindow',
        component: MainWindow,
        children: mainWindowChildren
    },
    {
        path: '/logInRegisterWindow',
        component: LoginRegisterWindow,
        children: logInRegisterWindowChildren
    },
    {
        path: '',
        redirect: '/mainWindow'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
