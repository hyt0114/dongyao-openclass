Component({
  mixins: [],
  data: {
    animationInfo:{}
  },
  props: {
    "show":false,
    "title":"请选择",
    "onHide":(data)=>{},
    "onSure":null
  },
  didMount() {
    var animation = dd.createAnimation({
      duration: 300,
        timeFunction: 'ease-in-out',
    });
    this.animation = animation;
    animation.translateY(-250).step();
    this.setData({
      animationInfo:animation.export()
    });
  },
  didUpdate() {
  },
  didUnmount() {},
  methods: {
    hide(){
      this.props.onHide();
    },
    sure(){
      this.props.onSure();
    }
  },
});
