const Album = () => import("@/views/mainWindow/Search/components/Album")
const Single = () => import("@/views/mainWindow/Search/components/Single")
const PATH = '/mainWindow/search'
const search = [
    {
        name: 'searchSingle',
        path: PATH + '/single/:value',
        component: Single
    },
    {
        name: 'searchAlbum',
        path: PATH + '/Album/:value',
        component: Album
    }
]
export default search
