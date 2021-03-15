Page({
  data: {
    title:"课堂提问观察数据",
    lvOptions:[
      {name:"认知",value:1},
      {name:"推理",value:2},
      {name:"管理",value:3},
      {name:"创造",value:4}
    ],
    innerOptions:[
      {name:"获得问题结论",value:1},
      {name:"引发学生思考",value:2}
    ],
    outterOptions:[
      {name:"提醒",value:1},
      {name:"激励",value:2}
    ],
    questions:[
      
    ],
    classId:0
  },
  onLoad(query) {
    if(query.classId){
      this.setData({
        "classId":query.classId
      })
    }
    dd.enableLeaveConfirm({
      effect: ['back', 'close'],
      info: {
        title: '忘记提交？',
        content: '当前页面内容尚未提交，离开将导致内容丢失，确认离开吗？'
      }
    });
  },
  addQuestion(){
    let length = this.data.questions.length;
    let question = {
      palceholder:"新问题" + (length + 1)
    }
    this.setData({
      ["questions["+length+"]"]:question
    })
    dd.pageScrollTo({
      scrollTop: (166 * (length+1) + 80) * 2,
      duration:500
    })
  },
  removeQuestion(e){
    let index = e.target.dataset.index;
    dd.confirm({
      title: '温馨提示',
      content: '确定要删除此观察数据?',
      confirmButtonText: '立即删除',
      cancelButtonText: '再想想',
      success: (result) => {
          if(result.confirm){
            this.$spliceData({
              questions:[index,1]
            })
            dd.showToast({
              content:"删除成功"
            })
          }
        },
      });
  },
  bindQuestionValue(e){
    let index = e.target.dataset.index;
    let key = e.target.dataset.key;
    this.setData({
      ["questions["+index+"]."+key]:e.detail.value
    })
  },
  submitForm(){
    if(!this.data.questions || !this.data.questions.length){
      return dd.alert({
        content:"无可提交数据"
      });
    }
    let formValidated = this.data.questions.every((q,index)=>{
      if(!q.title 
         || !q.level 
         || !q.inner
         || !q.outter){
        return false;
      }
      return true;
    });
    if(!formValidated){
      return dd.alert({
        content:"请完善问题评价",
        buttonText:"好的"
      })
    }
    dd.disableLeaveConfirm()
    console.log("submit");
  }
});
