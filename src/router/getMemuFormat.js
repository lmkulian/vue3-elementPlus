const loadView = import.meta.glob('../views/**/**/*.vue')
const _import = (path) => () => import(`../../views/${path}.vue`)


const assembleRouter = (routers) => {
    const addRouter = routers.filter((router) => {
        router.component = loadView[`../views${router.component}.vue`]
        if (router.children && router.children.length) {
            router.children = assembleRouter(router.children)
        }
        return true
    })
    return addRouter
}
export default assembleRouter