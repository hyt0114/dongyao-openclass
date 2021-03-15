import {request} from "/utils/api"
Page({
  data: {
    title:"教学活动观察量表",
    teaching:false,
    themes:["teach","interactive","cooperation","think"],
    types:[
      {text:"新授课",value:"teach"},
      {text:"练习课",value:"practice"},
      {text:"其他",value:"other",extend:true}
    ],
    maxTime:30 * 60,//seconds,
    incrementStep:5*60,
    beginClassId:null,
    processSeconds:0,
    lastCalcSeconds:0,
    progressbars:[/*
      {id:"main",title:'课堂时间进度',progress:0,seconds:0,primary:true,showMinute:"00",showSeconds:"00",lastAddSeconds:0,lastAdd:false},
      {id:"teach",title:'教师讲解',progress:0,seconds:0,showMinute:"00",showSeconds:"00",lastAddSeconds:0,lastAdd:false},
      {id:"interactive",title:'师生交流',progress:0,seconds:0,showMinute:"00",showSeconds:"00",lastAddSeconds:0,lastAdd:false},
      {id:"cooperation",title:'学生合作',progress:0,seconds:0,showMinute:"00",showSeconds:"00",lastAddSeconds:0,lastAdd:false},
      {id:"think",title:'学生独立思考',progress:0,seconds:0,showMinute:"00",showSeconds:"00",lastAddSeconds:0,lastAdd:false}
    */],
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
        if(this.data.classInfo.teachingDetail && this.data.classInfo.teachingDetail.trim() != ""){
          var main = [{id:"main",title:'课堂时间进度',primary:true}];
          let progressBars = JSON.parse(this.data.classInfo.teachingDetail);
          if(progressBars && progressBars.length){
            progressBars = main.concat(progressBars);
            progressBars.forEach(p=>{
              p.progress = 0;
              p.seconds = 0;
              p.showMinute = "00";
              p.showSeconds = "00";
              p.lastAddSeconds = 0;
              p.lastAdd = false;
            });
            this.setData({
              "progressbars":progressBars
            })
          }
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
  onUnload(){
    
    clearInterval(this.data.beginClassId);
  },
  startClass(){
    this.setData({
      'teaching':true
    })
    this.data.beginClassId = setInterval(()=>{
      let time = ++this.data.processSeconds;
      if(time > this.data.maxTime){
        this.setData({
          'maxTime':this.data.maxTime + this.data.incrementStep
        });
        // dd.showToast({
        //   type: 'success',
        //   content: '已经超过预设时间，自动增加5分钟'
        // });
        this.data.progressbars.map((p,index)=>{
          this.setData({
            ['progressbars['+index+'].progress']:p.seconds / this.data.maxTime * 100
          })
        })
      }
      this.setData({
        processSeconds:time
      })
      var index = this.data.progressbars.findIndex(p=>p.primary==true);
      if(index != -1){
        this.setData({
          ['progressbars['+index+'].progress']:this.data.processSeconds / this.data.maxTime * 100
        })
        this.formatShowTime(index,time);
      }
    },1000);
  },
  pauseClass(){
    this.setData({
      'teaching':false
    })
    clearInterval(this.data.beginClassId)
  },
  /**
   * 记录
   */
  record(event){
    let index = event.target.dataset.index;
    if(!this.data.teaching) return;
    let progress = this.data.progressbars[index];
    if(progress.primary)
      return;//主进程不需要记录
    if(index){
      let processTime = this.data.processSeconds;
      let recordTime = processTime - this.data.lastCalcSeconds;
      this.setData({
        'lastCalcSeconds':processTime
      })
      let seconds = this.data.progressbars[index].seconds + recordTime;  
      this.setData({
        ['progressbars['+index+'].seconds']:seconds,
        ['progressbars['+index+'].progress']:seconds / this.data.maxTime * 100,
        ['progressbars['+index+'].lastAddSeconds']:recordTime
      })
      this.formatShowTime(index,seconds);
      this.setCurrentAdded(index);
    }
  },
  formatShowTime(index,time){
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    this.setData({
        ['progressbars['+index+'].showMinute']:this.fix(minutes),
        ['progressbars['+index+'].showSeconds']:this.fix(seconds)
      })
  },
  fix(num){
    return num < 10 ? ("0" + num) : num
  },
  setCurrentAdded(index){
    this.data.progressbars.forEach((p,i)=>{
      this.setData({
         ['progressbars['+i+'].lastAdd']:false
      })
      this.setData({
        ['progressbars['+index+'].lastAdd']:true
      })
    })
  },
  feedback(event){
    let index = event.target.dataset.index;
    if(!this.data.teaching) return;
    let progress = this.data.progressbars[index];
    if(progress.primary)
      return;//主进程不需要记录
    if(index){
      let lastAddSeconds = this.data.progressbars[index].lastAddSeconds;
      let seconds = this.data.progressbars[index].seconds;
      let feedbackTime = seconds - lastAddSeconds;
      this.setData({
        ['progressbars['+index+'].lastAdd']:false,
        ['progressbars['+index+'].lastAddSeconds']:0,
        ['progressbars['+index+'].seconds']:feedbackTime,
        ['progressbars['+index+'].progress']:feedbackTime / this.data.maxTime * 100,
      })
      this.setData({
        'lastCalcSeconds':this.data.lastCalcSeconds - lastAddSeconds
      })
      this.formatShowTime(index,feedbackTime);
    }
  },
  checkClassType(e){
    this.setData({
      "form.classType":e.detail.value
    })
  },
  submitForm(){
    
  }
});
