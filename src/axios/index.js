import axios from 'axios'

axios.defaults.timeout = 10000;
// axios.defaults.baseURL = '';

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data,{
      transformRequest: [function (data) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    })
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}
