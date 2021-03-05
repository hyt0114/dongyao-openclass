Page({
  data: {
    mode:0,
    eventType:0,
    formOptions:{
      modeOptions:[
        {text:"标准",value:"standard"},
        {text:"分组",value:"group"}
      ],
      eventOptions:[
        {text:"标准",value:"standard"},
        {text:"自定义",value:"custom"}
      ]
    },
    showPickpanelSeats:false,
    groups:[
      {
        left:8,
        right:6,
        count:10
      },
      {
        left:6,
        right:8,
        count:10
      },
      {
        left:6,
        right:7,
        count:10
      },
       {
        left:7,
        right:5,
        count:10
      }
    ],
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
    tableData:{
      headers:["活动类型","评分标准（时间：分）"],
      data:[]
    }
  },
  onLoad() {
    if(this.data.mode == 0){
      this.setData({
        "tableData.data":this.data.defaultEventData
      })
    }
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
  onSeatPickerChange(e){
    let left = e.detail.value[0] + 1;
    let right = e.detail.value[1] + 1;
    this.setData({
      ["groups["+this.data.editGroup.index+"]"]:{left:left,right:right}
    })
  },
  submitForm(){
    dd.showLoading({
      content:"数据处理中..."
    });
    setTimeout(()=>{
      dd.hideLoading();
      dd.switchTab({url:"/pages/myOpenClass/myOpenClass"});
    },3000)
  }
});
