// pages/hotel/index.js
const app = getApp()
var template = require('../../htabbar.js');
Page({
  data: {
    nav:1,
    order_item:[]
  },
  onLoad: function () {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    wx.hideHomeButton({
      success: function () {
        console.log(1)
      }
    })
    this.orderFunction();
  },
  Saom: function () {
    var uid = wx.getStorageSync("user");

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        if (res.errMsg == "scanCode:ok") {
          if (res.result) {
            wx.request({
              url: app.url + 'Saom/hotelSaom',
              data: {
                goodsid: res.result,
                shopid: uid.userid
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (r) {
                console.log(r)
                if (r.data.code == 200) {
                  wx.navigateTo({
                    url: "/pages/goods/goods?type=1&detail=" + r.data.data.goodsid
                  })
                } else {
                  wx.showToast({
                    title: r.data.massage,
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
              fail: function (res) {
                console.log(res)
              },
            })
          }
        }
      }
    })
  },
  orderFunction:function(e){
    var that = this 
    var user = wx.getStorageSync("user");
    var id = user.userid
    wx.request({
      url: app.url +'shop/shopOrder',
      data: {
        id:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        that.setData({
          order_item: res.data.data.data
        })
      }
    })
  },
  navFunction:function(e){
    var that = this
    var tid = '';
    if (e) {
      tid = e.target.dataset.id
    }
    // var tid = e.target.dataset.id
    var user = wx.getStorageSync("user");
    var id = user.userid
    if (that.data != tid){
      that.setData({
        nav:tid
      })
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.url +'shop/shopOrder',
      data: {
        id:id,
        tid:tid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wx.hideLoading()
        that.setData({
          order_item: res.data.data.data
        })  
      },
    })
  }
})