import {request} from '/utils/api'
Page({
  data: {
    title:"待开课列表",
    pageSize:8,
    pageNum:1,
    list:[]
  },
  onLoad() {
   request("/class/queryClassList",{
     "pageSize":6,
     "pageNum":1
   }).then(data=>{
     if(data && data.length){
        this.setData({
          "list":data
        });
      }
   }).catch(e=>{
     console.error(e)
   })
  },
  gotoDetail(e){
    let classId = e.target.dataset.classId;
    dd.navigateTo({
      url:"/pages/index/index?classId="+classId
    })
  }
});
