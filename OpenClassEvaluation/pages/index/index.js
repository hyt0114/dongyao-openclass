import {request} from "/utils/api"
Page({
  data:{
    navs:{
      top:[
        {
          link:'/pages/goals/student-event/student-event?classId=',
          text:'学生活动'
        },
        {
          link:'/pages/goals/teach-event/teach-event?classId=',
          text:'教学活动'
        }
      ],
      bottom:[
        {
          link:'/pages/goals/questions-observe/questions-observe?classId=',
          text:'课堂提问'
        },
        {
          link:'/pages/goals/evaluation/evaluation?classId=',
          text:'课堂评价'
        }
      ]
    },
    classId:0,
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
  onReady() {
    // 页面加载完成
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
    console.log("bt")
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '课堂评价系统',
      desc: '课堂评价系统',
      path: 'pages/index/index',
    };
  },
});
