/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * Created by http://bbs.egret-labs.org SongSharp on 2014/9/4.
 */
var egret;
(function (egret) {
    /**
     * @class egret.MovieClipSharp
     * @classdesc 影片剪辑，可以通过影片剪辑播放序列帧动画。
     * @extends egret.DisplayObjectContainer
     */
    var MovieClipSharp = (function (_super) {
        __extends(MovieClipSharp, _super);
        function MovieClipSharp(data, texture) {
            _super.call(this);
            /**
             * @member {number} egret.MovieClip#frameRate
             * 动画的播放帧频
             */
            this.frameRate = 60;
            this.delegate = new DefaultMovieSharpClipDelegate(data, texture);
            this.delegate.setMovieClip(this);
        }
        var d = __define,c=MovieClipSharp,p=c.prototype;
        /**
         *
         * @param frameName {string} 指定动画的名称
         * @param currentFrameIndex {number} 开始的动画帧，值在开始帧和结束帧之间,值无效设置为0，既第一帧
         * @param isReverse {boolean} 是否开启逆向播放
         * @param _beginFrame {number} 动画的开始帧
         * @param _endFrame {number} 动画的结束帧
         */
        p.gotoAndPlay = function (frameName, currentFrameIndex, isReverse, _beginFrame, _endFrame) {
            this.delegate.gotoAndPlay(frameName, currentFrameIndex, isReverse, _beginFrame, _endFrame);
        };
        /**
         * 给指定动画帧加一个事件
         * @param frameName {string} 指定动画的名称
         * @param frameIndex {number} 添加到指定动画帧，0为第一帧
         * @param action {string} 触发事件的名称
         */
        p.addActionEvent = function (frameName, frameIndex, action) {
            this.delegate.addActionEvent(frameName, frameIndex, action);
        };
        /**
         *
         * @param frameName {string} 指定帧的帧名称
         * @param currentFrameIndex {number} 停止指定的动画帧
         */
        p.gotoAndStop = function (frameName, currentFrameIndex) {
            if (currentFrameIndex === void 0) { currentFrameIndex = 0; }
            this.delegate.gotoAndStop(frameName, currentFrameIndex);
        };
        /**
         * 暂停动画
         */
        p.pause = function () {
            this.delegate.pause();
        };
        /**
         * 继续动画，只有暂停的有效，停止后的无效
         */
        p.continue = function () {
            this.delegate.continue();
        };
        /**
         * 停止动画
         * @method egret.MovieClip#stop
         */
        p.stop = function () {
            this.delegate.stop();
        };
        /**
         * @method egret.MovieClip#dispose
         */
        p.dispose = function () {
            this.delegate.dispose();
        };
        /**
         * 方法名改为 dispose
         * @method egret.MovieClip#release
         * @deprecated
         */
        p.release = function () {
            this.dispose();
        };
        /**
         * @method egret.MovieClip#getCurrentFrameIndex
         * @deprecated
         * @returns {number}
         */
        p.getCurrentFrameIndex = function () {
            return this.delegate["_currentFrameIndex"];
        };
        /**
         * 获取当前影片剪辑的帧频数
         * @method egret.MovieClip#getTotalFrame
         * @deprecated
         * @returns {number}
         */
        p.getTotalFrame = function () {
            return this.delegate["_totalFrame"];
        };
        /**
         * @method egret.MovieClip#setInterval
         * @deprecated
         * @param value {number}
         */
        p.setInterval = function (value) {
            this.frameRate = 60 / value;
        };
        /**
         * @method egret.MovieClip#getIsPlaying
         * @deprecated
         * @returns {boolean}
         */
        p.getIsPlaying = function () {
            return this.delegate["isPlaying"];
        };
        return MovieClipSharp;
    }(egret.DisplayObjectContainer));
    egret.MovieClipSharp = MovieClipSharp;
    egret.registerClass(MovieClipSharp,'egret.MovieClipSharp');
    var DefaultMovieSharpClipDelegate = (function () {
        function DefaultMovieSharpClipDelegate(data, texture) {
            this.data = data;
            this._totalFrame = 0;
            this._beginFrame = 0;
            this._passTime = 0;
            this._pauseTime = 0;
            this._isPause = false;
            this._currentFrameIndex = 0;
            this._isReverse = false;
            this._playFrequency = 0;
            this._isPlaying = false;
            this._frameData = data;
            this._spriteSheet = new egret.SpriteSheet(texture);
        }
        var d = __define,c=DefaultMovieSharpClipDelegate,p=c.prototype;
        p.addActionEvent = function (frameName, frameIndex, actionEventName) {
            var frame = this._frameData.frames[frameName];
            if (frame == undefined) {
                //egret.Logger.fatal("MovieClip没有对应的frame：", frameName);
                return;
            }
            var frameData = frame.childrenFrame[frameIndex];
            if (frameData == undefined) {
                //egret.Logger.fatal("该frame没有对应的帧，请确定值是否有效", name);
                return;
            }
            frameData["action"] = actionEventName;
        };
        p.setMovieClip = function (movieClip) {
            this.movieClip = movieClip;
            this.bitmap = new egret.Bitmap();
            this.movieClip.addChild(this.bitmap);
        };
        p.gotoAndPlay = function (frameName, currentFrameIndex, isReverse, _beginFrame, _endFrame) {
            if (currentFrameIndex === void 0) { currentFrameIndex = 0; }
            if (_beginFrame === void 0) { _beginFrame = 0; }
            this.checkHasFrame(frameName);
            this._playFrequency = 0;
            this._isPlaying = true;
            this._currentFrameName = frameName;
            this._isReverse = isReverse;
            this._passTime = 0;
            var totalFrame = this._frameData.frames[frameName].totalFrame;
            this._totalFrame = totalFrame;
            if (_beginFrame && _beginFrame > 0 && _beginFrame < totalFrame) {
                this._beginFrame = _beginFrame;
            }
            else {
                this._beginFrame = 0;
            }
            if (_endFrame && _endFrame > this._beginFrame) {
                this._totalFrame = Math.min(totalFrame, _endFrame + 1);
            }
            if (currentFrameIndex && (currentFrameIndex > this._totalFrame || currentFrameIndex < this._beginFrame)) {
                this._currentFrameIndex = _beginFrame;
            }
            else {
                this._currentFrameIndex = currentFrameIndex;
            }
            this.playNextFrame();
            egret.Ticker.getInstance().register(this.update, this);
        };
        p.gotoAndStop = function (frameName, currentFrameIndex) {
            this.checkHasFrame(frameName);
            this.stop();
            this._passTime = 0;
            this._currentFrameIndex = currentFrameIndex ? currentFrameIndex : 0;
            this._currentFrameName = frameName;
            this._totalFrame = this._frameData.frames[frameName].totalFrame;
            this.playNextFrame();
        };
        p.pause = function () {
            this._isPause = true;
        };
        p.continue = function () {
            this._isPause = false;
            this._pauseTime = 0;
        };
        p.stop = function () {
            this._isPlaying = false;
            egret.Ticker.getInstance().unregister(this.update, this);
        };
        p.dispose = function () {
        };
        p.checkHasFrame = function (name) {
            if (this._frameData.frames[name] == undefined) {
            }
        };
        p.update = function (advancedTime) {
            if (this._isPause) {
                this._pauseTime += advancedTime;
                this._passTime += advancedTime;
                return;
            }
            var oneFrameTime = 1000 / this.movieClip.frameRate;
            var last = this._passTime % oneFrameTime;
            var num = Math.floor((last + advancedTime) / oneFrameTime);
            while (num >= 1) {
                if (num == 1) {
                    this.playNextFrame();
                }
                else {
                    this.playNextFrame(false);
                }
                num--;
            }
            this._passTime += advancedTime;
        };
        p.playNextFrame = function (needShow) {
            if (needShow === void 0) { needShow = true; }
            var frameData = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (needShow) {
                var texture = this.getTexture(frameData.res);
                var bitmap = this.bitmap;
                bitmap.x = frameData.x;
                bitmap.y = frameData.y;
                bitmap.texture = texture;
            }
            if (frameData.action != null) {
                this.movieClip.dispatchEventWith(frameData.action, false, {
                    playFrequencyt: this._playFrequency,
                    framName: this._currentFrameName
                });
            }
            if (this._isReverse) {
                this._currentFrameIndex--;
                if (this._currentFrameIndex <= this._beginFrame) {
                    this._currentFrameIndex = this._totalFrame;
                    if (frameData.action != egret.Event.COMPLETE) {
                        this.movieClip.dispatchEventWith(egret.Event.COMPLETE);
                    }
                    if (this.playOnce) {
                        this.playOnce(this._currentFrameName, ++this._playFrequency);
                    }
                }
            }
            else {
                this._currentFrameIndex++;
                if (this._currentFrameIndex >= this._totalFrame) {
                    this._currentFrameIndex = this._beginFrame;
                    if (frameData.action != egret.Event.COMPLETE) {
                        this.movieClip.dispatchEventWith(egret.Event.COMPLETE);
                    }
                    if (this.playOnce) {
                        this.playOnce(this._currentFrameName, ++this._playFrequency);
                    }
                }
            }
        };
        p.playOnce = function (FrameName, playFrequency) {
        };
        p.getTexture = function (name) {
            var resData = this._frameData.res[name];
            var texture = this._spriteSheet.getTexture(name);
            if (!texture) {
                texture = this._spriteSheet.createTexture(name, resData.x, resData.y, resData.w, resData.h);
            }
            return texture;
        };
        return DefaultMovieSharpClipDelegate;
    }());
    egret.DefaultMovieSharpClipDelegate = DefaultMovieSharpClipDelegate;
    egret.registerClass(DefaultMovieSharpClipDelegate,'egret.DefaultMovieSharpClipDelegate',["egret.MovieClipSharpDelegate"]);
})(egret || (egret = {}));
//# sourceMappingURL=MovieClipSharp.js.map