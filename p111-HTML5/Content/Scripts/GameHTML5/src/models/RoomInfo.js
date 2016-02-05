/**
 * Created by hungtd on 1/22/2016.
 */
define(function (require) {

    var VariableKeys             =      require("keys/VariableKeys");


    RoomInfo.prototype = Object.create(Object.prototype);
    RoomInfo.prototype.constructor = RoomInfo;

    Object.defineProperties(RoomInfo.prototype,
        {
            room:{
                value:null,
                writable:true
            },

            roomId:{
                get :function() {
                    return this.room.getVariable(VariableKeys.ROOM_ID);
                }
            },

            numView:{
                get :function() {
                    return this.room.getVariable(VariableKeys.NUM_VIEW);
                }
            },

            timeOut:{
                get :function() {
                    return this.room.getVariable(VariableKeys.TIME_OUT);
                }
            },

            betCoin:{
                get :function() {
                    return this.room.getVariable(VariableKeys.BET_COIN);
                }
            },

            rules:{
                get :function() {
                    return this.room.getVariable(VariableKeys.RULES) != null?this.room.getVariable(VariableKeys.RULES):"";
                }
            },

            roomName:{
                get :function() {
                    return this.room.getVariable(VariableKeys.ROOM_NAME);
                }
            },

            roomType:{
                get :function() {
                    return this.room.getVariable(VariableKeys.ROOM_TYPE);
                }
            },

            arrNick:{
                get :function() {
                    return this.room.getVariable(VariableKeys.ARR_NICK);
                }
            },

            boardType:{
                get :function() {
                    return this.room.getVariable(VariableKeys.BOARD_TYPE);
                }
            },

            boardState:{
                get :function() {
                    return this.room.getVariable(VariableKeys.BOARD_STATE);
                }
            },

            boardStatus:{
                get :function() {
                    return this.room.getVariable(VariableKeys.BOARD_STATUS);
                }
            },


            ownerCoin:{
                get :function() {
                    return this.room.getVariable(VariableKeys.OWNER_COIN);
                }
            },

            matchId:{
                get :function() {
                    var matchId = (room.getVariable(VariableKeys.MATCH_ID));
                    return isNaN(matchId)?0:matchId;
                }
            },

            isDefault:{
                get :function() {
                    return this.room.getName().toLowerCase().indexOf(GlobalConstants.ROOM_DEFAULT) > -1;
                }
            },

            serverTime:{
                get :function() {
                    var serverTime = this.room.getVariable(VariableKeys.SERVER_TIME);
                    if (serverTime == null)
                        return "";
                    return serverTime;
                }
            },

            oKhoa:{
                get :function() {
                    if (this.room.getVariable(VariableKeys.IS_LOCKED) == null)
                        return -2;
                    return int(this.room.getVariable(VariableKeys.IS_LOCKED));
                }
            },

            hasPassword:{
                get :function() {
                    return (this.room.getVariable(VariableKeys.HAS_PASSWORD));
                }
            },

            getTaiXiuMaxBet:{
                get :function() {
                    return (this.room.getVariable(VariableKeys.MAX_BET));
                }
            },

            getLuckyMaxBet:{
                get :function() {
                    return (this.room.getVariable(VariableKeys.MAX_BET));
                }
            },

            getCustomMaxPlayer:{
                get :function() {
                    return int(this.room.getVariable(VariableKeys.CUSTOM_MAX_PLAYER));
                }
            },

            getTotalPlayer:{
                get :function() {
                    return int(this.room.getVariable(VariableKeys.TOTAL_PLAYER));
                }
            },

            isB:{
                get :function() {
                    return this.roomType == 1;
                }
            },

            ownerId:{
                get :function() {
                    return int(this.room.getVariable(VariableKeys.OWNER_ID));
                }
            },

            isSolo:{
                get :function() {
                    return (thid.room.getVariable(VariableKeys.IS_SOLO));
                }
            },

            isGopGa:{
                get :function() {
                    return (this.room.getVariable(VariableKeys.IS_GOPGA));
                }
            },

            isSetupFirstTime:{
                get :function() {
                    return (this.room.getVariable(VariableKeys.IS_SETUP_FIRSTTIME));
                }
            },


        });


    /**
     * @param {Room} room Somebody's name.
     */
    function RoomInfo(room) {

        Object.call(this);
        this.room = room;
    }

    RoomInfo.fromRoom = function(room){

        var roomInfo = new RoomInfo(room);
        return roomInfo;
    };

    RoomInfo.getArrNick = function(variable){
        if (variable == null)
        {
            return [];
        }
        if (variable.length > 0)
        {
            var data = JSON.parse(variable);
            var arrNick = [];
            var length = data.length;
            for (var i = 0; i < length; i++)
            {
                arrNick.push(UserInBoard.fromJSON(data[i]));
            }
            return arrNick;
        }
        else
        {
            return null;
        }
    };

    return RoomInfo;
});