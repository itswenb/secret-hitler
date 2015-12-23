var Utils = require.main.require('./tools/utils');

var allPlayers = {};

var Player = function(socket, uid, name) {
	this.uid = uid;
	this.name = name;

	this.game = null;
	this.index = null;

	allPlayers[uid] = this;

	this.emit = function(name, data) {
		socket.emit(name, data);
	}

	this.emitOthers = function(name, data) {
		socket.broadcast.to(this.game.gid).emit(name, data);
	}

	this.emitAction = function(name, data) {
		return this.game.emitAction(name, data);
	}

	this.isPresident = function() {
		return this.index == this.game.president();
	}

	this.notData = function(data) {
		return this.uid != data.uid;
	}

	this.gamePlayer = function(socket) {
		return this.game.players[this.index];
	}

	return this;
}

Player.allPlayers = allPlayers;

module.exports = Player;
