export default defineNuxtRouteMiddleware(to => {
    const isLoggedIn = !!(getUserData() && getToken())

    if (!isLoggedIn && to.path !== '/auth/login') {
        return navigateTo('/auth/login')
    }
})
