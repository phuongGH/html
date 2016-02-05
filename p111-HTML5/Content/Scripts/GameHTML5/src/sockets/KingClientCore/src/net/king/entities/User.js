/**
 * Created by hungtd on 1/25/2016.
 */

"use strict";
define/**
 *
 */
(function (require) {
    "use strict";
    User.prototype = Object.create(Object.prototype);
    User.prototype.constructor = User;

    Object.defineProperties(User.prototype, {
        /**
         *
         */
        id:{
            value:1,
            writable:true
        },

        privilegeId:{
            value:0,
            writable:true
        },

        name:{
            value:'',
            writable:true
        },

        isItMe:{
            value:false,
            writable:true
        },

        variables:{
            value:[],
            writable:true
        },

        playerId:{
            value:0,
            writable:true
        },

        userManager:{
            value:[],
            writable:true
        },

        joinedRoom:{
            value:1,
            writable:true
        }


    });

    /**
     *
     *
     * @param {Number} id
     * @param {String} name
     * @param {Boolean} isItMe
     * @return {User}
     */
    function User(id, name, isItMe) {
        Object.call(this);

        this.id = id;
        this.name = name;
        if(isItMe == undefined)
            isItMe = false;

        this.isItMe = isItMe;
        this.variables = [];

        this._init();
    }

    User.prototype._init = function () {


    };

    User.prototype.onEnterFrame = function () {

    };


    /**
     *@return {Number} id
     */
    User.prototype.getId = function(){
        return this.id;
    };

    /**
     *@return {String} name
     */
    User.prototype.getName = function(){
        return this.name;
    };

    /**
     *@return {Number} playerId
     */
    User.prototype.getPlayerId = function(){
        return this.playerId;
    };

    /**
     *@return {Boolean}
     */
    User.prototype.isPlayer = function(){
        return this.getPlayerId() >= 0;
    };

    /**
     *@return {Boolean}
     */
    User.prototype.isSpectator = function(){
        return this.getPlayerId() < 0;
    };

    /**
     * @param {Number} playerId
     */
    User.prototype.setPlayerId = function(playerId){
        this.playerId = playerId;
    };

    /**
     *@return {Number} privilegeId
     */
    User.prototype.getPrivilegeId = function(){
        return this.privilegeId;
    };

    /**
     * @param {Number} privilegeId
     */
    User.prototype.setPrivilegeId = function(privilegeId){
        this.privilegeId = privilegeId;
    };

    /**
     * @return {UserManager} userManager
     */
    User.prototype.getUserManager = function(){
        return this.userManager;
    };

    /**
     * @return {Room} joinedRoom
     */
    User.prototype.getUserManager = function(){
        return this.joinedRoom;
    };


    /**
     * @param {Room} room
     */
    User.prototype.setJoinedRoom = function(room){
        this.joinedRoom = room;
    };

    /**
     * @param {Room} room
     * @return {Boolean}
     */
    User.prototype.isPlayerInRoom = function(room){
        return (this.joinedRoom == room && this.playerId >= 0);
    };

    /**
     * @param {Room} room
     * @return {Boolean}
     */
    User.prototype.isSpectatorInRoom = function(room){
        return (this.joinedRoom == room && this.playerId < 0);
    };

    /**
     * @param {}
     * @return {Boolean}
     */
    User.prototype.isSpectatorInRoom = function(){
        return this.isItMe;
    };

    /**
     * @param {}
     * @return {Array}
     */
    User.prototype.getVariables = function(){
        return this.variables;
    };

    /**
     * @param {*} key
     * @param {*} value
     * @return {}
     */
    User.prototype.setVariable = function(key, value){
        this.variables.push({
            key:  key,
            value: value
        });
    };

    /**
     * @param {Object} listVariables
     *
     * @return {}
     */
    User.prototype.setVariables = function(listVariables){
        var variable;
        for (var i = 0; i < listVariables.length; i++)
        {
            variable = listVariables[i];
            this.setVariable(variable[0], variable[2]);
        }
        variable = null;
        listVariables = null;
    };

    /**
     * @param {*} key
     *
     * @return {}
     */
    User.prototype.getVariable = function(key){
        return this.variables[key];
    };

    /**
     * @param {*} key
     *
     * @return {}
     */
    User.prototype.getVariable = function(key){
        return this.variables.hasOwnProperty(key);
    };

    /**
     * @param {}
     *
     * @return {}
     */
    User.prototype.clear = function(){
        this.variables.splice(0, this.variables.length);
    };



    /**
     *@param {Array} data
     *@param {KingClient} kingClient
     *@return {User}
     */
    User.fromJSONArray = function(data,kingClient){
        var newUser = new User(data[0], data[1]);

        newUser.setPrivilegeId(data[2]);
        newUser.setPlayerId(data[3]);

        newUser.setVariables(data[4]);


        if (newUser.getId() == kingClient.getME().getId())
        {
            kingClient.setME(newUser);
        }
        return newUser;
    };
    return User;
});