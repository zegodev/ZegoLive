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
4. 部署上线需要申请指定类目，详情请查看[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html)

# 快速运行demo
让开发者前期能快速体验demo效果，将app.js文件中的appid、appSign、server替换为你从即构申请到的配置信息，通过前端获取token。

appid,appSign,server地址 需要自行修改为自己的配置(请从控制台申请AppID时邮件内容里获取)

请注意：

appSign 为即构分配给项目对应的项目的密钥，切忌不可泄漏！！！

正式开发需要由业务后台实现token的逻辑，小程序端通过业务服务器获取token，详见[即构开发者中心](https://doc.zego.im/CN/387.html#4_2)

![image](http://zego-sdkdemospace.oss-cn-shanghai.aliyuncs.com/sdk-doc/mini-2.png)

# 里面包含哪些？
1. 基于即构sdk实现的livedemo
2. 基于即构sdk和小程序的live-pusher，live-player封装组件live-room,rtc-room
3. 调试工具页面

注意：

1. live-pusher，live-player 在开发者工具上暂不支持，只能在真机上演示
2. live-pusher 和 live-player是原生组件，使用上有一些限制，详见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)
3. 小程序websocket连接有限制，[详见](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html#%E5%B9%B6%E5%8F%91%E6%95%B0)


# live-room,rtc-room区别

## 不同
1. live-room用于直播场景，默认只有一个主播，单主播时优先保证画质，拉流默认从cdn获取；只有当出现连麦时切换成实时音视频，推流优先保证低延迟（mode=rtc）
2.  rtc-room用于实时音视频场景，默认多主播，优先保证低延迟，推拉流都默认走服务器；

## 相同
1. 内部结合了即构sdk和小程序推拉流组件，开发者可以不用关心他们之间使用时互相调用过程
2. 都提供了排列模版，开发者可以基于这些模版开发小程序，或修改样式或自定义模版快速实现自己小程序排版

# 更多
请访问 [即构开发者中心](https://doc.zego.im/CN/305.html)
