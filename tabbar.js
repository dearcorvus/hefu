// pages/components/tabbar/tabbar.js

//初始化数据
function tabbarinit() {
  return [
    {
      "current": 1,
      "pagePath": "/pages/lead/index",
      "text": "我的订单"
    },
    {
      "current": 2,
      "iconPath": "../../static/images/saom.jpg",
    },
    {
      "current": 3,
      "pagePath": "/pages/user/user",
      "text": "个人中心"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}