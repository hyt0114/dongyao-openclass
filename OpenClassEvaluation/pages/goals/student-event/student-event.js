import {request} from "/utils/api"
Page({
  data: {
    classInfo:{
    },
    showPopDetail:false,
    currentGroup:0,
    currentSeat:0,
    answerData:{},
    statistics:{
      totalAnswerCount:0,
      averageAnswerCount:0,
      answerStudentCount:0,
      answerStudentPercent:0,
      correctCount:0,
      correctPercent:0,
      corePercent:0
    },
    detailOptions:[
      {
        title:"回答正确",
        value:"correct",
        css:"success"
      },
      {
        title:"回答错误",
        value:"wrong",
        css:"danger"
      },
      {
        title:"核心问题",
        value:"core",
        css:"warning"
      },
      {
        title:"提出质疑",
        value:"doubt",
        css:"primary"
      }
    ],
    tempDetail:[]
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
        if(this.data.classInfo.seatDetail && this.data.classInfo.seatDetail.trim() != ""){
          this.setData({
            "classInfo.seatDetail":JSON.parse(this.data.classInfo.seatDetail)
          })
        }
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
    dd.enableLeaveConfirm({
      effect: ['back', 'close'],
      info: {
        title: '忘记提交？',
        content: '当前页面内容尚未提交，离开将导致内容丢失，确认离开吗？'
      }
    });
  },
  showPopDetail(e){
    var group = e.target.dataset.group;
    var seat = e.target.dataset.seat;
    this.setData({
      currentGroup:group,
      currentSeat:seat,
      showPopDetail:true,
      tempDetail:[]
    })
    // dd.showActionSheet({
    //   title: '选择操作类型',
    //   items: ['回答了核心问题', '质疑了老师问题', '问题回答正确',"问题回答错误"],
    //   cancelButtonText: '取消',
    //   success: (res) => {
    //     if(res.index === -1) return;
    //     var key = this.data.currentGroup + "" +this.data.currentSeat;
    //     let data = this.data.answerData[key] || {core:0, correct:0,doubt:0,error:0}
    //     let currentTotalAnswerCount = this.data.statistics.totalAnswerCount;
    //     var currentCorrectCount = this.data.statistics.correctCount;
    //     if(res.index == 0){
    //       data.core++
    //     }else if(res.index == 1){
    //       data.doubt ++
    //     }else if(res.index == 2){
    //       data.correct ++
    //       currentTotalAnswerCount ++;
    //       currentCorrectCount ++;
    //       this.setData({
    //         'statistics.correctCount':currentCorrectCount
    //       })
    //     }else if(res.index == 3){
    //       data.error ++
    //       currentTotalAnswerCount ++
    //     }
    //     this.setData({
    //       ['answerData['+key+ "]"]:data
    //     })
    //     this.setData({
    //       'statistics.totalAnswerCount':currentTotalAnswerCount,
    //       'statistics.averageAnswerCount':Number(currentTotalAnswerCount/this.data.infos.studentCount).toFixed(2),
    //       'statistics.answerStudentCount':Object.keys(this.data.answerData).length,
    //       'statistics.answerStudentPercent':Number(Object.keys(this.data.answerData).length / this.data.infos.studentCount * 100).toFixed(1),
    //       'statistics.correctPercent':Number(currentCorrectCount / (currentTotalAnswerCount  == 0 ? 1 : currentTotalAnswerCount)* 100).toFixed(1)
    //     })
    //   },
    // });
  },
  bindDetailValue(e){
    this.setData({
      "tempDetail":e.detail.value
    })
  },
  hidePopDetail(){
    this.setData({
      showPopDetail:false
    })
  },
  comfirmDetail(){
    var key = this.data.currentGroup + "" +this.data.currentSeat;
    let data = this.data.answerData[key] || {core:0, correct:0,doubt:0,error:0}
    if(this.data.tempDetail.includes("correct")){
      data.correct++;
    }
    if(this.data.tempDetail.includes("wrong")){
      data.error++;
    }
    if(this.data.tempDetail.includes("core")){
      data.core++;
    }
    if(this.data.tempDetail.includes("doubt")){
      data.doubt++;
    }
    this.setData({
      ['answerData['+key+ "]"]:data
    })
    this.hidePopDetail();
  },
  submitForm(){
    dd.disableLeaveConfirm();
  }


});
