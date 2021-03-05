if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/header/header?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/popup/popup?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index/index?hash=007af442bc0cdfb6c292fc19942cc7786bf1fc4d');
require('../../pages/goals/student-event/student-event?hash=58a3a4304414a6f9ab1767ea92f35902df395b64');
require('../../pages/goals/teach-event/teach-event?hash=007af442bc0cdfb6c292fc19942cc7786bf1fc4d');
require('../../pages/goals/questions-observe/questions-observe?hash=007af442bc0cdfb6c292fc19942cc7786bf1fc4d');
require('../../pages/goals/evaluation/evaluation?hash=007af442bc0cdfb6c292fc19942cc7786bf1fc4d');
require('../../pages/goals/observe-result/observe-result?hash=007af442bc0cdfb6c292fc19942cc7786bf1fc4d');
require('../../pages/goals/observe-result-add/observe-result-add?hash=007af442bc0cdfb6c292fc19942cc7786bf1fc4d');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}