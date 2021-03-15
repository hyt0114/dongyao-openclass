import {request} from '/utils/api'
Page({
  data: {
    title:"课堂观察",
    pageSize:6,
    pageNum:1,
    beginDate:"",
    endDate:"",
    list:[],
    complete:false
  },
  onLoad() {
   this.loadData();
  },
  onReachBottom(){
    let pageNum = this.data.pageNum + 1;
    this.setData({
      "pageNum":pageNum
    })
    this.loadData(true);
  },
  onPullDownRefresh(){
    this.setData({
      pageNum:1,
      complete:false
    })
    this.loadData(false,true);
  },
  loadData(bottom=false,pulldown=false){
    request("/class/queryClassList",{
      beginDate:this.initDate(this.data.beginDate),
      endDate:this.initDate(this.data.endDate,true),
      "pageSize":this.data.pageSize,
      "pageNum":this.data.pageNum
    }).then(data=>{
      if(data && data.length){
        let fullData = bottom ? this.data.list.concat(data) : data;
        this.setData({
          "list":fullData,
          complete:data.length < this.data.pageSize ? true :false
        });
      }else{
        if(bottom){
          this.setData({
            complete:true
          })
        }
      }
    }).catch(e=>{
      console.error(e)
      dd.showToast({content:"刷新报错了"});
    }).finally(()=>{
      if(pulldown){
        dd.showToast({content:"刷新结束了"});
        dd.stopPullDownRefresh();
      }
    });
  },
  showDatePicker(e){
    let key = e.target.dataset.item;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      success: (res) => {
        this.setData({
          [key]:res.date
        })
      },
    });
  },
  initDate(date,end=false){
    console.log(date == "")
    if(date == null || date.trim() == ""){
      return null;
    }else{
      return date + (end?" 23:59:59":" 00:00:00")
    }
  },
  doSearch(){
    this.setData({
      pageNum :1
    });
    this.loadData();
  },
  gotoDetail(e){
    let classId = e.target.dataset.classId;
    dd.navigateTo({
      url:"/pages/index/index?classId="+classId
    })
  }
});
