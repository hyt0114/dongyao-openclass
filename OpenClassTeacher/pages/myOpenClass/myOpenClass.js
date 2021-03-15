import {request} from '../../utils/api'
Page({
  data: {
    beginDate:"",
    endDate:"",
    pageSize:6,
    pageNum:1,
    statusOptions:["已开课","未开课"],
    statusIndex:0,
    tableData:{
      data:[
      ]
    },
    complete:false
  },
  onLoad() {
    
  },
  onShow(){
    let userInfo = dd.getStorageSync({key:"userInfo"}).data;
    if(userInfo){
      this.loadData();
    }
  },
  onPullDownRefresh(){
    this.setData({
      pageNum :1
    });
    this.loadData(true)
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
  onReachBottom(){
    this.setData({
      pageNum :this.data.pageNum+1
    });
    this.loadData(false,true)
  },
  bindPickerChange(e){
    this.setData({
      "statusIndex":e.detail.value
    })
  },
  loadData(pulldown=false,next=false){
    request("/class/queryClassList",{
        beginDate:this.initDate(this.data.beginDate),
        endDate:this.initDate(this.data.endDate,true),
        "pageSize":this.data.pageSize,
        "pageNum":this.data.pageNum
      }).then(data=>{
        if(data && data.length){
          let fullData = data;
          if(next){
            fullData = this.data.tableData.data.concat(data)
          }
          this.setData({
            "tableData.data":fullData,
            complete:data.length < this.data.pageSize ? true : false
          });
        }else{
          this.setData({
            complete:true
          })
        }
      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
          if(pulldown){
            dd.stopPullDownRefresh()
          }
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
  /*申请详情 */
  showClassInfo(e){
    dd.navigateTo({url:'/pages/classInfo/classInfo?classId='+e.target.dataset.classId});
  }
});
