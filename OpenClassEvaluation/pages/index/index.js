Page({
  data:{
    title:'平行四边形的面积',
    navs:{
      top:[
        {
          link:'/pages/goals/student-event/student-event',
          text:'学生活动'
        },
        {
          link:'/pages/goals/teach-event/teach-event',
          text:'教学活动'
        }
      ],
      bottom:[
        {
          link:'/pages/goals/questions-observe/questions-observe',
          text:'课堂提问'
        },
        {
          link:'/pages/goals/evaluation/evaluation',
          text:'课堂评价'
        }
      ]
    }
  },
  onLoad(query) {
    // 页面加载
    //console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    // dd.getAuthCode({
    //   success:function(res){
    //     /*{
    //         authCode: 'hYLK98jkf0m' //string authCode
    //     }*/
    //     console.log("res:",res)
    //   },
    //   fail:function(err){
    //   }
    // });
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
