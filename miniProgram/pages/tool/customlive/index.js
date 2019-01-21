let _methods = {
    input(ev){
        this.setData({
            streamUrl:ev.detail.value
        })
    },
    live({target}) {
        if (!this.data.streamUrl) {
            wx.showToast({
                title: '地址不能为空',
                icon: 'none',
                duration: 2000
            });
            return;
        }else if(!this.data.streamUrl.startsWith('rtmp')&&!this.data.streamUrl.endsWith('.flv')){
            wx.showToast({
                title: '地址格式不正确',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        wx.navigateTo({
            url: '../live/index?type=' + target.dataset.type + '&url=' + this.data.streamUrl
        });
    },
    copy(){
        wx.setClipboardData({
            data: this.data.streamUrl,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        console.log('copy success!') // data
                    }
                })
            }
        })
    },
    scanQR() {
        wx.scanCode({
            success: ({result, scanType}) => {
                if (scanType === "QR_CODE") {
                    this.setData({
                        streamUrl: result
                    });
                } else {
                    console.error('扫描的不是二维码')
                }
            },
            fail({errMsg}) {
                console.error('扫描失败', errMsg);
            }
        })
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        streamUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    ..._methods

});