import {request} from '/utils/api'
Page({
  data: {
    classInfo:{},
    groups:[],
    tableData:{
      headers:["活动类型","评分标准（时间：分）"],
      data:[]
    },
    activityData:{
      headers:["活动类型","评分标准（时间：分）"],
      data:[]
    },
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
      ]
    }
  },
  onLoad(query) {
    request("/class/queryDetail",{
      classId:query.classId
    }).then(data=>{
      this.setData({
        classInfo:data
      })
      if(this.data.classInfo.seatDetail && this.data.classInfo.seatDetail.trim() != ""){
        this.setData({
          "classInfo.seatDetail":JSON.parse(this.data.classInfo.seatDetail)
        })
      }
      if(this.data.classInfo.teachingDetail && this.data.classInfo.teachingDetail.trim() != ""){
        this.setData({
          "classInfo.teachingDetail":JSON.parse(this.data.classInfo.teachingDetail),
          "tableData.data":JSON.parse(this.data.classInfo.teachingDetail)
        })
      }
      if(this.data.classInfo.studentActivitiesDetail && this.data.classInfo.studentActivitiesDetail.trim() != ""){
        this.setData({
          "classInfo.studentActivitiesDetail":JSON.parse(this.data.classInfo.studentActivitiesDetail),
          "activityData.data":JSON.parse(this.data.classInfo.studentActivitiesDetail)
        })
      }
    }).catch(err=>{
      console.error(err);
    })
  },
  goback(){
    dd.navigateBack();
  }
});
