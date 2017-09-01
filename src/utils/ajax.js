import fetch from 'utils/service'
export default {
    //登录
    login(data) {
        return fetch({
            method: 'post',
            url: `/login`,
            // ContentType:'form',
            data
        })
    },
    //登录
    home(data) {
        return fetch({
            method: 'post',
            url: `/home`,
            // ContentType:'form',
            data
        })
    },
}