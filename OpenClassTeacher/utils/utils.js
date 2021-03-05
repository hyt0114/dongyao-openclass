const utils = {
  getNow(formatter="yyyy-MM-dd"){
    let now = new Date();
    let result = formatter;
    var opts = { 
        "yyyy" : now.getFullYear(),
        "MM" : this.prepend(now.getMonth()+1),                 //月份 
        "dd" : this.prepend(now.getDate()),                    //日 
        "hh" : this.prepend(now.getHours()),                   //小时 
        "mm" : this.prepend(now.getMinutes()),                 //分 
        "ss" : this.prepend(now.getSeconds()),                 //秒
    };
    Object.keys(opts).map(opt=>{
      if(formatter.includes(opt)){
        result = result.replace(opt,opts[opt]);
      }
    })
    return result;
  },
  prepend(source,count=2,mix="0"){
    source = "" + source;
    while(source.length < count){
      source = mix + source
    }
    return source;
  }
}
module.exports = utils;