Page({
  data: {
    title:"课堂提问观察数据",
    questions:[
      {
        q:"第一个问题",
        level:{
          cognition:true
        },
        inner:{
          result:true,
          think:true
        },
        outter:{
          remind:true,
          inspire:true
        }
    },
    {
      q:"第二个问题",
      level:{
        reasoning:true
      },
      inner:{
        result:true,
        think:false
      },
      outter:{
        remind:false,
        inspire:true
      }
    },
    {
      q:"第三个问题",
      level:{
        creative:true
      },
      inner:{
        result:true,
        think:false
      },
      outter:{
        remind:false,
        inspire:true
      }
    },
    {
      q:"第四个问题",
      level:{
        manage:true
      },
      inner:{
        result:true,
        think:true
      },
      outter:{
        remind:true,
        inspire:false
      }
    },
    {
      q:"第五个问题",
      level:{
        cognition:true
      },
      inner:{
        result:true,
        think:true
      },
      outter:{
        remind:false,
        inspire:false
      }
    }
  ]
  },
  onLoad() {},
  addMark(){
    console.log("mark")
  },
  submitForm(){
    dd.navigateTo({
      url:"/pages/goals/observe-result-add/observe-result-add"
    })
  }
});