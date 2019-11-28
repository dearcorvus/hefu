// pages/dweb/dweb.js
 const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nodes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let num = options.oid
    let title
    if(num == 1){
      title = '计价规则';
    }else{
      title = '法律条款及隐私政策';
    }
    // console.log(options)
    wx.setNavigationBarTitle({
      title: title
    })

    wx.request({
      url: app.url +'dweb',
      success:function(res){
        if (num == 1) {
          that.setData({
            nodes: res.data.data.member_agreement
          });
        } else {
          that.setData({
            nodes: res.data.data.price_guide1
          });
        }
      }
    })
  },
})