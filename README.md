# 介绍
ZegoLive 是一个即构sdk功能示例demo，开发人员可以参考该demo，实现自己小程序的推拉流等功能


# 运行前提
1. 有自己的小程序appid
2. 确保自己的小程序开通了实时音视频权限
3. 若是要提交审核上线，还需要申请符号小程序直播内容的类目

# 如何开始
1. 克隆该仓库代码
2. 替换自己的小程序appid和即构appid
3. 确保自己的小程序打开了live-pusher，live-player使用权限和开关
4. 部署上线需要申请只对类目，详情请查看[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)


# 里面包含哪些？
1. 基于即构sdk实现的livedemo
2. 基于即构sdk和小程序live-pusher，live-player封装组件live-room,rtc-room
3. 调试工具页面

# live-room,rtc-room区别

## 不同
1. live-room用于直播场景，默认只有一个主播，单主播时优先保证画质，拉流默认从cdn获取；只有当出现连麦时切换成实时音视频，推流优先保证低延迟（mode=rtc）
2.  rtc-room用于实时音视频场景，默认多主播，优先保证低延迟，推拉流都默认走服务器；

## 相同
1. 内部结合了即构sdk和小程序推拉流组件，开发者可以不用关心他们之间使用时互相调用过程
2. 都提供了排列模版，开发者可以基于这些模版开发小程序，或修改样式或自定义模版快速实现自己小程序排版

# 更多
请访问 [即构开发者中心](https://www.zego.im/html/document/#Application_Scenes/Video_Live/Feature_Process:MiniProgram)
