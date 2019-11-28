// pages/goodslist/goodslist.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    nav:1,
    type_item: [{id:1,name:"女装"},{id:2,name:"男装"},{id:3,name:"女童"},{id:4,name:"男童"}],
    goods_item:[],
    showtype:'ALL'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this
    var user = wx.getStorageSync('user')
    wx.showLoading({
      title: '加载中...',
    })
    that.showGoods(0);
  },
  listenerButton: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  listenerActionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  TypeFunction: function(env){
    var that = this
    this.setData({
      showtype: env.currentTarget.dataset.name,
      actionSheetHidden: true
    })
    that.showGoods(env.currentTarget.dataset.id);
  },
  urlshop:function(e){
    let that = this
    let num = e.currentTarget.dataset.val
    let nav = that.data.nav
    let dat = nav === 1 ? 2 : 1
    console.log(that.data.nav)
    console.log(num)
    if(num != nav){
      that.setData({
        nav: dat
      })
    }
  },
  showGoods:function(e){
    var that = this
    var user = wx.getStorageSync('user')
    wx.request({
      url: app.url + 'shop/shopCenter/',
      data: {
        shopid: user.userid,
        type:e
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function(res) {
        console.log(e)
        console.log(res.data.data.data)
        wx.hideLoading()
        that.setData({
          goods_item: res.data.data.data
        });
      },
    })

  }

})