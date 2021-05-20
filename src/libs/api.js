import axios from 'axios';
//错误码
const ERR_OK = 0;
const API_PRE = "/api/post-tool/v1/"

//拦截请求
axios.interceptors.request.use((config) => {
    // 请求头信息ajax
    config.headers={'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/json;charset=UTF-8',"BX-UID":'1'}
    return config
}, (error) => {
    return Promise.reject(error)
})


export function fetch (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    ERR_OK,
    similarCount (id,type,params) {
        return fetch(API_PRE+'collections/'+id+'/count/'+type, params)
    },
    differSimilar (params){
        return fetch(API_PRE+'collections/differ/similar', params)
    }
}
