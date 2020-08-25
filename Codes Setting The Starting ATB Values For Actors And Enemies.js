/*
 * 1. Some users want some actors and enemies to have customized starting ATB values
 * 2. There's no way to tweak the starting ATB values of any battler
 * 3. It's an excellent feature but I've even more important tasks to work on, and this should be easy, simple and small enough for users to implement it themselves
 * 4. Any such tunes must be done by accessing the plugin implementation codes(doing so via battle events are just too troublesome and tedious)
 * 5. The following implementation parts are the minimum amount of relevant codes to the users, and they won't work without the rest of the plugins
 */
Game_Actor.prototype.setPreemptStartSATB = function() { /* Edit it to suit your needs and delete this function if you don't edit it */ };
Game_Actor.prototype.setSurpriseStartSATB = function() { /* Edit it to suit your needs and delete this function if you don't edit it */ };
Game_Actor.prototype.setNormStartSATB = function() { /* Edit it to suit your needs and delete this function if you don't edit it */ };
Game_Enemy.prototype.setPreemptStartSATB = function() { /* Edit it to suit your needs and delete this function if you don't edit it */ };
Game_Enemy.prototype.setSurpriseStartSATB = function() { /* Edit it to suit your needs and delete this function if you don't edit it */ };
Game_Enemy.prototype.setNormStartSATB = function() { /* Edit it to suit your needs and delete this function if you don't edit it */ };
