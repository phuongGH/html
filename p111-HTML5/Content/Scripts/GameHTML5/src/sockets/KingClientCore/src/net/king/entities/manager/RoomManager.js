/**
 * Created by hungtd on 1/22/2016.
 */
define(function (require) {

    RoomManager.prototype = Object.create(Object.prototype);
    RoomManager.prototype.constructor = RoomManager;

    Object.defineProperties(RoomManager.prototype, {
        roomsById:{
            value:[],
            writable:true
        },

        roomsByName:{
            value:[],
            writable:true
        }
    });

    /**
     *
     *
     *
     * @return {RoomManager}
     */
    function RoomManager() {
        Object.call(this);
        this._init();
    }

    RoomManager.prototype._init = function () {
        this.roomsById = [];
        this.roomsByName = [];
    };

    RoomManager.prototype.onEnterFrame = function () {

    };

    /**
     * @param {Room} room
     */
    RoomManager.prototype.addRoom = function (room) {
        room.setRoomManager(this);
        this.roomsById.push({
            key:  room.getId(),
            value: room
        });

        this.roomsByName.push({
            key:   room.getName(),
            value: room
        });
    };

    /**
     * @param {String} room
     */
    RoomManager.prototype.containsRoomByName = function (name) {
        return this.roomsByName.hasOwnProperty(name);
    };

    /**
     * @param {Number} roomId
     */
    RoomManager.prototype.containsRoomId = function (roomId) {
        return this.roomsById.hasOwnProperty(roomId);
    };

    /**
     * @param {Number} roomId
     */
    RoomManager.prototype.containsRoom = function (roomId) {
        return this.roomsById.hasOwnProperty(roomId);
    };

    /**
     * @param {Room} room
     * @param {Number} maxUsers
     * @param {Number} maxSpect
     */
    RoomManager.prototype.changeRoomCapacity = function (room, maxUsers, maxSpect) {
        room.setMaxUser(maxUsers);
        room.setMaxSpectator(maxSpect);


    };

    /**
     *
     * @param {Number} id
     * @returns {*}
     */
    RoomManager.prototype.getRoomById = function (id) {
        if (this.roomsById.hasOwnProperty(id) == false)
        {
            return null;
        }
        return this.roomsById[id];
    };

    /**
     *
     * @returns Room
     * @param name
     */
    RoomManager.prototype.getRoomByName = function (name) {
        if (this.roomsByName.hasOwnProperty(name) == false)
        {
            return null;
        }
        return (this.roomsByName[name]);
    };

    /**
     *
     * @returns Array
     *
     */
    RoomManager.prototype.getRoomList = function () {
        return this.roomsById;
    };

    /**
     *
     * @returns Number
     *
     */
    RoomManager.prototype.getRoomCount = function () {
        return this.roomsById.length;
    };

    /**
     *
     * @returns
     * @param room
     */
    RoomManager.prototype.removeRoom = function (room) {
        this.removeRoomByIdAndName(room.getId(), room.getName());
    };


    RoomManager.prototype.removeRoomById = function (roomId) {
        if (this.roomsById.hasOwnProperty(roomId) == false)
        {
            return;
        }
        var room = this.roomsById[roomId];
        if (room)
        {
            this.removeRoomByIdAndName(roomId, room.getName());
            room = null;
        }
    };

    RoomManager.prototype.removeRoomByName = function (name) {
        if (this.roomsByName.hasOwnProperty(name) == false)
        {
            return;
        }
        var room = this.roomsByName[name];
        if (room)
        {
            this.removeRoomByIdAndName(room.getId(), name);
            room = null;
        }
    };

    RoomManager.prototype.removeUser = function (user) {
        var room;
        var listRooms = this.roomsById;
        listRooms.forEach(function(){
            if (room.containsUser(user))
            {
                room.removeUser(user);
            }
            room = null;

        });

        listRooms = null;
    };

    RoomManager.prototype.removeRoomByIdAndName = function (id, name) {
        this.roomsById.remove(id);
        this.roomsByName.remove(name);
    };

    RoomManager.prototype.clearAll = function () {
        var room;
        var listRoom = this.roomsById;
        listRoom.forEach(function (room) {
            room.clearAll();
            room = null;
        });

        this.roomsById.splice(0,this.roomsById.length);
        this.roomsByName.splice(0,this.roomsByName.length);
        listRoom = null;
    };

    RoomManager.prototype.clearRoom = function () {
        var room;
        var listRooms = this.roomsById;
        listRooms.forEach(function(){
            if (room.IsGame())
            {
                room.clearAll();
                this.removeRoomByIdAndName(room.getId(), room.getName());
            }
            room = null;
        });

        listRooms = null;
    };


    return RoomManager;
});