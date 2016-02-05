/**
 * Created by hungtd on 1/22/2016.
 */
define(function (require) {

    var UserManager = require('sockets/KingClientCore/src/net/king/entities/manager/UserManager');

    Room.prototype = Object.create(Object.prototype);
    Room.prototype.constructor = Room;

    Object.defineProperties(Room.prototype, {
        id:{
            value:0,
            writable:true
        },

        name:{
            value:'',
            writable:true
        },

        groupId:{
            value:'',
            writable:true
        },

        isGame:{
            value:false,
            writable:true
        },

        isHidden:{
            value:false,
            writable:true
        },

        isPasswordProtected:{
            value:false,
            writable:true
        },

        variables:{
            value:[],
            writable:true
        },

        userCount:{
            value:0,
            writable:true
        },

        userManager:{
            value:null,
            writable:true
        },

        maxUser:{
            value:0,
            writable:true
        },

        maxSpectator:{
            value:0,
            writable:true
        },

        roomManager:{
            value:null,
            writable:true
        },

        ownerId:{
            value:0,
            writable:true
        },

        spectatorCount:{
            value:0,
            writable:true
        }



    });

    /**
     *
     *
     * @param  {Number}id
     * @param  {String} name
     * @param  {Number}groupId
     * @return {Room}
     */
    function Room(id, name, groupId) {
        Object.call(this);
        this.id = id;
        this.name = name;
        this.groupId = groupId;

        this._init();
    }

    Room.prototype._init = function(){
        this.isGame = this.isHidden = false;

        this.userCount = this.spectatorCount = 0;

        this.variables = [];
        this.userManager = new UserManager();
    };

    Room.prototype.getId = function(){
        return this.id;
    };

    Room.prototype.getName = function(){
        return this.name;
    };

    /**
     * @param {String} name
     */
    Room.prototype.setName = function(name){
        this.name = name;
    };

    /**
     * @return {Number} groupId
     */
    Room.prototype.getGroupId = function(){
        return this.groupId;
    };

    Room.prototype.IsGame = function(){
        return this.isGame;
    };

    Room.prototype.IsHidden = function(){
        return this.isHidden;
    };

    Room.prototype.IsPasswordProtected = function(){
        return this.isPasswordProtected;
    };

    Room.prototype.setPasswordProtected = function(value){
        this.isPasswordProtected = value;
    };

    Room.prototype.getUserCount = function(){
        return this.userManager.getUserCount();
    };

    Room.prototype.getMaxUser = function(){
        return this.maxUser;
    };

    Room.prototype.getSpectatorCount = function(){
        return this.userManager.getSpectatorCount();
    };

    Room.prototype.getMaxSpectator = function(){
        return this.maxSpectator;
    };

    Room.prototype.getCapacity = function(){
        return this.maxUser + this.maxSpectator;
    };

    Room.prototype.setIsGame = function(value){
        this.isGame = value;
    };

    Room.prototype.setHidden = function(hidden){
        this.isHidden = hidden;
    };

    Room.prototype.setUserCount = function(userCount){
        this.userCount = userCount;
    };

    Room.prototype.setMaxUser = function(maxUser){
        this.maxUser = maxUser;
    };

    Room.prototype.setSpectatorCount = function(spectatorCount){
        this.spectatorCount = spectatorCount;
    };

    Room.prototype.setMaxSpectator = function(maxSpectator){
        this.maxSpectator = maxSpectator;
    };

    Room.prototype.setOwnerId = function(userId){
        this.ownerId = userId;
    };

    Room.prototype.getOwnerId = function(){
        return this.ownerId;
    };

    Room.prototype.addUser = function(user){
        user.setJoinedRoom(this);
        user.setUserManager(this.userManager);
        this.userManager.addUser(user);
    };

    Room.prototype.removeUser = function(user){
        this.userManager.removeUser(user);
    };

    Room.prototype.containsUser = function(user){
        return this.userManager.containsUser(user);
    };

    Room.prototype.getUserByName = function(name){
        return this.userManager.getUserByName(name);
    };

    Room.prototype.getUserById = function(userId){
        return this.userManager.getUserById(userId);
    };

    Room.prototype.getUserList = function(){
        return this.userManager.getUserList();
    };


    Room.prototype.getPlayerList = function(){
        var playerList =[];
        var listUser = this.userManager.getUserList();

        listUser.forEach(function(user)
        {
            if (user.isPlayerInRoom(this))
            {
                playerList.push(user);
            }
        });


        listUser = null;
        return playerList;
    };


    Room.prototype.getSpectatorList = function(){
        var spectatorList = [];
        var listUser = this.userManager.getUserList();

        listUser.forEach(function(user)
        {
            if (user.isPlayerInRoom(this))
            {
                spectatorList.push(user);
            }
        });

        listUser = null;
        return spectatorList;
    };

    Room.prototype.setVariable = function(key,value){
        this.variables.push({
            key:  key,
            value: value
        });
    };

    Room.prototype.getVariable = function(key){
        return this.variables.getPropertyValue(key);
    };

    Room.prototype.setVariables = function(listVariables){
        var variable;
        for (var i = 0; i < listVariables.length; i++)
        {
            variable = listVariables[i];
            this.setVariable(variable[0], variable[2]);
        }

        listVariables = null;
    };

    Room.prototype.getVariables = function(){
        return this.variables;
    };

    Room.prototype.containsVariable = function(name){
        return this.variables.hasOwnProperty(name);
    };

    Room.prototype.getRoomManager = function(){
        return this.roomManager;
    };

    Room.prototype.setRoomManager = function(roomManager){
        this.roomManager = roomManager;
    };

    Room.prototype.clearAll = function(){
        this.variables.splice(0,this.variables.length);
        this.roomManager = null;
        this.userManager.clearAll();
    };

    Room.fromJSON = function(data){
        if (data == null)
        {
            throw new Error("Room.fromJSON's data is null");
            return null;
        }
        var newRoom = new Room(data[0], data[1], data[2]);
        newRoom.setIsGame(data[3]);
        newRoom.setHidden(data[4]);
        newRoom.setPasswordProtected(data[5]);
        newRoom.setUserCount(data[6]);
        newRoom.setMaxUser(data[7]);
        newRoom.setVariables(data[8]);
        if (newRoom.IsGame())
        {
            newRoom.setSpectatorCount(data[9]);
            newRoom.setMaxSpectator(data[10]);
            newRoom.setOwnerId(Number(data[11]));
        }
        data = null;
       // KingClient.getInstance().getRoomManager().addRoom(newRoom);
        return newRoom;
    };

    return Room;
});