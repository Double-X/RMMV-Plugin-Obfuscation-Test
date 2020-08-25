/*
 * 1. It's possible for some users to want to have ATB bar with window frames, but that needs to have the ATB bar window opacity or padding tuned
 * 2. There's no way to tweak the ATB bar window opacity or padding right now on the user side
 * 3. I don't think that such requests make any sense as it's just an ATB bar, but I don't want to put down my users either
 * 4. Any such tunes and tweaks must be done by accessing the plugin implementation codes
 * 5. The following implementation parts are the minimum amount of relevant codes to the users, and they won't work without the rest of the plugins
 */
Window_SATBBar.prototype.initialize = function(t) {
    this.setBattler(t);
    var i = {
        x: this._x(),
        y: this._y(),
        width: this._w(),
        height: this._h()
    };
    Window_Base.prototype.initialize.call(this, i.x, i.y, i.width, i.height), this.opacity = 0
}, Window_SATBBar.prototype.standardPadding = function() {
    return 0
}, Window_SATBBar.prototype.setBattler = function(t) {
    if (this._battler !== t) {
        var i = this._battler;
        if (this._battler = t, !t) return this._updateProperty("visible", !1);
        i && i !== t && this.refreshWin()
    }
};
