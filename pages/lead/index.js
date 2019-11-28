//index.js
//获取应用实例
const app = getApp()
var template = require('../../tabbar.js');
Page({
  data: {
    nav:1
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })

    this.navFunction()
    wx.hideLoading()
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
  },
  Saom:function(){
    var uid = wx.getStorageSync("user");
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        if (res.errMsg == "scanCode:ok") {
          console.log(res.result)
          if (res.result) {
            wx.request({
              url: app.url + 'Saom/index',
              data: {
                goodsid: res.result,
                userid: uid.userid
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (r) {
                console.log(r)
                if (r.data.code == 200) {
                  wx.navigateTo({
                    url: "/pages/goods/goods?detail=" + r.data.data.goodsid
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
  onShow:function(){
    wx.hideHomeButton({
      success: function () {
        console.log(1)
      }
    })
  },
  navFunction: function (e) {
    var that = this
    var tid = '';
    if(e){
        tid = e.target.dataset.id
    }
    console.log(tid)
    var user= wx.getStorageSync("user");

    if (that.data != tid) {
      that.setData({
        nav: tid
      })
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.url + 'dmember/orderlist',
      data: {
        id: user.userid,
        tid: tid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        that.setData({
          order_item: res.data.data.data
        })
      },
    })
  }
})
