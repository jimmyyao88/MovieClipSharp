MovieClipSharp
==============

Egret MovieClip的加强版,在原来的基础上增加了一些方法，具体用法和原来相同，动画的数据结构不变。
功能：
- 暂定播放
- 逆向播放
- 选定播放区间
- 选定首次播放开始帧
- 代码方式添加事件

##增加的方法

```
/**
 *
 * @param frameName {string} 指定动画的名称
 * @param currentFrameIndex {number} 开始的动画帧，值在开始帧和结束帧之间,值无效设置为第一帧
 * @param isReverse {boolean} 是否开启逆向播放
 * @param _beginFrame {number} 动画的开始帧
 * @param _endFrame {number} 动画的结束帧
 */
public gotoAndPlay(frameName:string,currentFrameIndex?:number,isReverse?:boolean ,
_beginFrame?:number,_endFrame?:number)

/**
 * 给指定动画帧加一个事件
 * @param frameName {string} 指定动画的名称
 * @param frameIndex {number} 添加到指定动画帧，0为第一帧
 * @param action {string} 触发事件的名称
 */
public addActionEvent(frameName:string,frameIndex:number,action:string)

/**
* 暂停动画
*/
public pause()

/**
 * 停止动画
 * @method egret.MovieClip#stop
 */
public stop()
```

