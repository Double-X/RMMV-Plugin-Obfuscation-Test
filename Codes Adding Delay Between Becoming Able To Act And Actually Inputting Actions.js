/*
 * 1. Some users want some enemies and autobattle/confused actors to wait for a while instead of inputting actions right after they can do so
 * 2. There's no way to tweak the amount of delay between becoming able to input actions and actually doing so on the user side
 * 3. It's an excellent feature but I'm too busy for quite a while, and I don't want users to wait for too long
 * 4. Any such tunes must be done by accessing the plugin implementation codes
 * 5. The following implementation parts are the minimum amount of relevant codes to the users, and they won't work without the rest of the plugins
 */
Game_SATBPhaseTypes.prototype._fillCoreATB = function(e) {
    this.addCoreATB(this._fillRate(e))
}, Game_SATBPhaseTypes.prototype._onCoreATBBecomeFull = function() {
    this._battler.canMove() && this._battler.makeActions()
}, Game_SATBPhaseTypes.prototype._onCoreATBBecomeNotFull = function() {
    this._battler.clearActions()
};
// It's a minified then deminified version of the relevant parts of the original implementation codes
