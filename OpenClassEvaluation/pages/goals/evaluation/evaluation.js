import {request} from "/utils/api"
Page({
  data: {
    title:"课堂评价",
    classInfo:{}
  },
  onLoad(query) {
    if(query.classId){
      this.setData({
        "classId":query.classId
      })
      request("/class/queryDetail",{
        classId:query.classId
      }).then(data=>{
        this.setData({
          classInfo:data
        })
        if(this.data.classInfo.teachingDetail && this.data.classInfo.teachingDetail.trim() != ""){
          var main = [{id:"main",title:'课堂时间进度',primary:true}];
          let progressBars = JSON.parse(this.data.classInfo.teachingDetail);
          if(progressBars && progressBars.length){
            progressBars = main.concat(progressBars);
            progressBars.forEach(p=>{
              p.progress = 0;
              p.seconds = 0;
              p.showMinute = "00";
              p.showSeconds = "00";
              p.lastAddSeconds = 0;
              p.lastAdd = false;
            });
            this.setData({
              "progressbars":progressBars
            })
          }
        }
        
      }).catch(err=>{
        console.error(err);
      })
    }else{
      dd.alert({
        content:"发生错误",
        buttonText:"确定",
        success:()=>{
          dd.navigateBack();
        }
      })
    }
  },
});
