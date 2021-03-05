import {request} from '../../utils/api'
Page({
  data: {
    form:{
      beginTime:"",
      endTime:""
    },
    pageSize:10,
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
      request("/class/queryClassList",{
        //teacher:userInfo.name,
        //teacherUserId:userInfo.userid,
        "pageSize":this.data.pageSize,
        "pageNum":this.data.pageNum
      }).then(data=>{
        if(data && data.length){
          this.setData({
            "tableData.data":data
          });
        }
      }).catch(err=>{
        console.log(err)
      });
    }
  },
  onPullDownRefresh(){
    this.setData({
      pageNum :1
    });
    request("/class/queryClassList",{
        //teacher:userInfo.name,
        //teacherUserId:userInfo.userid,
        "pageSize":this.data.pageSize,
        "pageNum":this.data.pageNum
      }).then(data=>{
        if(data){
          this.setData({
            "tableData.data":data
          });
        }else{
          this.setData({
            complete:true
          })
        }
        dd.stopPullDownRefresh()
      }).catch(err=>{
        console.log(err)
        dd.stopPullDownRefresh()
      });
  },
  onReachBottom() {
    this.setData({
      pageNum :this.data.pageNum+1
    });
    request("/class/queryClassList",{
        //teacher:userInfo.name,
        //teacherUserId:userInfo.userid,
        "pageSize":this.data.pageSize,
        "pageNum":this.data.pageNum
      }).then(data=>{
        if(data  && data.length){
          let dataConcat = this.data.tableData.data.concat(data)
          this.setData({
            "tableData.data":dataConcat
          });
        }else{
          this.setData({
            complete:true
          })
        }
      }).catch(err=>{
        console.log(err)
      });
  },
  showDatePicker(e){
    let key = e.target.dataset.item;
    dd.datePicker({
      format: 'yyyy-MM-dd',
      success: (res) => {
        this.setData({
          ["form."+key]:res.date
        })
      },
    });
  },
  bindPickerChange(e){
    this.setData({
      "statusIndex":e.detail.value
    })
  },
  /*申请详情 */
  showClassInfo(e){
    dd.navigateTo({url:'/pages/classInfo/classInfo?classId='+e.target.dataset.classId});
  }
});
