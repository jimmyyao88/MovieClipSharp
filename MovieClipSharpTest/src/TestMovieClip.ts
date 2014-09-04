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

class TestMovieClip {

    public getDescription():string {
        return "MovieClip";
    }
     monkey:egret.MovieClipSharp;
    public createExample():void {
        var data = RES.getRes("monkey_json");
        var texture = RES.getRes("monkey_png");
        this.monkey = new egret.MovieClipSharp(data, texture);
        this.monkey.x = 200;
        this.monkey.y = 200;
        egret.MainContext.instance.stage.addChild(this.monkey);

        this.monkey.frameRate = 12;
        //添加一个结束事件的触发
        this.monkey.addActionEvent("attack",18,"end_attack");
        //获得结束事件，多传递了一个播放次数，其它参数以后添加
        this.monkey.addEventListener("end_attack" , this.endAttack , this);
        //第一次动画从第12帧开始，每次循环在5-19帧之间
        this.monkey.gotoAndPlay("attack",10,true,0,18);

    }
    public endAttack(e){
        console.log("播放次数="+e.data.playFrequencyt);
        //播放五次，停止到最开始的动作
        if(e.data.playFrequencyt==5){
            this.monkey.gotoAndStop(e.data.framName);
        }
    }
}