/**
 * Created by phund on 28/01/2016.
 */
define(function (require) {
    //var ClasName = require("PathToClassName");
    'use strict';
    TimerMgame.prototype = Object.create(Object.prototype);
    TimerMgame.prototype.constructor = TimerMgame;


    // Hướng dẫn dùng
    //this.preLoader._ticker = new TimerMgame();
    //this.preLoader._ticker.counter = 5;
    //this.preLoader._ticker.CallBackFunctionOnComplete = this.preLoader.onTickerCompleteTest.bind(this.preLoader);
    //this.preLoader._ticker.CallBackFunctionOnUpdate = this.preLoader.onTickerTest.bind(this.preLoader);
    //this.preLoader._ticker.Start();

    Object.defineProperties(TimerMgame.prototype, {

        //Function gọi mỗi khi qua một lượt delay
        CallBackFunctionOnUpdate:{
            value:null,
            writable:true
        },

        // Function gọi khi chạy hết counter
        CallBackFunctionOnComplete:{
            value:null,
            writable:true
        },

        //thời sau quy định để vào hàm update
        delay:{
            value:1000,
            writable:true
        },
        //số lần chạy update trc khi dừng timer vào hàm complete
        counter:{
            value:0,
            writable:true
        },

        running:{
            get:function(){
                return this.timer.running;
            }
        }
    });

    /**
     *
     * @param {Number} _delayMS
     * @param {Number} _counter
     * @param {Func} _onUpdate
     * @param {Func} _onComplete
     * @constructor
     */
    function TimerMgame(_delay, _counter, _onUpdate, _onComplete) {

        Object.call(this);
        if(_delay === undefined || _delay == null)
            this.delay = 1000;
        else this.delay = _delay;

        if(_counter === undefined|| _counter == null)
            this.counter = 0;
        else this.counter = _counter;

        if(_onUpdate === undefined || _onUpdate == null)
            this.CallBackFunctionOnUpdate = null;
        else this.CallBackFunctionOnUpdate = _onUpdate;

        if(_onComplete === undefined || _onComplete == null)
            this.CallBackFunctionOnComplete = null;
        else this.CallBackFunctionOnComplete = _onComplete;

        this._curDate= null;
        this._timePass = 0;
        this._dateStartClock= null;
        this._timeGone = 0;
        this._counterPass = 0;
        this.timer = new PIXI.ticker.Ticker();
        this.timer.add(this._onUpdateTimer,this);

    }

    TimerMgame.prototype.Start = function(){
        this._dateStartClock = new Date();
        this._counterPass = 0;
        this._timePass = 0;
        this.timer.start();
    }

    TimerMgame.prototype.Stop = function () {
        this.timer.stop();
    }

    TimerMgame.prototype._onUpdateTimer = function(){
        this._curDate = new Date();
        this._timeGone = this._curDate.getTime() - this._dateStartClock.getTime();
        //var counterPass = parseInt(this._timeGone/ (this.delay*1000));
        this._timePass += this.timer.elapsedMS;
        //console.log('this.counter:'+this.counter);
       //console.log('counterPass:'+counterPass);
        if(this.counter > 0 && this._counterPass >= this.counter){
            this.Stop();
            //this.timeGone = this.TimeCount * 1000;
            //this._canvas.visible = false;
            if (this.CallBackFunctionOnComplete != null ){
                this.CallBackFunctionOnComplete();
            }
            return;
        }
        //console.log('this._timePass:'+this._timePass)
        if(this._timePass >= this.delay){
            this._timePass = 0;
            this._counterPass += 1;
            if (this.CallBackFunctionOnUpdate != null )
            {
                this.CallBackFunctionOnUpdate();
            }
        }
    }
    //TimerMgame.StaticVariable = StaticVariable;
    //TimerMgame.StaticFunction = function(){};

    return TimerMgame;
});