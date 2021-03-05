import {baseUrl} from './config'
const request = (url,data,opts)=>{
  return new Promise((resolve, reject) => {
    if (!url) {
      reject({
        code: 'no-url',
        msg: '请传入url地址'
      })
    }
    
    let defaultOptions = {
      showLoading:true,
      loadingText:"加载中",
      json:true,
      method:"post"
    }
    Object.assign(defaultOptions,opts)
    if(defaultOptions.showLoading){
      dd.showLoading({
        content: defaultOptions.loadingText
      })
    }
    
    dd.httpRequest({
      url: baseUrl + url,
      data: defaultOptions.json ? JSON.stringify(data) : data,
      method:defaultOptions.method,
      headers:{
        "Content-Type":defaultOptions.json?"application/json":"application/x-www-form-urlencoded"
      },
      dataType: 'json',
      success: (res) => {
        if (res.data.code == "200") {
          resolve(res.data.data)
        } else {
          reject(res.data.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        if(defaultOptions.showLoading){
          dd.hideLoading()
        }
      }
    })
  });
}
module.exports={
  request
}