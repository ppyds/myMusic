const Login = () => import('../views/loginRegisterWindow/Login')
const Register = () => import('../views/loginRegisterWindow/Register')

const loginRegisterWindow = [
    {
        path: '',
        component: Login,
        name: 'Login'
    },
    {
        path: '/Register',
        component: Register,
        name: 'Register'
    }
]
export default loginRegisterWindow
