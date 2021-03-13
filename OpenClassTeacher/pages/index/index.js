import {request} from '../../utils/api'
import utils from '/utils/utils'
Page({
  data:{
    addrs:["东瑶小学"],
    addrIndex:0,
    userInfo:null,
    classIndex:0,
    form:{
      classTopics:"",
      schoolNm:"东瑶小学",
      classNm:"",
      studentNum:0,
      teacher:"",
      teacherUserId:"",
      classTime:"",
      classAddr:"东瑶小学",
      classType:0,
      teachingInfo:""
    },
    mode:0,
    eventType:0,
    activityType:0,
    formOptions:{
      modeOptions:[
        {text:"标准",value:"standard"},
        {text:"分组",value:"group"}
      ],
      eventOptions:[
        {text:"标准",value:"standard"},
        {text:"自定义",value:"custom"}
      ],
      activityOptions:[
        {text:"标准",value:"standard"},
        {text:"自定义",value:"custom"}
      ],
      classTypeOptions:[
        {text:"新授课",value:"teach"},
        {text:"练习课",value:"practice"},
        {text:"其他",value:"other"}
      ],
      teacherClasses:[]
    },
    showPickpanelSeats:false,
    showAddPanelEvent:false,
    showAddPanelActivity:false,
    groups:[
      {
        left:8,
        right:8
      },
      {
        left:8,
        right:8
      },
      {
        left:8,
        right:8
      },
       {
        left:7,
        right:5
      }
    ],
    defaultLineGroups:[10,10,10,10],
    lineGroups:[10,10,10,10],
    editGroup:{
      index:0,
      payload:[0,0]
    },
    defaultEventData:[
        {title:"教师讲解",value:"10"},
        {title:"师生交流",value:"10"},
        {title:"学生合作",value:"10"},
        {title:"学生独立思考",value:"10"}
    ],
    defaultActivityData:[
        {title:"回答正确",value:"10"},
        {title:"回答错误",value:"10"},
        {title:"核心问题",value:"10"},
        {title:"提出质疑",value:"10"}
    ],
    tableData:{
      headers:["活动类型","评分标准(时间:分)"],
      data:[]
    },
    activityData:{
      headers:["活动类型","评分标准(时间:分)"],
      data:[]
    },
    addTitle:"",
    addValue:0
  },
  onLoad(query) {
    // 页面加载
    if(this.data.mode == 0){
      this.setData({
        "tableData.data":this.data.defaultEventData
      })
    }
    if(this.data.activityType == 0){
      this.setData({
        "activityData.data":this.data.defaultActivityData
      })
    }
    //dd.removeStorageSync({key:"userInfo"})
    let userInfo = dd.getStorageSync({key:"userInfo"}).data;
    //console.log(userInfo)
    if(!userInfo){
      dd.getAuthCode({
        success:function(res){
            if(res.authCode){
              request('/login/getUserInfo',{
                authCode:res.authCode
              },{
                showLoading:false,
                json:false
              }).then(data=>{
                  dd.setStorageSync({
                    key:"userInfo",
                    data:data.result
                  })
              }).catch(err=>{
                console.error(err)
              });
            }
        },
        fail:function(err){
          dd.alert({
            content:"获取授权码失败,请稍后重试"
          })
        }
      });
    }
    
  },
  onReady() {
    // 页面加载完成
    let now = utils.getNow("yyyy-MM-dd hh:mm")
    this.setData({
      "form.classTime":now
    })
    let userInfo = dd.getStorageSync({key:"userInfo"}).data;
    if(userInfo){
      this.setData({
        "userInfo":userInfo,
        "form.teacher":userInfo.name,
        "form.teacherUserId":userInfo.userid
      });
      request("/class/teacherBelongClass",{
        userId:userInfo.userid
        //userId:"316252554537997002"
      }).then(data=>{
        if(data){
          this.setData({
            "formOptions.teacherClasses":data,
            "form.classNm":data[this.data.classIndex].className
          })
        }
      }).catch(err=>{
        console.error(err);
      });
    }
    
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '课堂申请',
      desc: '公开课课堂申请',
      path: 'pages/index/index',
    };
  },
  showDatePicker(){
    
    dd.datePicker({
      format: 'yyyy-MM-dd HH:mm',
      success: (res) => {
        this.setData({
          "form.classTime":res.date
        })
      },
      fail(err){
        console.log(err);
      }
    });
  },
  // submitForm(){
  //   dd.showLoading({
  //     content:"数据处理中..."
  //   });
  //   setTimeout(()=>{
  //     dd.hideLoading();
  //     dd.navigateTo({url:"/pages/detail/detail"});
  //   },3000)
  // }
  //,
  bindAddrChange(e){
    this.setData({
      "form.classAddr":e.detail.value
    });
  },
  bindModeChange(e){
    this.setData({
      "mode":e.detail.value
    });
  },
  bindEventChange(e){
    let data = [];
    if(e.detail.value == 0){
      data = this.data.defaultEventData;
    }
    this.setData({
      "eventType":e.detail.value,
       "tableData.data":data
    });
  },
  bindKeyInput(e){
    let key = e.target.dataset.key;
    this.setData({
      ["form."+key]:e.detail.value
    })
  },
  bindActivityChange(e){
    let data = [];
    if(e.detail.value == 0){
      data = this.data.defaultActivityData;
    }
    this.setData({
      "activityType":e.detail.value,
      "activityData.data":data
    });
  },
  bindClassTypeChange(e){
    this.setData({
      "form.classType":e.detail.value
    });
  },
  bindChangeClassName(e){
    let index = e.detail.value;
    this.setData({
      classIndex:index,
      "form.classNm":this.data.formOptions.teacherClasses[index].className
    })
  },
  showPickpanelSeats(e){
    let group = {
      index :e.target.dataset.index,
      payload:[e.target.dataset.left-1,e.target.dataset.right-1]
    }
    this.setData({
      "showPickpanelSeats":true,
      "editGroup":group
    });
  },
  hidePickpanelSeats(){
    this.setData({
      "showPickpanelSeats":false
    });
  },
  showAddPanelEvent(){
    this.setData({
      "showAddPanelEvent":true
    });
  },
  hideAddPanelEvent(){
    this.setData({
      "showAddPanelEvent":false
    });
  },
  showAddPanelActivity(){
    this.setData({
      "showAddPanelActivity":true
    });
  },
  hideAddPanelActivity(){
    this.setData({
      "showAddPanelActivity":false
    });
  },
  onSeatPickerChange(e){
    let left = e.detail.value[0] + 1;
    let right = e.detail.value[1] + 1;
    this.setData({
      ["groups["+this.data.editGroup.index+"]"]:{left:left,right:right}
    })
  },
  doAddTeachEvent(){
    if(!this.data.addTitle){
      return dd.showToast({
        content:"请输入活动类型"
      });
    }
    if(!this.data.addValue){
      return dd.showToast({
        content:"请输入评分标准"
      });
    }
    let eventObj = {
      title:this.data.addTitle,
      value:this.data.addValue
    };
    let len = this.data.tableData.data.length;
    this.setData({
      ["tableData.data["+len+"]"]:eventObj
    })
    this.hideAddPanelEvent();
  },
  doAddStudentActivity(){
    if(!this.data.addTitle){
      return dd.showToast({
        content:"请输入活动类型"
      });
    }
    if(!this.data.addValue){
      return dd.showToast({
        content:"请输入评分标准"
      });
    }
    let eventObj = {
      title:this.data.addTitle,
      value:this.data.addValue
    };
    let len = this.data.activityData.data.length
    this.setData({
      ["activityData.data["+len+"]"]:eventObj
    })
    this.hideAddPanelActivity();
  },
  removeOneEvent(e){
    let index = e.target.dataset.index;
    this.$spliceData({"tableData.data":[index,1]});
  },
  removeOneActivity(e){
    let index = e.target.dataset.index;
    this.$spliceData({"activityData.data":[index,1]});
  },
  bindAddKeyInput(e){
    let key = e.target.dataset.key;
    this.setData({
      [key]:e.detail.value
    })
  },
  bindGroupCountChange(e){
    let index = e.target.dataset.index;
    this.setData({
      ["lineGroups["+index+"]"]:Number(e.detail.value)
    })
  },
  addLineGroup(){
    let len = this.data.lineGroups.length;
    this.setData({
      ["lineGroups["+len+"]"]:10
    })
  },
  removeOneGroup(e){
    let index = e.target.dataset.index;
    this.$spliceData({"lineGroups":[index,1]});
  },
  submitForm(){
    if(!this.data.form.classTopics){
      return dd.showToast({
        content:" 请填写课堂主题 "
      })
    }
    if(!this.data.form.studentNum || this.data.form.studentNum == "0"){
      return dd.showToast({
        content:" 请输入有效人数"
      })
    }
    if(!this.data.form.classTime){
      return dd.showToast({
        content:" 请选择开课时间"
      })
    }
    request('/class/submit',this.data.form).then(data=>{
      if(data.classId){
        request("/class/updateClassOthers",{
          classId:data.classId,
          seatModel:this.data.mode,
          seatDetail:this.data.mode == 0 ? JSON.stringify(this.data.groups) : JSON.stringify(this.data.lineGroups),
          teachingModel:this.data.eventType,
          teachingDetail:JSON.stringify(this.data.tableData.data),
          studentActivitiesModel:this.data.activityType,
          studentActivitiesDetail:JSON.stringify(this.data.activityData.data),
        }).then(()=>{
          dd.switchTab({url:"/pages/myOpenClass/myOpenClass"});
        }).catch(err=>{
          console.error(err);
          dd.alert({
            content:"提交失败",
            buttonText:"好的"
          })
        })
      }
      
    }).catch(err=>{
      console.error(err);
      dd.alert({
        content:"保存失败",
        buttonText:"好的"
      })
    })
  }
});
