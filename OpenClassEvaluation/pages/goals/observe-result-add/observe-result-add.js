Page({
  data: {
    title:"添加课堂观察数据",
    levels:["认知","推理","创造","管理"],
    inner:{
      options:["获得问题结论","引发学生思考"]
    },
    outter:{
      options:["提醒","激励"]
    }
  },
  onLoad() {},
  submitForm(){
    dd.navigateTo({
      url:"/pages/goals/questions-observe/questions-observe"
    })
  }
});
