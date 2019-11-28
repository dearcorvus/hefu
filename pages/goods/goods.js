// pages/goods/goods.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    imgUrls: [
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg',
      'http://desk-fd.zol-img.com.cn/g5/M00/02/05/ChMkJ1bKyZmIWCwZABEwe5zfvyMAALIQABa1z4AETCT730.jpg'
    ],
    show: false,
    index:0,
    array: ['归还','入库'],
    type:0,
    arr:['完好','破损','无法修复']
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTypeChange: function (e) {
    console.log('picker发送选择改变33333，携带值为', e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodsid = options.detail;
    var type = options.type
 
    wx.showLoading({
      title: '加载中...',
    })
    
    wx.request({
      url: app.url + 'Saom/goods',
      data: {
        goodsid: goodsid,
        type:type
      },
      // method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (r) {
        wx.hideLoading()
        console.log(r)
        if (r.data.code == 200) {
          that.setData({
            imgUrls: r.data.data.picarr,
            goods: r.data.data,
            nodes: r.data.data.info,
            goodsid: goodsid,
            type: type,
            status: r.data.status

          })
        } else {
          wx.showToast({
            title: r.data.massage,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })    
  },
  imageUtil:function(e){
    var imageSize = {};
    var originalWidth = e.detail.width; //图片的原始尺寸
    var originalHeight =e.detail.height;//图片原始高
    var originalScale =originalHeight / originalWidth;//图片高宽比
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕宽高比
        if(originalScale < windowscale){ //图片宽高小于屏幕宽高比
          //图片缩放后的宽度为屏幕宽
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight =(windowWidth * originalHeight) / originalWidth;
        }else{
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      },
    })
    return imageSize;
  },
  imageLoad:function(e){
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth:imageSize.imageWidth,
      imageheight:imageSize.imageHeight
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  subtimeFunction:function(){
    var that = this
    var user = wx.getStorageSync("user");
    var id = user.userid
    var goodsid = that.data.goodsid
    var moshi = 1
    console.log(goodsid)
    console.log(that.data)
    wx.request({
      url: app.url + 'shop/go_shop',
      data:{
        id:id,
        goodsid:goodsid,
        moshi:moshi
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if(res.data.code == 200){
          wx.showToast({
            title: res.data.massage,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })


  }
})