/**
 * Created by hungtd on 1/22/2016.
 */
define(function (require) {

    UserManager.prototype = Object.create(Object.prototype);
    UserManager.prototype.constructor = UserManager;

    Object.defineProperties(UserManager.prototype, {
        usersByName:{
            value:[],
            writable:true
        },

        usersById:{
            value:[],
            writable:true
        }
    });


    function UserManager() {
        Object.call(this);
        this._init();
    }

    UserManager.prototype._init =  function(){
        this.usersByName = [];
        this.usersById = [];
    };

    UserManager.prototype.containsUserName =  function(userName){
        return this.usersByName.hasOwnProperty(userName);
    };

    UserManager.prototype.containsUserId =  function(userId){
        return this.usersById.hasOwnProperty(userId);
    };

    UserManager.prototype.containsUser =  function(user) {
        return this.usersById.hasOwnProperty(user.getId());
    };

    UserManager.prototype.getUserByName =  function(userName){
        if (this.usersByName.hasOwnProperty(userName) == false)
        {
            return null;
        }
        return this.usersByName.getPropertyValue(userName);
    };

    UserManager.prototype.getUserById =  function(userId){
        if (this.usersById.hasOwnProperty(userId) == false)
        {
            return null;
        }
        return (this.usersById.getPropertyValue(userId));
    };

    UserManager.prototype.addUser =  function(user){
        this.usersByName.push({
            key:  user.getName(),
            value: user
        });

        this.usersById.push({
            key:   user.getId(),
            value: user
        });
    };

    UserManager.prototype.removeUser =  function(user){
        this.usersByName.remove(user.getName());
        this.usersById.remove(user.getId());
    };

    UserManager.prototype.removeUserById =  function(userId){
        var user = (this.usersById.getVariables(userId));
        if (user)
        {
            this.removeUser(user);
            user = null;
        }
    };

    UserManager.prototype.getUserById =  function(userId){
        if (this.usersById.hasOwnProperty(userId) == false)
        {
            return null;
        }
        return (this.usersById.getPropertyValue(userId));
    };

    UserManager.prototype.getUserCount =  function(){
        var count = 0;
        var listUser = this.getUserList();
        listUser.forEach(function(user){
            if (user.getPlayerId() >= 0)
            {
                count++;
            }
        });

        listUser = null;
        return count;
    };

    UserManager.prototype.getSpectatorCount =  function(){
        var count = 0;

        var listUser = this.getUserList();
        listUser.forEach(function(user){
            if (user.getPlayerId() < 0)
            {
                count++;
            }
        });

        listUser = null;
        return count;
    };

    UserManager.prototype.getNumUsersAndSpectators =  function(){
        return this.usersById.size;
    };

    UserManager.prototype.getUserList =  function(){
        return this.usersById;
    };

    UserManager.prototype.clearAll =  function(){
        this.usersByName.splice(0,this.usersByName.length);
        this.usersById.splice(0,this.usersById.length);
    };


    return UserManager;
});