/*:
 * @plugindesc Tests the plugin code implementation obfuscation security
 * Tests whether it's safe to expose just some small parts of the codebase
 * @author DoubleX
 *
 * @param IsCoreEnabled
 * @type note
 * @desc Sets whether this plugin will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _isParamFuncCached
 * @parent IsCoreEnabled
 * @type boolean
 * @desc (Advanced)Sets whether function parameters will be cached
 * Sets this off if at least some of those results' random
 * @default true
 *
 * @param _isNoteCached
 * @parent IsCoreEnabled
 * @type boolean
 * @desc (Advanced)Sets whether notetag lists/results will be cached
 * Sets this off if at least some of those results' random
 * @default true
 *
 * @param _isAlwaysRecacheAllSwitchVars
 * @parent IsCoreEnabled
 * @type boolean
 * @desc (Advanced)Please refer to _alwaysRecacheAllSwitchVars in the
 * help section of this parameter plugin
 * @default false
 *
 * @param _coreBaseFillUnit
 * @parent IsCoreEnabled
 * @type select
 * @option Frames
 * @value coreBaseFillATBFrame
 * @option Seconds
 * @value coreBaseFillATBSec
 * @desc Sets whether the ATB fill rate's based on frames or seconds
 * You can use script calls to change this choice later in game
 * @default coreBaseFillATBFrame
 *
 * @param coreBaseFillATBFrame
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the base number of ATB frames to fully fill battler ATB
 * It'll be contents of a function returning a Natural Number
 * @default "return 600;"
 *
 * @param coreBaseFillATBSec
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the base number of ATB second to fully fill battler ATB
 * It'll be contents of a function returning a positive Number
 * @default "return 5.0;"
 *
 * @param _coreTurnUnit
 * @parent IsCoreEnabled
 * @type select
 * @option Time
 * @value coreTurnATBTime
 * @option Number Of Actions
 * @value coreTurnATBAct
 * @desc Sets whether the turn's based on time or number of actions
 * You can use script calls to change this choice later in game
 * @default coreTurnATBTime
 *
 * @param coreTurnATBTime
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the turn duration as coreBaseFillUnit * coreTurnATBTime
 * It'll be contents of a function returning a positive Number
 * @default "return baseFillATB * 2.0 * +$gameVariables.value(5);"
 *
 * @param coreTurnATBAct
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the number of actions constituting a turn
 * It'll be contents of a function returning a Natural Number
 * @default "var memNum = BattleManager.allBattleMembers().length;\nreturn memNum * 2 * +$gameVariables.value(5);"
 *
 * @param canCoreTurnClockOverflow
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets whether current turn progress can overflow to the next
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param coreMaxATBVal
 * @parent IsCoreEnabled
 * @type note
 * @desc Sets the base maximum ATB value for each battler
 * It'll be contents of a function returning a positive Number
 * @default "return 100.0;"
 *
 * @param _coreMaxATBValNoteChainingRule
 * @parent IsCoreEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value +
 * @option Minuses all effective notetag values
 * @value -
 * @option Multiplies all effective notetag values
 * @value *
 * @option Divides all effective notetag values
 * @value /
 * @option Takes the modulo of all effective notetag values
 * @value %
 * @option Assigns all effective notetag values
 * @value =
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple coreMax notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _coreMaxATBValNotePriorities
 * @parent IsCoreEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of coreMax notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param _coreActStateNoteChainingRule
 * @parent IsCoreEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple coreActState notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param IsBarEnabled
 * @type note
 * @desc Sets whether the Bar Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param isShowATBBar
 * @parent IsBarEnabled
 * @type note
 * @desc Sets if the battler sprite ATB value bar will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return this.isActor() || this.isStateAffected(13);"
 *
 * @param atbBarText
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the text showing the battler ATB values
 * It'll be the contents of a function returning a String
 * @default "var cur = Math.floor(this.curSATB());\nvar max = Math.floor(this.curMaxSATB());\nvar actTimes = this.satbActTimes();\nif (!this.isSATBFill()) {\n    var itemName = this.latestSATBItem_.item.name;\n    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;\n}\nreturn cur + '/' + max + ' : ' + actTimes;"
 *
 * @param atbBarXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar x offset relative to the battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return this.isSATBFill() ? -40 : -80;"
 *
 * @param atbBarYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the ATB bar y offset relative to the battler sprite
 * It'll be the contents of a function returning an Integer
 * @default "return 10;"
 *
 * @param atbBarW
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the width of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return this.isSATBFill() ? 80 : 160;"
 *
 * @param atbBarH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the height of battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 20;"
 *
 * @param atbBarTextSize
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the size of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param atbBarLineH
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the line height of the battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param atbBarTextPadding
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the padding of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param atbBarBackOpacity
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the back opacity of the battler ATB value bar
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param atbBarTextXOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the x offset of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param atbBarTextYOffset
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the y offset of the text showing the battler ATB values
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param atbBarTextColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the color of the text showing the battler ATB values
 * It'll be the contents of a function returning a Color
 * @default "return bar.textColor(0);"
 *
 * @param atbBarColor1
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the left gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this.isSATBCharge()) return bar.textColor(26);\nif (this.isSATBCooldown()) return bar.textColor(30);\nreturn bar.textColor(8);"
 *
 * @param atbBarColor2
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the right gradient color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "if (this.isSATBCharge()) return bar.textColor(27);\nif (this.isSATBCooldown()) return bar.textColor(31);\nreturn bar.textColor(7);"
 *
 * @param atbBarBackColor
 * @parent IsBarEnabled
 * @type note
 * @desc Sets the background color of the battler ATB value bar
 * It'll be the contents of a function returning a Color
 * @default "return bar.textColor(15);"
 *
 * @param _isBarVisibleNoteChainingRule
 * @parent IsBarEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple isBarVisible notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _isBarVisibleNotePriorities
 * @parent IsBarEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of isBarVisible notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param IsHotkeyEnabled
 * @type note
 * @desc Sets whether the Hotkey Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param prevInputableActorKey
 * @parent IsHotkeyEnabled
 * @type note
 * @desc Sets the key to select the inputable actor at the left
 * It'll be the contents of a function returning a String
 * @default "return '#left';"
 *
 * @param nextInputableActorKey
 * @parent IsHotkeyEnabled
 * @type note
 * @desc Sets the key to select the inputable actor at the right
 * It'll be the contents of a function returning a String
 * @default "return '#right';"
 *
 * @param inputableActorKeys
 * @parent IsHotkeyEnabled
 * @type note
 * @desc Sets the key to select inputable actor by party member index
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num1', '#num2', '#num3', '#num4'];"
 *
 * @param IsWaitEnabled
 * @type note
 * @desc Sets whether the Wait Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param isATBWaitCondMet
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the ATB frame wait conditions to be met
 * It'll be the contents of a function returning a Boolean
 * @default "if (BattleManager.isSATBActPhase()) return true;\nif (this._actorWindow.active) return true;\nif (this._enemyWindow.active) return true;\nif (this._skillWindow.active) return true;\nif (this._itemWindow.active) return true;\nif (this._actorCommandWindow.active) return true;\nif (this._partyCommandWindow.active) return true;\nreturn this._changeWindow && this._changeWindow.active;"
 * @param forceRunATBKey
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the key to forcibly run the ATB frame updates
 * It'll be the contents of a function returning a String
 * @default "return '#shift';"
 *
 * @param forceStopATBKey
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the key to forcibly stop the ATB frame updates
 * It'll be the contents of a function returning a String
 * @default "return '#ctrl';"
 *
 * @param isShowForceATBStatWin
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets if the window showing force ATB status will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param noForceATBText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text showing the ATB frame update isn't forced
 * It'll be the contents of a function returning a String
 * @default "return 'Not Forcing ATB';"
 *
 * @param forceRunATBStatText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text showing the ATB frame update's forced to run
 * It'll be the contents of a function returning a String
 * @default "return 'Forcibly Running ATB';"
 *
 * @param forceStopATBStatText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text showing the ATB frame update's forced to stop
 * It'll be the contents of a function returning a String
 * @default "return 'Forcibly Stopping ATB';"
 *
 * @param forceATBStatWinX
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x position of the window showing force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param forceATBStatWinY
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y position of the window showing force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param forceATBStatWinW
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the width of the window showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 160;"
 *
 * @param forceATBStatWinH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the height of the window showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBStatTextSize
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the size of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStatWinLineH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the line height of the force ATB status window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStatWinPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the window showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param forceATBStatTextPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStatBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force ATB status window
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param forceATBStatTextXOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x offset of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStatTextYOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y offset of the text showing the force ATB status
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param isShowForceATBRunCmdWin
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets if the force run ATB command window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param forceRunATBCmdText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text of the force run ATB frame update command
 * It'll be the contents of a function returning a String
 * @default "return 'Force Run';"
 *
 * @param forceATBRunCmdWinX
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x position of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 0;"
 *
 * @param forceATBRunCmdWinY
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y position of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBRunCmdWinW
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the width of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param forceATBRunCmdWinH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the height of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBRunCmdTextSize
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the size of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBRunCmdWinLineH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the line height of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBRunCmdWinPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param forceATBRunCmdTextPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBRunCmdBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force run ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param forceATBRunCmdTextXOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x offset of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBRunCmdTextYOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y offset of the text of the force run ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param isShowForceATBStopCmdWin
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets if the force stop ATB command window will be shown
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param forceStopATBCmdText
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the text of the force stop ATB frame update command
 * It'll be the contents of a function returning a String
 * @default "return 'Force Stop';"
 *
 * @param forceATBStopCmdWinX
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x position of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param forceATBStopCmdWinY
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y position of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBStopCmdWinW
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the width of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 80;"
 *
 * @param forceATBStopCmdWinH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the height of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 40;"
 *
 * @param forceATBStopCmdTextSize
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the size of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStopCmdWinLineH
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the line height of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 12;"
 *
 * @param forceATBStopCmdWinPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 8;"
 *
 * @param forceATBStopCmdTextPadding
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the padding of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStopCmdBackOpacity
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the back opacity of the force stop ATB command window
 * It'll be the contents of a function returning an Integer
 * @default "return 192;"
 *
 * @param forceATBStopCmdTextXOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the x offset of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param forceATBStopCmdTextYOffset
 * @parent IsWaitEnabled
 * @type note
 * @desc Sets the y offset of the text of the force stop ATB command
 * It'll be the contents of a function returning an Integer
 * @default "return 4;"
 *
 * @param IsChargeEnabled
 * @type note
 * @desc Sets whether the Charge Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param chargeMaxATBVal
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets the base maximum ATB charge value for each battler
 * It'll be contents of a function returning a positive Number
 * @default "return coreMax;"
 *
 * @param _chargeMaxATBValNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value +
 * @option Minuses all effective notetag values
 * @value -
 * @option Multiplies all effective notetag values
 * @value *
 * @option Divides all effective notetag values
 * @value /
 * @option Takes the modulo of all effective notetag values
 * @value %
 * @option Assigns all effective notetag values
 * @value =
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple chargeMax notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _chargeMaxATBValNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of chargeMax notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param isPayBeforeExecCharge
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets whether skill/item costs are paid upon inputting them
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param _isPayBeforeExecChargeNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple isPayBeforeExecCharge notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _isPayBeforeExecChargeNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets data type priorities of isPayBeforeExecCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param cancelChargeATBKeys
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets the key to cancel the ATB charge
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num1', '#num2', '#num3', '#num4'];"
 *
 * @param canCancelCharge
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets whether skill/item ATB charge can be cancelled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _canCancelChargeNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple canCancelCharge notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _canCancelChargeNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of canCancelCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param forceChargeATBKeys
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets the key to forcibly extend/finish the ATB charge
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num5', '#num6', '#num7', '#num8'];"
 *
 * @param canForceCharge
 * @parent IsChargeEnabled
 * @type note
 * @desc Sets whether skill/item ATB charge can be forced
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _canForceChargeNoteChainingRule
 * @parent IsChargeEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple canForceCharge notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _canForceChargeNotePriorities
 * @parent IsChargeEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of canForceCharge notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param IsCooldownEnabled
 * @type note
 * @desc Sets whether the Cooldown Module will be enabled
 * It'll be the contents of a function returning a Boolean
 * @default "return false;"
 *
 * @param cooldownMaxATBVal
 * @parent IsCooldownEnabled
 * @type note
 * @desc Sets the base maximum ATB cooldown value for each battler
 * It'll be contents of a function returning a positive Number
 * @default "return coreMax;"
 *
 * @param _cooldownMaxATBValNoteChainingRule
 * @parent IsCooldownEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Adds all effective notetag values
 * @value +
 * @option Minuses all effective notetag values
 * @value -
 * @option Multiplies all effective notetag values
 * @value *
 * @option Divides all effective notetag values
 * @value /
 * @option Takes the modulo of all effective notetag values
 * @value %
 * @option Assigns all effective notetag values
 * @value =
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple cooldownMax notetags
 * You can use script calls to change this choice later in game
 * @default /
 *
 * @param _cooldownMaxATBValNotePriorities
 * @parent IsCooldownEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of cooldownMax notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @param cancelCooldownATBKeys
 * @parent IsCooldownEnabled
 * @type note
 * @desc Sets the key to cancel the ATB cooldown
 * It'll be the contents of a function returning a String Array
 * @default "return ['#num1', '#num2', '#num3', '#num4'];"
 *
 * @param canCancelCooldown
 * @parent IsCooldownEnabled
 * @type note
 * @desc Sets whether skill/item ATB cooldown can be cancelled
 * It'll be the contents of a function returning a Boolean
 * @default "return true;"
 *
 * @param _canCancelCooldownNoteChainingRule
 * @parent IsCooldownEnabled
 * @type select
 * @option Uses the 1st effective notetag value only
 * @value first
 * @option Regard the result as true only if all effective notetag value results are truthy
 * @value every
 * @option Regard the result as true if at least 1 effective notetag value results are truthy
 * @value some
 * @option Uses the last effective notetag value only
 * @value last
 * @desc Sets how to use multiple canCancelCooldown notetags
 * You can use script calls to change this choice later in game
 * @default some
 *
 * @param _canCancelCooldownNotePriorities
 * @parent IsCooldownEnabled
 * @type select[]
 * @option Data of effective states
 * @value states
 * @option Data of learnt skills(Shouldn't be used with Data of usable skills)
 * @value skills
 * @option Data of usable skills(Shouldn't be used with Data of learnt skills)
 * @value usableSkills
 * @option Data of possessed items(Shouldn't be used with Data of usable items)
 * @value items
 * @option Data of usable items(Shouldn't be used with Data of possessed items)
 * @value usableItems
 * @option Data of the latest skill/item being used(Can double-count with skills/items)
 * @value latestSkillItem
 * @option Data of equipped armors
 * @value armors
 * @option Data of equipped weapons
 * @value weapons
 * @option Data of the current class
 * @value class
 * @option Data of the actor
 * @value actor
 * @option Data of the enemy
 * @value enemy
 * @desc Sets the data type priorities of canCancelCooldown notetags
 * You can use script calls to change this list later in game
 * @default ["states","armors","weapons","class","actor","enemy"]
 *
 * @help
 *============================================================================
 *    ## Notetag Info
 *----------------------------------------------------------------------------
 *    # Actor/Enemy/Class/Weapon/Armor/State/Skill/Item Notetag contents:
 *      1. <satb coreMax suffix: entry>
 *         - Sets the maximum ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Core ATB Max Functions in the core
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any positive Number
 *         - If the end result of the maximum ATB value of the battler's
 *           larger/smaller than the default value of all battlers, then the
 *           ATB value of that battler will take more/less time to fill from
 *           empty to full
 *         - If the maximum ATB value of the battler decreases to become not
 *           greater than the inputability threshold, the battler will become
 *           inputable if that battler can be inputable
 *         - If the maximum ATB value of the battler increases to become
 *           greater than the inputability threshold, the battler will become
 *           not inputable
 *         - (Advanced) The maximum ATB value of the battler must be much,
 *           much larger than 2 ^ -32, but much, much smaller than 2 ^ 32
 *         - E.g.:
 *           If _coreMaxATBValNoteChainingRule is set as *, and the only
 *           coreMax notetag is <satb coreMax var: 1>, then this notetag will
 *           set the maximum ATB value of the battler involved to be
 *           multiplied by the value of the game variable with id 1
 *      2. <satb isBarVisible suffix: entry>
 *         - Sets whether the ATB value bar of the battler involved is visible
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Is Bar Visible Functions in the bar
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _isBarVisibleNoteChainingRule is set as some, and the only
 *           isBarVisible notetag is <satb isBarVisible switch: 1>, then the
 *           ATB value bar of the battler involved will be visible if and only
 *           if the game switch with id 1 is on
 *      3. <satb chargeMax suffix: entry>
 *         - Sets the maximum charge ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Charge ATB Max Functions in the charge
 *           module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be any positive Number
 *         - If the skill/item to be charged doesn't have this notetag, then
 *           that skill/item will always be instantly charged to full within 1
 *           frame
 *         - If the end result of the maximum charge ATB value of the
 *           battler's larger/smaller than the default value of all battlers,
 *           then the charge ATB value of that battler will take more/less
 *           time to fill from empty to full
 *         - If the maximum charge ATB value of the battler decreases to
 *           become not greater than the current charge ATB value, the battler
 *           will become able to execute actions immediately
 *         - If the maximum charge ATB value of the battler increases to
 *           become greater than the current charge ATB value, the battler
 *           will become not able to execute actions
 *         - If the current charge ATB value becomes negative, then the charge
 *           will become forcibly cancelled
 *         - (Advanced) The maximum charge ATB value of the battler must be
 *           much, much larger than 2 ^ -32, but much, much smaller than
 *           2 ^ 32
 *         - E.g.:
 *           If _chargeMaxATBValNoteChainingRule is set as *, and the only
 *           chargeMax notetag is <satb chargeMax var: 1>, then this notetag
 *           will set the maximum charge ATB value of the battler involved to
 *           be multiplied by the value of the game variable with id 1
 *      4. <satb isPayBeforeExecCharge suffix: entry>
 *         - Sets whether the skill/item cost's paid upon finishing inputting
 *           actions instead of upon finishing exexuting actions
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Is Pay Before Exec Charge Functions in
 *           the charge module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _isPayBeforeExecChargeNoteChainingRule is set as every, and
 *           the only isBarVisible notetag is
 *           <satb isPayBeforeExecCharge switch: 1>, then the skill/item cost
 *           will be paid by the battler involved upon finishing executing the
 *           skill/item if the game switch with id 1 is off, even when the
 *           default suggests otherwise
 *      5. <satb canCancelCharge suffix: entry>
 *         - Sets whether the skill/item's ATB charging can be cancelled
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Can Cancel Charge Functions in the
 *           charge module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _canCancelChargeNoteChainingRule is set as first, and there
 *           are multiple effective canCancelCharge suffix: entry notetags,
 *           then only the 1st one will be used, meaning that even the default
 *           will be ignored in this case
 *      6. <satb canForceCharge suffix: entry>
 *         - Sets whether the skill/item's ATB charging can be forced
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Can Force Charge Functions in the
 *           charge module of the configuration plugin for using cfg or script
 *           suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _canForceChargeNoteChainingRule is set as last, and there
 *           are multiple effective canForceCharge suffix: entry notetags,
 *           then only the last one will be used, meaning that even the
 *           default will be ignored in this case
 *      7. <satb cooldownMax suffix: entry>
 *         - Sets the maximum cooldown ATB value of the battler involved
 *         - suffix can be cfg, val, var or script
 *         - (Advanced)Please refer to Cooldown ATB Max Functions in the
 *           cooldown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be any positive Number
 *         - If the skill/item to be cooldownd doesn't have this notetag, then
 *           that skill/item will always be instantly cooldownd to full within
 *           1 frame
 *         - If the end result of the maximum cooldown ATB value of the
 *           battler's larger/smaller than the default value of all battlers,
 *           then the cooldown ATB value of that battler will take more/less
 *           time to become empty from full
 *         - If the current cooldown ATB value becomes nonpositive, then the
 *           cooldown will become finished
 *         - (Advanced) The maximum cooldown ATB value of the battler must be
 *           much, much larger than 2 ^ -32, but much, much smaller than
 *           2 ^ 32
 *         - E.g.:
 *           If _cooldownMaxATBValNoteChainingRule is set as *, and the only
 *           cooldown notetag is <satb cooldownMax var: 1>, then this notetag
 *           will set the maximum ATB value of the battler involved to be
 *           multiplied by the value of the game variable with id 1
 *      8. <satb canCancelCooldown suffix: entry>
 *         - Sets whether the skill/item's ATB cooldown can be cancelled
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Can Cancel Cooldown Functions in the
 *           cooldown module of the configuration plugin for using cfg or
 *           script suffixes, or the eval variant
 *         - The result of entry can be anything as only whether it's truthy
 *           matters
 *         - E.g.:
 *           If _canCancelCooldownNoteChainingRule is set as first, and there
 *           are multiple effective canCancelCooldown suffix: entry notetags,
 *           then only the 1st one will be used, meaning that even the default
 *           will be ignored in this case
 *----------------------------------------------------------------------------
 *    # State Notetag contents:
 *      1. <satb coreActState suffix: entry>
 *         - Sets the state to be an action state, which will have its turn
 *           updated when the battler having this state prepares to execute
 *           actions(this includes charging but not inputting actions) rather
 *           than upon turn end or action end
 *         - suffix can be cfg, val, switch or script
 *         - (Advanced)Please refer to Act State Functions in the core module
 *           of the configuration plugin for using cfg or script suffixes, or
 *           the eval variant
 *         - The result of entry can be anything as it only checks whether
 *           it's truthy or falsy
 *         - If the end result chaining all entries are truthy, then the state
 *           will be an action state, otherwise it'll be a normal state
 *         - It's highly encouraged and recommended to use a plugin showing
 *           the icons of effective states to make action states more clear
 *         - E.g.:
 *           If _coreActStateNoteChainingRule is set as some, and the only
 *           coreActState notetag is <satb coreActState switch: 1> and
 *           <satb coreActState switch: 2>, then this notetag will set this
 *           state as an action state if at least either of the game switch
 *           with id 1 or 2 is on
 *           In the case of the guard state from the guard action, the state
 *           won't be erased even when the actor becomes inputable with the
 *           guard pose removed, thus having inconsistencies between the
 *           existence of the guard state and the absence of the guard pose
 *           (It's an intentional compromise between making the guard state
 *           and other action state useful enough by not removing them upon
 *           becoming inputable, and changing the pose upon becoming inputable
 *           to make it more clear that the actor becomes inputable)
 *============================================================================
 *    ## Script Call Info
 *----------------------------------------------------------------------------
 *    # (Advanced)Configuration manipulations
 *      1. $gameSystem.satbParamFunc(param)
 *         - Returns the function of param listed in the parameter plugin
 *         - The name of param mustn't start with an underscore
 *         - Please check the configuration counterparts in the configuration
 *           plugin to know how to pass the param function arguments with
 *           what contexts
 *         - E.g.:
 *           $gameSystem.satbParamFunc("isCoreEnabled")() will return whether
 *           this plugin's enabled
 *      2. $gameSystem.satbParam(param)
 *         - Returns the stored value of param listed in the parameter plugin
 *           or their configuration counterparts in the configuration plugin
 *           if such counterparts exist
 *         - E.g.:
 *           $gameSystem.satbParam("IsCoreEnabled") will return the String
 *           contents of a function returning a Boolean indicating whether
 *           this plugin's enabled
 *           $gameSystem.satbParam("_isNoteCached") will return the Boolean
 *           value indicating whether the effective notetag lists and values
 *           will be cached
 *      3. $gameSystem.setSATBParam(param, funcContent, switchVar, id, factors)
 *         - Sets the stored value of param listed in the parameter plugin or
 *           their configuration counterpart in the configuration plugin as
 *           funcContents, which is the String contents of a function
 *         - If the name of the parameter starts with an underscore, then that
 *           parameter doesn't use functions so funcContent becomes the raw
 *           parameter value that's used directly rather than being function
 *           contents
 *         - (Advanced)switchVar, id and factors are all optional, and should
 *           only be used if the parameter changes from using some
 *           switches/variables to using some others or from not using those
 *           to using those or vice versa
 *         - (Advanced)If funcContent uses switches, switchVar must be
 *           "switch", id must be the switch id and factors must be the list
 *           of types of data using NOTEX, unless all those switches involved
 *           are explicitly written in the form of $gameSwitches.value(x),
 *           where x is a Number literal instead of a variable, or
 *           _isAlwaysRecacheAllSwitchVars is ON
 *         - (Advanced)If funcContent uses variables, switchVar must be "var",
 *           id must be the variable id and factors must be the list of types
 *           of data using NOTEX, unless all those variables involved are
 *           explicitly written in the form of $gameVariables.value(x), where
 *           x is a Number literal instead of a variable, or
 *           _isAlwaysRecacheAllSwitchVars is ON
 *         - (Advanced)factors being an empty Array means the switch/variable
 *           id becomes no longer used by any NOTEX of the specified type
 *         - (Advanced)To ensure this script call won't be too hard to use in
 *           most cases, those changing from using a switch/variable to using
 *           another one will have to call this script call twice, to
 *           register a new switch/variable and deregister an old one
 *           respectively
 *         - E.g.:
 *           $gameSystem.setSATBParam("IsCoreEnabled", "return false;") will
 *           set the stored value of parameter IsCoreEnabled shown on the
 *           parameter plugin or its configuration counterpart in the
 *           configuration plugin as "return false;", causing corresponding
 *           function to always return false, thus always disabling the plugin
 *         - Such function content changes will be saved in save files
 *      4. $gameSystem.satbNote(type, NOTEX)
 *         - Basically the same as $gameSystem.satbParam(param), except that
 *           this script call applies to notetag values of NOTEX of the
 *           notetag type found in the configuration plugin
 *         - E.g.:
 *           $gameSystem.satbNote("coreMax", "CMATB_MAX") will return the
 *           String contents of function CATBM_MAX of the coreMax notetag type
 *      5. $gameSystem.setSATBNote(type, NOTEX, funcContent, switchVar, id, factors)
 *         - Basically the same as
 *           $gameSystem.setSATBParam(param, funcContent, switchVar, id, factors),
 *           except that this script call applies to notetag values of NOTEX
 *           of the notetag type found in the configuration plugin
 *         - E.g.:
 *           $gameSystem.satbNote("coreMax", "CMATB_MAX", "return $gameVariables.value(1);", "var", 1, ["states"])
 *           will set the function content of CMATB_MAX as
 *           return $gameVariables.value(1);, with changes of the value of the
 *           variable with id 1 being notified to the coreMax notetags as long
 *           as only coreMax notetags in states data uses this variable
 *    # (Advanced)Actor/Enemy/Class/Weapon/Armor/State/Skill notetag manipulations
 *      All meta.satb changes can be saved if DoubleX RMMV Dynamic Data is
 *      used
 *      Core Module:
 *      1. meta.satb.note
 *         - note is either of the following:
 *           Core module -
 *           1. coreMax(corresponds to notetag content coreMax suffix: entry)
 *           2. coreActState(corresponds to notetag content
 *                          coreActState suffix: entry)
 *           (v0.04a+)Bar Module -
 *           1. isBarVisible(corresponds to notetag content
 *                          isBarVisible suffix: entry)
 *           (v0.04a+)Charge Module -
 *           1. chargeMax(corresponds to notetag content
 *                       chargeMax suffix: entry)
 *           2. isPayBeforeExecCharge(corresponds to notetag content
 *                                   isPayBeforeExecCharge suffix: entry)
 *           3. canCancelCharge(corresponds to notetag content
 *                             canCancelCharge suffix: entry)
 *           4. canForceCharge(corresponds to notetag content
 *                            canForceCharge suffix: entry)
 *           (v0.05a+)Cooldown Module -
 *           1.cooldownMax(corresponds to notetag content
 *                        cooldownMax suffix: entry)
 *           2.canCancelCooldown(corresponds to notetag content
 *                              canCancelCooldown suffix: entry)
 *         - Returns the Array of Objects in this form:
 *           { suffixi: suffixi, entryi: entryi }
 *           Which corresponds to <satb note suffixi: entryi>
 *         - E.g.:
 *           $dataWeapons[3].meta.satb.coreMax will return the Array of Object
 *           [{ suffix: "var", entry: "1" }] if the effective notetag of
 *           weapon with id 3 is <satb coreMax var: 1>
 *      2.(VERY ADVANCED) meta.satb.note = [{ suffixi: suffixi, entryi: entryi }]
 *         - note is the same as that of meta.satb.note
 *         - Sets the notetag to be the same as <satb note suffixi: entryi>
 *         - YOU'RE HIGHLY ENCOURAGED AND RECOMMENDED NOT TO USE THIS SCRIPT
 *           CALL UNLESS YOU'VE AT LEAST DECENT RMMV PLUGIN DEVELOPMENT
 *           PROCIFIENCY AS YOU'VE TO HAVE A SOLID UNDERSTANDING ON HOW GAME
 *           VARIABLES AND SWITCHES CHANGE DETECTIONS IN THIS PLUGIN WORKS IN
 *           DETAILS(NOT DETECTING SUCH CHANGES CAN PROPERLY LEAD TO THE
 *           NOTETAG CACHES FAILING TO INVALIDATE PROPERLY, THUS RETURNING
 *           STALE CACHED RESULTS AND CAUSING THE NOTETAG VALUES TO BE WRONG)
 *         - E.g.:
 *           $dataArmors[4].meta.satb.coreMax =
 *           [{ suffix: "var", entry: "2" }] will set the coreMax notetag of
 *           the armor with id 4 to be the same as <satb coreMax var: 1, 2>
 *         - If the notetag uses switches or variables(either via the
 *           switch/var suffix or via getting switch/variable values in
 *           the function called by the notetag), you must update
 *           $gameSystem._satb.switchIds or $gameSystem._satb.varIds manually
 *           $gameSystem._satb.switchIds is the same object as _SATB.switchIds
 *           in DataManager
 *           $gameSystem._satb.varIds is the same object as _SATB.varIds in
 *           DataManager
 *           This applies only with _isAlwaysRecacheAllSwitchVars being off
 *           (You can check the method _SATB._UPDATE_IDS in DataManager)
 *         - As using DoubleX RMMV Dynamic Data will probably increase the
 *           save file size drastically, which is unlikely to be favored by
 *           players playing games using this plugin, I've decided not to
 *           develop a much more convenient script call to facilitate changing
 *           which data have what notetags, to ensure that you'll only do so
 *           when absolutely necessary. THIS IS A CONSCIOUS PLUGIN DESIGN
 *           DECISION THAT AIMS TO BALANCE FOR THE PLAYER NEEDS AND EMPHASIZE
 *           THE PROBABLE HARMS OF CHANGING DATA ON THE FLY(Unless you're
 *           already doing so for some other totally different reasons, in
 *           this case you're likely already good enough to use this primirive
 *           script call while still really knowing what you're truly doing)
 *    # Battle manipulations
 *      Core Module:
 *      1. BattleManager.isSATB()
 *         - Returns whether this plugin's enabled
 *         - (Advanced)It's supposed to be Nullipotent
 *      2.(v0.04a+) SATBTurnManager.multiplyCoreTurnClockAct(multiplier)
 *         - Multiplies the battle turn clock action counter by multiplier
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      3.(v0.04a+) SATBTurnManager.multiplyCoreTurnClockFrame(multiplier)
 *         - Multiplies the battle turn clock frame counter by multiplier
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      4.(v0.04a+) SATBTurnManager.multiplyCoreTurnClockSec(multiplier)
 *         - Multiplies the battle turn clock second counter by multiplier
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      5.(v0.04a+) SATBTurnManager.setCoreTurnClockAct(act)
 *         - Sets the battle turn clock action counter to be act
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      6.(v0.04a+) SATBTurnManager.setCoreTurnClockFrame(frame)
 *         - Sets the battle turn clock frame counter to be frame
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      7.(v0.04a+) SATBTurnManager.setCoreTurnClockSec(sec)
 *         - Sets the battle turn clock second counter to be sec
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      8.(v0.04a+) SATBTurnManager.addCoreTurnClockAct(increment)
 *         - Adds the battle turn clock action counter by increment
 *         - If the current battle turn clock unit isn't the number of actions
 *           executed, then changing the action counter to exceed its maximum
 *           won't end the current turn
 *      9.(v0.04a+) SATBTurnManager.addCoreTurnClockFrame(increment)
 *         - Adds the battle turn clock frame counter by increment
 *         - If the current battle turn clock unit isn't the number of frames
 *           elapsed, then changing the frame counter to exceed its maximum
 *           won't end the current turn
 *      10.(v0.04a+) SATBTurnManager.addCoreTurnClockSec(increment)
 *         - Adds the battle turn clock second counter by increment
 *         - If the current battle turn clock unit isn't the number of seconds
 *           elapsed, then changing the second counter to exceed its maximum
 *           won't end the current turn
 *      11. (v0.04a+) SATBTurnManager.coreTurnActClock()
 *          - Returns the number of actions executed in the current turn
 *      12. (v0.04a+) SATBTurnManager.coreTurnFrameClock()
 *          - Returns the number of frames elapsed in the current battle turn
 *      13. (v0.04a+) SATBTurnManager.coreTurnSecClockInMs()
 *          - Returns the number of milliseconds elapsed in the current turn
 *      14. (v0.04a+) SATBTurnManager.coreTurnActClockMax()
 *          - Returns the number of actions constituting the current turn
 *      15. (v0.04a+) SATBTurnManager.coreTurnFrameClockMax()
 *          - Returns the number of frames constituting the current turn
 *      16. (v0.04a+) SATBTurnManager.coreTurnSecClockMaxInMs()
 *          - Returns the number of milliseconds constituting the current turn
 *    # Battler manipulations
 *      Core Module:
 *      1. setCoreSATB(val)
 *         - Sets the new current ATB value of the battler involved as val
 *         - (Advanced)val is supposed to be a Number
 *         - E.g.:
 *           $gameParty.members()[1].setCoreSATB(0) will set the new current
 *           ATB value of the 2nd party member as 0
 *         - (Advanced)It's supposed to be Idempotent
 *      2. setCoreSATBProportion(proportion)
 *         - The same as the script call setCoreSATB(val) except that this
 *           one sets the proportion of the new current ATB value of the
 *           battler involved relative to the maximum counterpart as
 *           proportion
 *         - E.g.:
 *           $gameParty.members()[1].setCoreSATBProportion(1) will set the new
 *           current ATB value of the 2nd party member as 100% of the max ATB
 *      3. addCoreSATB(increment)
 *         - Adds the current ATB value of the battler involved by increment
 *         - (Advanced)increment is supposed to be a Number
 *         - E.g.:
 *           $gameTroop.members()[0].addCoreSATB(-100) will subtract the
 *           current ATB value of the 1st troop member by 100
 *      4. addCoreSATBProportion(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one adds the current ATB value of the battler involved by
 *           the amount in which its proportion relative to the maximum
 *           counterpart is proportion
 *         - E.g.:
 *           $gameTroop.members()[0].addCoreSATBProportion(-1) will subtract
 *           the current ATB value of the 1st troop member by 100% of max ATB
 *      5. multiplyCoreSATB(multiplier)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one multiplies the current ATB value of the battler involved
 *           by multiplier
 *      6.(v0.01a+) fillUpCoreSATB()
 *         - The same as the script call setCoreSATB(val) except that this one
 *           uses the maximum ATB value of the battler instead of val
 *      7. clearCoreSATB()
 *         - Sets the new current ATB value of the battler involved as 0 if
 *           it was positive(otherwise it'll remain unchanged)
 *         - E.g.:
 *           $gameTroop.deadMembers()[1].clearCoreSATB() won't have any effect
 *           if the current ATB value of the 2nd dead troop member is negative
 *         - (Advanced)It's supposed to be Idempotent
 *      8. setSATBActTimes(actTimes)
 *         - Sets the number of virtual action slots of the battler involved
 *           as actTimes
 *         - If the number of virtual action slots becomes greater than 0,
 *           then the ATB value of that battler will immediately become full
 *         - If the number of virtual action slots becomes not greater than 0,
 *           then the ATB value of that battler will be minused by an
 *           extremely small decrement to ensure that it won't be full
 *         - Bear in mind that the number of virtual action slots will be
 *           reduced by 1(without changes from the Action Module) when a
 *           battler just finished executing an action
 *         - (Advanced)actTimes is supposed to be a nonnegative integer
 *         - E.g.:
 *           $gameActors.actor(1).setSATBActTimes(2) will set the number of
 *           virtual action slot of the game actor with id 1 as 2
 *           The ATB value of that actor will immediately become full
 *         - (Advanced)It's supposed to be Idempotent
 *      9. addSATBActTimes(increment)
 *         - Adds the number of virtual action slots of the battler involved
 *           by increment
 *         - Otherwise it's the same as the script call
 *           setSATBActTimes(actTimes)
 *         - The resulting number virtual action slots will never be negative
 *         - (Advanced)increment is supposed to be an Integer
 *         - (Advanced)This script call isn't supposed to be idempotent
 *      10. multiplySATBActTimes(multiplier)
 *          - The same as the script call addSATBActTimes(increment) except
 *            that this one multiplies the number of virtual action slots of
 *            the battler involved by multiplier
 *         - (Advanced)multiplier is supposed to be an nonnegative Number
 *      11.(v0.03a+) satbActTimes()
 *          - Returns the current number of virtual action slots of the
 *            battler involved
 *          - (Advanced)It's supposed to return a nonnegative integer
 *          - E.g.:
 *            $gameTroop.members(0).satbActTimes() will return the current
 *            number of virtual action slots of the 1st troop member
 *      12.(v0.03a+) canMakeSATBCmds()
 *          - Returns the battler involved can input, charge or execute
 *            actions
 *          - E.g.:
 *            $gameTroop.aliveMembers(0).canMakeSATBCmds() will return whether
 *            the 1st alive troop member can input, charge or execute actions
 *      13. coreSATB()
 *          - Returns the current ATB value of the battler involved
 *          - (Advanced)It's supposed to return a Number
 *          - E.g.:
 *            $gameActors.actor(0).coreSATB() will return the current value
 *            of the 1st actor
 *          - (Advanced)It's supposed to be Nullipotent
 *      14. coreMaxSATB()
 *          - Returns the maximum ATB value of the battler involved
 *          - (Advanced)It's supposed to return a positive Number
 *          - E.g.:
 *            $gameParty.aliveMembers()[0].coreMaxSATB() will return the
 *            maximum value of the 1st alive party member
 *          - (Advanced)Using this script call might recache the return value
 *          - (Advanced)It's supposed to be Nullipotent other than possibly
 *            recaching the return value
 *      15.(v0.01a+) coreSATBProportion()
 *          - The same as the result of the script call coreSATB() divided by
 *            the result of the script call coreMaxSATB()
 *          - (Advanced)This script call ensures that integer division won't
 *            be used
 *      16.(v0.05a+) isSATBFill()
 *          - Checks whether the battler invovled's not charging skills/itens
 *            nor cooling down
 *          - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].isSATBFill() will return whether
 *           the 2nd alive party member's not charging skills/itens nor
 *           cooling down
 *      17. (Advanced)raiseAllSATBNoteChangeFactors()
 *          - Applies the script call
 *            raiseSATBNoteChangeFactors(note, factors) to all notes
 *          - You should probably use refresh() instead of this script call as
 *            refresh() will have all the effects this script call has, and
 *            also immediately recache values that are no longer valid
 *      18. (Advanced)raiseSATBNoteChangeFactors(note, factors)
 *         - Notifies that the notetag note might need to be recached due to
 *           potential changes in factors factors
 *         - note is either of the following:
 *           "coreMax"(corresponds to notetag content coreMax suffix: entry)
 *           "coreActState"(corresponds to notetag content
 *                         coreActState suffix: entry)
 *           (v0.04a+) "isBarVisible"(corresponds to notetag content
 *                                   isBarVisible suffix: entry)
 *           (v0.04a+) "chargeMax"(corresponds to notetag content
 *                                chargeMax suffix: entry)
 *           (v0.04a+) "isPayBeforeExecCharge"(corresponds to notetag content
 *                                            isPayBeforeExecCharge suffix: entry)
 *           (v0.04a+) "canCancelCharge"(corresponds to notetag content
 *                                      canCancelCharge suffix: entry)
 *           (v0.04a+) "canForceCharge"(corresponds to notetag content
 *                                     canForceCharge suffix: entry)
 *           (v0.05a+) "cooldownMax"(corresponds to notetag content
 *                                  cooldownMax suffix: entry)
 *           (v0.05a+) "canCancelCooldown"(corresponds to notetag content
 *                                        canCancelCooldown suffix: entry)
 *         - factors is the list whose elements are either of the following:
 *           "states"(Changes in state notetags)
 *           "skills"(Changes in skill notetags)
 *           "items"(Changes in item notetags)
 *           "armors"(Changes in armor notetags)
 *           "weapons"(Changes in weapon notetags)
 *           "class"(Changes in class notetags)
 *           "actor"(Changes in actor notetags)
 *           "enemy"(Changes in enemy notetags)
 *           "priority"(Changes in the corresponding note priorities)
 *           "chainingRule"(Changes in the corresponding note chaining rules)
 *           "result"(Changes in all intermediate results for the note)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].raiseSATBNoteChangeFactors("coreMax", ["states", "skills"])
 *           will notify the 1st alive party member that the coreMax notetags
 *           might need to be recached due to potential changes in the states
 *           and skills or their coreMax notetags
 *      19. (Advanced)invalidateSATBNoteResult(note, part)
 *         - Invalidates the cached intermediate result of part part in note
 *           note for the actor involved
 *         - note is either of the following:
 *           "coreMax"(corresponds to notetag content coreMax suffix: entry)
 *           "coreActState"(corresponds to notetag content
 *                         coreActState suffix: entry)
 *           (v0.04a+) "isBarVisible"(corresponds to notetag content
 *                                   isBarVisible suffix: entry)
 *           (v0.04a+) "chargeMax"(corresponds to notetag content
 *                                chargeMax suffix: entry)
 *           (v0.04a+) "isPayBeforeExecCharge"(corresponds to notetag content
 *                                            isPayBeforeExecCharge suffix: entry)
 *           (v0.04a+) "canCancelCharge"(corresponds to notetag content
 *                                      canCancelCharge suffix: entry)
 *           (v0.04a+) "canForceCharge"(corresponds to notetag content
 *                                     canForceCharge suffix: entry)
 *           (v0.05a+) "cooldownMax"(corresponds to notetag content
 *                                  cooldownMax suffix: entry)
 *           (v0.05a+) "canCancelCooldown"(corresponds to notetag content
 *                                        canCancelCooldown suffix: entry)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "skills"(All effective skill notetags)
 *           "items"(All effective item notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *           "enemy"(All effective in enemy notetags)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].invalidateSATBNoteResult("coreMax", "states")
 *           will invalidate the cached intermediate result of all effective
 *           coreMax notetags in states for the 1st alive party member
 *      20. (Advanced)invalidateSATBNoteList(note, part)
 *         - Invalidates the cached notetag list of part part in note note for
 *           the actor involved
 *         - note is either of the following:
 *           "coreMax"(corresponds to notetag content coreMax suffix: entry)
 *           "coreActState"(corresponds to notetag content
 *                         coreActState suffix: entry)
 *           (v0.04a+) "isBarVisible"(corresponds to notetag content
 *                                   isBarVisible suffix: entry)
 *           (v0.04a+) "chargeMax"(corresponds to notetag content
 *                                chargeMax suffix: entry)
 *           (v0.04a+) "isPayBeforeExecCharge"(corresponds to notetag content
 *                                            isPayBeforeExecCharge suffix: entry)
 *           (v0.04a+) "canCancelCharge"(corresponds to notetag content
 *                                      canCancelCharge suffix: entry)
 *           (v0.04a+) "canForceCharge"(corresponds to notetag content
 *                                     canForceCharge suffix: entry)
 *           (v0.05a+) "cooldownMax"(corresponds to notetag content
 *                                  cooldownMax suffix: entry)
 *           (v0.05a+) "canCancelCooldown"(corresponds to notetag content
 *                                        canCancelCooldown suffix: entry)
 *         - part is either of the following:
 *           "states"(All effective state notetags)
 *           "skills"(All effective skill notetags)
 *           "items"(All effective item notetags)
 *           "armors"(All effective armor notetags)
 *           "weapons"(All effective weapon notetags)
 *           "currentClass"(All effective class notetags)
 *           "actor"(All effective actor notetags)
 *           "enemy"(All effective in enemy notetags)
 *         - It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[0].invalidateSATBNoteList("coreMax", "states")
 *           will invalidate the cached notetag list of coreMax notetags in
 *           states for the 1st alive party member
 *      (v0.04a+)Charge Module:
 *      1. setChargeSATB(val)
 *         - The same as the script call setCoreSATB(val) except that this
 *           one sets the charge ATB instead
 *      2. setChargeSATBProportion(proportion)
 *         - The same as the script call setCoreSATBProportion(proportion)
 *           except that this one sets the charge ATB instead
 *      3. addChargeSATB(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one sets the charge ATB instead
 *      4. addChargeSATBProportion(increment)
 *         - The same as the script call addCoreSATBProportion(increment)
 *           except that this one sets the charge ATB instead
 *      5. multiplyChargeSATB(multiplier)
 *         - The same as the script call multiplyCoreSATB(multiplier) except
 *           that this one sets the charge ATB instead
 *      6. fillUpChargeSATB()
 *         - The same as the script call fillUpCoreSATB() except that this one
 *           sets the charge ATB instead
 *      7. clearChargeSATB()
 *         - The same as the script call clearCoreSATB() except that this one
 *           sets the charge ATB instead
 *      8. chargeSATB()
 *         - The same as the script call coreSATB() except that this one
 *           returns the charge ATB instead
 *      9. chargeMaxSATB()
 *         - The same as the script call coreMaxSATB() except that this one
 *           returns the charge ATB instead
 *      10. chargeSATBProportion()
 *          - The same as the script call coreSATBProportion() except that
 *            this one returns the charge ATB instead
 *      11. isSATBCharge()
 *          - Checks whether the battler invovled's charging a skill/item
 *          - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].isSATBCharge() will return whether
 *           the 2nd alive party member's charging a skill/item
 *      12. onCancelSATBCharge()
 *          - Forcibly cancels the skill/item charging of the battler involved
 *            if the skill/item charging can be cancelled in this case
 *          - (Advanced)It's supposed to be Idempotent in practice but not in
 *            theory(so calling it extremely many times can have undesired
 *            side effects)
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].onCancelSATBCharge() will forcibly
 *           cancel the skill/item charging of the 2nd alive party member if
 *           the skill/item charging can be cancelled in this case
 *      13. onStartForceSATBCharge()
 *          - Marks that the skill/item becomes forcibly charged for the
 *            battler involved if the skill/item charging can be forced in
 *            this case
 *          - (Advanced)It's supposed to be Idempotent
 *          - E.g.:
 *            $gameParty.aliveMembers()[1].onStartForceSATBCharge() will mark
 *            that the skill/item becomes forcibly charged for the 2nd alive
 *            party member if the skill/item charging can be forced in this
 *            case
 *      14. onEndForceSATBCharge()
 *          - Marks that the skill/item charging becomes forcibly ended for
 *            the battler involved if the skill/item charging can be forced in
 *            this case and the script call onStartForceSATBCharge() is used
 *            for the same battler when charging the same skill/item before
 *            using this script call
 *          - The battler involved will become able to exeucte actions
 *            regardless of the current ATB charge value
 *          - (Advanced)It's supposed to be Idempotent
 *          - E.g.:
 *            $gameParty.aliveMembers()[1].onEndForceSATBCharge() will cause
 *            the battler to be able to execute actions regardless of the
 *            current ATB charge value as the script call
 *            onStartForceSATBCharge() is used for the same chrage beforehand
 *      (v0.05a+)Cooldown Module:
 *      1. setCooldownSATB(val)
 *         - The same as the script call setCoreSATB(val) except that this
 *           one sets the cooldown ATB instead
 *      2. setCooldownSATBProportion(proportion)
 *         - The same as the script call setCoreSATBProportion(proportion)
 *           except that this one sets the cooldown ATB instead
 *      3. addCooldownSATB(increment)
 *         - The same as the script call addCoreSATB(increment) except that
 *           this one sets the cooldown ATB instead
 *      4. addCooldownSATBProportion(increment)
 *         - The same as the script call addCoreSATBProportion(increment)
 *           except that this one sets the cooldown ATB instead
 *      5. multiplyCooldownSATB(multiplier)
 *         - The same as the script call multiplyCoreSATB(multiplier) except
 *           that this one sets the cooldown ATB instead
 *      6. fillUpCooldownSATB()
 *         - The same as the script call fillUpCoreSATB() except that this one
 *           sets the cooldown ATB instead
 *      7. cooldownSATB()
 *         - The same as the script call coreSATB() except that this one
 *           returns the cooldown ATB instead
 *      8. cooldownMaxSATB()
 *         - The same as the script call coreMaxSATB() except that this one
 *           returns the cooldown ATB instead
 *      9. cooldownSATBProportion()
 *         - The same as the script call coreSATBProportion() except that this
 *           one returns the cooldown ATB instead
 *      10. isSATBCooldown()
 *          - Checks whether the battler invovled's cooling down a skill/item
 *          - (Advanced)It's supposed to return a Boolean
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].isSATBCooldown() will return whether
 *           the 2nd alive party member's charging a skill/item
 *      11. onCancelSATBCooldown()
 *          - Forcibly cancels the skill/item cooldown of the battler involved
 *            if the skill/item charging can be cancelled in this case
 *          - (Advanced)It's supposed to be Idempotent
 *         - E.g.:
 *           $gameParty.aliveMembers()[1].onCancelSATBCooldown() will forcibly
 *           cancel the skill/item cooldown of the 2nd alive party member if
 *           the skill/item charging can be cancelled in this case
 *============================================================================
 *    ## Plugin Command Info
 *       Don't use this plugin command for actors that don't exist yet unless
 *       you really know what you're truly doing
 *       1. targetType is combined by one of the following filter as prefix:
 *          all - All battlers in the designated group
 *          alive - All alive battlers in the designated group
 *          dead - All dead battlers in the designated group
 *          movable - All movable battlers in the designated group
 *          with one of the following designated group as the suffix:
 *          Party - Party members(Must be in battle)
 *          Troop - Troop members(Don't use this outside battle)
 *          Actors - Actors(possibly including those not in battle)
 *          E.g.:
 *          Setting targetType as aliveTroop means only alive troop members
 *          can be targets
 *          The plugin command won't be effective with an invalid targetType
 *       2. targets is the list of target, each meaning one of the following:
 *          targetType has Party/Troop as suffix - target can be either the
 *                                                 list of indices of the
 *                                                 designated party/troop
 *                                                 members or the party/troop
 *                                                 members whose names matches
 *                                                 at least 1 of those in the
 *                                                 target list
 *          targetType has Actors as suffix - target can be either the list of
 *                                            id of the actors or actors whose
 *                                            names matches at least 1 of
 *                                            those in the target list
 *          If there's no specified target, all targets in targetType will
 *          have the plugin command applied
 *          target should be either a list of indices, id or names, meaning
 *          that mixing indices, id and names in the same list can cause the
 *          plugin command to fail very badly
 *          E.g.:
 *          - Setting target as "Slime",3 with targetType as allTroop will
 *            apply the plugin command to all enemies whose names are Silme or
 *            indices in the troop are 3
 *            Note that no space's allowed in target so target won't work with
 *            battler names with spaces
 *          - Setting target as 0,2 with targetType as aliveParty will apply
 *            the plugin command to the 1st and 3rd alive party member
 *            Note that no space's allowed in target
 *          - Setting target as 1 with targetType as movableActors will apply
 *            the plugin command to the actor with id 1 as long as that actor
 *            is movable
 *----------------------------------------------------------------------------
 *      Core Module:
 *      1. setCoreSATB targetType targets val
 *          - The same as the script call setCoreSATB(val) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      2. setCoreSATBProportion targetType targets proportion
 *          - The same as the script call setCoreSATBProportion(proportion) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      3. addCoreSATB targetType targets increment
 *          - The same as the script call addCoreSATB(increment) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      4. addCoreSATBProportion targetType targets increment
 *          - The same as the script call addCoreSATBProportion(increment) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      5. multiplyCoreSATB targetType targets multiplier
 *          - The same as the script call multiplyCoreSATB(multiplier) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      6.(v0.01a+) fillUpCoreSATB targetType targets
 *          - The same as the script call fillUpCoreSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      7. clearCoreSATB targetType targets
 *          - The same as the script call clearCoreSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      8. setSATBActTimes targetType targets actTimes
 *          - The same as the script call setSATBActTimes(actTimes) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      9. addSATBActTimes targetType targets increment
 *          - The same as the script call addSATBActTimes(increment) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      10. multiplySATBActTimes targetType targets multiplier
 *           - The same as the script call multiplySATBActTimes(multiplier) in
 *             Battler manipulations with the designated targets in the
 *             designated targetType
 *      11. raiseAllSATBNoteChangeFactors targetType targets
 *          - The same as the script call raiseAllSATBNoteChangeFactors() in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      12. raiseSATBNoteChangeFactors targetType targets note factors
 *          - The same as the script call coreMaxSATB(note, factors) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      13. invalidateSATBNoteResult targetType targets note part
 *          - The same as the script call invalidateSATBNoteResult(note, part)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      14. invalidateSATBNoteList targetType targets note part
 *          - The same as the script call invalidateSATBNoteList(note, part)in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      (v0.04a+)Charge Module:
 *      1. setChargeSATB targetType targets val
 *          - The same as the script call setChargeSATB(val) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      2. setChargeSATBProportion targetType targets proportion
 *          - The same as the script call setChargeSATBProportion(proportion)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      3. addChargeSATB targetType targets increment
 *          - The same as the script call addChargeSATB(increment) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      4. addChargeSATBProportion targetType targets increment
 *          - The same as the script call addChargeSATBProportion(increment)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      5. multiplyChargeSATB targetType targets multiplier
 *          - The same as the script call multiplyChargeSATB(multiplier) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      6. fillUpChargeSATB targetType targets
 *          - The same as the script call fillUpChargeSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      7. clearChargeSATB targetType targets
 *          - The same as the script call clearChargeSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      8. onCancelSATBCharge targetType targets
 *          - The same as the script call onCancelSATBCharge() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      9. onStartForceSATBCharge targetType targets
 *          - The same as the script call onStartForceSATBCharge() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      10. onEndForceSATBCharge targetType targets
 *          - The same as the script call onEndForceSATBCharge() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      (v0.05a+)Cooldown Module:
 *      1. setCooldownSATB targetType targets val
 *          - The same as the script call setCooldownSATB(val) in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      2. setCooldownSATBProportion targetType targets proportion
 *          - The same as the script call
 *            setCooldownSATBProportion(proportion) in Battler manipulations
 *            with the designated targets in the designated targetType
 *      3. addCooldownSATB targetType targets increment
 *          - The same as the script call addCooldownSATB(increment) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      4. addCooldownSATBProportion targetType targets increment
 *          - The same as the script call addCooldownSATBProportion(increment)
 *            in Battler manipulations with the designated targets in the
 *            designated targetType
 *      5. multiplyCooldownSATB targetType targets multiplier
 *          - The same as the script call multiplyCooldownSATB(multiplier) in
 *            Battler manipulations with the designated targets in the
 *            designated targetType
 *      6. fillUpCooldownSATB targetType targets
 *          - The same as the script call fillUpCooldownSATB() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *      7. onCancelSATBCooldown targetType targets
 *          - The same as the script call onCancelSATBCooldown() in Battler
 *            manipulations with the designated targets in the designated
 *            targetType
 *============================================================================
 */
var DoubleX_RMMV = DoubleX_RMMV || {};
(function(SATB) {
    "use strict";
    SATB.onSetupBattleTest = function() {};
    SATB.params = {
        core: {
            IsCoreEnabled: function() { return true; },
            coreBaseFillATBFrame: function() { return 600; },
            coreBaseFillATBSec: function() { return 5.0; },
            coreTurnATBTime: function(baseFillATB) {
                return baseFillATB * 2.0 * +$gameVariables.value(5);
            },
            coreTurnATBAct: function() {
                var memNum = BattleManager.allBattleMembers().length;
                return memNum * 2 * +$gameVariables.value(5);
            },
            canCoreTurnClockOverflow: function() { return false; },
            coreMaxATBVal: function() { return 100.0; }
        },
        bar: {
            IsBarEnabled: function() { return true; },
            isShowATBBar: function() {
                return this.isActor() || this.isStateAffected(13);
            },
            atbBarText: function() {
                var cur = Math.floor(this.curSATB());
                var max = Math.floor(this.curMaxSATB());
                var actTimes = this.satbActTimes();
                if (!this.isSATBFill()) {
                    var itemName = this.latestSATBItem_.item.name;
                    return cur + '/' + max + ' : ' + actTimes + ' ' + itemName;
                }
                return cur + '/' + max + ' : ' + actTimes;
            },
            atbBarXOffset: function() { return this.isSATBFill() ? -40 : -80; },
            atbBarYOffset: function() { return 10; },
            atbBarW: function() { return this.isSATBFill() ? 80 : 160; },
            atbBarH: function() { return 20; },
            atbBarTextSize: function() { return 12; },
            atbBarLineH: function() { return 12; },
            atbBarTextPadding: function() { return 4; },
            atbBarBackOpacity: function() { return 192; },
            atbBarTextXOffset: function() { return 4; },
            atbBarTextYOffset: function() { return 4; },
            atbBarTextColor: function(bar) { return bar.textColor(0); },
            atbBarColor1: function(bar) {
                if (this.isSATBCharge()) return bar.textColor(26);
                if (this.isSATBCooldown()) return bar.textColor(30);
                return bar.textColor(8);
            },
            atbBarColor2: function(bar) {
                if (this.isSATBCharge()) return bar.textColor(27);
                if (this.isSATBCooldown()) return bar.textColor(31);
                return bar.textColor(8);
            },
            atbBarBackColor: function(bar) { return bar.textColor(15); }
        },
        hotkey: {
            IsHotkeyEnabled: function() { return true; },
            prevInputableActorKey: function() { return '#left'; },
            nextInputableActorKey: function() { return '#right'; },
            inputableActorKeys: function() {
                return ['#num1', '#num2', '#num3', '#num4'];
            }
        },
        wait: {
            IsWaitEnabled: function() { return true; },
            isATBWaitCondMet: function() {
                if (BattleManager.isSATBActPhase()) return true;
                if (this._actorWindow.active) return true;
                if (this._enemyWindow.active) return true;
                if (this._skillWindow.active) return true;
                if (this._itemWindow.active) return true;
                if (this._actorCommandWindow.active) return true;
                if (this._partyCommandWindow.active) return true;
                return this._changeWindow && this._changeWindow.active;
            },
            forceRunATBKey: function() { return '#shift'; },
            forceStopATBKey: function() { return '#ctrl'; },
            isShowForceATBStatWin: function() { return true; },
            noForceATBText: function() { return 'Not Forcing ATB'; },
            forceRunATBStatText: function() { return 'Forcibly Running ATB'; },
            forceStopATBStatText: function() {
                return 'Forcibly Stopping ATB';
            },
            forceATBStatWinX: function() { return 0; },
            forceATBStatWinY: function() { return 0; },
            forceATBStatWinW: function() { return 160; },
            forceATBStatWinH: function() { return 40; },
            forceATBStatTextSize: function() { return 12; },
            forceATBStatWinLineH: function() { return 12; },
            forceATBStatWinPadding: function() { return 8; },
            forceATBStatTextPadding: function() { return 4; },
            forceATBStatBackOpacity: function() { return 192; },
            forceATBStatTextXOffset: function() { return 4; },
            forceATBStatTextYOffset: function() { return 4; },
            isShowForceATBRunCmdWin: function() { return true; },
            forceRunATBCmdText: function() { return 'Force Run'; },
            forceATBRunCmdWinX: function() { return 0; },
            forceATBRunCmdWinY: function() { return 40; },
            forceATBRunCmdWinW: function() { return 80; },
            forceATBRunCmdWinH: function() { return 40; },
            forceATBRunCmdTextSize: function() { return 12; },
            forceATBRunCmdWinLineH: function() { return 12; },
            forceATBRunCmdWinPadding: function() { return 8; },
            forceATBRunCmdTextPadding: function() { return 4; },
            forceATBRunCmdBackOpacity: function() { return 192; },
            forceATBRunCmdTextXOffset: function() { return 4; },
            forceATBRunCmdTextYOffset: function() { return 4; },
            isShowForceATBStopCmdWin: function() { return true; },
            forceStopATBCmdText: function() { return 'Force Stop'; },
            forceATBStopCmdWinX: function() { return 80; },
            forceATBStopCmdWinY: function() { return 40; },
            forceATBStopCmdWinW: function() { return 80; },
            forceATBStopCmdWinH: function() { return 40; },
            forceATBStopCmdTextSize: function() { return 12; },
            forceATBStopCmdWinLineH: function() { return 12; },
            forceATBStopCmdWinPadding: function() { return 8; },
            forceATBStopCmdTextPadding: function() { return 4; },
            forceATBStopCmdBackOpacity: function() { return 192; },
            forceATBStopCmdTextXOffset: function() { return 4; },
            forceATBStopCmdTextYOffset: function() { return 4; }
        },
        charge: {
            IsChargeEnabled: function() { return false; },
            chargeMaxATBVal: function(coreMax) { return coreMax; },
            isPayBeforeExecCharge: function() { return false; },
            cancelChargeATBKeys: function() {
                return ['#num1', '#num2', '#num3', '#num4'];
            },
            canCancelCharge: function() { return true; },
            forceChargeATBKeys: function() {
                return ['#num5', '#num6', '#num7', '#num8'];
            },
            canForceCharge: function() { return true; }
        },
        cooldown: {
            IsCooldownEnabled: function() { return false; },
            cooldownMaxATBVal: function(coreMax) { return coreMax; },
            cancelCooldownATBKeys: function() {
                return ['#num1', '#num2', '#num3', '#num4'];
            },
            canCancelCooldown: function() { return true; }
        }
    };
    SATB.notes = {
        coreMax: {
            CMATB_MAX: function(datum, datumType, latestMax) {
                return latestMax > 100.0 ? 2 : 1;
            },
            CMATB_AGI: function(datum, datumType, latestMax) {
                return 999 - this.agi;
            },
            CMATB_VAR: function(datum, datumType, latestMax) {
                return +$gameVariables.value(4);
            }
        },
        coreActState: {
            CAS_TRUE: function(datum, datumType) { return true; },
            CAS_BATTLER_NAME: function(datum, datumType) {
                return this.name() === "Test";
            },
            CAS_SWITCH: function(datum, datumType) {
                return $gameSwitches.value(x);
            }
        },
        isBarVisible: {
            IBV_TRUE: function(datum, datumType) { return true; },
            IBV_BATTLER_NAME: function(datum, datumType) {
                return this.name() === "Test";
            },
            IBV_SWITCH: function(datum, datumType) {
                return $gameSwitches.value(x);
            }
        },
        chargeMax: {
            CHMATB_MAX: function(datum, datumType, latestChargeMax) {
                return latestChargeMax > 100.0 ? 2 : 1;
            },
            CHMATB_AGI: function(datum, datumType, latestChargeMax) {
                return 999 - this.agi;
            },
            CHMATB_VAR: function(datum, datumType, latestChargeMax) {
                return +$gameVariables.value(4);
            }
        },
        isPayBeforeExecCharge: {
            IPBEC_TRUE: function(datum, datumType) { return true; },
            IPBEC_BATTLER_NAME: function(datum, datumType) {
                return this.name() === "Test";
            },
            IPBEC_SWITCH: function(datum, datumType) {
                return $gameSwitches.value(x);
            }
        },
        canCancelCharge: {
            CCC_TRUE: function(datum, datumType) { return true; },
            CCC_BATTLER_NAME: function(datum, datumType) {
                return this.name() === "Test";
            },
            CCC_SWITCH: function(datum, datumType) {
                return $gameSwitches.value(x);
            }
        },
        canForceCharge: {
            CFC_TRUE: function(datum, datumType) { return true; },
            CFC_BATTLER_NAME: function(datum, datumType) {
                return this.name() === "Test";
            },
            CFC_SWITCH: function(datum, datumType) {
                return $gameSwitches.value(x);
            }
        },
        cooldownMax: {
            CDMATB_MAX: function(datum, datumType, latestCooldownMax) {
                return latestCooldownMax > 100.0 ? 2 : 1;
            },
            CDMATB_AGI: function(datum, datumType, latestCooldownMax) {
                return 999 - this.agi;
            },
            CDMATB_VAR: function(datum, datumType, latestCooldownMax) {
                return +$gameVariables.value(4);
            },
        },
        canCancelCooldown: {
            CCCD_TRUE: function(datum, datumType) { return true; },
            CCCD_BATTLER_NAME: function(datum, datumType) {
                return this.name() === "Test";
            },
            CCCD_SWITCH: function(datum, datumType) {
                return $gameSwitches.value(x);
            }
        }
    };
})(DoubleX_RMMV.SATB = {});
var _0xda22=['equipSlots','setSurpriseStartSATB','\x20*>','_updateActorSelect','Val','backOpacity','_coreTurnSecClockMax_','_updateFuncParam','_NOTE_ARG_OBJS','forceATBRunCmdBackOpacity','turn','sec','coreTurnActClock','refresh','script','areModulesEnabled','_PHASE_COOLDOWN','isEnabled','run','isOpenAndActive','updateCoreTurnByTime','result','_IS_VISIBLE','_REG_EXP_SUFFIX_SEPARATOR','_canForceChargeNotePriorities','raiseChangeFactors','_canCancelChargeNotePriorities','_isShowParam','onCancelSATBCooldown','onEnemyOk','switchIds','canForceChargeSATB','cachedBaseCoreMax_','_coreBaseFillFrameRate','drawText','_RESULT_TYPES','_FILTERED_TARGETS','_initBar','forceATBStopCmdWinPadding','_isForceRunKeyTriggered','_updateVisibleWin','_coreTurnFrameClockMax_','canEscape','playCursor','Spriteset_Battle','_IS_NOTE_USE_DEFAULT','onEndForceCharge','addSmallestCoreSATBDecrement','coreBaseFillSecRate_','fastMerge','canCancelCooldownSATB','_pairFuncListWithCache','forceATBStopCmdBackOpacity','endTurn','canUse','_ACTOR_INDEX','_paddingParam','_cache','filterMap','_createCancelChargeHotkey','onSATBBattlerRefresh','isAlive','setActionState','_procHotkey','canUpdateSATB','_onCooldownATBBecomeFull','forceATBStatWinW','length','winWParam','_REFRESH','floor','_isUpdateBarColors','setCoreATB','onCancelCooldown','\x20+(\x5cw+(?:','bar','isSATBCooldownItem','\x20data\x20with\x20id\x20','updatePairFuncListPart','isDatabaseLoaded','satbParam','_DEFAULT_CHAINING_RULE','_chargeMaxATBValNoteChainingRule','isBarErased','extractSATBFuncContents','addState','addCoreTurnClockSecInMs','size','forceATBRunCmdTextSize','commandEscape','onTryCancelActorChargeSATB','constructor','setStartSATB','updateStateTurns','isEnemy','_updateProperty','_IS_VALID_PAIR','_onATBBecomeNotFull','_updateInputWins','_lastPadding','_CLEAR_NOTES','function','eraseSATBInputableActor','_onCoreATBBecomeNotFull','canLastDisplayWins','initCoreSATBActs','_messageWindow','_MARKED_NOTE_CHANGE_FACTORS','_redraw','_LAST_VAL_MONO_FUNC','isClosing','selectPreviousCommand','atbBarText','_OPERATOR_RESULT_FUNC','commandGuard','skills','chainedPartResult_','FuncContent','startActorCommandSelection','forceATBStatWinH','satbActTimes','_updateWithoutCache','_FORCE_STOP','_updateWhenVisible','Game_BattlerBase','_isBarVisibleNotePriorities','addChargeATBProportion','multiplyCoreATB','_CMDS','onSetupBattleTest','canMove','fillUpChargeATB','isDead','_stateTurns','onSelectAction','START_FORCE_CHARGE','coreBaseFillATBFrame','forceRunATBCmdText','addCoreTurnClockAct','useItem','eraseSATBBars','_winX','_isUpdateTextXY','_closeDeactivatePartyCmdWin','updatePartResult','Reduce\x20of\x20empty\x20array\x20with\x20no\x20initial\x20value','num','orig','_onCoreATBBecomeFull','The\x20value\x20of\x20the\x20parameter\x20','_ERASE_BAR','pluginCommand','END_FORCE_CHARGE','active','parse','isTriggered','canForceCharge','clearSATBNotes','_PAIR_FUNC','_satb','_PARAM_MODULES','center','_coreMaxATBValNotePriorities','_extractNoteFuncContents','match','isAutoBattle','Sprite_Battler','_onForceRun','updatePairFuncList','_wasPressed','refreshSATBBars','push','pairFuncList_','_raiseSATBMemNoteChangeFactors','Window_Selectable','_INIT_NOTES','forceATBRunCmdWinX','_ALL_EMPTY_CONTAINERS','_UPDATE_IDS','_SWITCH_VARS','_procForceChargeHotkey','_hideSelectionWin','coreATBProportion','_ATBS','result_','onBecomeNotSATBActable','aliveMembers','changeActor','_actorCommandWindow','Which\x20should\x20be\x20entered\x20via\x20note\x20rather\x20than\x20text','reserveCommonEvent','_JSON_PARAM','fillUpCurATB','setCurATBProportion','_displayWinWithNoInputtingActor','_forceChargeState','_isToggleAutoInput','_loadBaseNote','_color1','_isUpdateWH','updateSATBStateTurns','valResult','canCancelCooldown','_lastTextSize','setBattler','Game_SATBRules','forceRunATBKey','_updateCoreTurnClock','_lastATBs','initSATBNotes','isBattleEnd','_CONCAT_EVERY_RESULT_FUNC','enemy','_BASE_RUN_NOTES','currentAction','_procHandling','forceATBRunCmdTextYOffset','updateSATBActorSelect','value','extractSaveContents','priorities','_onForceStateChange','clearCoreSATB','_onSelectActor','visible','_NO_FORCE','coreTurnSecClockInMs','partListData','forceATBStopCmdWinW','_refresh','winYParam','setCoreATBProportion','isFill','updateWindowPositions','\x20*(','armors','_isModuleEnabled','parameters','notes','setCoreTurnClockAct','multiplyCurATB','_cooldownMaxATBValNotePriorities','playBuzzer','_color2','_text','_actorSprites','splice','_isBarVisibleNoteChainingRule','_RESULT_CHAINING_RULE_FUNC','_DEFAULT_RESULTS',')*)\x20*','tradeItemWithParty','coreMaxSATB','cachedBaseCooldownMax_','eraseElem','_partResult','addCooldownATB','evalStart','_IS_ASSOCIATIVE_OPERATORS','_coreMaxATBValNoteChainingRule','_REDUCED_ATB_CONTAINER','_isForceStopKeyTriggered','addHandlers','commandFight','changePaintOpacity','_battler','onActorOk','Has\x20the\x20following\x20invalid\x20SATB\x20notetag\x20type\x20','multiplyCoreTurnClockSec','_BOOL_RESULT_NOTES','_canUpdateSATBAct','forceStopATBCmdText','multiplyChargeATB','forceATBRunCmdWinH','isAssociative','updateEvent','_barColor1','END_FORCE_CHARGE_KEY','\x27use\x20strict\x27;\x0a','\x20by','addCoreATB','_pluginCmdTargets','priority','_textSize','invalidateResultCache','_isNoteCached','setSATBNote','setCooldownATBProportion','startTurn','Game_SATBNotes','_setup','The\x20abstract\x20method\x20_formattedText\x20isn\x27t\x20implemented','_isItemNote','refreshSATBBar','endBattle','satbParamFunc','currentClass','_canCancelChargeNoteChainingRule','isShowForceATBStopCmdWin','_lastText','_textColor','_currentState','_updateXY','_updatePaintOpacity','_REDUCED_AVG_AGI','_procRepeatableHotkey','requestMotionRefresh','_IS_ALIVE','_uncachedPairFuncList','forceATBStopCmdWinY','_FUNC_CONTENT','onStartForceSATBCharge','_SEC_CORE_TURN_CLOCK_OVERFLOW_FUNC','isRunSATBFrameUpdate','forceATBStopCmdTextPadding','\x20valResult;','coreTurnActClockMax','multiplyCooldownATB','bool','_maxATB','act','cancelCooldownATBKeys','_phase','setCoreSATB','speed','\x27use\x20strict\x27;','_REG_EXP_ENTRY_SEPARATOR','clockUnit','_JSON_PARAMS','contents','update','_textParam','forceATBStopCmdWinH','Scene_Battle','_pairFuncListPartWithCache','_isBattleStop','clearActor','atbBarTextXOffset','raiseRefreshedSATBMemChangeFactors','force','_onTrySelectPrevNextActorByHotkey','states','isRefreshNeeded','_CONCAT_SOME_RESULT_FUNC','_markNoteChangeFactor','processTurn','coreMax','forceATBStatWinX','isShowATBBar','refreshSATBInputWins','index','atbBarW','winHParam','init','_winY','coreTurnFrameClock','invalidatePairFuncListCache','forceATBRunCmdWinW','updateSATBNoteScriptInVar','_enemyWindow','setNormStartSATB','isTouchedInsideFrame','refreshBar','_handlers','updateBattleProcess','IsHotkeyEnabled','filter','_canCancelCooldownNoteChainingRule','actorId','_BOOL_PARAMS','wait','replace','_NOTE_PRIORITIES','lineHParam','actions','IsWaitEnabled','onSkillOk','_SWITCH_VAR_ID_REG_EXP','_fillChargeATB','val','textPadding','cooldown','canCancelChargeSATB','(?:','addSATBInputableActor','isHandled','commandSkill','_ARG_OBJ_SUFFIXES','item','_isEscapeCompatible','keys','addCurATBProportion','run_','initialize','Please\x20check\x20if\x20the\x20name\x20of\x20DoubleX\x20RMMV\x20Superlative\x20ATB','isCooldown','chainedNonAssociativeResult_','forceATBStatWinPadding','isForceStop','IsBarEnabled','_resetForceChargeStates','standardBackOpacity','_OPERATOR_VAL_RESULT_FUNC','width','isBarVisible','standardFontSize','_procTurn','clockMax','_backColor','toString','didSATBInput','pairFunc','isCharge','eraseState','onBecomeSATBActable','addChargeATB','setupBattleTest','inBattle','isSATBActPhase','initMembers','chainingRule','_winH','onEndForceSATBCharge','_chainingRule','_canUpdateAct','chargeMax','\x20isn\x27t\x20a\x20valid\x20ATB\x20phase!','SATBTurnManager\x20is\x20a\x20static\x20class!','coreMaxATBVal','_partyCommandWindow','Game_Battler','_pairs','_fillCoreATB','prototype','close','_chargeMaxATBValNotePriorities','isRestricted','datum','satbNoteResult_','_IS_FUNC_PARAM','suffix','isActorSelectUpdated','_states','Game_System','_textPaddingParam','_isPayBeforeExecCharge','_coreTurnClock','frame','weapons','curATBProportion','isShowForceATBRunCmdWin','callHandler','REG_EXP_ENTRY_VAL','avgAgi','_checkUpdatedMax','_isVisible','isActionValid','_updateAll','_partResultWithoutCache_','members','_ACT_CORE_TURN_CLOCK_OVERFLOW_FUNC','coreBaseFillATBSec','_deltaTime','START_FORCE_CHARGE_KEY','_atbs','_isCacheUpdated','markNoteChangeFactors','raiseSATBChangeFactorsWithRefresh','addWindow','extractSATBSwitchVarIds','_uncachedPartResult_','onForceStop','updateStatusWindow','_updateCanEsc','_FIRST_LIST_MONO_FUNC','_isAlwaysRecacheAllSwitchVars','_fillCooldownATB','indexOf','coreBaseSATBFillRate','eval','onRestrict','_SORT_BATTLER_SPEEDS_DESCENDINGLY','_textYOffset','fillUpCoreSATB','_updatedPairFuncListWithCache','name','entry','updateNoteDefault','_textX','latestSATBItem_','SATBManager\x20is\x20a\x20static\x20class!','latestCooldownMax','changeClass','_moduleParam','reduce','_checkIsToggleAutoInput','_lastLineH','makeDeepCopy','atbBarTextYOffset','isATBWaitCondMet','_TARGET_TYPES','concat','atbBarBackOpacity','_spriteset','_refreshAll','addCoreTurnClockFrame','setValue','_closeDeactivateActorCmdWin','_SUFFIX_FUNCS','deactivate','removeState','multiplyCoreTurnClockAct','_isEnabled','_coreTurnActClockMax_','_onChargeATBBecomeFull','onCancelSATBCharge','_avgAgi','clearCoreSATBActs','gaugeBackColor','onEndCharge','setCooldownATB','IsCooldownEnabled','_FORCE_ACT','endAction','transform','_updateSwitchVarIds','clone','setChargeATBProportion','setSATBActTimes','deadMembers','forceATBStatTextSize','_ERASE_SWITCH_VAR_IDS','_winXParam','_DEACTIVATE_HIDE_SELECTION_WIN','true','forceATBRunCmdWinLineH','setIsEnabled','_SHOW_INVALID_NOTE','Window_SATBForceStatus','_textXOffset','_formattedText','_FUNC_WITH_CACHE','_statusWindow','checkUpdatedMaxes','_canMakeCmds','closeSATBInputWins','items','_onForceStop','\x20runResult_;','multiplySATBActTimes','IsChargeEnabled','PARAM_NOTE_FUNCS','apply','_NOTE_TYPES','_logWindow','_displayWins','_NOTE_FUNC','_createForceChargeHotkey','forceStopATBKey','_updateBackOpacity','_updateActivePartyCmdWin','default_','gim','canSATBEsc','makeConfusionActions','atbBarColor2','_FILTERED_TARGET_IDS','NOTE_FORWARDED_FUNCS','_canCoreTurnClockOverflow_','_isRefreshWithCache','_itemWindow','coreATB','eraseVirtualSATBActSlot','_NOTES','return\x20result\x20','hide','_PHASE_NORM','_fillRate','wasWinActive','StartCharge','_TRY_JSON_PARAM','isConfused','_latestItem_','updateNoteChainingRule','_setATB','isStateAddable','_CONCAT_EVERY_VAL_RESULT_FUNC','atbBarXOffset','refreshSATBWins','curMaxSATB','onTryStartForceActorChargeSATB','_coreBaseFillSecRate','_areAllNotesLoaded','baseFillATB','string','_loadNote','forceATBStopCmdTextYOffset','onTurnEnd','_CAN_MOVE','_loadNotePairs','_onCoreTurnClockOverflow','forceATBStopCmdWinX','_REFRESH_DESELECT_TARGET_WIN','charge','resize','_extract','_selectNextCmd','_cmdFight','_cachedResults','_loadEvalNote','_updateCachedVals','cooldownMax','_actorWindow','_FACTOR_DATA','_REG_EXP_NOTE','\x20*(?:doublex\x20+rmmv\x20+)?satb\x20+(\x5cw+)','onStartFill','_markChangeFactor','_deactivateHideSelectionWins','updateCachedVals','_transform','deselect','datumType','_cooldownMaxATBValNoteChainingRule','_CONCAT_SOME_VAL_RESULT_FUNC','Game_Enemy','_PHASE_CHARGE','hasAnyNote','_ERASE_BARS','_raiseMemChangeFactors','noForceATBText','pairFuncListPart_','_coreTurnClockTimeUnit','onAllSATBActsEnd','eraseSATBBar','addSATBActBattler','_partResultWithCache_','onForceRun','_uncachedResult_','coreBaseFillFrameRate_','makeActionTimes','setCurATB','forceATBStatWinY','phaseTypes','BattleManager','procScene_','addSATBActTimes','onStartForceCharge','satb','onStartCharge','_isLastEnabled','_canCancelCooldownNotePriorities','_TARGET_ID','_padding','_NOTE_KEY','endCommandSelection','cooldownMaxSATB','_changeFactorMarks','canCancelCharge','_REG_EXP_ENTRIES','_textY','_isAlreadyMaxATB','mapReduce','_winYParam','_TARGET_GROUPS','refreshSATBWin','SATB','_IS_NUM_ARGS','setChargeATB','create','_actionBattlers','_ACT_DATA_SKILLS','_lastTextX','cachedBaseChargeMax_','setup','_scene','baseCoreMaxSATB','_endTurn','_FORCE_CHARGE','fillUpCooldownATB','latestChargeMax','commandItem','_clearSATBHelper','_MIX_EVERY_OBJ_VAL_RESULT_FUNC','_ERASE_VIRTUAL_ACT_SLOT','parent','_canCoreTurnClockOverflow','_SMALLEST_ATB_VAL_INCREMENT','isReleased','_checkIsBecomeFullNotFull','clear','nextInputableActorKey','agi','updateAction','_TARGET_INDEX','_cachedPadding','norm','setPreemptStartSATB','_SWITCH_VAR_ID','_raiseChangeFactor','onCancelCharge','_updateStateTurn','entry1','switch','movableMembers','canBind','stack','hotkey','Game_Actor','isPayBeforeExecCharge','inputableActors','fastMap','_SWITCH_VAR_REG_EXPS','_atbTextColor','Game_Party','_hasUnknownChangeFactor','atbBarH','max','isStateAffected','clearChargeATB','refreshStatus','isShowForceATBStatWin','processHandling','core','_pairFuncListPart','_procTouch','atbBarYOffset','atbBarTextPadding','_backOpacityParam','_FUNC_WITHOUT_CACHE','coreActState','refreshWin','canforceCharge','canActSATB','shift','meta','SATBTurnManager','clearActions','prevInputableActorKey','_SWITCH_VAR_IDS','forEach','_updateText','baseChargeMaxSATB','atbBarBackColor','_BAR_FUNC','forceATBStatBackOpacity','_endMemTurn','startBattle','isSATBChargeItem','forceATBRunCmdTextXOffset','chargeATB','isActive','_canForceChargeNoteChainingRule','equips','_rules','markChangeFactors','fillUpCoreATB','_REDUCED_NOTE_CONTAINERS','allBattleMembers','createActorCommandWindow','toLowerCase','event','_isParamFuncCached','_IS_DEAD','isBusy','Game_SATBCache','_barColor2','autoRemovalTiming','_MONO_RESULT_CHAINING_RULES','_MIX_EVERY_OBJ_RESULT_FUNC','raiseAllChangeFactors','_isTouchedInsideFrame','_IS_PLUGIN_CMD','_PARSED_PARAMS','isActor','_textSizeParam','_DEL_MASTER_KEY','_isDatabaseLoaded','removeChild','isShowParam','backOpacityParam','curMax','selectEnemySelection','The\x20abstract\x20method\x20_onTouch\x20isn\x27t\x20implemented\x20by','curSATBProportion','actor','_IS_VALID_SUFFIX','fillATB','inputableSATBActorIndices','stop','setSATBParam','_REFRESH_MEM','forceATBStatTextPadding','hasSATBInputableActors','note','forceChargeATBKeys','textPaddingParam','contains','new','_lastMaxes','_createActorCmdIndexHotkey','isForceRun','evalEnd','isUnselectedSATBInputableActor','_cachedLists','_MIX_SOME_OBJ_RESULT_FUNC','mapFilter','onStartCooldown','moduleParam','SATBManager','skillId','pairFuncs','_CALL_HANDLER','eraseSATBActBattler','action','usableSkills','addCurATB','inputtingAction','_REG_EXPS','textXParam','varIds','_pluginCmdTargetGroup','suffix1','_FORCE_RUN','suffixes','standardPadding','forceATBStatWinLineH','waiting','_coreBaseFillUnit','argObj_','_onSelectActorIndexByHotkey','FuncContents','chainedAssociativeResult_','cooldownMaxATBVal','_onTrySelectActorIndexByHotkey','_textPadding','_NUM_RESULT_NOTES','_MIX_SOME_OBJ_VAL_RESULT_FUNC','removeActor','_winW','_PHASES','atbBarTextSize','_scanParamFuncContentForSwitchVars','resetFontSettings','partResult_','Game_SATBPairs','addCoreATBProportion','_RUN_LIST_CHAINING_RULES','_enemySprites','atbBarColor1','onTryEndForceActorChargeSATB','etypeId','canMakeSATBCmds','coreTurnATBTime','cooldownATB','refreshAllSATBMems','opacity','onAllActionsEnd','class','_PARSED_ARGS','_surprise','_skillWindow','forceATBStopCmdTextXOffset','_raiseMarkedNoteChangeFactors','_createCancelCooldownHotkey','_fillW','_removeActor','cancelChargeATBKeys','_CACHED_DEFAULT_NOTE_PARAMS','\x5cw+)*)\x20*','_procCancelHotkey','isSATBBattle','Note','bind','_IS_UNIQ_ELEM','_onATBBecomeFull','cooldownATBProportion','coreTurnATBAct','_canDisplayWins','forceATBRunCmdWinPadding','_partResults','Game_Interpreter','_NOTE_CHAINING_RULES','some','isAborting','base','_FIRST_VAL_MONO_FUNC','scanSATBFuncContentForSwitchVars','forceATBRunCmdWinY','forceRunATBStatText','onToggleAutoInputSATBActs','_isUpdateActorWinPos','_setBattler','_raiseMappedMemChangeFactors','onSATBBarRefresh','_RESULT_CHAINING_OPERATION','satbMems','addNewState','_canTouch','PHASE_TYPE_FORWARDED_FUNCS','_subject','funcParam','createStatusWindow','Param','target','cfg','_extractParamFuncContents','\x20is','forceRunCmdWin','forceStopCmdWin','params','_onDeselectActor','fastReduce','forceATBStopCmdWinLineH','_pairFuncListPartWithoutCache','_isShow','newInputableActorIndex','paddingParam','forceChangeEquip','isInputting','var','\x20is\x20not\x20a\x20function','forceATBRunCmdTextPadding','_onChargeATBBecomeNotFull','EndCharge','_raisedNoteChangeFactors','satbNote','_param','storeUpdatedSATBSwitchVarIds','_pairFuncList','forceStatusWin','_actors','call','IsCoreEnabled','_winHParam','raiseSATBNoteChangeFactors','updateCoreSATBTurnAct','_winWParam','split','playOk','addChild','isInt','_RESULT_CHAINING_RULES','_REG_EXP_SUFFIXES','forceATBStatTextXOffset','_STRING_TO_NUM','Window_ActorCommand','sort','initSATB','fastFilter','_BOOL_PARAM','makeActions','min','WithCache','_updateActStateTurn','canCoreTurnClockOverflow','_onTouchOk','_onSelectPrevNextActorByHotkey','coreTurnSecClockMaxInMs','isOpen','_data','_lineH','isRepeated','_backOpacity','onStartSATBFill','chainedRunList','warn','_partLists','_PARAM_UPDATES','_forceState','initEquips','_lineHParam','saveGame','createAllWindows','chargeMaxATBVal','_onTouch','inputableActorKeys','_selectionWins','DataManager','_updateBattleProc','_textYParam','coreTurnClockUnit','gradientFillRect','textWidth','baseCooldownMaxSATB','invalidateParamCache','Window_BattleStatus','_REDUCED_EMPTY_CONTAINERS','Game_SATBPhaseTypes','_storeNoteModule','canSelectPrevNextActor','_LAST_LIST_MONO_FUNC','coreTurnFrameClockMax','join','IS_VALID_RESULT','curATB','updatePadding','actTimes','operator','_storeParam','_isPayBeforeExecChargeNoteChainingRule','_setNewCoreTurnClockProportion','_forcedChargeBeyondMax','_textXParam','_0_ARG_FUNC','_fillBarW','updateNotePriorities','onBattleEnd','\x20Parameters\x20Plugin\x20is\x20','commandAttack','_RAW_PARAMS','height','[A-Za-z\x5cd_.-]+','canLastEsc','_equips','raiseMarkedChangeFactors','_isPayBeforeExecChargeNotePriorities','clearCoreATB','this\x20is\x20null\x20or\x20not\x20defined','stringify','canInputSATB','_coreTurnUnit','chargeMaxSATB','setHandler','eraseCoreSATBActs','selectNextCommand','callHandlers'];(function(_0x52daca,_0xda221f){var _0xda59f3=function(_0x4d021e){while(--_0x4d021e){_0x52daca['push'](_0x52daca['shift']());}};_0xda59f3(++_0xda221f);}(_0xda22,0x1c0));var _0xda59=function(_0x52daca,_0xda221f){_0x52daca=_0x52daca-0x0;var _0xda59f3=_0xda22[_0x52daca];return _0xda59f3;};function SATBTurnManager(){'use strict';throw new Error(_0xda59('0x3ee'));}function SATBManager(){'use strict';throw new Error(_0xda59('0x2a'));}function Game_SATBPhaseTypes(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}function Game_SATBNotes(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}function Game_SATBCache(){'use strict';this['initialize'][_0xda59('0x68')](this,arguments);}function Game_SATBPairs(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}function Game_SATBRules(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}function Window_SATBBar(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}function Window_SATBBase(){'use strict';this['initialize'][_0xda59('0x68')](this,arguments);}function Window_SATBForceRunCmd(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}function Window_SATBForceStopCmd(){'use strict';this['initialize'][_0xda59('0x68')](this,arguments);}function Window_SATBForceStatus(){'use strict';this[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);}(function(){'use strict';var _0x5a654f=Array['prototype'];_0x5a654f['fastFilter']=_0x5a654f[_0xda59('0x1f5')]||function(_0x58697d,_0x46b74e){if(this==null)throw new TypeError('this\x20is\x20null\x20or\x20not\x20defined');if(typeof _0x58697d!==_0xda59('0x2a8'))throw new TypeError(_0x58697d+_0xda59('0x1d9'));var _0x29136d=[];return this[_0xda59('0x124')](function(_0x576e29,_0x14616d){if(!_0x58697d[_0xda59('0x1e4')](_0x46b74e,_0x576e29,_0x14616d,this))return;_0x29136d[_0xda59('0x2ee')](_0x576e29);}),_0x29136d;},_0x5a654f[_0xda59('0x107')]=_0x5a654f[_0xda59('0x107')]||function(_0x116854,_0x4dc940){if(this==null)throw new TypeError(_0xda59('0x23a'));if(typeof _0x116854!==_0xda59('0x2a8'))throw new TypeError(_0x116854+_0xda59('0x1d9'));var _0x57e1c6=[];return this[_0xda59('0x124')](function(_0x59e453,_0x1d4c5b){_0x57e1c6[_0xda59('0x2ee')](_0x116854[_0xda59('0x1e4')](_0x4dc940,_0x59e453,_0x1d4c5b,this));}),_0x57e1c6;};var _0x10bb3d=function(_0x1a8abf){this['push'](_0x1a8abf);};_0x5a654f['fastMerge']=_0x5a654f[_0xda59('0x274')]||function(_0x108129){return _0x108129[_0xda59('0x124')](_0x10bb3d,this),this;},_0x5a654f[_0xda59('0x1d0')]=_0x5a654f[_0xda59('0x1d0')]||function(_0x38bdb2,_0x35b708,_0x451091){if(this==null)throw new TypeError(_0xda59('0x23a'));var _0x1919b6=this[_0xda59('0x286')],_0x1fa31c=_0x35b708!==undefined;if(typeof _0x38bdb2!=='function')throw new TypeError(_0x38bdb2+'\x20is\x20not\x20a\x20function');else{if(_0x1919b6<=0x0&&!_0x1fa31c)throw new TypeError(_0xda59('0x2d4'));}if(_0x1fa31c){var _0x215e9f=_0x35b708;return this['forEach'](function(_0x217024,_0x480088){_0x215e9f=_0x38bdb2[_0xda59('0x1e4')](_0x451091,_0x215e9f,_0x217024,_0x480088);}),_0x215e9f;}var _0x215e9f=this[0x0],_0x3e228e=0x1;while(_0x3e228e<_0x1919b6){_0x215e9f=_0x38bdb2[_0xda59('0x1e4')](_0x451091,_0x215e9f,this[_0x3e228e],_0x3e228e),_0x3e228e++;}return _0x215e9f;},_0x5a654f[_0xda59('0x27d')]=_0x5a654f[_0xda59('0x27d')]||function(_0x47e41c,_0x1fb93f,_0x1ed95b,_0x3b52c2){if(this==null)throw new TypeError('this\x20is\x20null\x20or\x20not\x20defined');if(typeof _0x47e41c!==_0xda59('0x2a8'))throw new TypeError(_0x47e41c+_0xda59('0x1d9'));else{if(typeof _0x1fb93f!==_0xda59('0x2a8'))throw new TypeError(_0x1fb93f+_0xda59('0x1d9'));}var _0x196e29=[];return this[_0xda59('0x124')](function(_0x38e41f,_0x13094f){if(!_0x47e41c['call'](_0x1ed95b,_0x38e41f,_0x13094f,this))return;_0x196e29[_0xda59('0x2ee')](_0x1fb93f[_0xda59('0x1e4')](_0x3b52c2,_0x38e41f,_0x13094f));}),_0x196e29;},_0x5a654f[_0xda59('0x166')]=_0x5a654f['mapFilter']||function(_0x1640ea,_0x3b0220,_0x393e14,_0x574cf2){if(this==null)throw new TypeError(_0xda59('0x23a'));if(typeof _0x1640ea!=='function')throw new TypeError(_0x1640ea+_0xda59('0x1d9'));else{if(typeof _0x3b0220!=='function')throw new TypeError(_0x3b0220+_0xda59('0x1d9'));}var _0x6b46d=[];return this['forEach'](function(_0x2a58da,_0x5debb1){var _0x48549d=_0x1640ea[_0xda59('0x1e4')](_0x393e14,_0x2a58da,_0x5debb1,this);if(!_0x3b0220[_0xda59('0x1e4')](_0x574cf2,_0x48549d,_0x5debb1))return;_0x6b46d['push'](_0x48549d);}),_0x6b46d;},_0x5a654f[_0xda59('0xd6')]=_0x5a654f[_0xda59('0xd6')]||function(_0x336f7f,_0x3da3e3,_0xe158c0,_0x1a59a1,_0x55209c){if(this==null)throw new TypeError(_0xda59('0x23a'));var _0x5dfc70=this[_0xda59('0x286')],_0x3a9871=_0xe158c0!==undefined;if(typeof _0x336f7f!=='function')throw new TypeError(_0x336f7f+_0xda59('0x1d9'));else{if(typeof _0x3da3e3!==_0xda59('0x2a8'))throw new TypeError(_0x3da3e3+_0xda59('0x1d9'));else{if(_0x5dfc70<=0x0&&!_0x3a9871)throw new TypeError('Reduce\x20of\x20empty\x20array\x20with\x20no\x20initial\x20value');}}if(_0x3a9871){var _0x269d2c=_0xe158c0;return this[_0xda59('0x124')](function(_0x2b24d3,_0x2553c0){var _0x484436=_0x336f7f[_0xda59('0x1e4')](_0x1a59a1,_0x2b24d3,_0x2553c0,this);_0x269d2c=_0x3da3e3[_0xda59('0x1e4')](_0x55209c,_0x269d2c,_0x484436,_0x2553c0);}),_0x269d2c;}var _0x269d2c=this[0x0],_0x1a9f10=0x1;while(_0x1a9f10<_0x5dfc70){var _0x326b28=_0x336f7f[_0xda59('0x1e4')](_0x1a59a1,this[_0x1a9f10],_0x1a9f10,this);_0x269d2c=_0x3da3e3['call'](_0x55209c,_0x269d2c,_0x326b28,_0x1a9f10),_0x1a9f10++;}return _0x269d2c;},_0x5a654f['eraseElem']=_0x5a654f[_0xda59('0x341')]||function(_0x5b4be1){var _0x2f0cb9=this[_0xda59('0x1d')](_0x5b4be1);if(_0x2f0cb9>=0x0)this[_0xda59('0x339')](_0x2f0cb9,0x1);return this;};}(),function(){'use strict';var _0x309888=JsonEx[_0xda59('0x31')];JsonEx[_0xda59('0x31')]=function(_0x156273){var _0x17d43f=_0x309888[_0xda59('0x68')](this,arguments);if(_0x2d3fea(_0x156273))_0x29f9d9(_0x156273,_0x17d43f);return _0x17d43f;};function _0x2d3fea(_0x34ec89){var _0x19245a=_0x34ec89[_0xda59('0x2e2')];if(!_0x19245a)return![];var _0x49a663=_0x19245a[_0xda59('0x331')];return _0x49a663&&_0x49a663['_cache'];}function _0x29f9d9(_0x4ceaab,_0x3d437a){_0x3d437a['_satb'][_0xda59('0x331')][_0xda59('0x27c')]=_0x4ceaab['_satb'][_0xda59('0x331')]['_cache'];}}(),function(){'use strict';Input[_0xda59('0x2ec')]={},Input[_0xda59('0xf0')]=Input[_0xda59('0xf0')]||function(_0x23c905){var _0x4129a3=this['_wasPressed'];_0x4129a3[_0x23c905]=_0x4129a3[_0x23c905]||this['isPressed'](_0x23c905);if(this[_0xda59('0x3c8')](_0x23c905)&&this[_0xda59('0xf0')]('escape'))return!![];if(!_0x4129a3[_0x23c905]||this[_0xda59('0x370')][_0x23c905])return![];return _0x4129a3[_0x23c905]=![],!![];};}(),function(_0x325cab){'use strict';_0x325cab[_0xda59('0x212')]={'orig':{},'new':{}};var _0x19a6ab=_0x325cab['DataManager']['orig'],_0x4641ab=_0x325cab[_0xda59('0x212')][_0xda59('0x15e')];_0x4641ab[_0xda59('0x53')]=function(_0xdae54d,_0x431ad9,_0x4e5b99){if(!_0x4641ab[_0xda59('0x2f6')][_0x431ad9])return;var _0x1ea32f=_0x4641ab[_0x4641ab[_0xda59('0x2f6')][_0x431ad9]];if(_0x1ea32f[_0x4e5b99])delete _0x1ea32f[_0x4e5b99][_0xdae54d];},_0x4641ab[_0xda59('0x59')]=function(_0x1c3053,_0x569e2f,_0x2164f8,_0x4d9d4f){console[_0xda59('0x206')](['A\x20'+_0x2164f8+_0xda59('0x290')+_0x1c3053,_0xda59('0x34e')+_0x569e2f+':',_0x4d9d4f][_0xda59('0x221')]('\x0a'));},_0x4641ab[_0xda59('0xfa')]=function(_0x2d93ef){return+_0x2d93ef[_0xda59('0x3b6')](_0x4641ab[_0xda59('0x3bc')],'');},_0x4641ab[_0xda59('0x123')]=function(_0x4dbde9,_0x386811){var _0x3be747=_0x4dbde9[_0xda59('0x2e7')](_0x386811);return _0x3be747?_0x3be747[_0xda59('0x107')](_0x4641ab[_0xda59('0xfa')]):[];},_0x4641ab[_0xda59('0x2f5')]=function(_0x25c546,_0x36f889,_0x4ea578,_0x1f6a5c){var _0x3cace5=_0x1f6a5c[_0x4ea578]=_0x1f6a5c[_0x4ea578]||{},_0x2a88b8=_0x3cace5[_0x36f889]=_0x3cace5[_0x36f889]||[];if(!_0x2a88b8[_0xda59('0x15d')](_0x25c546))_0x2a88b8[_0xda59('0x2ee')](_0x25c546);},_0x4641ab['_REG_EXP_NOTE']=_0xda59('0xa7'),_0x4641ab[_0xda59('0x25a')]='\x20+',_0x4641ab[_0xda59('0x1ef')]=_0xda59('0x28d')+_0x4641ab[_0xda59('0x25a')]+_0xda59('0x1a5'),_0x4641ab[_0xda59('0x4')]=_0xda59('0x234'),_0x4641ab[_0xda59('0x389')]='\x20*,\x20+',_0x4641ab[_0xda59('0xd3')]=_0xda59('0x32d')+_0x4641ab[_0xda59('0x4')]+_0xda59('0x3c2')+_0x4641ab[_0xda59('0x389')]+_0x4641ab['REG_EXP_ENTRY_VAL']+_0xda59('0x33d'),_0x4641ab['_REG_EXPS']={'base':new RegExp('<'+_0x4641ab[_0xda59('0xa6')]+_0x4641ab[_0xda59('0x1ef')]+':'+_0x4641ab[_0xda59('0xd3')]+'>',_0xda59('0x72')),'evalStart':new RegExp('<'+_0x4641ab[_0xda59('0xa6')]+'\x20*>',_0xda59('0x72')),'evalEnd':new RegExp('<\x20*/'+_0x4641ab['_REG_EXP_NOTE']+_0xda59('0x245'),_0xda59('0x72'))},_0x4641ab['_SWITCH_VAR_ID_REG_EXP']=/\D+/gim,_0x4641ab['_SWITCH_VAR_REG_EXPS']={'switch':/\$gameSwitches *\. *value *\( *(\d+) *\)/gim,'var':/\$gameVariables *\. *value *\( *(\d+) *\)/gim},_0x4641ab[_0xda59('0x2f6')]={'switch':'switchIds','var':_0xda59('0x174'),'script':_0xda59('0x174')},(_0x4641ab[_0xda59('0x261')]={},_0x4641ab[_0xda59('0x174')]={}),_0x4641ab[_0xda59('0x90')]=![],_0x19a6ab[_0xda59('0x292')]=DataManager[_0xda59('0x292')],_0x4641ab[_0xda59('0x292')]=DataManager[_0xda59('0x292')]=function(){var _0x2b3d29=_0x19a6ab[_0xda59('0x292')][_0xda59('0x68')](this,arguments);return _0x2b3d29&&_0x4641ab[_0xda59('0x149')]['call'](this);},_0x19a6ab[_0xda59('0x3e3')]=DataManager[_0xda59('0x3e3')],_0x4641ab[_0xda59('0x3e3')]=DataManager[_0xda59('0x3e3')]=function(){_0x19a6ab[_0xda59('0x3e3')][_0xda59('0x68')](this,arguments),_0x325cab[_0xda59('0x2c4')]();},_0x19a6ab[_0xda59('0x20c')]=DataManager[_0xda59('0x20c')],_0x4641ab[_0xda59('0x20c')]=DataManager[_0xda59('0x20c')]=function(_0x34d762){$gameParty[_0xda59('0x2e0')]();var _0x2d7f56=_0x19a6ab[_0xda59('0x20c')]['apply'](this,arguments);return $gameParty[_0xda59('0x314')](),_0x2d7f56;},_0x19a6ab[_0xda59('0x31e')]=DataManager[_0xda59('0x31e')],DataManager[_0xda59('0x31e')]=function(_0x7c926a){_0x19a6ab[_0xda59('0x31e')][_0xda59('0x68')](this,arguments),$gameParty[_0xda59('0x314')](),$gameSystem['extractSATBFuncContents'](),$gameSystem['extractSATBSwitchVarIds']();},_0x4641ab[_0xda59('0x31e')]=DataManager[_0xda59('0x31e')],DataManager['updateSATBNoteScriptInVar']=function(_0x26ac06,_0x485a7c){if(typeof _0x485a7c!==_0xda59('0x92')&&!(_0x485a7c instanceof String))return;var _0x166d90=_0x4641ab[_0xda59('0x174')][_0x26ac06];if(_0x166d90)Object[_0xda59('0x3c9')](_0x166d90)[_0xda59('0x124')](function(_0x2a69c8){this[_0xda59('0x1b7')](_0x485a7c,_0x2a69c8);},this);},DataManager[_0xda59('0x1b7')]=function(_0x484dec,_0x4b2684){Object[_0xda59('0x3c9')](_0x4641ab[_0xda59('0x108')])[_0xda59('0x124')](function(_0x10b173){var _0x4db422=_0x4641ab[_0xda59('0x108')][_0x10b173];_0x4641ab['_SWITCH_VAR_IDS'](_0x484dec,_0x4db422)[_0xda59('0x124')](function(_0x387ec6){DataManager[_0xda59('0x1e0')](_0x4b2684,_0x10b173,_0x387ec6,[_0xda59('0x258')]);});},this);},DataManager['storeUpdatedSATBSwitchVarIds']=function(_0x2a4d88,_0x166157,_0x4d2332,_0x109b9d){if(!_0x166157||!_0x4d2332||!_0x109b9d)return;if(_0x109b9d[_0xda59('0x286')]>0x0)return _0x109b9d[_0xda59('0x124')](function(_0x41e962){_0x4641ab[_0xda59('0x4d')][_0xda59('0x1e4')](this,_0x2a4d88,_0x166157,_0x4d2332,_0x41e962);},this);_0x4641ab[_0xda59('0x53')](_0x2a4d88,_0x166157,_0x4d2332);},_0x4641ab[_0xda59('0x149')]=function(){if(_0x4641ab[_0xda59('0x90')])return!![];var _0x48933a={'actor':$dataActors,'enemy':$dataEnemies,'class':$dataClasses,'weapons':$dataWeapons,'armors':$dataArmors,'states':$dataStates,'skills':$dataSkills,'items':$dataItems},_0x8df5e3=Object['keys'](_0x325cab[_0xda59('0x3fe')]['new'][_0xda59('0x67')][_0xda59('0x331')]);return Object[_0xda59('0x3c9')](_0x48933a)[_0xda59('0x124')](function(_0x5c0ef0){_0x48933a[_0x5c0ef0]['forEach'](function(_0x302b2d){_0x4641ab[_0xda59('0x93')][_0xda59('0x1e4')](this,_0x8df5e3,_0x5c0ef0,_0x302b2d);},this);},this),_0x4641ab[_0xda59('0x90')]=!![],!![];},_0x4641ab[_0xda59('0x93')]=function(_0x27f9b5,_0x597672,_0x3f973d){if(!_0x3f973d)return;var _0x1c2fc6=_0x3f973d[_0xda59('0x11f')]['satb']={'datumType':_0x597672},_0x54f8c8=![],_0x5eabf7='',_0x30002f=[];const _0x596d49=_0x3f973d['id'];_0x3f973d[_0xda59('0x15a')][_0xda59('0x1ea')](/[\r\n]+/)[_0xda59('0x124')](function(_0x461e21){if(_0x461e21[_0xda59('0x2e7')](_0x4641ab['_REG_EXPS'][_0xda59('0x344')]))_0x54f8c8=!![],_0x5eabf7=RegExp['$1'];else{if(_0x54f8c8){if(!_0x461e21[_0xda59('0x2e7')](_0x4641ab[_0xda59('0x172')][_0xda59('0x162')]))return _0x30002f['push'](_0x461e21);_0x4641ab['_loadEvalNote'][_0xda59('0x1e4')](this,_0x27f9b5,_0x596d49,_0x1c2fc6,_0x461e21,_0x5eabf7,_0x30002f),(_0x54f8c8=![],_0x5eabf7='',_0x30002f=[]);}else _0x4641ab['_loadBaseNote'][_0xda59('0x1e4')](this,_0x27f9b5,_0x596d49,_0x1c2fc6,_0x461e21);}},this);},_0x4641ab[_0xda59('0xa1')]=function(_0x37eb0b,_0x4ab587,_0x262a39,_0x2d3258,_0x3e173c,_0x8de058){if(_0x3e173c!==RegExp['$1'])return;if(!_0x37eb0b[_0xda59('0x15d')](_0x3e173c))return _0x4641ab[_0xda59('0x59')](_0x4ab587,_0x3e173c,_0x262a39[_0xda59('0xae')],_0x2d3258);var _0xadff1f=_0x8de058[_0xda59('0x221')]('\x0a');_0x4641ab[_0xda59('0x97')][_0xda59('0x1e4')](this,_0x262a39,_0x3e173c,['eval'],[_0xadff1f]),DataManager[_0xda59('0x1b7')](_0xadff1f,_0x3e173c);},_0x4641ab[_0xda59('0x308')]=function(_0x1e2e50,_0x1559b2,_0x5828c5,_0x3d4c42){if(!_0x3d4c42['match'](_0x4641ab[_0xda59('0x172')][_0xda59('0x1b5')]))return;var _0x5d0541=RegExp['$1'];if(!_0x1e2e50[_0xda59('0x15d')](_0x5d0541))return _0x4641ab[_0xda59('0x59')](_0x1559b2,_0x5d0541,_0x5828c5[_0xda59('0xae')],_0x3d4c42);var _0x8624d5=RegExp['$2'][_0xda59('0x1ea')](new RegExp(_0x4641ab[_0xda59('0x25a')])),_0x1ee7ca=RegExp['$3'][_0xda59('0x1ea')](new RegExp(_0x4641ab[_0xda59('0x389')]));_0x4641ab[_0xda59('0x97')][_0xda59('0x1e4')](this,_0x5828c5,_0x5d0541,_0x8624d5,_0x1ee7ca);},_0x4641ab[_0xda59('0x97')]=function(_0x31a71d,_0x1013d1,_0x270e55,_0x24f10f){var _0x3776d5=Math[_0xda59('0x1f8')](_0x270e55[_0xda59('0x286')],_0x24f10f[_0xda59('0x286')]),_0x158490=0x0,_0x499c18={};while(_0x158490<_0x3776d5){var _0x5653e0=_0x158490+0x1,_0x24c145=_0x270e55[_0x158490],_0xf4ef7e=_0x24f10f[_0x158490];_0x499c18[_0xda59('0x3fb')+_0x5653e0]=_0x24c145,_0x499c18[_0xda59('0x26')+_0x5653e0]=_0xf4ef7e,_0x4641ab[_0xda59('0x4d')][_0xda59('0x1e4')](this,_0x1013d1,_0x24c145,_0xf4ef7e,_0x31a71d[_0xda59('0xae')]),_0x158490++;}_0x31a71d[_0x1013d1]=_0x31a71d[_0x1013d1]||[],_0x31a71d[_0x1013d1][_0xda59('0x2ee')](_0x499c18);},_0x4641ab[_0xda59('0x4d')]=function(_0xd2c4a5,_0x4bfb67,_0x1c38cd,_0xb55653){var _0x558c9a=_0x4bfb67===_0xda59('0x251')?_0xb55653:_0xda59('0x258');if(_0x4641ab['_SWITCH_VARS'][_0x4bfb67])_0x4641ab[_0xda59('0x2f5')](_0x558c9a,_0xd2c4a5,+_0x1c38cd,_0x4641ab[_0x4641ab[_0xda59('0x2f6')][_0x4bfb67]]);};}(DoubleX_RMMV['SATB']),function(_0x45f198){'use strict';_0x45f198[_0xda59('0xc4')]={'orig':{},'new':{}};var _0x634f2f=_0x45f198[_0xda59('0xc4')][_0xda59('0x2d6')],_0x3b4acc=_0x45f198['BattleManager']['new'];_0x3b4acc[_0xda59('0x373')]=function(_0x589b71,_0x2f0f6f){return _0x589b71+_0x2f0f6f['agi'];},_0x3b4acc[_0xda59('0x21')]=function(_0x71139,_0x490daf){return _0x490daf[_0xda59('0x29')]['speed']-_0x71139[_0xda59('0x29')]['speed'];},_0x634f2f[_0xda59('0x3e6')]=BattleManager[_0xda59('0x3e6')],_0x3b4acc[_0xda59('0x3e6')]=BattleManager[_0xda59('0x3e6')]=function(){_0x634f2f[_0xda59('0x3e6')][_0xda59('0x68')](this,arguments),SATBTurnManager[_0xda59('0x3a4')](),$gameParty[_0xda59('0x1f4')](),this[_0xda59('0x2e2')]={'avgAgi':_0x3b4acc[_0xda59('0x44')][_0xda59('0x1e4')](this)};},_0x634f2f[_0xda59('0x1d7')]=BattleManager[_0xda59('0x1d7')],_0x3b4acc[_0xda59('0x1d7')]=BattleManager['isInputting']=function(){if(SATBManager[_0xda59('0x254')]())return $gameParty[_0xda59('0x159')]();return _0x634f2f[_0xda59('0x1d7')][_0xda59('0x68')](this,arguments);},_0x634f2f['canEscape']=BattleManager[_0xda59('0x26d')],_0x3b4acc[_0xda59('0x26d')]=BattleManager['canEscape']=function(){return _0x634f2f[_0xda59('0x26d')][_0xda59('0x68')](this,arguments)&&this[_0xda59('0x73')]();},_0x634f2f[_0xda59('0x2fe')]=BattleManager[_0xda59('0x2fe')],BattleManager[_0xda59('0x2fe')]=function(_0xd51204,_0x4677bc){_0x634f2f[_0xda59('0x2fe')][_0xda59('0x68')](this,arguments),SATBManager[_0xda59('0xc5')](_0xda59('0x31c'));},_0x3b4acc[_0xda59('0x2fe')]=BattleManager[_0xda59('0x2fe')],_0x634f2f[_0xda59('0x12b')]=BattleManager[_0xda59('0x12b')],_0x3b4acc[_0xda59('0x12b')]=BattleManager[_0xda59('0x12b')]=function(){_0x634f2f['startBattle'][_0xda59('0x68')](this,arguments);if(!SATBManager[_0xda59('0x254')]())return;this[_0xda59('0x385')]=_0xda59('0x24d');var _0x1508e3=_0x3b4acc['_startBattleFunc'][_0xda59('0x1e4')](this);this[_0xda59('0x136')]()[_0xda59('0x124')](function(_0xa115bd){_0xa115bd[_0x1508e3]();});},_0x634f2f[_0xda59('0x241')]=BattleManager[_0xda59('0x241')],_0x3b4acc[_0xda59('0x241')]=BattleManager[_0xda59('0x241')]=function(){if(SATBManager[_0xda59('0x254')]())return _0x3b4acc['_selectNextCmd'][_0xda59('0x1e4')](this);_0x634f2f[_0xda59('0x241')][_0xda59('0x68')](this,arguments);},_0x634f2f[_0xda59('0x2b2')]=BattleManager[_0xda59('0x2b2')],BattleManager[_0xda59('0x2b2')]=function(){if(SATBManager['isEnabled']())return this[_0xda59('0x393')]();_0x634f2f[_0xda59('0x2b2')][_0xda59('0x68')](this,arguments);},_0x3b4acc['selectPreviousCommand']=BattleManager[_0xda59('0x2b2')],_0x634f2f[_0xda59('0x110')]=BattleManager['refreshStatus'],_0x3b4acc['refreshStatus']=BattleManager[_0xda59('0x110')]=function(){_0x3b4acc[_0xda59('0xa2')][_0xda59('0x1e4')](this),SATBManager[_0xda59('0xc5')](_0xda59('0x3a0')),this['_satb']['isRefreshNeeded']=![],_0x634f2f[_0xda59('0x110')][_0xda59('0x68')](this,arguments);},_0x634f2f['startTurn']=BattleManager[_0xda59('0x363')],_0x3b4acc[_0xda59('0x363')]=BattleManager[_0xda59('0x363')]=function(){if(!SATBManager[_0xda59('0x254')]())_0x634f2f['startTurn'][_0xda59('0x68')](this,arguments);},_0x634f2f['endTurn']=BattleManager[_0xda59('0x278')],_0x3b4acc[_0xda59('0x278')]=BattleManager[_0xda59('0x278')]=function(){if(SATBManager[_0xda59('0x254')]())return _0x3b4acc[_0xda59('0xe5')][_0xda59('0x1e4')](this);_0x634f2f[_0xda59('0x278')][_0xda59('0x68')](this,arguments);},_0x634f2f[_0xda59('0x4b')]=BattleManager['endAction'],_0x3b4acc['endAction']=BattleManager[_0xda59('0x4b')]=function(){_0x634f2f[_0xda59('0x4b')][_0xda59('0x68')](this,arguments);if(SATBManager[_0xda59('0x254')]())SATBTurnManager['addCoreTurnClockAct'](0x1);},_0x634f2f[_0xda59('0x369')]=BattleManager['endBattle'],_0x3b4acc[_0xda59('0x369')]=BattleManager[_0xda59('0x369')]=function(){SATBManager[_0xda59('0xc5')](_0xda59('0x61')),this[_0xda59('0x37')][_0xda59('0x2cf')](),_0x634f2f[_0xda59('0x369')][_0xda59('0x68')](this,arguments);},BattleManager['isSATBBattle']=function(){return $gameParty[_0xda59('0x3e4')]()&&SATBManager[_0xda59('0x254')]();},BattleManager['coreBaseSATBFillRate']=function(){switch($gameSystem[_0xda59('0x293')](_0xda59('0x17c'))){case _0xda59('0x2cb'):{return _0x3b4acc[_0xda59('0x264')][_0xda59('0x1e4')](this);}case _0xda59('0xd'):{return _0x3b4acc[_0xda59('0x8f')][_0xda59('0x1e4')](this);}default:return 0x0;}},BattleManager[_0xda59('0x73')]=function(){if(!SATBManager[_0xda59('0x254')]())return!![];if(!this[_0xda59('0x37')]||!this['_logWindow']||this[_0xda59('0x13c')]())return![];return this[_0xda59('0x283')]()&&!this[_0xda59('0x3e5')]();},BattleManager[_0xda59('0x283')]=function(){if($gameMessage['isBusy']())return![];if(_0x3b4acc[_0xda59('0x392')]['call'](this))return![];return $gameParty['inBattle']()&&this[_0xda59('0x385')]!=='init';},BattleManager[_0xda59('0x3e5')]=function(){return this['_phase']===_0xda59('0x16e');},BattleManager[_0xda59('0x1c0')]=function(){if($gameParty[_0xda59('0x3e4')]())return this[_0xda59('0x136')]();return $gameParty[_0xda59('0xb')]();},BattleManager['canActSATB']=function(_0x20665d){return this[_0xda59('0xde')]['contains'](_0x20665d);},BattleManager['addSATBActBattler']=function(_0x486b6e){if(!this[_0xda59('0x1a7')]())return;if(_0x486b6e[_0xda59('0x146')]())$gameParty[_0xda59('0x2a9')](_0x486b6e);if(this['canActSATB'](_0x486b6e))return;this[_0xda59('0xde')][_0xda59('0x2ee')](_0x486b6e);var _0x13ece2=0x7d0/this[_0xda59('0xde')]['length'];this['_actionBattlers'][_0xda59('0x124')](function(_0x1b30a9){var _0x2e2849=_0x1b30a9[_0xda59('0x29')];_0x2e2849[_0xda59('0x387')]=Math[_0xda59('0x1f8')](_0x2e2849[_0xda59('0x387')]+_0x13ece2,0x7d0);}),this[_0xda59('0xde')]['sort'](_0x3b4acc[_0xda59('0x21')]);},BattleManager[_0xda59('0x16d')]=function(_0x19646c){if(this[_0xda59('0x1a7')]())this[_0xda59('0xde')]['eraseElem'](_0x19646c);},BattleManager['onSATBBattlerRefresh']=function(_0x37df71){if(this[_0xda59('0x2e2')])this['_satb']['isRefreshNeeded']=!![];if(this[_0xda59('0x37')])this[_0xda59('0x37')][_0xda59('0x8c')](_0x37df71);},BattleManager[_0xda59('0x1be')]=function(_0x345772){if(this[_0xda59('0x37')])this[_0xda59('0x37')][_0xda59('0x2ed')](_0x345772);},BattleManager['updateCoreSATBTurnAct']=function(){if(!_0x3b4acc[_0xda59('0x351')][_0xda59('0x1e4')](this))return;if(SATBManager['procScene_'](_0xda59('0x37c'))){var _0x1f8bf2=this[_0xda59('0x1e')]()/this['_satb'][_0xda59('0x5')];this[_0xda59('0x136')]()['forEach'](function(_0x3f946e){_0x3f946e['fillSATB'](_0x1f8bf2*_0x3f946e[_0xda59('0xf4')]);}),_0x3b4acc[_0xda59('0x3d9')][_0xda59('0x1e4')](this),SATBTurnManager[_0xda59('0x257')]();}if(_0x3b4acc[_0xda59('0x3eb')][_0xda59('0x1e4')](this))this[_0xda59('0xf5')]();if(!this[_0xda59('0x2e2')][_0xda59('0x399')])return;this[_0xda59('0x2e2')][_0xda59('0x399')]=![],SATBManager[_0xda59('0xc5')]('refreshStatus');},_0x3b4acc['_startBattleFunc']=function(){if(this['_preemptive'])return _0xda59('0xf9');return this[_0xda59('0x19c')]?_0xda59('0x244'):_0xda59('0x3ab');},_0x3b4acc[_0xda59('0x9e')]=function(){if(!SATBManager[_0xda59('0x254')]())return;var _0x532a69=this[_0xda59('0x151')]();if(!_0x532a69)return;_0x532a69[_0xda59('0x3dd')](),this['changeActor']($gameParty[_0xda59('0x29a')](),_0xda59('0x17b'));},_0x3b4acc[_0xda59('0xa2')]=function(){SATBTurnManager[_0xda59('0xab')](),delete this[_0xda59('0x2e2')]['coreBaseFillFrameRate_'],delete this[_0xda59('0x2e2')][_0xda59('0x273')],this[_0xda59('0x2e2')][_0xda59('0x5')]=_0x3b4acc[_0xda59('0x44')][_0xda59('0x1e4')](this);},_0x3b4acc['_avgAgi']=function(){var _0x5ae6d6=this['allBattleMembers']();return _0x5ae6d6['reduce'](_0x3b4acc[_0xda59('0x373')],0x0)/_0x5ae6d6[_0xda59('0x286')];},_0x3b4acc[_0xda59('0xe5')]=function(){this[_0xda59('0x136')]()[_0xda59('0x124')](_0x3b4acc[_0xda59('0x12a')],this),this[_0xda59('0x110')](),$gameTroop['increaseTurn']();},_0x3b4acc[_0xda59('0x12a')]=function(_0x20be32){_0x20be32[_0xda59('0x95')](),this['_logWindow']['displayAutoAffectedStatus'](_0x20be32),this[_0xda59('0x6a')]['displayRegeneration'](_0x20be32);},_0x3b4acc[_0xda59('0x264')]=function(){var _0x212680=_0x45f198[_0xda59('0x169')];if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return 0x1/$gameSystem[_0xda59('0x36a')](_0xda59('0x2cb'))();else!_0x212680['IS_VALID_RESULT'](this[_0xda59('0x2e2')]['coreBaseFillFrameRate_'])&&(this[_0xda59('0x2e2')][_0xda59('0xbf')]=0x1/$gameSystem[_0xda59('0x36a')](_0xda59('0x2cb'))());return this[_0xda59('0x2e2')]['coreBaseFillFrameRate_'];},_0x3b4acc[_0xda59('0x8f')]=function(){var _0x49b5c2=_0x45f198[_0xda59('0x169')];if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return SceneManager[_0xda59('0xe')]/$gameSystem[_0xda59('0x36a')]('coreBaseFillATBSec')();else!_0x49b5c2['IS_VALID_RESULT'](this[_0xda59('0x2e2')][_0xda59('0x273')])&&(this[_0xda59('0x2e2')]['coreBaseFillSecRate_']=SceneManager[_0xda59('0xe')]/$gameSystem['satbParamFunc'](_0xda59('0xd'))());return this[_0xda59('0x2e2')][_0xda59('0x273')];},_0x3b4acc[_0xda59('0x351')]=function(){if(_0x3b4acc[_0xda59('0x392')][_0xda59('0x1e4')](this))return this[_0xda59('0x38d')](),![];if($gameMessage[_0xda59('0x13c')]()||this[_0xda59('0x356')]())return;return this[_0xda59('0x283')]();},_0x3b4acc[_0xda59('0x392')]=function(){return this[_0xda59('0x1b4')]()||this[_0xda59('0x315')]();},_0x3b4acc['_procTurn']=function(){if(this['isSATBActPhase']())return;$gameParty[_0xda59('0x375')](),this[_0xda59('0x1c4')]=this[_0xda59('0x1c4')]||this['getNextSubject']();if(this[_0xda59('0x1c4')])this[_0xda59('0x39c')]();},_0x3b4acc[_0xda59('0x3eb')]=function(){return this[_0xda59('0x385')]===_0xda59('0x16e')&&!this[_0xda59('0x13c')]();};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x4a1e4a){'use strict';var _0x358be8=_0x4a1e4a[_0xda59('0x120')]={};_0x358be8[_0xda59('0xc')]=function(_0x582428){this['_onCoreTurnClockOverflow'](_0xda59('0x383'),_0x582428,[{'clockUnit':_0xda59('0x402'),'clockMax':this[_0xda59('0x220')](),'isInt':!![]},{'clockUnit':_0xda59('0x24e'),'clockMax':this[_0xda59('0x1fe')](),'isInt':![]}]);},_0x358be8['_FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC']=function(_0x402711){this[_0xda59('0x98')](_0xda59('0x402'),_0x402711,[{'clockUnit':_0xda59('0x383'),'clockMax':this[_0xda59('0x37f')](),'isInt':!![]},{'clockUnit':'sec','clockMax':this[_0xda59('0x1fe')](),'isInt':![]}]);},_0x358be8[_0xda59('0x37b')]=function(_0x16f3bc){this['_onCoreTurnClockOverflow']('sec',_0x16f3bc,[{'clockUnit':_0xda59('0x383'),'clockMax':this[_0xda59('0x37f')](),'isInt':!![]},{'clockUnit':_0xda59('0x402'),'clockMax':this['coreTurnFrameClockMax'](),'isInt':!![]}]);},SATBTurnManager[_0xda59('0x3a4')]=function(){this[_0xda59('0x401')]={'act':0x0,'frame':0x0,'sec':0x0};},SATBTurnManager[_0xda59('0x24f')]=function(){return this[_0xda59('0x401')][_0xda59('0x383')];},SATBTurnManager[_0xda59('0x3a6')]=function(){return this[_0xda59('0x401')]['frame'];},SATBTurnManager[_0xda59('0x325')]=function(){return this[_0xda59('0x401')]['sec'];},SATBTurnManager[_0xda59('0x37f')]=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,_0xda59('0x1ad'),_0xda59('0x41'));},SATBTurnManager[_0xda59('0x220')]=function(){var _0xbcbef5=_0x4a1e4a[_0xda59('0x169')];if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return $gameSystem[_0xda59('0x36a')](_0xda59('0x195'))($gameSystem[_0xda59('0x36a')](_0xda59('0x2cb'))());else{if(!_0xbcbef5['IS_VALID_RESULT'](this[_0xda59('0x26c')])){var _0x20e315=$gameSystem[_0xda59('0x36a')](_0xda59('0x2cb'))();this['_coreTurnFrameClockMax_']=$gameSystem[_0xda59('0x36a')](_0xda59('0x195'))(_0x20e315);}}return this[_0xda59('0x26c')];},SATBTurnManager[_0xda59('0x1fe')]=function(){var _0x34a773=_0x4a1e4a[_0xda59('0x169')];if(!$gameSystem[_0xda59('0x293')]('_isParamFuncCached'))return $gameSystem['satbParamFunc'](_0xda59('0x195'))($gameSystem['satbParamFunc'](_0xda59('0xd'))())*0x3e8;else{if(!_0x34a773[_0xda59('0x222')](this[_0xda59('0x249')])){var _0x46be4d=$gameSystem['satbParamFunc'](_0xda59('0x195'))($gameSystem[_0xda59('0x36a')](_0xda59('0xd'))())*0x3e8;this[_0xda59('0x249')]=_0x46be4d;}}return this[_0xda59('0x249')];},SATBTurnManager['coreTurnClockUnit']=function(){switch($gameSystem[_0xda59('0x293')](_0xda59('0x23d'))){case'coreTurnATBTime':return this[_0xda59('0xb8')]();case'coreTurnATBAct':return'act';default:return'';}},SATBTurnManager[_0xda59('0x3f')]=function(_0x241620){this[_0xda59('0x2cd')](this['_coreTurnClock']['act']*(_0x241620-0x1));},SATBTurnManager['multiplyCoreTurnClockFrame']=function(_0x41aa53){var _0x348636=this[_0xda59('0x401')]['frame']*(_0x41aa53-0x1);this[_0xda59('0x39')](_0x348636);},SATBTurnManager[_0xda59('0x34f')]=function(_0xf11127){var _0x27c569=this[_0xda59('0x401')]['sec']*(_0xf11127-0x1);this[_0xda59('0x299')](_0x27c569);},SATBTurnManager[_0xda59('0x332')]=function(_0x394790){this[_0xda59('0x2cd')](_0x394790-this['_coreTurnClock'][_0xda59('0x383')]);},SATBTurnManager['setCoreTurnClockFrame']=function(_0x2fec23){this[_0xda59('0x39')](_0x2fec23-this[_0xda59('0x401')][_0xda59('0x402')]);},SATBTurnManager['setCoreTurnClockSecInMs']=function(_0x458ca3){this[_0xda59('0x299')](_0x458ca3-this[_0xda59('0x401')][_0xda59('0x24e')]);},SATBTurnManager[_0xda59('0x2cd')]=function(_0x487c3b){var _0x2097da=!![],_0x3fdfd3=this[_0xda59('0x37f')](),_0x184242=_0x358be8[_0xda59('0xc')];this[_0xda59('0x312')](_0x487c3b,_0x2097da,_0xda59('0x383'),_0x3fdfd3,_0x184242);},SATBTurnManager[_0xda59('0x39')]=function(_0x6d524e){var _0xd830d4=!![],_0x42861b=this[_0xda59('0x220')](),_0x57592d=_0x358be8['_FRAME_CORE_TURN_CLOCK_OVERFLOW_FUNC'];this[_0xda59('0x312')](_0x6d524e,_0xd830d4,_0xda59('0x402'),_0x42861b,_0x57592d);},SATBTurnManager[_0xda59('0x299')]=function(_0x234cc0){var _0x442b9d=![],_0x50e97a=this[_0xda59('0x1fe')](),_0x20122d=_0x358be8[_0xda59('0x37b')];this[_0xda59('0x312')](_0x234cc0,_0x442b9d,'sec',_0x50e97a,_0x20122d);},SATBTurnManager[_0xda59('0xab')]=function(){delete this[_0xda59('0x78')],delete this['_coreTurnActClockMax_'],delete this['_coreTurnFrameClockMax_'],delete this['_coreTurnSecClockMax_'];},SATBTurnManager[_0xda59('0x257')]=function(){switch($gameSystem[_0xda59('0x293')]('_coreBaseFillUnit')){case _0xda59('0x2cb'):return this[_0xda59('0x39')](0x1);case _0xda59('0xd'):{var _0x4cd7f8=0x3e8*SceneManager[_0xda59('0xe')];return this['addCoreTurnClockSecInMs'](_0x4cd7f8);}}},SATBTurnManager['_updateCoreTurnClock']=function(_0x52ec5a,_0x123f1b,_0x155731,_0x4c7182,_0x480cd0){var _0x20a984=this[_0xda59('0x401')];_0x20a984[_0x155731]+=_0x52ec5a;if(_0x123f1b)_0x20a984[_0x155731]=Math[_0xda59('0x289')](_0x20a984[_0x155731]);if(_0x20a984[_0x155731]<_0x4c7182)return;if(this[_0xda59('0x215')]()!==_0x155731)return;if(this[_0xda59('0xee')]())_0x480cd0[_0xda59('0x1e4')](this,_0x4c7182);else this['init']();BattleManager[_0xda59('0x278')]();},SATBTurnManager['_canCoreTurnClockOverflow']=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,_0xda59('0x1fb'),_0xda59('0x78'));},SATBTurnManager[_0xda59('0x98')]=function(_0x3a0faa,_0x8d1524,_0x2e0346){this[_0xda59('0x401')][_0x3a0faa]-=_0x8d1524;var _0x26a145=this['_coreTurnClock'][_0x3a0faa]*0x1/_0x8d1524;_0x2e0346[_0xda59('0x124')](function(_0x5712f5){this['_setNewCoreTurnClockProportion'](_0x26a145,_0x5712f5);},this);},SATBTurnManager[_0xda59('0x229')]=function(_0x10ad47,_0x5ad235){var _0x372c63=this[_0xda59('0x401')],_0x338f8e=_0x5ad235[_0xda59('0x38a')];_0x372c63[_0x338f8e]=_0x5ad235[_0xda59('0x3da')]*_0x10ad47;if(_0x338f8e[_0xda59('0x1ed')])_0x372c63[_0x338f8e]=Math[_0xda59('0x289')](_0x372c63[_0x338f8e]);},SATBTurnManager[_0xda59('0xb8')]=function(){switch($gameSystem[_0xda59('0x293')](_0xda59('0x17c'))){case _0xda59('0x2cb'):return _0xda59('0x402');case'coreBaseFillATBSec':return _0xda59('0x24e');default:return'';}};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x13c633){'use strict';var _0x480326=_0x13c633[_0xda59('0x169')]={};_0x480326[_0xda59('0x222')]=function(_0x453f09){return _0x453f09!==null&&_0x453f09!==undefined;},_0x480326[_0xda59('0x157')]=function(_0x5a5412){_0x5a5412[_0xda59('0x250')]();},SATBManager['areModulesEnabled']=function(_0x90efb8){if(!this[_0xda59('0x254')]())return![];return _0x90efb8['every'](SATBManager[_0xda59('0x32f')],this);},SATBManager[_0xda59('0x254')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x1e5'))();},SATBManager[_0xda59('0x1c5')]=function(_0x58698e,_0x23eece,_0x392ec4,_0x5c5ebe){if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return $gameSystem['satbParamFunc'](_0x58698e)[_0xda59('0x1e4')](_0x392ec4,_0x5c5ebe);else!_0x480326[_0xda59('0x222')](this[_0x23eece])&&(this[_0x23eece]=$gameSystem['satbParamFunc'](_0x58698e)[_0xda59('0x1e4')](_0x392ec4,_0x5c5ebe));return this[_0x23eece];},SATBManager[_0xda59('0xc5')]=function(_0x4499a9){if(BattleManager[_0xda59('0x1a7')]())return SceneManager[_0xda59('0xe3')][_0x4499a9]();},SATBManager[_0xda59('0x21e')]=function(_0x358f0f){return BattleManager[_0xda59('0x151')]()&&_0x358f0f[_0xda59('0x286')]>0x1;},SATBManager[_0xda59('0x1d4')]=function(_0x4487b7,_0x1673ed){_0x1673ed[_0xda59('0x1f3')](function(_0x43f331,_0x37f934){return(_0x43f331-_0x37f934)*_0x4487b7;});var _0x22c29a=BattleManager['actor']()[_0xda59('0x3a1')](),_0xd2009a=0x0,_0x31d8e1=_0x1673ed[_0xda59('0x286')];while(_0xd2009a<_0x31d8e1){var _0xe95d86=_0x1673ed[_0xd2009a];if(_0xe95d86*_0x4487b7>_0x22c29a*_0x4487b7)return _0xe95d86;_0xd2009a++;}return _0x1673ed[0x0];},SATBManager[_0xda59('0x32f')]=function(_0x3ee78c){return $gameSystem[_0xda59('0x36a')](_0x3ee78c)();},SATBManager[_0xda59('0x219')]=function(){if(!$gameParty||!$gameParty['inBattle']())return;BattleManager[_0xda59('0x27f')](BattleManager[_0xda59('0x1c0')]());},SATBManager[_0xda59('0x27')]=function(_0x5409d8,_0x35d5c7,_0x2998c3,_0x11da68){DataManager[_0xda59('0x1e0')](_0x5409d8,_0x35d5c7,_0x2998c3,_0x11da68),this[_0xda59('0x2f0')](_0x5409d8,['result']);},SATBManager['updateNoteChainingRule']=function(_0x71be98){this['_raiseSATBMemNoteChangeFactors'](_0x71be98,[_0xda59('0x3e7')]);},SATBManager[_0xda59('0x22e')]=function(_0x334b03){this[_0xda59('0x2f0')](_0x334b03,[_0xda59('0x35d')]);},SATBManager[_0xda59('0x197')]=function(){BattleManager[_0xda59('0x1c0')]()['forEach'](_0x480326[_0xda59('0x157')]);},SATBManager[_0xda59('0x395')]=function(_0xf489b9){if(_0xf489b9)BattleManager[_0xda59('0x1c0')]()[_0xda59('0x124')](function(_0x4a7da2){_0x4a7da2[_0xda59('0x13')](_0xf489b9);});},SATBManager[_0xda59('0x2f0')]=function(_0x9ca4c2,_0x21a42b){if($gameParty)BattleManager[_0xda59('0x1c0')]()[_0xda59('0x124')](function(_0x52bf93){_0x52bf93[_0xda59('0x1e7')](_0x9ca4c2,_0x21a42b);});};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x3375f4){'use strict';_0x3375f4[_0xda59('0x3fe')]={'orig':{},'new':{}};var _0x35a66a=_0x3375f4[_0xda59('0x3fe')][_0xda59('0x2d6')],_0x56e855=_0x3375f4[_0xda59('0x3fe')][_0xda59('0x15e')],_0x57dac9=Game_System[_0xda59('0x3f4')],_0x51ea94=_0x3375f4[_0xda59('0x212')][_0xda59('0x15e')];_0x56e855[_0xda59('0x1f6')]=function(_0x2b4de5){return _0x2b4de5&&(_0x2b4de5===_0xda59('0x56')||_0x2b4de5!=='false');},_0x56e855[_0xda59('0x379')]=function(_0x41aad8){var _0x500f54=/^[^{]*{\s*/,_0x3f4b2f=/\s*}[^}]*$/;return _0x41aad8[_0xda59('0x3dc')]()[_0xda59('0x3b6')](_0x500f54,'')[_0xda59('0x3b6')](_0x3f4b2f,'');},_0x56e855[_0xda59('0x3fa')]=function(_0x1253ab){return _0x1253ab[0x0]!=='_';},_0x56e855[_0xda59('0x302')]=function(_0x1270d3){try{return _0x56e855[_0xda59('0x302')](JSON[_0xda59('0x2dd')](_0x1270d3));}catch(_0x136a6e){return _0x1270d3;}},_0x56e855[_0xda59('0x145')]=function(_0x9d6bee){return Object[_0xda59('0x3c9')](_0x9d6bee)['forEach'](function(_0x29a4f5){if(_0x56e855[_0xda59('0x3b4')][_0xda59('0x15d')](_0x29a4f5))_0x9d6bee[_0x29a4f5]=_0x56e855[_0xda59('0x1f6')](_0x9d6bee[_0x29a4f5]);else _0x56e855[_0xda59('0x38b')][_0xda59('0x15d')](_0x29a4f5)&&(_0x9d6bee[_0x29a4f5]=_0x56e855[_0xda59('0x84')](_0x29a4f5,_0x9d6bee[_0x29a4f5]));}),_0x9d6bee;},_0x56e855[_0xda59('0x232')]=function(){var _0x4015c5='RMMV\x20Plugin\x20Obfuscation\x20Test',_0x24d8fd=PluginManager[_0xda59('0x330')](_0x4015c5);return Object[_0xda59('0x3c9')](_0x24d8fd)<=0x0&&alert(_0xda59('0x3cd')+_0xda59('0x230')+_0x4015c5),_0x56e855['_PARSED_PARAMS'](JsonEx[_0xda59('0x31')](_0x24d8fd));},_0x56e855[_0xda59('0x135')]=function(_0x4c2891,_0x275ff0){return _0x4c2891[_0x275ff0]={},_0x4c2891;},_0x56e855[_0xda59('0x84')]=function(_0x361f1d,_0x44f7b6){if(!_0x44f7b6)return _0x44f7b6;try{return _0x56e855[_0xda59('0x302')](JSON[_0xda59('0x2dd')](_0x44f7b6));}catch(_0x52ebe4){return console[_0xda59('0x206')]([_0xda59('0x2d8')+_0x361f1d+_0xda59('0x1cb'),_0x44f7b6,_0xda59('0x300'),'The\x20relevant\x20stacktrace\x20of\x20DoubleX\x20RMMV\x20Superlative\x20ATB\x20is:',_0x52ebe4[_0xda59('0x102')]][_0xda59('0x221')]('\x0a')),_0x44f7b6;}},_0x56e855[_0xda59('0x22c')]=function(_0x24b953){return new Function(_0xda59('0x359')+_0x24b953);},_0x56e855[_0xda59('0x128')]=function(_0x37adfc){return new Function(_0xda59('0x28e'),_0xda59('0x359')+_0x37adfc);},_0x56e855[_0xda59('0x6c')]=function(_0xf79b7){var _0xa06369=_0xda59('0x359')+_0xf79b7;return new Function('datum',_0xda59('0xae'),_0xa06369);},_0x56e855[_0xda59('0x67')]={'params':{'IsCoreEnabled':_0x56e855[_0xda59('0x22c')],'coreBaseFillATBFrame':_0x56e855[_0xda59('0x22c')],'coreBaseFillATBSec':_0x56e855[_0xda59('0x22c')],'coreTurnATBTime':function(_0x3f9497){return new Function(_0xda59('0x91'),_0xda59('0x359')+_0x3f9497);},'coreTurnATBAct':_0x56e855[_0xda59('0x22c')],'canCoreTurnClockOverflow':_0x56e855[_0xda59('0x22c')],'coreMaxATBVal':_0x56e855[_0xda59('0x22c')],'IsBarEnabled':_0x56e855[_0xda59('0x22c')],'isShowATBBar':_0x56e855[_0xda59('0x22c')],'atbBarText':_0x56e855[_0xda59('0x22c')],'atbBarXOffset':_0x56e855[_0xda59('0x22c')],'atbBarYOffset':_0x56e855['_0_ARG_FUNC'],'atbBarW':_0x56e855[_0xda59('0x22c')],'atbBarH':_0x56e855[_0xda59('0x22c')],'atbBarTextSize':_0x56e855[_0xda59('0x22c')],'atbBarLineH':_0x56e855[_0xda59('0x22c')],'atbBarTextPadding':_0x56e855[_0xda59('0x22c')],'atbBarBackOpacity':_0x56e855[_0xda59('0x22c')],'atbBarTextXOffset':_0x56e855[_0xda59('0x22c')],'atbBarTextYOffset':_0x56e855['_0_ARG_FUNC'],'atbBarTextColor':_0x56e855[_0xda59('0x128')],'atbBarColor1':_0x56e855[_0xda59('0x128')],'atbBarColor2':_0x56e855[_0xda59('0x128')],'atbBarBackColor':_0x56e855['_BAR_FUNC'],'IsHotkeyEnabled':_0x56e855[_0xda59('0x22c')],'prevInputableActorKey':_0x56e855[_0xda59('0x22c')],'nextInputableActorKey':_0x56e855[_0xda59('0x22c')],'inputableActorKeys':_0x56e855['_0_ARG_FUNC'],'IsWaitEnabled':_0x56e855[_0xda59('0x22c')],'isATBWaitCondMet':_0x56e855[_0xda59('0x22c')],'forceRunATBKey':_0x56e855[_0xda59('0x22c')],'forceStopATBKey':_0x56e855['_0_ARG_FUNC'],'isShowForceATBStatWin':_0x56e855[_0xda59('0x22c')],'noForceATBText':_0x56e855[_0xda59('0x22c')],'forceRunATBStatText':_0x56e855['_0_ARG_FUNC'],'forceStopATBStatText':_0x56e855['_0_ARG_FUNC'],'forceATBStatWinX':_0x56e855[_0xda59('0x22c')],'forceATBStatWinY':_0x56e855['_0_ARG_FUNC'],'forceATBStatWinW':_0x56e855[_0xda59('0x22c')],'forceATBStatWinH':_0x56e855['_0_ARG_FUNC'],'forceATBStatTextSize':_0x56e855[_0xda59('0x22c')],'forceATBStatWinLineH':_0x56e855[_0xda59('0x22c')],'forceATBStatWinPadding':_0x56e855['_0_ARG_FUNC'],'forceATBStatTextPadding':_0x56e855[_0xda59('0x22c')],'forceATBStatBackOpacity':_0x56e855[_0xda59('0x22c')],'forceATBStatTextXOffset':_0x56e855[_0xda59('0x22c')],'forceATBStatTextYOffset':_0x56e855['_0_ARG_FUNC'],'isShowForceATBRunCmdWin':_0x56e855[_0xda59('0x22c')],'forceRunATBCmdText':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdWinX':_0x56e855['_0_ARG_FUNC'],'forceATBRunCmdWinY':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdWinW':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdWinH':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdTextSize':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdWinLineH':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdWinPadding':_0x56e855['_0_ARG_FUNC'],'forceATBRunCmdTextPadding':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdBackOpacity':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdTextXOffset':_0x56e855[_0xda59('0x22c')],'forceATBRunCmdTextYOffset':_0x56e855[_0xda59('0x22c')],'isShowForceATBStopCmdWin':_0x56e855['_0_ARG_FUNC'],'forceStopATBCmdText':_0x56e855['_0_ARG_FUNC'],'forceATBStopCmdWinX':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdWinY':_0x56e855['_0_ARG_FUNC'],'forceATBStopCmdWinW':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdWinH':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdTextSize':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdWinLineH':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdWinPadding':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdTextPadding':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdBackOpacity':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdTextXOffset':_0x56e855[_0xda59('0x22c')],'forceATBStopCmdTextYOffset':_0x56e855[_0xda59('0x22c')],'IsChargeEnabled':_0x56e855[_0xda59('0x22c')],'chargeMaxATBVal':function(_0x56bcb6){return new Function(_0xda59('0x39d'),_0xda59('0x359')+_0x56bcb6);},'isPayBeforeExecCharge':_0x56e855[_0xda59('0x22c')],'cancelChargeATBKeys':_0x56e855[_0xda59('0x22c')],'forceChargeATBKeys':_0x56e855[_0xda59('0x22c')],'canCancelCharge':_0x56e855[_0xda59('0x22c')],'canForceCharge':_0x56e855['_0_ARG_FUNC'],'IsCooldownEnabled':_0x56e855[_0xda59('0x22c')],'cooldownMaxATBVal':function(_0x9c7cae){return new Function(_0xda59('0x39d'),_0xda59('0x359')+_0x9c7cae);},'cancelCooldownATBKeys':_0x56e855['_0_ARG_FUNC'],'canCancelCooldown':_0x56e855[_0xda59('0x22c')]},'notes':{'coreMax':function(_0x4b400e){var _0x1be180=_0xda59('0x359')+_0x4b400e;return new Function(_0xda59('0x3f8'),_0xda59('0xae'),'latestMax',_0x1be180);},'coreActState':_0x56e855[_0xda59('0x6c')],'isBarVisible':_0x56e855[_0xda59('0x6c')],'chargeMax':function(_0x4e072f){var _0x3c64bb=_0xda59('0x359')+_0x4e072f;return new Function(_0xda59('0x3f8'),'datumType',_0xda59('0xe8'),_0x3c64bb);},'isPayBeforeExecCharge':_0x56e855[_0xda59('0x6c')],'canCancelCharge':_0x56e855[_0xda59('0x6c')],'canForceCharge':_0x56e855[_0xda59('0x6c')],'cooldownMax':function(_0x165ec6){var _0x23e3c6=_0xda59('0x359')+_0x165ec6;return new Function(_0xda59('0x3f8'),_0xda59('0xae'),_0xda59('0x2b'),_0x23e3c6);},'canCancelCooldown':_0x56e855[_0xda59('0x6c')]}},_0x56e855['_PARAM_UPDATES']={'coreBaseFillATBFrame':SATBManager[_0xda59('0x219')],'coreBaseFillATBSec':SATBManager[_0xda59('0x219')],'coreTurnATBTime':SATBManager[_0xda59('0x219')],'coreTurnATBAct':SATBManager[_0xda59('0x219')],'canCoreTurnClockOverflow':SATBManager[_0xda59('0x219')],'coreMaxATBVal':SATBManager[_0xda59('0x27')][_0xda59('0x1a9')](SATBManager,_0xda59('0x39d')),'_coreMaxATBValNoteChainingRule':SATBManager[_0xda59('0x87')][_0xda59('0x1a9')](SATBManager,_0xda59('0x39d')),'_coreMaxATBValNotePriorities':SATBManager[_0xda59('0x22e')][_0xda59('0x1a9')](SATBManager,'coreMax'),'_coreActStateNoteChainingRule':SATBManager['updateNoteChainingRule'][_0xda59('0x1a9')](SATBManager,_0xda59('0x11a')),'isShowATBBar':SATBManager['updateNoteDefault'][_0xda59('0x1a9')](SATBManager,_0xda59('0x3d7')),'_isBarVisibleNoteChainingRule':SATBManager[_0xda59('0x87')][_0xda59('0x1a9')](SATBManager,_0xda59('0x3d7')),'_isBarVisibleNotePriorities':SATBManager['updateNotePriorities']['bind'](SATBManager,'isBarVisible'),'forceRunATBKey':SATBManager[_0xda59('0x219')],'forceStopATBKey':SATBManager[_0xda59('0x219')],'isShowForceATBStatWin':SATBManager[_0xda59('0x219')],'noForceATBText':SATBManager[_0xda59('0x219')],'forceRunATBStatText':SATBManager[_0xda59('0x219')],'forceStopATBStatText':SATBManager[_0xda59('0x219')],'forceATBStatWinX':SATBManager[_0xda59('0x219')],'forceATBStatWinY':SATBManager[_0xda59('0x219')],'forceATBStatWinW':SATBManager['invalidateParamCache'],'forceATBStatWinH':SATBManager[_0xda59('0x219')],'forceATBStatTextSize':SATBManager[_0xda59('0x219')],'forceATBStatWinLineH':SATBManager[_0xda59('0x219')],'forceATBStatWinPadding':SATBManager[_0xda59('0x219')],'forceATBStatTextPadding':SATBManager['invalidateParamCache'],'forceATBStatBackOpacity':SATBManager[_0xda59('0x219')],'forceATBStatTextXOffset':SATBManager[_0xda59('0x219')],'forceATBStatTextYOffset':SATBManager[_0xda59('0x219')],'isShowForceATBRunCmdWin':SATBManager['invalidateParamCache'],'forceRunATBCmdText':SATBManager[_0xda59('0x219')],'forceATBRunCmdWinX':SATBManager[_0xda59('0x219')],'forceATBRunCmdWinY':SATBManager[_0xda59('0x219')],'forceATBRunCmdWinW':SATBManager['invalidateParamCache'],'forceATBRunCmdWinH':SATBManager[_0xda59('0x219')],'forceATBRunCmdTextSize':SATBManager[_0xda59('0x219')],'forceATBRunCmdWinLineH':SATBManager[_0xda59('0x219')],'forceATBRunCmdWinPadding':SATBManager[_0xda59('0x219')],'forceATBRunCmdTextPadding':SATBManager['invalidateParamCache'],'forceATBRunCmdBackOpacity':SATBManager[_0xda59('0x219')],'forceATBRunCmdTextXOffset':SATBManager[_0xda59('0x219')],'forceATBRunCmdTextYOffset':SATBManager[_0xda59('0x219')],'isShowForceATBStopCmdWin':SATBManager['invalidateParamCache'],'forceStopATBCmdText':SATBManager[_0xda59('0x219')],'forceATBStopCmdWinX':SATBManager[_0xda59('0x219')],'forceATBStopCmdWinY':SATBManager['invalidateParamCache'],'forceATBStopCmdWinW':SATBManager[_0xda59('0x219')],'forceATBStopCmdWinH':SATBManager[_0xda59('0x219')],'forceATBStopCmdTextSize':SATBManager[_0xda59('0x219')],'forceATBStopCmdWinLineH':SATBManager[_0xda59('0x219')],'forceATBStopCmdWinPadding':SATBManager[_0xda59('0x219')],'forceATBStopCmdTextPadding':SATBManager[_0xda59('0x219')],'forceATBStopCmdBackOpacity':SATBManager[_0xda59('0x219')],'forceATBStopCmdTextXOffset':SATBManager['invalidateParamCache'],'forceATBStopCmdTextYOffset':SATBManager[_0xda59('0x219')],'chargeMaxATBVal':SATBManager[_0xda59('0x27')][_0xda59('0x1a9')](SATBManager,'chargeMax'),'_chargeMaxATBValNoteChainingRule':SATBManager[_0xda59('0x87')][_0xda59('0x1a9')](SATBManager,_0xda59('0x3ec')),'_chargeMaxATBValNotePriorities':SATBManager[_0xda59('0x22e')][_0xda59('0x1a9')](SATBManager,_0xda59('0x3ec')),'isPayBeforeExecCharge':SATBManager['updateNoteDefault'][_0xda59('0x1a9')](SATBManager,_0xda59('0x105')),'_isPayBeforeExecChargeNoteChainingRule':SATBManager[_0xda59('0x87')][_0xda59('0x1a9')](SATBManager,_0xda59('0x105')),'_isPayBeforeExecChargeNotePriorities':SATBManager[_0xda59('0x22e')][_0xda59('0x1a9')](SATBManager,'isPayBeforeExecCharge'),'canCancelCharge':SATBManager[_0xda59('0x27')][_0xda59('0x1a9')](SATBManager,_0xda59('0xd2')),'_canCancelChargeNoteChainingRule':SATBManager['updateNoteChainingRule'][_0xda59('0x1a9')](SATBManager,_0xda59('0xd2')),'_canCancelChargeNotePriorities':SATBManager[_0xda59('0x22e')][_0xda59('0x1a9')](SATBManager,_0xda59('0xd2')),'canForceCharge':SATBManager[_0xda59('0x27')][_0xda59('0x1a9')](SATBManager,_0xda59('0x2df')),'_canForceChargeNoteChainingRule':SATBManager[_0xda59('0x87')][_0xda59('0x1a9')](SATBManager,_0xda59('0x2df')),'_canForceChargeNotePriorities':SATBManager[_0xda59('0x22e')][_0xda59('0x1a9')](SATBManager,_0xda59('0x2df')),'cooldownMaxATBVal':SATBManager[_0xda59('0x27')][_0xda59('0x1a9')](SATBManager,_0xda59('0xa3')),'_cooldownMaxATBValNoteChainingRule':SATBManager[_0xda59('0x87')][_0xda59('0x1a9')](SATBManager,_0xda59('0xa3')),'_cooldownMaxATBValNotePriorities':SATBManager[_0xda59('0x22e')]['bind'](SATBManager,_0xda59('0xa3')),'canCancelCooldown':SATBManager[_0xda59('0x27')][_0xda59('0x1a9')](SATBManager,_0xda59('0x30d')),'_canCancelCooldownNoteChainingRule':SATBManager[_0xda59('0x87')]['bind'](SATBManager,_0xda59('0x30d')),'_canCancelCooldownNotePriorities':SATBManager[_0xda59('0x22e')][_0xda59('0x1a9')](SATBManager,_0xda59('0x30d'))},_0x56e855[_0xda59('0x3b4')]=[_0xda59('0x13a'),_0xda59('0x360'),_0xda59('0x1b')],_0x56e855[_0xda59('0x38b')]=[_0xda59('0x1e5'),_0xda59('0x2cb'),'coreBaseFillATBSec',_0xda59('0x195'),_0xda59('0x1ad'),_0xda59('0x1fb'),'coreMaxATBVal','_coreMaxATBValNotePriorities','IsBarEnabled','isShowATBBar',_0xda59('0x2b3'),_0xda59('0x8b'),'atbBarYOffset',_0xda59('0x3a2'),_0xda59('0x10c'),_0xda59('0x189'),'atbBarLineH',_0xda59('0x117'),_0xda59('0x36'),_0xda59('0x394'),_0xda59('0x32'),'atbBarTextColor',_0xda59('0x191'),_0xda59('0x75'),_0xda59('0x127'),_0xda59('0x2c0'),_0xda59('0x3b0'),_0xda59('0x122'),'nextInputableActorKey',_0xda59('0x210'),_0xda59('0x3ba'),'isATBWaitCondMet',_0xda59('0x311'),_0xda59('0x6e'),_0xda59('0x111'),_0xda59('0xb6'),_0xda59('0x1b9'),'forceStopATBStatText',_0xda59('0x39e'),'forceATBStatWinY',_0xda59('0x285'),_0xda59('0x2ba'),_0xda59('0x52'),_0xda59('0x17a'),_0xda59('0x3d0'),_0xda59('0x158'),_0xda59('0x129'),_0xda59('0x1f0'),'forceATBStatTextYOffset',_0xda59('0x2'),_0xda59('0x2cc'),_0xda59('0x2f3'),_0xda59('0x1b8'),_0xda59('0x3a8'),_0xda59('0x354'),_0xda59('0x29b'),_0xda59('0x57'),_0xda59('0x1af'),_0xda59('0x1da'),_0xda59('0x24c'),'forceATBRunCmdTextXOffset',_0xda59('0x31b'),_0xda59('0x36d'),'forceStopATBCmdText',_0xda59('0x99'),_0xda59('0x378'),_0xda59('0x327'),_0xda59('0x38f'),'forceATBStopCmdTextSize',_0xda59('0x1d1'),_0xda59('0x269'),_0xda59('0x37d'),_0xda59('0x277'),_0xda59('0x19e'),_0xda59('0x94'),'IsChargeEnabled',_0xda59('0x20e'),_0xda59('0x3f6'),_0xda59('0x105'),'_isPayBeforeExecChargeNotePriorities','cancelChargeATBKeys',_0xda59('0x15b'),_0xda59('0xd2'),_0xda59('0x25d'),_0xda59('0x2df'),_0xda59('0x25b'),_0xda59('0x49'),_0xda59('0x181'),_0xda59('0x334'),_0xda59('0x384'),_0xda59('0x30d'),'_canCancelCooldownNotePriorities'],_0x56e855[_0xda59('0x1a4')]={'coreMaxATBVal':_0xda59('0x39d'),'isShowATBBar':_0xda59('0x3d7'),'chargeMaxATBVal':_0xda59('0x3ec'),'isPayBeforeExecCharge':_0xda59('0x105'),'canCancelCharge':_0xda59('0xd2'),'canforceCharge':_0xda59('0x11c'),'cooldownMaxATBVal':_0xda59('0xa3'),'canCancelCooldown':_0xda59('0x30d')},_0x56e855['_PARAM_MODULES']={'_isParamFuncCached':'core','_isNoteCached':_0xda59('0x113'),'_isAlwaysRecacheAllSwitchVars':_0xda59('0x113'),'IsCoreEnabled':_0xda59('0x113'),'_coreBaseFillUnit':_0xda59('0x113'),'coreBaseFillATBFrame':_0xda59('0x113'),'coreBaseFillATBSec':'core','_coreTurnUnit':_0xda59('0x113'),'coreTurnATBTime':_0xda59('0x113'),'coreTurnATBAct':_0xda59('0x113'),'canCoreTurnClockOverflow':_0xda59('0x113'),'coreMaxATBVal':_0xda59('0x113'),'_coreMaxATBValNoteChainingRule':_0xda59('0x113'),'_coreMaxATBValNotePriorities':'core','_coreActStateNoteChainingRule':_0xda59('0x113'),'IsBarEnabled':_0xda59('0x28e'),'isShowATBBar':'bar','atbBarText':_0xda59('0x28e'),'atbBarXOffset':_0xda59('0x28e'),'atbBarYOffset':_0xda59('0x28e'),'atbBarW':_0xda59('0x28e'),'atbBarH':_0xda59('0x28e'),'atbBarTextSize':_0xda59('0x28e'),'atbBarLineH':_0xda59('0x28e'),'atbBarTextPadding':'bar','atbBarBackOpacity':_0xda59('0x28e'),'atbBarTextXOffset':_0xda59('0x28e'),'atbBarTextYOffset':'bar','atbBarTextColor':_0xda59('0x28e'),'atbBarColor1':_0xda59('0x28e'),'atbBarColor2':_0xda59('0x28e'),'atbBarBackColor':_0xda59('0x28e'),'_isBarVisibleNoteChainingRule':_0xda59('0x28e'),'_isBarVisibleNotePriorities':_0xda59('0x28e'),'IsHotkeyEnabled':_0xda59('0x103'),'prevInputableActorKey':'hotkey','nextInputableActorKey':_0xda59('0x103'),'inputableActorKeys':'hotkey','IsWaitEnabled':_0xda59('0x3b5'),'isATBWaitCondMet':_0xda59('0x3b5'),'forceRunATBKey':_0xda59('0x3b5'),'forceStopATBKey':'wait','isShowForceATBStatWin':_0xda59('0x3b5'),'noForceATBText':_0xda59('0x3b5'),'forceRunATBStatText':_0xda59('0x3b5'),'forceStopATBStatText':_0xda59('0x3b5'),'forceATBStatWinX':_0xda59('0x3b5'),'forceATBStatWinY':_0xda59('0x3b5'),'forceATBStatWinW':_0xda59('0x3b5'),'forceATBStatWinH':_0xda59('0x3b5'),'forceATBStatTextSize':_0xda59('0x3b5'),'forceATBStatWinLineH':'wait','forceATBStatWinPadding':_0xda59('0x3b5'),'forceATBStatTextPadding':_0xda59('0x3b5'),'forceATBStatBackOpacity':_0xda59('0x3b5'),'forceATBStatTextXOffset':_0xda59('0x3b5'),'forceATBStatTextYOffset':_0xda59('0x3b5'),'isShowForceATBRunCmdWin':_0xda59('0x3b5'),'forceRunATBCmdText':_0xda59('0x3b5'),'forceATBRunCmdWinX':_0xda59('0x3b5'),'forceATBRunCmdWinY':_0xda59('0x3b5'),'forceATBRunCmdWinW':_0xda59('0x3b5'),'forceATBRunCmdWinH':_0xda59('0x3b5'),'forceATBRunCmdTextSize':_0xda59('0x3b5'),'forceATBRunCmdWinLineH':_0xda59('0x3b5'),'forceATBRunCmdWinPadding':_0xda59('0x3b5'),'forceATBRunCmdTextPadding':_0xda59('0x3b5'),'forceATBRunCmdBackOpacity':'wait','forceATBRunCmdTextXOffset':_0xda59('0x3b5'),'forceATBRunCmdTextYOffset':_0xda59('0x3b5'),'isShowForceATBStopCmdWin':_0xda59('0x3b5'),'forceStopATBCmdText':_0xda59('0x3b5'),'forceATBStopCmdWinX':_0xda59('0x3b5'),'forceATBStopCmdWinY':'wait','forceATBStopCmdWinW':_0xda59('0x3b5'),'forceATBStopCmdWinH':_0xda59('0x3b5'),'forceATBStopCmdTextSize':_0xda59('0x3b5'),'forceATBStopCmdWinLineH':_0xda59('0x3b5'),'forceATBStopCmdWinPadding':_0xda59('0x3b5'),'forceATBStopCmdTextPadding':_0xda59('0x3b5'),'forceATBStopCmdBackOpacity':_0xda59('0x3b5'),'forceATBStopCmdTextXOffset':_0xda59('0x3b5'),'forceATBStopCmdTextYOffset':'wait','IsChargeEnabled':'charge','chargeMaxATBVal':'charge','_chargeMaxATBValNoteChainingRule':_0xda59('0x9b'),'_chargeMaxATBValNotePriorities':_0xda59('0x9b'),'isPayBeforeExecCharge':_0xda59('0x9b'),'_isPayBeforeExecChargeNoteChainingRule':_0xda59('0x9b'),'_isPayBeforeExecChargeNotePriorities':'charge','cancelChargeATBKeys':_0xda59('0x9b'),'forceChargeATBKeys':_0xda59('0x9b'),'canCancelCharge':'charge','_canCancelChargeNoteChainingRule':_0xda59('0x9b'),'_canCancelChargeNotePriorities':_0xda59('0x9b'),'canForceCharge':_0xda59('0x9b'),'_canForceChargeNoteChainingRule':'charge','_canForceChargeNotePriorities':_0xda59('0x9b'),'IsCooldownEnabled':_0xda59('0x3c0'),'cooldownMaxATBVal':_0xda59('0x3c0'),'_cooldownMaxATBValNoteChainingRule':_0xda59('0x3c0'),'_cooldownMaxATBValNotePriorities':_0xda59('0x3c0'),'cancelCooldownATBKeys':_0xda59('0x3c0'),'canCancelCooldown':_0xda59('0x3c0'),'_canCancelCooldownNoteChainingRule':_0xda59('0x3c0'),'_canCancelCooldownNotePriorities':_0xda59('0x3c0')},_0x35a66a[_0xda59('0x3cc')]=_0x57dac9[_0xda59('0x3cc')],_0x56e855[_0xda59('0x3cc')]=_0x57dac9[_0xda59('0x3cc')]=function(){_0x35a66a[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments),this[_0xda59('0x2e2')]={'params':Object[_0xda59('0x3c9')](_0x3375f4[_0xda59('0x1ce')])[_0xda59('0x2e')](_0x56e855['_REDUCED_NOTE_CONTAINERS'],{}),'notes':Object[_0xda59('0x3c9')](_0x56e855[_0xda59('0x67')][_0xda59('0x331')])[_0xda59('0x2e')](_0x56e855[_0xda59('0x135')],{}),'switchIds':_0x51ea94[_0xda59('0x261')],'varIds':_0x51ea94[_0xda59('0x174')]};var _0x262fea=_0x56e855[_0xda59('0x232')]();Object['keys'](_0x262fea)[_0xda59('0x124')](function(_0x4f68d1){_0x56e855[_0xda59('0x227')][_0xda59('0x1e4')](this,_0x262fea,_0x4f68d1);},this),Object[_0xda59('0x3c9')](_0x3375f4[_0xda59('0x331')])[_0xda59('0x124')](_0x56e855[_0xda59('0x21d')],this);},_0x57dac9[_0xda59('0x297')]=function(){Object[_0xda59('0x3c9')](this[_0xda59('0x2e2')][_0xda59('0x1ce')])['forEach'](_0x56e855[_0xda59('0x1ca')],this),Object[_0xda59('0x3c9')](this['_satb'][_0xda59('0x331')])[_0xda59('0x124')](_0x56e855[_0xda59('0x2e6')],this);},_0x57dac9[_0xda59('0x15')]=function(){_0x51ea94[_0xda59('0x261')]=this[_0xda59('0x2e2')][_0xda59('0x261')],_0x51ea94[_0xda59('0x174')]=this[_0xda59('0x2e2')][_0xda59('0x174')];},_0x57dac9[_0xda59('0x36a')]=function(_0x151a1a){return _0x3375f4[_0xda59('0x1ce')][_0x56e855[_0xda59('0x2e3')][_0x151a1a]][_0x151a1a];},_0x57dac9[_0xda59('0x293')]=function(_0x569150){return this[_0xda59('0x2e2')][_0xda59('0x1ce')][_0x56e855[_0xda59('0x2e3')][_0x569150]][_0x569150];},_0x57dac9['setSATBParam']=function(_0x40f240,_0x16afdd,_0x32ff2b,_0x30b59f,_0x514458){this[_0xda59('0x2e2')][_0xda59('0x1ce')][_0x56e855[_0xda59('0x2e3')][_0x40f240]][_0x40f240]=_0x16afdd;_0x56e855[_0xda59('0x3fa')](_0x40f240)&&_0x56e855[_0xda59('0x24a')][_0xda59('0x1e4')](this,_0x40f240,_0x16afdd);var _0x32f7b1=_0x56e855[_0xda59('0x208')][_0x40f240];if(_0x32f7b1)_0x32f7b1['call'](this,_0x32ff2b,_0x30b59f,_0x514458);},_0x57dac9[_0xda59('0x1de')]=function(_0x134c64,_0x386b2d){return this[_0xda59('0x2e2')]['notes'][_0x134c64][_0x386b2d];},_0x57dac9[_0xda59('0x361')]=function(_0x3444dc,_0x36edf2,_0x2c63aa,_0x11642c,_0x2db104,_0x5d8fb0){this[_0xda59('0x2e2')][_0xda59('0x331')][_0x3444dc][_0x36edf2]=_0x2c63aa;var _0x3a2359=this[_0xda59('0x1de')](_0x3444dc,_0x36edf2);_0x3375f4[_0xda59('0x331')][_0x3444dc][_0x36edf2]=_0x56e855['PARAM_NOTE_FUNCS']['notes'][_0x3444dc](_0x3a2359),DataManager[_0xda59('0x1b7')](_0x2c63aa,_0x3444dc),DataManager[_0xda59('0x1e0')](_0x3444dc,_0x11642c,_0x2db104,_0x5d8fb0);},_0x56e855[_0xda59('0x227')]=function(_0x5a0d50,_0xe384af){if(!_0x56e855[_0xda59('0x3fa')](_0xe384af))return this[_0xda59('0x156')](_0xe384af,_0x5a0d50[_0xe384af]);this[_0xda59('0x156')](_0xe384af,_0x56e855[_0xda59('0x1df')][_0xda59('0x1e4')](this,_0xe384af,_0x5a0d50[_0xe384af]));},_0x56e855[_0xda59('0x1df')]=function(_0x3fde20,_0x26ae05){return _0x26ae05||_0x56e855[_0xda59('0x379')](this[_0xda59('0x36a')](_0x3fde20));},_0x56e855['_storeNoteModule']=function(_0x353ea3){Object[_0xda59('0x3c9')](_0x3375f4[_0xda59('0x331')][_0x353ea3])[_0xda59('0x124')](function(_0x43648f){var _0x14f871=_0x3375f4[_0xda59('0x331')][_0x353ea3][_0x43648f];this[_0xda59('0x2e2')][_0xda59('0x331')][_0x353ea3][_0x43648f]=_0x56e855[_0xda59('0x379')](_0x14f871),DataManager[_0xda59('0x1b7')](this[_0xda59('0x1de')](_0x353ea3,_0x43648f),_0x353ea3);},this);},[_0xda59('0x1c7'),_0xda59('0x1a8')][_0xda59('0x124')](function(_0xb36386){var _0x59324a=_0xb36386[_0xda59('0x138')]()+'s',_0x56495d='_extract'+_0xb36386+_0xda59('0x2b8');_0x56e855[_0xda59('0x9d')+_0xb36386+_0xda59('0x17f')]=function(_0x4277e2){var _0x3750db=this[_0xda59('0x2e2')][_0x59324a][_0x4277e2];Object[_0xda59('0x3c9')](_0x3750db)[_0xda59('0x124')](function(_0x44fcae){_0x56e855[_0x56495d][_0xda59('0x1e4')](this,_0x4277e2,_0x44fcae);},this);};}),_0x56e855[_0xda59('0x24a')]=function(_0x39bc3a,_0x3f2a8){_0x56e855[_0xda59('0x18a')][_0xda59('0x1e4')](this,_0x39bc3a,_0x3f2a8);var _0x2fa386=_0x56e855[_0xda59('0x2e3')][_0x39bc3a];if(!_0x56e855[_0xda59('0x3fa')](_0x39bc3a))return;var _0x3b1c72=_0x56e855[_0xda59('0x67')][_0xda59('0x1ce')][_0x39bc3a](this[_0xda59('0x293')](_0x39bc3a));_0x3375f4['params'][_0x2fa386][_0x39bc3a]=_0x3b1c72;},_0x56e855[_0xda59('0x18a')]=function(_0x248c1e,_0x4cdf74){var _0x448be9=_0x56e855[_0xda59('0x1a4')][_0x248c1e];if(!_0x448be9)return;DataManager[_0xda59('0x1b7')](_0x4cdf74,_0x448be9);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x340908){'use strict';var _0x4ff940={'Game_Switches':{'proto':Game_Switches['prototype'],'switchVarIds':_0xda59('0x261')},'Game_Variables':{'proto':Game_Variables[_0xda59('0x3f4')],'switchVarIds':_0xda59('0x174')}};Object[_0xda59('0x3c9')](_0x4ff940)[_0xda59('0x124')](function(_0x2c077f){_0x340908[_0x2c077f]={'orig':{},'new':{}};var _0x4d86be=_0x340908[_0x2c077f]['orig'],_0x523f64=_0x340908[_0x2c077f][_0xda59('0x15e')],_0x3035bd=_0x4ff940[_0x2c077f]['proto'],_0x56037d=_0x340908[_0xda59('0x212')][_0xda59('0x15e')],_0xf69f37=_0x4ff940[_0x2c077f]['switchVarIds'];_0x4d86be[_0xda59('0x3a')]=_0x3035bd[_0xda59('0x3a')];if(_0x2c077f==='Game_Switches')_0x523f64[_0xda59('0x3a')]=_0x3035bd[_0xda59('0x3a')]=function(_0x1bb561,_0x255847){_0x4d86be[_0xda59('0x3a')]['apply'](this,arguments),_0x523f64[_0xda59('0xb5')][_0xda59('0x1e4')](this,_0x1bb561);};else _0x2c077f==='Game_Variables'&&(_0x523f64[_0xda59('0x3a')]=_0x3035bd[_0xda59('0x3a')]=function(_0x50b3b1,_0x14aef3){_0x4d86be['setValue'][_0xda59('0x68')](this,arguments),_0x523f64['_raiseChangeFactors'][_0xda59('0x1e4')](this,_0x50b3b1,_0x14aef3);},_0x523f64['_raiseChangeFactors']=function(_0x7d76c7,_0x189d8e){DataManager[_0xda59('0x3a9')](_0x7d76c7,_0x189d8e),_0x523f64['_raiseMemChangeFactors']['call'](this,_0x7d76c7);});_0x523f64[_0xda59('0xb5')]=function(_0x11a4d6){SATBManager['invalidateParamCache']();if($gameSystem[_0xda59('0x293')](_0xda59('0x1b')))return SATBManager[_0xda59('0x197')]();_0x523f64[_0xda59('0x1bd')][_0xda59('0x1e4')](this,_0x11a4d6);},_0x523f64[_0xda59('0x1bd')]=function(_0x5f49c1){var _0xca8d20=_0x56037d[_0xf69f37][_0x5f49c1];SATBManager[_0xda59('0x395')](_0xca8d20);};});}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x13d078){'use strict';_0x13d078[_0xda59('0x2bf')]={'orig':{},'new':{}};var _0x1f8f4d=_0x13d078[_0xda59('0x2bf')][_0xda59('0x2d6')],_0x3f6c9e=_0x13d078[_0xda59('0x2bf')][_0xda59('0x15e')],_0x372a73=Game_BattlerBase['prototype'];_0x1f8f4d[_0xda59('0x3e0')]=_0x372a73['eraseState'],_0x3f6c9e['eraseState']=_0x372a73[_0xda59('0x3e0')]=function(_0x1e21f4){var _0x5ca8c0=this[_0xda59('0x2e8')](),_0x56ec9e=this[_0xda59('0x3f7')]();_0x1f8f4d[_0xda59('0x3e0')]['apply'](this,arguments),_0x3f6c9e[_0xda59('0x2f')][_0xda59('0x1e4')](this,_0x5ca8c0,_0x56ec9e);},_0x1f8f4d[_0xda59('0x2a0')]=_0x372a73[_0xda59('0x2a0')],_0x3f6c9e['updateStateTurns']=_0x372a73['updateStateTurns']=function(){if(SATBManager[_0xda59('0x254')]())return this[_0xda59('0x30b')](0x2);_0x1f8f4d[_0xda59('0x2a0')][_0xda59('0x68')](this,arguments);},_0x1f8f4d[_0xda59('0x250')]=_0x372a73[_0xda59('0x250')],_0x3f6c9e[_0xda59('0x250')]=_0x372a73[_0xda59('0x250')]=function(){_0x1f8f4d[_0xda59('0x250')][_0xda59('0x68')](this,arguments),BattleManager[_0xda59('0x27f')]([this]),this[_0xda59('0x2e2')][_0xda59('0x331')][_0xda59('0x237')]();if(SATBManager[_0xda59('0x254')]())_0x3f6c9e[_0xda59('0xa2')][_0xda59('0x1e4')](this);},_0x1f8f4d[_0xda59('0x7f')]=_0x372a73['hide'],_0x3f6c9e['hide']=_0x372a73[_0xda59('0x7f')]=function(){_0x1f8f4d[_0xda59('0x7f')][_0xda59('0x68')](this,arguments),this[_0xda59('0x240')]();},_0x1f8f4d[_0xda59('0x1c1')]=_0x372a73[_0xda59('0x1c1')],_0x3f6c9e[_0xda59('0x1c1')]=_0x372a73[_0xda59('0x1c1')]=function(_0x1f5b30){var _0x227490=this[_0xda59('0x2e8')](),_0x5726cd=this['isRestricted']();_0x1f8f4d[_0xda59('0x1c1')][_0xda59('0x68')](this,arguments),_0x3f6c9e['_checkIsToggleAutoInput']['call'](this,_0x227490,_0x5726cd);},_0x372a73[_0xda59('0x30b')]=function(_0x20717c){this['states']()['forEach'](function(_0x457f7b){_0x3f6c9e[_0xda59('0xfd')][_0xda59('0x1e4')](this,_0x20717c,_0x457f7b);},this);},_0x372a73[_0xda59('0x240')]=function(){this[_0xda59('0x50')](0x0),this[_0xda59('0x321')]();},_0x372a73[_0xda59('0x1ba')]=function(){if(BattleManager[_0xda59('0x1c4')]===this)return;this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0x272')]();},_0x3f6c9e[_0xda59('0xfd')]=function(_0x6f1bf2,_0x576b88){if(this[_0xda59('0x2e2')][_0xda59('0x331')]['result_'](_0xda59('0x11a'),{'state':_0x576b88}))return;var _0x247705=_0x576b88['id'];_0x576b88[_0xda59('0x13f')]===_0x6f1bf2&&this['_stateTurns'][_0x247705]>0x0&&(this[_0xda59('0x2c8')][_0x247705]-=0x1);},_0x3f6c9e[_0xda59('0xa2')]=function(){delete this['_satb'][_0xda59('0x263')],delete this['_satb'][_0xda59('0xe1')],delete this[_0xda59('0x2e2')][_0xda59('0x340')],this['_satb'][_0xda59('0xc3')][_0xda59('0x5f')]();},_0x3f6c9e[_0xda59('0x2f')]=function(_0x2f7602,_0x50a602){if(!BattleManager[_0xda59('0x1a7')]())return;_0x3f6c9e[_0xda59('0x307')][_0xda59('0x1e4')](this,_0x2f7602,_0x50a602)&&this[_0xda59('0x1ba')]();},_0x3f6c9e[_0xda59('0x307')]=function(_0x597800,_0xc7130f){if(_0x597800!==this['isAutoBattle']())return!![];return _0xc7130f!==this[_0xda59('0x3f7')]();};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x2ac1ca){'use strict';_0x2ac1ca[_0xda59('0x3f1')]={'orig':{},'new':{}};var _0x2c33d7=_0x2ac1ca[_0xda59('0x3f1')][_0xda59('0x2d6')],_0x491341=_0x2ac1ca[_0xda59('0x3f1')][_0xda59('0x15e')],_0x4b9f55=Game_Battler[_0xda59('0x3f4')],_0x419452=Game_BattlerBase[_0xda59('0x3f4')],_0x4c8e20=_0x2ac1ca[_0xda59('0x169')];_0x491341[_0xda59('0x77')]={'satbNoteResult_':_0xda59('0x2fb'),'raiseAllSATBNoteChangeFactors':_0xda59('0x142'),'raiseSATBNoteChangeFactors':_0xda59('0x25c'),'invalidateSATBNoteResult':_0xda59('0x35f'),'invalidateSATBNoteList':_0xda59('0x3a7')},_0x491341[_0xda59('0x1c3')]={'setCurSATB':_0xda59('0xc1'),'setCurSATBProportion':'setCurATBProportion','addCurSATB':_0xda59('0x170'),'addCurSATBProportion':_0xda59('0x3ca'),'multiplyCurSATB':'multiplyCurATB','fillUpCurSATB':'fillUpCurATB','setCoreSATB':_0xda59('0x28b'),'setCoreSATBProportion':_0xda59('0x32a'),'addCoreSATB':_0xda59('0x35b'),'addCoreSATBProportion':'addCoreATBProportion','multiplyCoreSATB':_0xda59('0x2c2'),'fillUpCoreSATB':'fillUpCoreATB','setChargeSATB':_0xda59('0xdc'),'setChargeSATBProportion':_0xda59('0x4f'),'addChargeSATB':_0xda59('0x3e2'),'addChargeSATBProportion':'addChargeATBProportion','multiplyChargeSATB':_0xda59('0x353'),'fillUpChargeSATB':'fillUpChargeATB','setCooldownSATB':'setCooldownATB','setCooldownSATBProportion':_0xda59('0x362'),'addCooldownSATB':_0xda59('0x343'),'addCooldownSATBProportion':'addCooldownATBProportion','multiplyCooldownSATB':_0xda59('0x380'),'fillUpCooldownSATB':_0xda59('0xe7'),'clearCoreSATB':_0xda59('0x239'),'clearChargeSATB':_0xda59('0x10f'),'curSATB':_0xda59('0x223'),'curMaxSATB':_0xda59('0x14d'),'coreSATB':_0xda59('0x7b'),'chargeSATB':_0xda59('0x12e'),'cooldownSATB':_0xda59('0x196'),'curSATBProportion':_0xda59('0x1'),'coreSATBProportion':_0xda59('0x2f9'),'chargeSATBProportion':'chargeATBProportion','cooldownSATBProportion':'cooldownATBProportion','isSATBFill':_0xda59('0x32b'),'isSATBCharge':_0xda59('0x3df'),'isSATBCooldown':_0xda59('0x3ce'),'onCancelSATBCharge':_0xda59('0xfc'),'onCancelSATBCooldown':_0xda59('0x28c'),'onStartForceSATBCharge':_0xda59('0xc7'),'onEndForceSATBCharge':_0xda59('0x271')},_0x2c33d7[_0xda59('0x3cc')]=_0x4b9f55[_0xda59('0x3cc')],_0x491341['initialize']=_0x4b9f55[_0xda59('0x3cc')]=function(_0x4978e7){this[_0xda59('0x2e2')]={'actTimes':0x0},this[_0xda59('0x314')](),_0x2c33d7[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments);},_0x2c33d7['addState']=_0x4b9f55[_0xda59('0x298')]||_0x419452[_0xda59('0x298')],_0x491341[_0xda59('0x298')]=_0x4b9f55['addState']=function(_0x5ca990){this[_0xda59('0x89')](_0x5ca990)&&!this['isStateAffected'](_0x5ca990)&&this['_satb']['notes'][_0xda59('0x133')]([_0xda59('0x398')]),_0x2c33d7[_0xda59('0x298')][_0xda59('0x68')](this,arguments);},_0x2c33d7[_0xda59('0x3e')]=_0x4b9f55[_0xda59('0x3e')]||_0x419452[_0xda59('0x3e')],_0x491341[_0xda59('0x3e')]=_0x4b9f55[_0xda59('0x3e')]=function(_0x52fd5c){this[_0xda59('0x10e')](_0x52fd5c)&&this['_satb'][_0xda59('0x331')][_0xda59('0x133')]([_0xda59('0x398')]),_0x2c33d7[_0xda59('0x3e')][_0xda59('0x68')](this,arguments);},_0x2c33d7['clearActions']=_0x4b9f55[_0xda59('0x121')],_0x491341[_0xda59('0x121')]=_0x4b9f55[_0xda59('0x121')]=function(){_0x2c33d7[_0xda59('0x121')][_0xda59('0x68')](this,arguments),this[_0xda59('0x2fc')]();},_0x2c33d7[_0xda59('0x20')]=_0x4b9f55[_0xda59('0x20')],_0x491341[_0xda59('0x20')]=_0x4b9f55['onRestrict']=function(){_0x2c33d7[_0xda59('0x20')][_0xda59('0x68')](this,arguments);if(BattleManager[_0xda59('0x1c4')]===this)return;if(!this[_0xda59('0x2c5')]())return this['eraseCoreSATBActs']();},_0x2c33d7[_0xda59('0xc0')]=_0x4b9f55[_0xda59('0xc0')],_0x491341[_0xda59('0xc0')]=_0x4b9f55[_0xda59('0xc0')]=function(){if(SATBManager['isEnabled']())return 0x1;return _0x2c33d7[_0xda59('0xc0')][_0xda59('0x68')](this,arguments);},_0x2c33d7[_0xda59('0x1f7')]=_0x4b9f55[_0xda59('0x1f7')],_0x491341[_0xda59('0x1f7')]=_0x4b9f55[_0xda59('0x1f7')]=function(){_0x2c33d7[_0xda59('0x1f7')][_0xda59('0x68')](this,arguments);if(this[_0xda59('0x194')]())return;this[_0xda59('0x50')](_0x2c33d7[_0xda59('0xc0')][_0xda59('0x68')](this,arguments));},_0x2c33d7[_0xda59('0x2ce')]=_0x4b9f55[_0xda59('0x2ce')],_0x491341[_0xda59('0x2ce')]=_0x4b9f55[_0xda59('0x2ce')]=function(_0x23f300){if(_0x491341[_0xda59('0x400')][_0xda59('0x1e4')](this))return;_0x2c33d7[_0xda59('0x2ce')][_0xda59('0x68')](this,arguments);},_0x2c33d7[_0xda59('0x199')]=_0x4b9f55[_0xda59('0x199')],_0x491341[_0xda59('0x199')]=_0x4b9f55[_0xda59('0x199')]=function(){this['onAllSATBActsEnd'](this),_0x2c33d7['onAllActionsEnd']['apply'](this,arguments);},_0x2c33d7[_0xda59('0x95')]=_0x4b9f55['onTurnEnd'],_0x491341[_0xda59('0x95')]=_0x4b9f55[_0xda59('0x95')]=function(){_0x2c33d7[_0xda59('0x95')][_0xda59('0x68')](this,arguments);if(SATBManager[_0xda59('0x254')]())this['removeBuffsAuto']();},_0x2c33d7[_0xda59('0x22f')]=_0x4b9f55[_0xda59('0x22f')],_0x491341[_0xda59('0x22f')]=_0x4b9f55[_0xda59('0x22f')]=function(){_0x2c33d7[_0xda59('0x22f')][_0xda59('0x68')](this,arguments),this['clearCoreSATBActs']();},_0x4b9f55[_0xda59('0xf9')]=function(){this[_0xda59('0x3ab')]();},_0x4b9f55[_0xda59('0x244')]=function(){this[_0xda59('0x3ab')]();},Object[_0xda59('0x3c9')](_0x491341[_0xda59('0x77')])[_0xda59('0x124')](function(_0x16312e){var _0x331788=_0x491341[_0xda59('0x77')][_0x16312e];_0x4b9f55[_0x16312e]=function(){return this[_0xda59('0x2e2')]['notes'][_0x331788][_0xda59('0x68')](this['_satb'][_0xda59('0x331')],arguments);};}),Object[_0xda59('0x3c9')](_0x491341[_0xda59('0x1c3')])[_0xda59('0x124')](function(_0x42f65f){var _0x56455d=_0x491341[_0xda59('0x1c3')][_0x42f65f];_0x4b9f55[_0x42f65f]=function(){return this[_0xda59('0x2e2')][_0xda59('0xc3')][_0x56455d]['apply'](this[_0xda59('0x2e2')][_0xda59('0xc3')],arguments);};}),_0x4b9f55[_0xda59('0x33f')]=function(){return this[_0xda59('0x3f9')](_0xda59('0x39d'));},_0x4b9f55[_0xda59('0x23e')]=function(){return this[_0xda59('0x3f9')]('chargeMax');},_0x4b9f55[_0xda59('0xd0')]=function(){return this[_0xda59('0x3f9')](_0xda59('0xa3'));},_0x4b9f55[_0xda59('0x3c1')]=function(){return this[_0xda59('0x3f9')](_0xda59('0xd2'));},_0x4b9f55[_0xda59('0x275')]=function(){return this[_0xda59('0x3f9')](_0xda59('0x30d'));},_0x4b9f55['canForceChargeSATB']=function(){return this[_0xda59('0x3f9')](_0xda59('0x2df'));},_0x4b9f55['baseCoreMaxSATB']=function(){return SATBManager['funcParam'][_0xda59('0x1e4')](this['_satb'],_0xda59('0x3ef'),_0xda59('0x263'),this);},_0x4b9f55[_0xda59('0x126')]=function(){if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return $gameSystem[_0xda59('0x36a')](_0xda59('0x20e'))['call'](this,this['coreMaxSATB']());else!_0x4c8e20[_0xda59('0x222')](this[_0xda59('0x2e2')]['cachedBaseChargeMax_'])&&(this['_satb'][_0xda59('0xe1')]=$gameSystem[_0xda59('0x36a')]('chargeMaxATBVal')['call'](this,this[_0xda59('0x33f')]()));return this[_0xda59('0x2e2')]['cachedBaseChargeMax_'];},_0x4b9f55[_0xda59('0x218')]=function(){if(!$gameSystem['satbParam'](_0xda59('0x13a')))return $gameSystem[_0xda59('0x36a')](_0xda59('0x181'))[_0xda59('0x1e4')](this,this['coreMaxSATB']());else!_0x4c8e20[_0xda59('0x222')](this[_0xda59('0x2e2')]['cachedBaseCooldownMax_'])&&(this['_satb'][_0xda59('0x340')]=$gameSystem[_0xda59('0x36a')](_0xda59('0x181'))[_0xda59('0x1e4')](this,this[_0xda59('0x33f')]()));return this[_0xda59('0x2e2')][_0xda59('0x340')];},_0x4b9f55[_0xda59('0x2bb')]=function(){return this[_0xda59('0x2e2')][_0xda59('0x225')];},_0x4b9f55['canMakeSATBCmds']=function(){return this[_0xda59('0x2bb')]()>0x0;},_0x4b9f55[_0xda59('0x12c')]=function(){return _0x491341[_0xda59('0x367')][_0xda59('0x1e4')](this,[_0xda59('0x66')],[_0xda59('0x3ec'),_0xda59('0x105'),_0xda59('0xd2'),_0xda59('0x2df')]);},_0x4b9f55[_0xda59('0x28f')]=function(){return _0x491341[_0xda59('0x367')][_0xda59('0x1e4')](this,[_0xda59('0x49')],[_0xda59('0xa3'),_0xda59('0x30d')]);},_0x4b9f55[_0xda59('0x13')]=function(_0x391315){Object[_0xda59('0x3c9')](_0x391315)[_0xda59('0x124')](function(_0x2801a0){this[_0xda59('0x2e2')][_0xda59('0x331')][_0xda59('0x12')](_0x2801a0,_0x391315[_0x2801a0]);},this),this['refresh']();},_0x4b9f55[_0xda59('0x314')]=function(){this[_0xda59('0x2e2')][_0xda59('0x331')]=new Game_SATBNotes(this),this[_0xda59('0x2e2')][_0xda59('0xc3')]=new Game_SATBPhaseTypes(this);},_0x4b9f55[_0xda59('0x2e0')]=function(){[_0xda59('0x331'),_0xda59('0xc3')][_0xda59('0x124')](_0x491341['_clearSATBHelper'],this);},_0x4b9f55[_0xda59('0x3ab')]=function(){this[_0xda59('0x2ac')](0x0);},_0x4b9f55[_0xda59('0x29f')]=function(_0x5bb38b){this[_0xda59('0x2ac')](this[_0xda59('0x2c5')]()?_0x5bb38b:0x0);},_0x4b9f55['fillSATB']=function(_0x18f418){if(this[_0xda59('0x2c5')]())return this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0x153')](_0x18f418);this[_0xda59('0x2e2')][_0xda59('0xc3')]['checkUpdatedMaxes']();},_0x4b9f55[_0xda59('0x3dd')]=function(){this[_0xda59('0x398')]()[_0xda59('0x124')](_0x491341['_updateActStateTurn'],this),this[_0xda59('0x29')]=_0x491341[_0xda59('0x86')][_0xda59('0x1e4')](this),_0x491341[_0xda59('0x400')]['call'](this)&&_0x2c33d7[_0xda59('0x2ce')][_0xda59('0x1e4')](this,this[_0xda59('0x29')][_0xda59('0x3c7')]),this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0xc9')](),this['refresh']();},_0x4b9f55[_0xda59('0x3e1')]=function(){BattleManager[_0xda59('0xbb')](this);},_0x4b9f55[_0xda59('0x2fc')]=function(){if(this[_0xda59('0x2e2')]['isBecomeNotActable'])return;this[_0xda59('0x2e2')]['isBecomeNotActable']=!![],BattleManager[_0xda59('0x16d')](this),this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0x47')](),this[_0xda59('0x250')](),this[_0xda59('0x2e2')]['isBecomeNotActable']=![];},_0x4b9f55[_0xda59('0xb9')]=function(){if(!SATBManager[_0xda59('0x254')]())return;this['updateSATBStateTurns'](0x1),this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0x167')](),this[_0xda59('0x7c')](),this[_0xda59('0x250')]();},_0x4b9f55[_0xda59('0x7c')]=function(){if(!SATBManager[_0xda59('0x254')]())return;this['addSATBActTimes'](-0x1);if(!this[_0xda59('0x194')]())return this[_0xda59('0x321')]();this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0x272')]();},_0x4b9f55[_0xda59('0x45')]=function(){this[_0xda59('0x50')](0x0),this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0x3cc')](this),this[_0xda59('0x250')]();},_0x4b9f55[_0xda59('0x2ac')]=function(_0xf1b960){this[_0xda59('0x50')](0x0),this[_0xda59('0x386')](_0xf1b960);},_0x4b9f55[_0xda59('0xc6')]=function(_0x3c79bf){this['setSATBActTimes'](this[_0xda59('0x2bb')]()+_0x3c79bf);},_0x4b9f55[_0xda59('0x65')]=function(_0x47e108){this['setSATBActTimes'](this[_0xda59('0x2bb')]()*_0x47e108);},_0x4b9f55[_0xda59('0x50')]=function(_0x312304){var _0x3fcee4=this['satbActTimes']();this[_0xda59('0x2e2')][_0xda59('0x225')]=Math[_0xda59('0x10d')](_0x312304,0x0);var _0x2f47bb=_0x3fcee4>0x0,_0x230b0c=_0x312304>0x0;if(!_0x2f47bb&&_0x230b0c)return this[_0xda59('0x23')]();if(!_0x2f47bb||_0x230b0c)return;this[_0xda59('0x2e2')]['phaseTypes']['addSmallestCoreSATBDecrement']();},_0x4b9f55[_0xda59('0x204')]=function(){this[_0xda59('0x2e2')][_0xda59('0xc3')][_0xda59('0xa8')](),delete this[_0xda59('0x29')],this[_0xda59('0x250')]();},_0x491341[_0xda59('0xea')]=function(_0x27ef9c){this['_satb'][_0x27ef9c][_0xda59('0xf2')](),delete this['_satb'][_0x27ef9c];},_0x491341[_0xda59('0x1fa')]=function(_0x2b364a){if(!this[_0xda59('0x2e2')][_0xda59('0x331')]['result_'](_0xda59('0x11a'),{'state':_0x2b364a}))return;var _0x2ef06b=_0x2b364a['id'];if(this[_0xda59('0x2c8')][_0x2ef06b]>0x0)return this[_0xda59('0x2c8')][_0x2ef06b]-=0x1;this[_0xda59('0x3e')](_0x2ef06b);},_0x491341[_0xda59('0x86')]=function(){var _0x30c7ef=this[_0xda59('0x319')]();if(!_0x30c7ef)return undefined;var _0x4767ee=_0x30c7ef['item']();return _0x4767ee?{'speed':_0x4767ee[_0xda59('0x387')],'item':_0x4767ee}:undefined;},_0x491341[_0xda59('0x400')]=function(){return _0x491341[_0xda59('0x367')][_0xda59('0x1e4')](this,[_0xda59('0x66')],[_0xda59('0x105')]);},_0x491341['_isItemNote']=function(_0x321160,_0x100c37){if(!SATBManager[_0xda59('0x252')](_0x321160))return![];if(!this[_0xda59('0x29')])return![];return this[_0xda59('0x2e2')][_0xda59('0x331')][_0xda59('0xb3')](_0x100c37,this[_0xda59('0x29')][_0xda59('0x3c7')]);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x2658e4){'use strict';_0x2658e4[_0xda59('0x104')]={'orig':{},'new':{}};var _0x561dd0=_0x2658e4[_0xda59('0x104')][_0xda59('0x2d6')],_0x3043c3=_0x2658e4[_0xda59('0x104')][_0xda59('0x15e')],_0x524343=Game_Actor[_0xda59('0x3f4')],_0x18980b=Game_Battler[_0xda59('0x3f4')];_0x561dd0[_0xda59('0xe2')]=_0x524343[_0xda59('0xe2')],_0x3043c3[_0xda59('0xe2')]=_0x524343[_0xda59('0xe2')]=function(){_0x561dd0['setup'][_0xda59('0x68')](this,arguments),this[_0xda59('0x2e2')][_0xda59('0x331')]['markChangeFactors']([_0xda59('0x151'),_0xda59('0x19a')]),this['refresh']();},[_0xda59('0x20a'),_0xda59('0x1d6')][_0xda59('0x124')](function(_0x212948){_0x561dd0[_0x212948]=_0x524343[_0x212948],_0x3043c3[_0x212948]=_0x524343[_0x212948]=function(){this[_0xda59('0x2e2')]['notes']['markChangeFactors']([_0xda59('0x0'),_0xda59('0x32e')]),_0x561dd0[_0x212948][_0xda59('0x68')](this,arguments);};}),_0x561dd0['changeEquip']=_0x524343['changeEquip'],_0x3043c3['changeEquip']=_0x524343['changeEquip']=function(_0x1578a2,_0x2a7060){this[_0xda59('0x33e')](_0x2a7060,this[_0xda59('0x131')]()[_0x1578a2])&&(!_0x2a7060||this[_0xda59('0x243')]()[_0x1578a2]===_0x2a7060[_0xda59('0x193')])&&this[_0xda59('0x2e2')]['notes'][_0xda59('0x133')]([_0xda59('0x0'),_0xda59('0x32e')]),_0x561dd0['changeEquip'][_0xda59('0x68')](this,arguments);},_0x561dd0['changeClass']=_0x524343[_0xda59('0x2c')],_0x3043c3[_0xda59('0x2c')]=_0x524343['changeClass']=function(_0x551c28,_0x4eb7ac){this[_0xda59('0x2e2')][_0xda59('0x331')][_0xda59('0x133')]([_0xda59('0x19a')]),_0x561dd0[_0xda59('0x2c')]['apply'](this,arguments);},['makeAutoBattleActions',_0xda59('0x74')][_0xda59('0x124')](function(_0x54b977){_0x561dd0[_0x54b977]=_0x524343[_0x54b977],_0x3043c3[_0x54b977]=_0x524343[_0x54b977]=function(){_0x561dd0[_0x54b977][_0xda59('0x68')](this,arguments),this[_0xda59('0x3dd')]();};}),_0x561dd0['makeActions']=_0x524343[_0xda59('0x1f7')],_0x3043c3[_0xda59('0x1f7')]=_0x524343[_0xda59('0x1f7')]=function(){_0x561dd0['makeActions'][_0xda59('0x68')](this,arguments),$gameParty[_0xda59('0x3c3')](this);},_0x561dd0[_0xda59('0x121')]=_0x524343[_0xda59('0x121')],_0x3043c3[_0xda59('0x121')]=_0x524343[_0xda59('0x121')]=function(){_0x561dd0['clearActions'][_0xda59('0x68')](this,arguments),$gameParty[_0xda59('0x2a9')](this);},_0x524343[_0xda59('0xf9')]=function(){this[_0xda59('0x29f')](this['coreMaxSATB']());},_0x524343[_0xda59('0x3dd')]=function(){$gameParty[_0xda59('0x2a9')](this),_0x18980b['didSATBInput'][_0xda59('0x1e4')](this);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x431c79){'use strict';_0x431c79[_0xda59('0xb1')]={'orig':{},'new':{}};var _0x350b44=_0x431c79[_0xda59('0xb1')]['orig'],_0x4ed609=_0x431c79['Game_Enemy'][_0xda59('0x15e')],_0x701798=Game_Enemy['prototype'];[_0xda59('0xe2'),_0xda59('0x4c')][_0xda59('0x124')](function(_0x530668){_0x350b44[_0x530668]=_0x701798[_0x530668],_0x4ed609[_0x530668]=_0x701798[_0x530668]=function(){_0x350b44[_0x530668][_0xda59('0x68')](this,arguments),_0x4ed609['_'+_0x530668][_0xda59('0x1e4')](this);};}),_0x350b44[_0xda59('0x1f7')]=_0x701798[_0xda59('0x1f7')],_0x4ed609[_0xda59('0x1f7')]=_0x701798[_0xda59('0x1f7')]=function(){_0x350b44[_0xda59('0x1f7')]['apply'](this,arguments),this[_0xda59('0x3dd')]();},_0x701798[_0xda59('0x244')]=function(){this[_0xda59('0x29f')](this[_0xda59('0x33f')]());},[_0xda59('0x365'),_0xda59('0xac')][_0xda59('0x124')](function(_0x5965dd){_0x4ed609[_0x5965dd]=function(){this[_0xda59('0x2e2')][_0xda59('0x331')][_0xda59('0x133')]([_0xda59('0x317')]),this[_0xda59('0x250')]();};});}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x37b880){'use strict';var _0x41ded6=Game_SATBPhaseTypes[_0xda59('0x3f4')],_0x1aa864=_0x37b880[_0xda59('0x21c')]={};_0x1aa864[_0xda59('0x2fa')]=function(){return _0x1aa864[_0xda59('0x188')]['reduce'](_0x1aa864[_0xda59('0x347')],{});},_0x1aa864[_0xda59('0x347')]=function(_0x4b9392,_0x59180b){return _0x4b9392[_0x59180b]=0x0,_0x4b9392;},(_0x1aa864[_0xda59('0xe6')]=_0xda59('0x396'),_0x1aa864[_0xda59('0x4a')]=_0xda59('0x383')),_0x1aa864[_0xda59('0x80')]=_0xda59('0xf8'),(_0x1aa864[_0xda59('0xb2')]=_0xda59('0x9b'),_0x1aa864[_0xda59('0x253')]=_0xda59('0x3c0')),_0x1aa864['_PHASES']=[_0x1aa864[_0xda59('0x80')],_0x1aa864[_0xda59('0xb2')],_0x1aa864[_0xda59('0x253')]],_0x1aa864[_0xda59('0xef')]=Math['pow'](0x2,-0x20),_0x41ded6[_0xda59('0x3cc')]=function(_0x1624d0){this[_0xda59('0x34c')]=_0x1624d0,this['_phase']=_0x1aa864[_0xda59('0x80')],(this['_atbs']=_0x1aa864['_ATBS'](),this['_lastATBs']=_0x1aa864[_0xda59('0x2fa')]()),(this[_0xda59('0x22a')]=0x0,this[_0xda59('0x15f')]={}),this[_0xda59('0x15f')][_0x1aa864[_0xda59('0x80')]]=_0x1624d0[_0xda59('0x33f')](),this[_0xda59('0x15f')][_0x1aa864['_PHASE_CHARGE']]=_0x1624d0[_0xda59('0x23e')](),this[_0xda59('0x15f')][_0x1aa864[_0xda59('0x253')]]=_0x1624d0[_0xda59('0xd0')](),delete _0x1624d0[_0xda59('0x29')];},_0x41ded6[_0xda59('0xf2')]=function(){delete this[_0xda59('0x34c')];},_0x41ded6['curATB']=function(){switch(this[_0xda59('0x385')]){case _0x1aa864[_0xda59('0x80')]:return this[_0xda59('0x7b')]();case _0x1aa864[_0xda59('0xb2')]:return this[_0xda59('0x12e')]();case _0x1aa864[_0xda59('0x253')]:return this[_0xda59('0x196')]();}},_0x41ded6[_0xda59('0x7b')]=function(){return this[_0xda59('0x10')][_0x1aa864[_0xda59('0x80')]];},_0x41ded6[_0xda59('0x12e')]=function(){if(!this[_0xda59('0x306')])return this[_0xda59('0x10')][_0x1aa864['_PHASE_CHARGE']];var _0x1efdf0=Math[_0xda59('0x10d')](this['_forcedChargeBeyondMax'],0x0);return this[_0xda59('0x10')][_0x1aa864['_PHASE_CHARGE']]+_0x1efdf0;},_0x41ded6['cooldownATB']=function(){var _0x28d199=this['_battler']['cooldownMaxSATB']();return _0x28d199-this[_0xda59('0x10')][_0x1aa864[_0xda59('0x253')]];},_0x41ded6[_0xda59('0x14d')]=function(){return this['_maxATB'](this[_0xda59('0x385')]);},_0x41ded6[_0xda59('0x1')]=function(){return this[_0xda59('0x223')]()*0x1/this[_0xda59('0x14d')]();},_0x41ded6[_0xda59('0x2f9')]=function(){return this[_0xda59('0x7b')]()*0x1/this[_0xda59('0x34c')]['coreMaxSATB']();},_0x41ded6['chargeATBProportion']=function(){return this[_0xda59('0x12e')]()*0x1/this[_0xda59('0x34c')][_0xda59('0x23e')]();},_0x41ded6[_0xda59('0x1ac')]=function(){return this['cooldownATB']()*0x1/this['_battler'][_0xda59('0xd0')]();},_0x41ded6[_0xda59('0x32b')]=function(){return this[_0xda59('0x385')]===_0x1aa864['_PHASE_NORM'];},_0x41ded6[_0xda59('0x3df')]=function(){return this[_0xda59('0x385')]===_0x1aa864[_0xda59('0xb2')];},_0x41ded6[_0xda59('0x3ce')]=function(){return this[_0xda59('0x385')]===_0x1aa864[_0xda59('0x253')];},_0x41ded6[_0xda59('0x3ca')]=function(_0x20781c){this['addCurATB'](_0x20781c*this[_0xda59('0x14d')]());},_0x41ded6[_0xda59('0x170')]=function(_0x2270ae){this['setCurATB'](this['curATB']()+_0x2270ae);},_0x41ded6[_0xda59('0x333')]=function(_0x370589){this[_0xda59('0xc1')](this[_0xda59('0x223')]()*_0x370589);},_0x41ded6[_0xda59('0x303')]=function(){this[_0xda59('0xc1')](this[_0xda59('0x14d')]());},_0x41ded6[_0xda59('0x304')]=function(_0x2885f9){this[_0xda59('0xc1')](_0x2885f9*this[_0xda59('0x14d')]());},_0x41ded6[_0xda59('0x18e')]=function(_0x4f1852){this['addCoreATB'](_0x4f1852*this[_0xda59('0x34c')][_0xda59('0x33f')]());},_0x41ded6[_0xda59('0x35b')]=function(_0x4f92e2){this[_0xda59('0x28b')](this[_0xda59('0x7b')]()+_0x4f92e2);},_0x41ded6[_0xda59('0x2c2')]=function(_0x2a67fe){this[_0xda59('0x28b')](this[_0xda59('0x7b')]()*_0x2a67fe);},_0x41ded6[_0xda59('0x134')]=function(){this[_0xda59('0x28b')](this[_0xda59('0x34c')]['coreMaxSATB']());},_0x41ded6['setCoreATBProportion']=function(_0xb96db1){this[_0xda59('0x28b')](_0xb96db1*this[_0xda59('0x34c')][_0xda59('0x33f')]());},_0x41ded6[_0xda59('0x2c1')]=function(_0x41c703){this[_0xda59('0x3e2')](_0x41c703*this[_0xda59('0x34c')]['chargeMaxSATB']());},_0x41ded6[_0xda59('0x3e2')]=function(_0x5a1163){this[_0xda59('0xdc')](this[_0xda59('0x12e')]()+_0x5a1163);},_0x41ded6[_0xda59('0x353')]=function(_0x2e43bd){this[_0xda59('0xdc')](this[_0xda59('0x12e')]()*_0x2e43bd);},_0x41ded6[_0xda59('0x2c6')]=function(){this[_0xda59('0xdc')](this[_0xda59('0x34c')][_0xda59('0x23e')]());},_0x41ded6[_0xda59('0x4f')]=function(_0x5beb01){this[_0xda59('0xdc')](_0x5beb01*this['_battler']['chargeMaxSATB']());},_0x41ded6['addCooldownATBProportion']=function(_0xf17672){this[_0xda59('0x343')](_0xf17672*this['_battler'][_0xda59('0xd0')]());},_0x41ded6[_0xda59('0x343')]=function(_0x2c5212){this['setCooldownATB'](this[_0xda59('0x196')]()+_0x2c5212);},_0x41ded6[_0xda59('0x380')]=function(_0x40169f){this[_0xda59('0x48')](this['cooldownATB']()*_0x40169f);},_0x41ded6['fillUpCooldownATB']=function(){this[_0xda59('0x48')](this[_0xda59('0x34c')]['cooldownMaxSATB']());},_0x41ded6['setCooldownATBProportion']=function(_0x2d1210){this[_0xda59('0x48')](_0x2d1210*this['_battler'][_0xda59('0xd0')]());},_0x41ded6['clearCoreATB']=function(){if(this[_0xda59('0x7b')]()>0x0)this[_0xda59('0x28b')](0x0);},_0x41ded6[_0xda59('0x10f')]=function(){this['addSmallestCoreSATBDecrement']();},_0x41ded6[_0xda59('0xc1')]=function(_0x57c042){switch(this[_0xda59('0x385')]){case _0x1aa864[_0xda59('0x80')]:return this[_0xda59('0x28b')](_0x57c042);case _0x1aa864[_0xda59('0xb2')]:return this[_0xda59('0xdc')](_0x57c042);case _0x1aa864[_0xda59('0x253')]:return this[_0xda59('0x48')](_0x57c042);}},_0x41ded6[_0xda59('0x28b')]=function(_0x93e156){this[_0xda59('0x88')](_0x93e156,_0x1aa864['_PHASE_NORM']);},_0x41ded6[_0xda59('0xdc')]=function(_0x12e88d){if(!this[_0xda59('0x34c')][_0xda59('0x29')]||!this[_0xda59('0x3df')]())return;if(_0x12e88d<0x0)return this[_0xda59('0x10f')]();this[_0xda59('0x88')](_0x12e88d,_0x1aa864[_0xda59('0xb2')]);if(this[_0xda59('0x306')]!==_0x1aa864[_0xda59('0xe6')])return;this[_0xda59('0x22a')]=_0x12e88d-this['_battler'][_0xda59('0x23e')]();},_0x41ded6[_0xda59('0x48')]=function(_0x1b96ba){if(!this[_0xda59('0x34c')][_0xda59('0x29')]||!this['isCooldown']())return;var _0x17ba62=this[_0xda59('0x34c')][_0xda59('0xd0')]()-_0x1b96ba;this[_0xda59('0x88')](_0x17ba62,_0x1aa864['_PHASE_COOLDOWN']);},_0x41ded6[_0xda59('0x153')]=function(_0x299bff){switch(this[_0xda59('0x385')]){case _0x1aa864[_0xda59('0x80')]:return this[_0xda59('0x3f3')](_0x299bff);case _0x1aa864[_0xda59('0xb2')]:return this[_0xda59('0x3bd')](_0x299bff);case _0x1aa864[_0xda59('0x253')]:return this[_0xda59('0x1c')](_0x299bff);}},_0x41ded6[_0xda59('0x272')]=function(){var _0x220a61=Math['min'](this[_0xda59('0x34c')][_0xda59('0x33f')](),0x1);this[_0xda59('0x35b')](-_0x1aa864[_0xda59('0xef')]*_0x220a61);},_0x41ded6[_0xda59('0x5f')]=function(){this[_0xda59('0x6')](this['coreATB'](),_0x1aa864['_PHASE_NORM'],this[_0xda59('0x34c')][_0xda59('0x33f')]());if(this['isFill']())return;var _0xa1df86=this['_phase'];this['_checkUpdatedMax'](this[_0xda59('0x10')][_0xa1df86],_0xa1df86,this[_0xda59('0x34c')][_0xda59('0x8d')]());},_0x41ded6[_0xda59('0xc9')]=function(){if(!this['isFill']())return;this['_phase']=_0x1aa864[_0xda59('0xb2')],this['_resetForceChargeStates'](),this[_0xda59('0xdc')](0x0);},_0x41ded6[_0xda59('0x47')]=function(){this['setChargeATB'](this['_lastATBs'][_0x1aa864[_0xda59('0xb2')]]=0x0),this['_resetForceChargeStates']();if(this[_0xda59('0x3df')]())this['_battler'][_0xda59('0x204')]();},_0x41ded6['onCancelCharge']=function(){if(!SATBManager['areModulesEnabled']([_0xda59('0x66')]))return;if(!this[_0xda59('0x3df')]()||!this[_0xda59('0x34c')][_0xda59('0x3c1')]())return;this['clearChargeATB']();},_0x41ded6[_0xda59('0xc7')]=function(){if(!SATBManager[_0xda59('0x252')]([_0xda59('0x66')]))return;if(!this[_0xda59('0x3df')]()||!this[_0xda59('0x34c')][_0xda59('0x262')]())return;SoundManager[_0xda59('0x1eb')](),this[_0xda59('0x22a')]=0x0,this['_forceChargeState']=_0x1aa864[_0xda59('0xe6')];},_0x41ded6['onEndForceCharge']=function(){if(!SATBManager[_0xda59('0x252')](['IsChargeEnabled']))return;if(!this[_0xda59('0x3df')]())return;if(this[_0xda59('0x306')]!==_0x1aa864['_FORCE_CHARGE'])return;SoundManager[_0xda59('0x1eb')](),this[_0xda59('0x34c')][_0xda59('0x262')]()?this[_0xda59('0x306')]=_0x1aa864[_0xda59('0x4a')]:this[_0xda59('0x306')]='',this['_battler'][_0xda59('0x3e1')]();},_0x41ded6[_0xda59('0x167')]=function(){if(!this[_0xda59('0x3df')]())return;this['_phase']=_0x1aa864[_0xda59('0x253')],this[_0xda59('0x48')](this[_0xda59('0x34c')][_0xda59('0xd0')]());},_0x41ded6[_0xda59('0x28c')]=function(){if(!SATBManager['areModulesEnabled']([_0xda59('0x49')]))return;this[_0xda59('0x3ce')]()&&this[_0xda59('0x34c')][_0xda59('0x275')]()&&this[_0xda59('0x284')]();},_0x41ded6[_0xda59('0xa8')]=function(){this[_0xda59('0x385')]=_0x1aa864[_0xda59('0x80')];},_0x41ded6[_0xda59('0x3f3')]=function(_0x4b9d79){this[_0xda59('0x35b')](this[_0xda59('0x81')](_0x4b9d79));},_0x41ded6[_0xda59('0x3bd')]=function(_0x16af15){if(!this[_0xda59('0x34c')][_0xda59('0x12c')]())return this[_0xda59('0x2c6')]();if(this[_0xda59('0x306')]===_0x1aa864[_0xda59('0x4a')])return;this[_0xda59('0x3e2')](this[_0xda59('0x81')](_0x16af15));},_0x41ded6[_0xda59('0x1c')]=function(_0x3b81e6){if(!this['_battler'][_0xda59('0x28f')]())return this[_0xda59('0x48')](0x0);this[_0xda59('0x343')](-this[_0xda59('0x81')](_0x3b81e6));},_0x41ded6[_0xda59('0x81')]=function(_0x228d7c){return _0x228d7c*this[_0xda59('0x34c')][_0xda59('0xe4')]();},_0x41ded6[_0xda59('0x88')]=function(_0x5a4644,_0x2e9a49){var _0x16ce45=this[_0xda59('0x15f')][_0x2e9a49]||this['_maxATB'](_0x2e9a49);if(this[_0xda59('0xd5')](_0x5a4644,_0x2e9a49,_0x16ce45))return;this['_atbs'][_0x2e9a49]=Math['min'](_0x5a4644,_0x16ce45),this[_0xda59('0x6')](_0x5a4644,_0x2e9a49,_0x16ce45),this[_0xda59('0x313')][_0x2e9a49]=this[_0xda59('0x10')][_0x2e9a49];},_0x41ded6[_0xda59('0xd5')]=function(_0x215487,_0x258887,_0xe642e5){if(_0x215487<_0xe642e5)return![];return this[_0xda59('0x10')][_0x258887]===_0xe642e5&&this[_0xda59('0x313')][_0x258887]===_0xe642e5;},_0x41ded6[_0xda59('0x382')]=function(_0x1d448f){switch(_0x1d448f){case _0x1aa864[_0xda59('0x80')]:return this[_0xda59('0x34c')][_0xda59('0x33f')]();case _0x1aa864[_0xda59('0xb2')]:return this[_0xda59('0x34c')][_0xda59('0x23e')]();case _0x1aa864['_PHASE_COOLDOWN']:return this[_0xda59('0x34c')][_0xda59('0xd0')]();default:throw new Error(_0x1d448f+_0xda59('0x3ed'));}},_0x41ded6[_0xda59('0x6')]=function(_0x377f95,_0x34092d,_0x3a603e){this[_0xda59('0xf1')](_0x377f95,_0x34092d,_0x3a603e),this[_0xda59('0x15f')][_0x34092d]=_0x3a603e,BattleManager[_0xda59('0x1be')]([this['_battler']]);},_0x41ded6[_0xda59('0xf1')]=function(_0x2d64b8,_0x14b897,_0x28d042){var _0x4c58ed=_0x28d042<=_0x2d64b8,_0x3adf84=this[_0xda59('0x15f')][_0x14b897]<=this['_lastATBs'][_0x14b897];if(!_0x3adf84&&_0x4c58ed)return this[_0xda59('0x1ab')](_0x14b897,_0x28d042);if(_0x3adf84&&!_0x4c58ed)this['_onATBBecomeNotFull'](_0x14b897);},_0x41ded6[_0xda59('0x1ab')]=function(_0x5768f7,_0x4ffa54){this[_0xda59('0x313')][_0x5768f7]=this[_0xda59('0x10')][_0x5768f7]=_0x4ffa54;switch(_0x5768f7){case _0x1aa864[_0xda59('0x80')]:return this[_0xda59('0x2d7')]();case _0x1aa864['_PHASE_CHARGE']:return this[_0xda59('0x42')]();case _0x1aa864[_0xda59('0x253')]:return this[_0xda59('0x284')]();}},_0x41ded6[_0xda59('0x2d7')]=function(){if(this['_battler'][_0xda59('0x2c5')]())this[_0xda59('0x34c')][_0xda59('0x1f7')]();},_0x41ded6[_0xda59('0x42')]=function(){if(this['_forceChargeState']!==_0x1aa864[_0xda59('0xe6')])return this[_0xda59('0x34c')][_0xda59('0x3e1')]();if(SATBManager[_0xda59('0x252')]([_0xda59('0x66')]))return;this[_0xda59('0x34c')][_0xda59('0x3e1')]();},_0x41ded6[_0xda59('0x284')]=function(){this[_0xda59('0x48')](0x0),this[_0xda59('0x34c')][_0xda59('0x204')]();},_0x41ded6[_0xda59('0x2a4')]=function(_0x12e29f){switch(_0x12e29f){case _0x1aa864[_0xda59('0x80')]:return this[_0xda59('0x2aa')]();case _0x1aa864[_0xda59('0xb2')]:return this[_0xda59('0x1db')]();}},_0x41ded6[_0xda59('0x2aa')]=function(){this[_0xda59('0x34c')][_0xda59('0x121')]();},_0x41ded6[_0xda59('0x1db')]=function(){this[_0xda59('0x22a')]=0x0,BattleManager[_0xda59('0x16d')](this['_battler']);},_0x41ded6[_0xda59('0x3d3')]=function(){this[_0xda59('0x22a')]=0x0,this[_0xda59('0x306')]='';};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x204e9b){'use strict';var _0x5dd897=Game_SATBNotes[_0xda59('0x3f4')],_0x58cafd=_0x204e9b[_0xda59('0x364')]={},_0x4f56c4=_0x204e9b[_0xda59('0x169')];_0x58cafd[_0xda59('0x5d')]=_0xda59('0x1f9'),_0x58cafd['_FUNC_WITHOUT_CACHE']='WithoutCache',_0x5dd897[_0xda59('0x3cc')]=function(_0x960451,_0x5a17b8,_0x3a8fe5,_0x4f3d7a){this[_0xda59('0x34c')]=_0x960451,this[_0xda59('0x27c')]=_0x5a17b8||new Game_SATBCache(),this[_0xda59('0x3f2')]=_0x3a8fe5||new Game_SATBPairs(_0x960451),this['_rules']=_0x4f3d7a||new Game_SATBRules(this[_0xda59('0x3f2')]);},_0x5dd897[_0xda59('0xf2')]=function(){delete this[_0xda59('0x34c')],this['_pairs'][_0xda59('0xf2')](),this[_0xda59('0x132')][_0xda59('0xf2')]();},[_0xda59('0x133'),_0xda59('0x12'),'raiseMarkedChangeFactors',_0xda59('0x142'),_0xda59('0x25c'),'invalidateResultCache',_0xda59('0x3a7')][_0xda59('0x124')](function(_0x1fa816){_0x5dd897[_0x1fa816]=function(){return this[_0xda59('0x27c')][_0x1fa816][_0xda59('0x68')](this[_0xda59('0x27c')],arguments);};}),_0x5dd897[_0xda59('0xb3')]=function(_0x2791d5,_0x2458de){return _0x2791d5['some'](function(_0x1269a8){return this[_0xda59('0x3f2')][_0xda59('0x16b')](_0x1269a8,_0x2458de)[_0xda59('0x286')]>0x0;},this);},_0x5dd897[_0xda59('0x2fb')]=function(_0x5661a4,_0x20ec93){if($gameSystem[_0xda59('0x293')](_0xda59('0x360'))){var _0x4d9c99=this[_0xda59('0x27c')][_0xda59('0x2fb')](_0x5661a4,_0x20ec93);if(_0x4f56c4[_0xda59('0x222')](_0x4d9c99))return _0x4d9c99;var _0x3ca0fe=this[_0xda59('0xbe')](_0x5661a4,_0x20ec93,_0x58cafd['_FUNC_WITH_CACHE']);return this[_0xda59('0x27c')]['updateResult'](_0x5661a4,_0x20ec93,_0x3ca0fe),_0x3ca0fe;}return this[_0xda59('0xbe')](_0x5661a4,_0x20ec93,_0x58cafd[_0xda59('0x119')]);},_0x5dd897[_0xda59('0x255')]=function(_0x8d7b63,_0x5e8601){this[_0xda59('0x3f2')]['default_'](_0x8d7b63,_0x5e8601);var _0x1e985f=$gameSystem[_0xda59('0x293')](_0xda59('0x360')),_0x137d52=_0x1e985f?_0x58cafd['_FUNC_WITH_CACHE']:_0x58cafd[_0xda59('0x119')],_0x2987c7=this[_0xda59('0x1e1')+_0x137d52](_0x8d7b63,_0x5e8601);this[_0xda59('0x132')][_0xda59('0x205')](_0x2987c7,_0x8d7b63)[_0xda59('0x124')](function(_0x2641d7){this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0x5e8601,_0x8d7b63,_0x2641d7);},this);},_0x5dd897[_0xda59('0xbe')]=function(_0x3a5d82,_0x54fe81,_0x2a097c){if(this[_0xda59('0x132')][_0xda59('0x355')](_0x3a5d82)){var _0x413b3d=this[_0xda59('0x1b0')](_0x3a5d82,_0x54fe81,_0x2a097c),_0x117441=this[_0xda59('0x3f2')][_0xda59('0x71')](_0x3a5d82,_0x54fe81);return this[_0xda59('0x132')]['chainedAssociativeResult_'](_0x413b3d,_0x3a5d82,_0x54fe81,_0x117441);}var _0xf5b2c9=this['_pairFuncList'+_0x2a097c](_0x3a5d82,_0x54fe81),_0x1e0482=this[_0xda59('0x3f2')][_0xda59('0x71')](_0x3a5d82,_0x54fe81);return this[_0xda59('0x132')][_0xda59('0x3cf')](_0xf5b2c9,_0x3a5d82,_0x54fe81,_0x1e0482);},_0x5dd897[_0xda59('0x1b0')]=function(_0x3cfa71,_0x55fc1e,_0x36b35e){var _0x33fd51=this[_0xda59('0x132')][_0xda59('0x31f')](_0x3cfa71),_0x941c19=_0xda59('0x342')+_0x36b35e+'_';return _0x33fd51[_0xda59('0x166')](function(_0xd6ceb9){return this[_0x941c19](_0x3cfa71,_0x55fc1e,_0xd6ceb9);},_0x4f56c4[_0xda59('0x222')],this);},_0x5dd897[_0xda59('0xa')]=function(_0x4aabd0,_0x298f03,_0x409788){return this['_uncachedPartResult_'](_0x4aabd0,_0x298f03,_0x409788,_0x58cafd[_0xda59('0x119')]);},_0x5dd897[_0xda59('0xbc')]=function(_0x480049,_0x17a05d,_0x2deb8e){var _0x47e3e7=this[_0xda59('0x27c')][_0xda59('0x18c')](_0x480049,_0x17a05d,_0x2deb8e);if(_0x4f56c4[_0xda59('0x222')](_0x47e3e7))return _0x47e3e7;var _0x4526d5=this[_0xda59('0x16')](_0x480049,_0x17a05d,_0x2deb8e,_0x58cafd['_FUNC_WITH_CACHE']);return this[_0xda59('0x27c')][_0xda59('0x2d3')](_0x480049,_0x17a05d,_0x2deb8e,_0x4526d5),_0x4526d5;},_0x5dd897[_0xda59('0x16')]=function(_0x41ed2d,_0x2e58e1,_0x38b1df,_0xa1574f){var _0x48e9c2=_0xda59('0x114')+_0xa1574f,_0x2b9f13=this[_0x48e9c2](_0x41ed2d,_0x38b1df,_0x2e58e1);if(_0x2b9f13[_0xda59('0x286')]<=0x0)return undefined;var _0x3ff47b=this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0x2e58e1,_0x41ed2d,_0x2b9f13[_0xda59('0x11e')]());return this[_0xda59('0x132')][_0xda59('0x2b7')](_0x2b9f13,_0x41ed2d,_0x2e58e1,_0x3ff47b);},_0x5dd897['_pairFuncListWithoutCache']=function(_0x33c43e,_0x10dc96){return this[_0xda59('0x377')](_0x33c43e,_0x10dc96,_0x58cafd[_0xda59('0x119')]);},_0x5dd897[_0xda59('0x276')]=function(_0x5d0738,_0x2790bf){var _0xe7d322=this['_cache'][_0xda59('0x2ef')](_0x5d0738);return _0xe7d322||this[_0xda59('0x24')](_0x5d0738,_0x2790bf);},_0x5dd897[_0xda59('0x24')]=function(_0x3a263f,_0x4dfb04){var _0x49e4fc=this[_0xda59('0x377')](_0x3a263f,_0x4dfb04,_0x58cafd[_0xda59('0x5d')]);return this['_cache']['updatePairFuncList'](_0x3a263f,_0x49e4fc),_0x49e4fc;},_0x5dd897[_0xda59('0x377')]=function(_0xd7d6e0,_0x5a814e,_0x505422){var _0x25d790=_0xda59('0x114')+_0x505422,_0x599583=this;return this[_0xda59('0x132')][_0xda59('0x31f')](_0xd7d6e0)[_0xda59('0x2e')](function(_0x5b772d,_0x1e9f4e){return _0x5b772d[_0xda59('0x274')](_0x599583[_0x25d790](_0xd7d6e0,_0x1e9f4e,_0x5a814e));},[]);},_0x5dd897[_0xda59('0x391')]=function(_0x16d1a2,_0x11eaa0,_0x2b1e65){var _0x18ee44=this[_0xda59('0x27c')][_0xda59('0xb7')](_0x16d1a2,_0x11eaa0,_0x2b1e65);if(_0x18ee44)return _0x18ee44;var _0x2206c=this['_pairFuncListPartWithoutCache'](_0x16d1a2,_0x11eaa0,_0x2b1e65);return this[_0xda59('0x27c')][_0xda59('0x291')](_0x16d1a2,_0x11eaa0,_0x2206c),_0x2206c;},_0x5dd897[_0xda59('0x1d2')]=function(_0x1fea7c,_0x5b5cb5,_0x4624e4){var _0x3d2db4=this['_pairs'],_0x3440a1=this['_cache'][_0xda59('0x326')](_0x5b5cb5,this[_0xda59('0x34c')],_0x4624e4);return _0x3440a1[_0xda59('0x2e')](function(_0x4ac34d,_0x1df96d){return _0x4ac34d[_0xda59('0x274')](_0x3d2db4[_0xda59('0x16b')](_0x1fea7c,_0x1df96d));},[]);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x4a6dbf){'use strict';var _0x4301a2=Game_SATBCache[_0xda59('0x3f4')],_0x198586=_0x4a6dbf[_0xda59('0x13d')]={};_0x198586[_0xda59('0xdf')]=function(_0x20e52d){return $dataSkills[_0x20e52d[_0xda59('0x16a')]];},_0x198586[_0xda59('0x2f4')]=function(){return _0x198586[_0xda59('0x7d')][_0xda59('0x2e')](_0x198586[_0xda59('0x21b')],{});},_0x198586[_0xda59('0x148')]=function(_0x5e60c4,_0x315445){Object[_0xda59('0x3c9')](_0x5e60c4)[_0xda59('0x124')](function(_0x21f667){if(_0x21f667['includes'](_0x315445))delete _0x5e60c4[_0x21f667];});},_0x198586[_0xda59('0x2ae')]=function(_0x1bfca4){return Object[_0xda59('0x3c9')](_0x1bfca4)[_0xda59('0x3b1')](function(_0x1a11e9){return _0x1bfca4[_0x1a11e9];});},_0x198586[_0xda59('0xce')]=function(_0x50168f,_0x16ebc5){if(!_0x50168f)return _0x16ebc5;return _0x50168f[_0xda59('0x1c8')]?undefined:_0x16ebc5+JSON[_0xda59('0x23b')](_0x50168f);},_0x198586[_0xda59('0x21b')]=function(_0xab1706,_0x1801c0){return _0xab1706[_0x1801c0]={},_0xab1706;},_0x198586[_0xda59('0xa5')]={'actor':function(_0x4b8fa7){if(!_0x4b8fa7[_0xda59('0x146')]())return[];var _0x4b38a4=_0x4b8fa7[_0xda59('0x151')]();return _0x4b38a4?[_0x4b38a4]:[];},'enemy':function(_0x1c12ae){return _0x1c12ae[_0xda59('0x2a1')]()?[_0x1c12ae[_0xda59('0x317')]()]:[];},'class':function(_0x383378){if(!_0x383378[_0xda59('0x146')]())return[];var _0x40f88d=_0x383378[_0xda59('0x36b')]();return _0x40f88d?[_0x40f88d]:[];},'weapons':function(_0x47e54c){if(_0x47e54c[_0xda59('0x146')]()&&_0x47e54c['_equips'])return _0x47e54c[_0xda59('0x0')]();return[];},'armors':function(_0x1f341c){return _0x1f341c[_0xda59('0x146')]()&&_0x1f341c[_0xda59('0x236')]?_0x1f341c[_0xda59('0x32e')]():[];},'skills':function(_0x50f36f){if(_0x50f36f[_0xda59('0x2a1')]())return _0x50f36f[_0xda59('0x317')]()[_0xda59('0x3b9')][_0xda59('0x107')](_0x198586['_ACT_DATA_SKILLS']);return _0x50f36f[_0xda59('0x146')]()?_0x50f36f[_0xda59('0x2b6')]():[];},'usableSkills':function(_0x41d730){if(_0x41d730[_0xda59('0x146')]())return _0x41d730[_0xda59('0x16f')]();if(!_0x41d730[_0xda59('0x2a1')]())return[];return _0x41d730[_0xda59('0x317')]()['actions']['filterMap'](function(_0x391576){return _0x41d730[_0xda59('0x8')](_0x391576);},_0x198586[_0xda59('0xdf')]);},'items':function(_0x23892d){return _0x23892d['isActor']()?$gameParty[_0xda59('0x62')]():[];},'usableItems':function(_0x4a9740){return _0x4a9740[_0xda59('0x146')]()?$gameParty[_0xda59('0x62')]()[_0xda59('0x3b1')](function(_0x1051fb){return _0x4a9740[_0xda59('0x279')](_0x1051fb);}):[];},'states':function(_0x37f929){return _0x37f929[_0xda59('0x3fd')]?_0x37f929['states']():[];},'thisState':function(_0x582623,_0x753754){return[_0x753754['state']];},'latestSkillItem':function(_0x59c98d){var _0x3b9a30=_0x59c98d[_0xda59('0x29')];return _0x3b9a30?[_0x3b9a30[_0xda59('0x3c7')]]:[];},'priority':function(){return[];},'chainingRule':function(){return[];},'result':function(){return[];}},_0x198586[_0xda59('0x7d')]=Object[_0xda59('0x3c9')](_0x4a6dbf[_0xda59('0x3fe')][_0xda59('0x15e')]['PARAM_NOTE_FUNCS']['notes']),_0x4301a2[_0xda59('0x3cc')]=function(){this[_0xda59('0x142')](),this[_0xda59('0x10b')]=!![];},_0x4301a2[_0xda59('0x2fb')]=function(_0x5a5da7,_0x5bcbed){var _0x4d5eaf=_0x198586['_NOTE_KEY'](_0x5a5da7,_0x5bcbed);return _0x4d5eaf&&this[_0xda59('0xa0')][_0x5a5da7][_0x4d5eaf];},_0x4301a2[_0xda59('0x18c')]=function(_0x575ac1,_0x50a500,_0x5918a1){var _0x20ccf8=_0x198586['_NOTE_KEY'](_0x50a500,_0x5918a1);return _0x20ccf8&&this['_partResults'][_0x575ac1][_0x20ccf8];},_0x4301a2[_0xda59('0x2ef')]=function(_0x483773){return this['_cachedLists'][_0x483773];},_0x4301a2[_0xda59('0xb7')]=function(_0x9d95ab,_0x2260ce){return this['_partLists'][_0x9d95ab][_0x2260ce];},_0x4301a2[_0xda59('0x326')]=function(_0x19a724,_0x5b7445,_0x59c240){return _0x198586[_0xda59('0xa5')][_0x19a724](_0x5b7445,_0x59c240);},_0x4301a2[_0xda59('0x133')]=function(_0x316453){_0x316453[_0xda59('0x124')](this[_0xda59('0xa9')],this);},_0x4301a2[_0xda59('0x12')]=function(_0xe2d42d,_0x1f2626){_0x1f2626[_0xda59('0x124')](function(_0x1e3e8e){this[_0xda59('0x39b')](_0x1e3e8e,_0xe2d42d);},this);},_0x4301a2[_0xda59('0x237')]=function(){_0x198586[_0xda59('0x7d')]['forEach'](this['_raiseMarkedNoteChangeFactors'],this);},_0x4301a2['raiseAllChangeFactors']=function(){this[_0xda59('0x164')]={},this[_0xda59('0xa0')]=_0x198586[_0xda59('0x2f4')](),this[_0xda59('0x207')]=_0x198586[_0xda59('0x2f4')](),this[_0xda59('0x1b0')]=_0x198586['_ALL_EMPTY_CONTAINERS'](),this['_changeFactorMarks']=_0x198586[_0xda59('0x2f4')]();},_0x4301a2[_0xda59('0x25c')]=function(_0x53a2c2,_0x181d73){_0x181d73['forEach'](function(_0x1682af){this[_0xda59('0xfb')](_0x53a2c2,_0x1682af);},this);},_0x4301a2[_0xda59('0x35f')]=function(_0x57bc41,_0x1b9572){_0x198586[_0xda59('0x148')](this[_0xda59('0x1b0')][_0x57bc41],_0x1b9572),_0x198586[_0xda59('0x148')](this[_0xda59('0xa0')][_0x57bc41],_0x57bc41);},_0x4301a2[_0xda59('0x3a7')]=function(_0x27d876,_0x1b0bef){if(_0x1b0bef===_0xda59('0x3e7')||_0x1b0bef===_0xda59('0x258'))return;delete this[_0xda59('0x207')][_0x27d876][_0x1b0bef],delete this[_0xda59('0x164')][_0x27d876];},_0x4301a2[_0xda59('0x2d3')]=function(_0x7b268e,_0x4cb71d,_0x2d29c2,_0x291916){var _0x509c41=_0x198586[_0xda59('0xce')](_0x4cb71d,_0x2d29c2);if(_0x509c41)this[_0xda59('0x1b0')][_0x7b268e][_0x509c41]=_0x291916;},_0x4301a2['updateResult']=function(_0x19ec0b,_0x4ef5e4,_0x409338){var _0x405437=_0x198586[_0xda59('0xce')](_0x19ec0b,_0x4ef5e4);if(_0x405437)this[_0xda59('0xa0')][_0x19ec0b][_0x405437]=_0x409338;},_0x4301a2[_0xda59('0x291')]=function(_0x2cae1a,_0x4d846c,_0x29eb49){this[_0xda59('0x207')][_0x2cae1a][_0x4d846c]=_0x29eb49;},_0x4301a2[_0xda59('0x2eb')]=function(_0x3cbc40,_0x13d7a9){this[_0xda59('0x164')][_0x3cbc40]=_0x13d7a9;},_0x4301a2[_0xda59('0xa9')]=function(_0x4267c3){_0x198586[_0xda59('0x7d')]['forEach'](function(_0x1eb5b0){this['_markNoteChangeFactor'](_0x4267c3,_0x1eb5b0);},this);},_0x4301a2[_0xda59('0x39b')]=function(_0x1eb4a2,_0x2bea59){this[_0xda59('0xd1')][_0x2bea59][_0x1eb4a2]=!![];},_0x4301a2[_0xda59('0x19f')]=function(_0x31cd22){this[_0xda59('0x25c')](_0x31cd22,this[_0xda59('0x1dd')](_0x31cd22));},_0x4301a2[_0xda59('0x1dd')]=function(_0x30bb6e){var _0x5869b8=this[_0xda59('0xd1')][_0x30bb6e],_0x4187c2=_0x198586[_0xda59('0x2ae')](_0x5869b8),_0x3b9158=!this[_0xda59('0x10b')]||_0x4187c2[_0xda59('0x286')]>0x0;return _0x3b9158?_0x4187c2:Object[_0xda59('0x3c9')](_0x5869b8);},_0x4301a2[_0xda59('0xfb')]=function(_0x2dec29,_0x4d692c){this['invalidateResultCache'](_0x2dec29,_0x4d692c),this[_0xda59('0x3a7')](_0x2dec29,_0x4d692c),this[_0xda59('0xd1')][_0x2dec29][_0x4d692c]=![];};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x42e3fb){'use strict';var _0x5673b5=Game_SATBPairs[_0xda59('0x3f4')],_0x1c1725=_0x42e3fb[_0xda59('0x18d')]={},_0x3a209e=_0x42e3fb[_0xda59('0x3fe')]['new'];_0x1c1725[_0xda59('0x2a3')]=function(_0x12511e,_0x1f9658){if(!_0x1f9658)return![];return _0x1f9658[_0xda59('0xfe')]&&_0x1c1725[_0xda59('0x152')](_0x12511e,_0x1f9658[_0xda59('0x176')]);},_0x1c1725[_0xda59('0x152')]=function(_0xef4f61,_0x27b5cb){return _0x1c1725[_0xda59('0x69')][_0xef4f61][_0xda59('0x178')][_0xda59('0x15d')](_0x27b5cb);},_0x1c1725[_0xda59('0x6c')]=function(_0x5cd87f,_0x59a60b,_0xce19d3){return _0x59a60b[_0xda59('0x1e4')](_0x5cd87f,_0xce19d3,_0xce19d3[_0xda59('0x11f')][_0xda59('0xc8')][_0xda59('0xae')]);},_0x1c1725['_PAIR_FUNC']=function(_0x3774ec,_0x14b223,_0x3e4403){var _0xd61af3=_0x3e4403[_0xda59('0x176')],_0xdaae9c=_0x1c1725[_0xda59('0x3c')][_0xd61af3],_0x34a986=_0x1c1725[_0xda59('0x69')][_0x3774ec][_0xda59('0x258')];return{'canBind':_0x1c1725[_0xda59('0x3c6')][_0xda59('0x15d')](_0xd61af3),'datum':_0x14b223,'unboundFunc':_0xdaae9c(_0x3774ec,_0x34a986,_0x3e4403[_0xda59('0xfe')])};},_0x1c1725[_0xda59('0x1f1')]=function(_0x2fd041){return+_0x2fd041;},_0x1c1725[_0xda59('0x33c')]={'coreMax':function(){return this[_0xda59('0x34c')]['baseCoreMaxSATB']();},'isBarVisible':function(){return $gameSystem['satbParamFunc'](_0xda59('0x39f'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},'chargeMax':function(){return this[_0xda59('0x34c')][_0xda59('0x126')]();},'isPayBeforeExecCharge':function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x105'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},'canCancelCharge':function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0xd2'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},'canForceCharge':function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x2df'))['call'](this['_battler']);},'cooldownMax':function(){return this[_0xda59('0x34c')][_0xda59('0x218')]();},'canCancelCooldown':function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x30d'))[_0xda59('0x1e4')](this['_battler']);}},_0x1c1725[_0xda59('0x24b')]={'coreMax':function(_0x3c43b3,_0x24addf,_0x5ab0d0,_0x15763d,_0x25d6f3){var _0x21796f=_0x5ab0d0[_0xda59('0x11f')][_0xda59('0xc8')][_0xda59('0xae')];return _0x24addf['call'](_0x3c43b3,_0x5ab0d0,_0x21796f,_0x25d6f3);},'coreActState':_0x1c1725[_0xda59('0x6c')],'isBarVisible':_0x1c1725[_0xda59('0x6c')],'chargeMax':function(_0x39d6da,_0x55d1ef,_0x1643a5,_0x3400e5,_0xd891d1){var _0x301bc3=_0x1643a5[_0xda59('0x11f')][_0xda59('0xc8')]['datumType'];return _0x55d1ef['call'](_0x39d6da,_0x1643a5,_0x301bc3,_0xd891d1);},'isPayBeforeExecCharge':_0x1c1725['_NOTE_FUNC'],'canCancelCharge':_0x1c1725[_0xda59('0x6c')],'canForceCharge':_0x1c1725[_0xda59('0x6c')],'cooldownMax':function(_0x4e4ee4,_0x2762d9,_0x2a6d81,_0x54592c,_0x3cf30b){var _0x2f4013=_0x2a6d81['meta'][_0xda59('0xc8')][_0xda59('0xae')];return _0x2762d9[_0xda59('0x1e4')](_0x4e4ee4,_0x2a6d81,_0x2f4013,_0x3cf30b);},'canCancelCooldown':_0x1c1725[_0xda59('0x6c')]},_0x1c1725[_0xda59('0x266')]={'bool':function(_0x57b8fb){return _0x57b8fb[_0xda59('0x138')]()===_0xda59('0x56');},'num':_0x1c1725[_0xda59('0x1f1')],'numArray':function(_0x4799b6){return _0x4799b6['split']('_')[_0xda59('0x107')](_0x1c1725['_STRING_TO_NUM']);}},_0x1c1725[_0xda59('0x3c')]={'cfg':function(_0x49e433,_0x2811cb,_0x1b61da){return _0x42e3fb['notes'][_0x49e433][_0x1b61da];},'val':function(_0x1b911b,_0x2ff0c1,_0x68eb6){var _0x67c1cb=_0x1c1725[_0xda59('0x266')][_0x2ff0c1];return _0x67c1cb?_0x67c1cb[_0xda59('0x1a9')](undefined,_0x68eb6):function(){return _0x68eb6;};},'switch':function(_0x244fc7,_0x38a603,_0x19a9aa){return function(){return $gameSwitches[_0xda59('0x31d')](+_0x19a9aa);};},'event':function(_0x497381,_0x40fc2f,_0x1b642a){return function(){return $gameTemp[_0xda59('0x301')](+_0x1b642a);};},'var':function(_0x5540bd,_0x5ba4b9,_0x45e6a8){return function(){return $gameVariables[_0xda59('0x31d')](+_0x45e6a8);};},'script':function(_0x3a8564,_0x4c5ef9,_0x246c7f){var _0x3ff595=$gameVariables[_0xda59('0x31d')](+_0x246c7f);return _0x3a209e['PARAM_NOTE_FUNCS'][_0xda59('0x331')][_0x3a8564](_0x3ff595);},'eval':function(_0x2d9ac8,_0x4d55dc,_0x466ee3){return _0x3a209e[_0xda59('0x67')]['notes'][_0x2d9ac8](_0x466ee3);}},_0x1c1725[_0xda59('0x3c6')]=[_0xda59('0x1c9'),'script',_0xda59('0x1f')],_0x1c1725[_0xda59('0x318')]={'suffixes':['cfg',_0xda59('0x139'),'script','eval']},_0x1c1725[_0xda59('0x350')]={'result':_0xda59('0x381'),'suffixes':[_0xda59('0x1c9'),'val',_0xda59('0xff'),_0xda59('0x251'),_0xda59('0x1f')]},_0x1c1725['_NUM_RESULT_NOTES']={'result':_0xda59('0x2d5'),'suffixes':[_0xda59('0x1c9'),_0xda59('0x3be'),_0xda59('0x1d8'),_0xda59('0x251'),'eval']},_0x1c1725['_NOTE_TYPES']={'coreMax':_0x1c1725['_NUM_RESULT_NOTES'],'coreActState':_0x1c1725[_0xda59('0x350')],'isBarVisible':_0x1c1725[_0xda59('0x350')],'chargeMax':_0x1c1725[_0xda59('0x184')],'isPayBeforeExecCharge':_0x1c1725[_0xda59('0x350')],'canCancelCharge':_0x1c1725[_0xda59('0x350')],'canForceCharge':_0x1c1725[_0xda59('0x350')],'cooldownMax':_0x1c1725[_0xda59('0x184')],'canCancelCooldown':_0x1c1725[_0xda59('0x350')]},_0x5673b5[_0xda59('0x3cc')]=function(_0xe33e6a){this['_battler']=_0xe33e6a;},_0x5673b5[_0xda59('0xf2')]=function(){delete this['_battler'];},_0x5673b5[_0xda59('0x71')]=function(_0x4a7729,_0x3fc69b){var _0x3e9daa=_0x1c1725[_0xda59('0x33c')][_0x4a7729];return _0x3e9daa?_0x3e9daa['call'](this,_0x3fc69b):undefined;},_0x5673b5[_0xda59('0x16b')]=function(_0x4b4897,_0x2fa0bd){if(!_0x2fa0bd)return[];var _0x53fa28=_0x2fa0bd[_0xda59('0x11f')][_0xda59('0xc8')][_0x4b4897];if(!_0x53fa28)return[];var _0x5174ef=_0x1c1725[_0xda59('0x2a3')][_0xda59('0x1a9')](undefined,_0x4b4897);return _0x53fa28[_0xda59('0x27d')](_0x5174ef,function(_0x3386f1){return _0x1c1725[_0xda59('0x2e1')](_0x4b4897,_0x2fa0bd,_0x3386f1);},undefined,this);},_0x5673b5[_0xda59('0x3cb')]=function(_0x1bdf74,_0x177432,_0x108366,_0x4f7cbe){var _0x3c5592=_0x108366['unboundFunc'];if(!_0x108366[_0xda59('0x101')])return _0x3c5592();return _0x1c1725[_0xda59('0x24b')][_0x177432](this[_0xda59('0x34c')],_0x3c5592,_0x108366[_0xda59('0x3f8')],_0x1bdf74,_0x4f7cbe);};}(DoubleX_RMMV['SATB']),function(_0x11b9e0){'use strict';var _0x3dd389=Game_SATBRules[_0xda59('0x3f4')],_0x534925=_0x11b9e0[_0xda59('0x310')]={},_0x39af97=_0x11b9e0[_0xda59('0x169')];_0x534925['_IS_ASSOCIATIVE_OPERATORS']={'+':!![],'*':!![],'-':![],'/':![],'%':![],'=':![]},_0x534925[_0xda59('0x316')]=function(_0x37e872,_0x5d703e,_0x38dd5c,_0x4db492){if(_0x38dd5c[_0xda59('0x286')]<=0x0)return _0x38dd5c;var _0x52c2d1=this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0x5d703e,_0x37e872,_0x4db492,_0x38dd5c);return _0x52c2d1?_0x534925[_0xda59('0x8a')](_0x37e872,_0x5d703e,_0x38dd5c,_0x52c2d1):[];},_0x534925['_CONCAT_EVERY_VAL_RESULT_FUNC']=function(_0x2683f6,_0x305009,_0x400fa8,_0x5c2c49){if(_0x400fa8[_0xda59('0x286')]<=0x0)return _0x400fa8;return _0x5c2c49[_0xda59('0x3b1')](function(_0x28f17e){return _0x400fa8[_0xda59('0x15d')](_0x28f17e);});},_0x534925[_0xda59('0x39a')]=function(_0xc023ff,_0xb352ba,_0x56b2fb,_0x25aca8){var _0x371bf8=this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0xb352ba,_0xc023ff,_0x25aca8,_0x56b2fb);return _0x371bf8?_0x534925[_0xda59('0xb0')](_0xc023ff,_0xb352ba,_0x56b2fb,_0x371bf8):_0x56b2fb;},_0x534925[_0xda59('0xb0')]=function(_0x29e3b2,_0x16ba34,_0x2e8576,_0x47b49a){return _0x2e8576[_0xda59('0x35')](_0x47b49a)[_0xda59('0x3b1')](_0x534925[_0xda59('0x1aa')]);},_0x534925['_IS_UNIQ_ELEM']=function(_0x7f8577,_0x36c37d,_0x17e29a){return _0x17e29a[_0xda59('0x1d')](_0x7f8577)===_0x36c37d;},_0x534925[_0xda59('0x141')]=function(_0x453b85,_0x2d9ce,_0x41f3c3,_0x4ecc9c){var _0x19c98c=Object[_0xda59('0x3c9')](_0x41f3c3);if(_0x19c98c['length']<=0x0)return _0x41f3c3;var _0x3a93a8=this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0x2d9ce,_0x453b85,_0x4ecc9c,_0x41f3c3);return _0x3a93a8?_0x534925[_0xda59('0xeb')](_0x453b85,_0x2d9ce,_0x41f3c3,_0x3a93a8):{};},_0x534925[_0xda59('0xeb')]=function(_0x5dde80,_0x75c27a,_0x1b1d24,_0x2bd657){var _0x3d0f1f=Object['keys'](_0x1b1d24);if(_0x3d0f1f[_0xda59('0x286')]<=0x0)return _0x1b1d24;var _0x163221=Object[_0xda59('0x3c9')](_0x2bd657);return _0x3d0f1f[_0xda59('0x124')](function(_0x814ac1){if(_0x163221[_0xda59('0x15d')](_0x814ac1)&&_0x1b1d24[_0x814ac1]===_0x2bd657[_0x814ac1])return;delete _0x1b1d24[_0x814ac1];}),_0x1b1d24;},_0x534925[_0xda59('0x165')]=function(_0x46ea55,_0x402a7d,_0x4076df,_0x5d3ebe){var _0x3a0e10=this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0x402a7d,_0x46ea55,_0x5d3ebe,_0x4076df);return _0x3a0e10?_0x534925[_0xda59('0x185')](_0x46ea55,_0x402a7d,_0x4076df,_0x3a0e10):_0x4076df;},_0x534925[_0xda59('0x185')]=function(_0x34c7c1,_0x107fc8,_0x42ed3a,_0x5e57d7){return Object['keys'](_0x5e57d7)[_0xda59('0x124')](function(_0x2e1dd3){if(!_0x42ed3a[_0x2e1dd3])_0x42ed3a[_0x2e1dd3]=_0x5e57d7[_0x2e1dd3];}),_0x42ed3a;},_0x534925[_0xda59('0x2b4')]=function(_0x29375c){var _0x236300=['\x27use\x20strict\x27;','var\x20runResult_\x20=\x20this._pairs.run_(argObj_,\x20note,\x20pairFunc,\x20result);',_0xda59('0x7e')+_0x29375c+_0xda59('0x64')][_0xda59('0x221')]('\x0a');return new Function(_0xda59('0x15a'),_0xda59('0x17d'),_0xda59('0x258'),_0xda59('0x3de'),_0x236300);},_0x534925['_OPERATOR_VAL_RESULT_FUNC']=function(_0x2fbd18){var _0x39f15c=[_0xda59('0x388'),_0xda59('0x7e')+_0x2fbd18+_0xda59('0x37e')]['join']('\x0a');return new Function(_0xda59('0x15a'),_0xda59('0x17d'),_0xda59('0x258'),_0xda59('0x30c'),_0x39f15c);},_0x534925[_0xda59('0x1a')]=function(_0xac1f02,_0x18182f,_0x5a7f69){if(_0xac1f02[_0xda59('0x286')]<=0x0)return this[_0xda59('0x3f2')][_0xda59('0x71')](_0x18182f,_0x5a7f69);return this[_0xda59('0x3f2')][_0xda59('0x3cb')](_0x5a7f69,_0x18182f,_0xac1f02[0x0]);},_0x534925[_0xda59('0x1b6')]=function(_0x5913dc,_0x2e83ae,_0x130645){return _0x5913dc[0x0]||this[_0xda59('0x3f2')]['default_'](_0x2e83ae,_0x130645);},_0x534925[_0xda59('0x21f')]=function(_0x5f4043,_0xca2be9,_0x796c97){if(_0x5f4043[_0xda59('0x286')]<=0x0)return this[_0xda59('0x3f2')][_0xda59('0x71')](_0xca2be9,_0x796c97);return this[_0xda59('0x3f2')]['run_'](_0x796c97,_0xca2be9,_0x5f4043[_0x5f4043[_0xda59('0x286')]-0x1]);},_0x534925['_LAST_VAL_MONO_FUNC']=function(_0x4b8b50,_0x5d3a14,_0xac0366){return _0x4b8b50[_0x4b8b50[_0xda59('0x286')]-0x1]||this['_pairs'][_0xda59('0x71')](_0x5d3a14,_0xac0366);},_0x534925[_0xda59('0x140')]=function(_0xf9ba1e,_0x3a1bf3){return{'concat':_0xf9ba1e,'concatVal':_0x3a1bf3,'mixObj':_0xf9ba1e,'mixObjVal':_0x3a1bf3,'operator':_0xf9ba1e,'operatorVal':_0x3a1bf3};},_0x534925[_0xda59('0x33b')]=function(_0x39b3df){return function(_0x55697c,_0x32a526,_0x4a5431,_0x11e243){var _0x5d34ed=this,_0x12026f=function(_0x3f2221,_0x12edcc){return _0x39b3df[_0xda59('0x1e4')](_0x5d34ed,_0x32a526,_0x4a5431,_0x3f2221,_0x12edcc);};if(_0x39af97[_0xda59('0x222')](_0x11e243))return _0x55697c[_0xda59('0x2e')](_0x12026f,_0x11e243);var _0x7f5c9a=_0x534925[_0xda59('0x1bf')][_0x32a526];if(_0x7f5c9a===_0xda59('0x35'))return _0x55697c['reduce'](_0x12026f,[]);return _0x55697c[_0xda59('0x286')]>0x0?_0x55697c[_0xda59('0x2e')](_0x12026f):undefined;};},_0x534925[_0xda59('0x3b7')]={'coreMax':function(){return $gameSystem['satbParam'](_0xda59('0x2e5'));},'coreActState':function(){return['thisState'];},'isBarVisible':function(){return $gameSystem[_0xda59('0x293')]('_isBarVisibleNotePriorities');},'chargeMax':function(){return $gameSystem[_0xda59('0x293')](_0xda59('0x3f6'));},'isPayBeforeExecCharge':function(){return $gameSystem['satbParam'](_0xda59('0x238'));},'canCancelCharge':function(){return $gameSystem[_0xda59('0x293')](_0xda59('0x25d'));},'canForceCharge':function(){return $gameSystem[_0xda59('0x293')](_0xda59('0x25b'));},'cooldownMax':function(){return $gameSystem[_0xda59('0x293')](_0xda59('0x334'));},'canCancelCooldown':function(){return $gameSystem['satbParam'](_0xda59('0xcb'));}},_0x534925[_0xda59('0x1ee')]={'every':{'isAssociative':!![],'concat':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x316')]),'concatVal':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x8a')]),'mixObj':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x141')]),'mixObjVal':_0x534925['_RESULT_CHAINING_RULE_FUNC'](_0x534925[_0xda59('0xeb')]),'operator':_0x534925['_RESULT_CHAINING_RULE_FUNC'](_0x534925['_OPERATOR_RESULT_FUNC']('&&')),'operatorVal':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x3d5')]('&&'))},'some':{'isAssociative':!![],'concat':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x39a')]),'concatVal':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0xb0')]),'mixObj':_0x534925[_0xda59('0x33b')](_0x534925['_MIX_SOME_OBJ_RESULT_FUNC']),'mixObjVal':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x185')]),'operator':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x2b4')]('||')),'operatorVal':_0x534925[_0xda59('0x33b')](_0x534925[_0xda59('0x3d5')]('||'))},'first':_0x534925['_MONO_RESULT_CHAINING_RULES'](_0x534925['_FIRST_LIST_MONO_FUNC'],_0x534925[_0xda59('0x1b6')]),'last':_0x534925[_0xda59('0x140')](_0x534925[_0xda59('0x21f')],_0x534925[_0xda59('0x2b0')])},Object[_0xda59('0x3c9')](_0x534925[_0xda59('0x345')])[_0xda59('0x124')](function(_0x16e4bf){var _0x1a6001=_0x534925[_0xda59('0x2b4')](_0x16e4bf),_0x17426a=_0x534925[_0xda59('0x3d5')](_0x16e4bf);_0x534925[_0xda59('0x1ee')][_0x16e4bf]={'isAssociative':_0x534925[_0xda59('0x345')][_0x16e4bf],'operator':_0x534925['_RESULT_CHAINING_RULE_FUNC'](_0x1a6001),'operatorVal':_0x534925[_0xda59('0x33b')](_0x17426a)};}),_0x534925['_RUN_LIST_CHAINING_RULES']={'every':function(_0x1f7e94){return _0x1f7e94;},'first':function(_0x13fc69){return[_0x13fc69[0x0]];},'last':function(_0x9b8cd5){return[_0x9b8cd5[_0x9b8cd5[_0xda59('0x286')]-0x1]];}},_0x534925[_0xda59('0x294')]='first',_0x534925[_0xda59('0x270')]={'coreMax':!![],'coreActState':![],'isBarVisible':![],'chargeMax':!![],'isPayBeforeExecCharge':![],'canCancelCharge':![],'canForceCharge':![],'cooldownMax':!![],'canCancelCooldown':![]},_0x534925[_0xda59('0x1b2')]={'coreMax':_0xda59('0x346'),'coreActState':'_coreActStateNoteChainingRule','isBarVisible':_0xda59('0x33a'),'chargeMax':_0xda59('0x295'),'isPayBeforeExecCharge':_0xda59('0x228'),'canCancelCharge':_0xda59('0x36c'),'canForceCharge':_0xda59('0x130'),'cooldownMax':_0xda59('0xaf'),'canCancelCooldown':_0xda59('0x3b2')},_0x534925[_0xda59('0x1bf')]={'coreMax':_0xda59('0x226'),'coreActState':_0xda59('0x226'),'isBarVisible':_0xda59('0x226'),'chargeMax':_0xda59('0x226'),'isPayBeforeExecCharge':_0xda59('0x226'),'canCancelCharge':'operator','canForceCharge':_0xda59('0x226'),'cooldownMax':_0xda59('0x226'),'canCancelCooldown':_0xda59('0x226')},_0x3dd389[_0xda59('0x3cc')]=function(_0x269481){this[_0xda59('0x3f2')]=_0x269481;},_0x3dd389[_0xda59('0xf2')]=function(){this[_0xda59('0x3f2')][_0xda59('0xf2')]();},_0x3dd389[_0xda59('0x355')]=function(_0x5e2fe2){var _0x9ee42e=this[_0xda59('0x3ea')](_0x5e2fe2);return _0x534925[_0xda59('0x1ee')][_0x9ee42e][_0xda59('0x355')];},_0x3dd389[_0xda59('0x2b7')]=function(_0x47d5f2,_0x470e90,_0x526e8e,_0x55de47){var _0x16d00f=this[_0xda59('0x3ea')](_0x470e90),_0x4b794b=_0x534925[_0xda59('0x1bf')][_0x470e90],_0x19c59a=_0x534925[_0xda59('0x1ee')][_0x16d00f][_0x4b794b];return _0x19c59a[_0xda59('0x1e4')](this,_0x47d5f2,_0x470e90,_0x526e8e,_0x55de47);},_0x3dd389[_0xda59('0x180')]=function(_0x627e79,_0x346210,_0x331eac,_0x3982df){var _0x518dc3=this[_0xda59('0x3ea')](_0x346210),_0xb69019=_0x534925[_0xda59('0x1bf')][_0x346210]+_0xda59('0x247'),_0x2e1454=_0x534925[_0xda59('0x1ee')][_0x518dc3][_0xb69019];if(_0x627e79['length']<=0x0||_0x534925[_0xda59('0x270')][_0x346210])return _0x2e1454[_0xda59('0x1e4')](this,_0x627e79,_0x346210,_0x331eac,_0x3982df);return _0x2e1454[_0xda59('0x1e4')](this,_0x627e79,_0x346210,_0x331eac);},_0x3dd389['chainedNonAssociativeResult_']=function(_0xbcd563,_0x28798e,_0x2e7caa,_0x2cabaf){var _0x5e0ab4=this[_0xda59('0x3ea')](_0x28798e),_0x162a38=_0x534925['_RESULT_CHAINING_OPERATION'][_0x28798e],_0x545e6b=_0x534925[_0xda59('0x1ee')][_0x5e0ab4][_0x162a38];if(_0xbcd563[_0xda59('0x286')]<=0x0||_0x534925[_0xda59('0x270')][_0x28798e])return _0x545e6b[_0xda59('0x1e4')](this,_0xbcd563,_0x28798e,_0x2e7caa,_0x2cabaf);return _0x545e6b[_0xda59('0x1e4')](this,_0xbcd563,_0x28798e,_0x2e7caa);},_0x3dd389['chainedRunList']=function(_0x310e16,_0x594521){return _0x534925[_0xda59('0x18f')][this[_0xda59('0x3ea')](_0x594521)](_0x310e16);},_0x3dd389[_0xda59('0x31f')]=function(_0x19ec55){return _0x534925[_0xda59('0x3b7')][_0x19ec55]();},_0x3dd389[_0xda59('0x3ea')]=function(_0x214366){var _0x53261b=_0x534925[_0xda59('0x1b2')][_0x214366];return $gameSystem[_0xda59('0x293')](_0x53261b)||_0x534925[_0xda59('0x294')];};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0xc702eb){'use strict';_0xc702eb[_0xda59('0x10a')]={'orig':{},'new':{}};var _0x452afd=_0xc702eb['Game_Party'][_0xda59('0x2d6')],_0x3b8815=_0xc702eb['Game_Party'][_0xda59('0x15e')],_0x532a40=Game_Party[_0xda59('0x3f4')],_0x1de669=Game_Unit[_0xda59('0x3f4')];_0x3b8815['_ACTOR_INDEX']=function(_0x347824){return _0x347824[_0xda59('0x3a1')]();},_0x3b8815[_0xda59('0x2a7')]=function(_0x25c895){_0x25c895[_0xda59('0x2e0')]();},_0x3b8815[_0xda59('0xec')]=function(_0x159597){_0x159597[_0xda59('0x7c')]();},_0x3b8815[_0xda59('0x2f2')]=function(_0x3b3e44){_0x3b3e44[_0xda59('0x314')]();},_0x452afd[_0xda59('0x121')]=_0x532a40[_0xda59('0x121')]||_0x1de669['clearActions'],_0x3b8815[_0xda59('0x121')]=_0x532a40[_0xda59('0x121')]=function(){_0x452afd[_0xda59('0x121')][_0xda59('0x68')](this,arguments),this[_0xda59('0xb')]()['forEach'](_0x3b8815[_0xda59('0xec')]);},_0x452afd['removeActor']=_0x532a40[_0xda59('0x186')],_0x3b8815[_0xda59('0x186')]=_0x532a40[_0xda59('0x186')]=function(_0x21d61c){_0x3b8815[_0xda59('0x1a2')][_0xda59('0x1e4')](this,_0x21d61c),_0x452afd['removeActor']['apply'](this,arguments);},_0x532a40[_0xda59('0x159')]=function(){return this[_0xda59('0x2e2')][_0xda59('0x106')]['length']>0x0;},_0x532a40[_0xda59('0x163')]=function(_0x5b33f5){return BattleManager[_0xda59('0x151')]()===_0x5b33f5&&this[_0xda59('0x23c')](_0x5b33f5);},_0x532a40[_0xda59('0x23c')]=function(_0x49ecae){return this['_satb']['inputableActors'][_0xda59('0x15d')](_0x49ecae);},_0x532a40['inputableSATBActorIndices']=function(){return this[_0xda59('0x2e2')][_0xda59('0x106')][_0xda59('0x107')](_0x3b8815[_0xda59('0x27a')]);},_0x532a40[_0xda59('0x314')]=function(){this['members']()[_0xda59('0x124')](_0x3b8815[_0xda59('0x2f2')]);},_0x532a40['clearSATBNotes']=function(){this[_0xda59('0xb')]()['forEach'](_0x3b8815[_0xda59('0x2a7')]);},_0x532a40[_0xda59('0x1f4')]=function(){this['_satb']={'inputableActors':[]};},_0x532a40[_0xda59('0x3c3')]=function(_0x5060f2){if(!this[_0xda59('0x3e4')]()||BattleManager[_0xda59('0x11d')](_0x5060f2))return;if(_0x5060f2['isAutoBattle']()||_0x5060f2[_0xda59('0x85')]())return;if(this[_0xda59('0x23c')](_0x5060f2))return;this['_satb'][_0xda59('0x106')][_0xda59('0x2ee')](_0x5060f2),SATBManager[_0xda59('0xc5')](_0xda59('0x31c'));},_0x532a40[_0xda59('0x2a9')]=function(_0x8b3841){if(!BattleManager[_0xda59('0x1a7')]())return;this['_satb'][_0xda59('0x106')][_0xda59('0x341')](_0x8b3841);if(BattleManager[_0xda59('0x151')]()===_0x8b3841)return BattleManager[_0xda59('0x393')]();SATBManager[_0xda59('0xc5')](_0xda59('0x31c')),_0x8b3841[_0xda59('0x281')]('');},_0x532a40[_0xda59('0x29d')]=function(_0x43979f){var _0x350037=this[_0xda59('0xb')]()[_0x43979f];if(_0x350037)_0x350037[_0xda59('0x43')]();},_0x532a40[_0xda59('0x8e')]=function(_0x22e700){var _0x2ac82d=this[_0xda59('0xb')]()[_0x22e700];if(_0x2ac82d)_0x2ac82d[_0xda59('0x37a')]();},_0x532a40['onTryEndForceActorChargeSATB']=function(_0x168358){var _0x34cb62=this['members']()[_0x168358];if(_0x34cb62)_0x34cb62[_0xda59('0x3e9')]();},_0x532a40['onTryCancelActorCooldownSATB']=function(_0xdd253d){var _0x1b6c9e=this[_0xda59('0xb')]()[_0xdd253d];if(_0x1b6c9e)_0x1b6c9e[_0xda59('0x25f')]();},_0x3b8815[_0xda59('0x1a2')]=function(_0xc540ef){if(!this[_0xda59('0x1e3')][_0xda59('0x15d')](_0xc540ef))return;$gameActors[_0xda59('0x151')](_0xc540ef)[_0xda59('0x45')]();};}(DoubleX_RMMV['SATB']),function(_0x5127cd){'use strict';_0x5127cd[_0xda59('0x1b1')]={'orig':{},'new':{}};var _0x3d2d7e=_0x5127cd[_0xda59('0x1b1')][_0xda59('0x2d6')],_0x255262=Game_Interpreter[_0xda59('0x3f4')],_0x280945=_0x5127cd['Game_Interpreter'][_0xda59('0x15e')],_0x46845f=_0x5127cd[_0xda59('0x3f1')][_0xda59('0x15e')];_0x280945[_0xda59('0x96')]=function(_0x20b6e6){return _0x20b6e6[_0xda59('0x2c5')]();},_0x280945[_0xda59('0x267')]=function(_0x317866,_0x400c74,_0x205baf){switch(_0x280945['_TARGET_GROUPS'][_0x317866]){case _0x280945[_0xda59('0xcc')]:{return _0x280945[_0xda59('0x76')](_0x400c74,_0x205baf);}case _0x280945['_TARGET_INDEX']:{return _0x280945['_FILTERED_TARGET_INDICES'](_0x400c74,_0x205baf);}}return[];},_0x280945[_0xda59('0x76')]=function(_0x18a2c6,_0x2dcda4){return _0x2dcda4[_0xda59('0x3b1')](function(_0x5b4470){return _0x18a2c6['contains'](_0x5b4470[isNaN(_0x5b4470)?_0xda59('0x25'):_0xda59('0x3b3')]());});},_0x280945['_FILTERED_TARGET_INDICES']=function(_0x157b73,_0x73ac07){return _0x73ac07[_0xda59('0x3b1')](function(_0x2c3054,_0x24db1e){return _0x157b73[_0xda59('0x1b3')](function(_0x3482b9){return isNaN(_0x3482b9)?_0x3482b9===_0x2c3054['name']():+_0x3482b9===_0x24db1e;});});},_0x280945[_0xda59('0x376')]=function(_0x26e449){return _0x26e449[_0xda59('0x280')]();},_0x280945['_IS_DEAD']=function(_0x2b4e15){return _0x2b4e15[_0xda59('0x2c7')]();},_0x280945[_0xda59('0x144')]=function(_0x3e780e){return _0x280945[_0xda59('0x2c3')][_0xda59('0x15d')](_0x3e780e);},_0x280945['_PARSED_ARGS']=function(_0x4bdc0a,_0x3e15eb){if(!_0x280945[_0xda59('0xdb')][_0x4bdc0a])return _0x3e15eb;return _0x3e15eb['map'](function(_0x3a30d0){return+_0x3a30d0;});},_0x280945[_0xda59('0x34')]={'allParty':function(){return $gameParty['members']();},'aliveParty':function(){return $gameParty[_0xda59('0x2fd')]();},'deadParty':function(){return $gameParty[_0xda59('0x51')]();},'movableParty':function(){return $gameParty[_0xda59('0x100')]();},'allTroop':function(){return $gameTroop[_0xda59('0xb')]();},'aliveTroop':function(){return $gameTroop[_0xda59('0x2fd')]();},'deadTroop':function(){return $gameTroop[_0xda59('0x51')]();},'movableTroop':function(){return $gameTroop['movableMembers']();},'allActors':function(){return $gameActors[_0xda59('0x200')];},'aliveActors':function(){return $gameActors[_0xda59('0x200')][_0xda59('0x3b1')](_0x280945[_0xda59('0x376')]);},'deadActors':function(){return $gameActors['_data'][_0xda59('0x3b1')](_0x280945[_0xda59('0x13b')]);},'movableActors':function(){return $gameActors[_0xda59('0x200')]['filter'](_0x280945[_0xda59('0x96')]);}},_0x280945[_0xda59('0x2c3')]=Object[_0xda59('0x3c9')](_0x46845f[_0xda59('0x77')])[_0xda59('0x35')](['setSATBActTimes',_0xda59('0xc6'),'multiplySATBActTimes'])[_0xda59('0x35')](Object[_0xda59('0x3c9')](_0x46845f[_0xda59('0x1c3')])),(_0x280945[_0xda59('0xcc')]='id',_0x280945[_0xda59('0xf6')]=_0xda59('0x3a1')),_0x280945[_0xda59('0xdb')]={'setSATBActTimes':!![],'addSATBActTimes':!![],'multiplySATBActTimes':!![]},Object[_0xda59('0x3c9')](_0x46845f[_0xda59('0x1c3')])[_0xda59('0x124')](function(_0x4f9413){_0x280945[_0xda59('0xdb')][_0x4f9413]=!![];}),_0x280945[_0xda59('0xd8')]={'allParty':_0x280945[_0xda59('0xf6')],'aliveParty':_0x280945['_TARGET_INDEX'],'deadParty':_0x280945['_TARGET_INDEX'],'movableParty':_0x280945[_0xda59('0xf6')],'allTroop':_0x280945[_0xda59('0xf6')],'aliveTroop':_0x280945[_0xda59('0xf6')],'deadTroop':_0x280945[_0xda59('0xf6')],'movableTroop':_0x280945[_0xda59('0xf6')],'allActors':_0x280945[_0xda59('0xcc')],'aliveActors':_0x280945[_0xda59('0xcc')],'deadActors':_0x280945[_0xda59('0xcc')],'movableActors':_0x280945[_0xda59('0xcc')]},_0x3d2d7e[_0xda59('0x2da')]=_0x255262[_0xda59('0x2da')],_0x280945[_0xda59('0x2da')]=_0x255262[_0xda59('0x2da')]=function(_0x9492ff,_0x1dc8c4){_0x3d2d7e['pluginCommand']['apply'](this,arguments);if(!_0x280945[_0xda59('0x144')](_0x9492ff))return;var _0x126016=_0x1dc8c4[_0xda59('0x11e')](),_0x3b44e4=_0x1dc8c4[_0xda59('0x11e')]()[_0xda59('0x1ea')](','),_0x15a99=_0x280945[_0xda59('0x35c')][_0xda59('0x1e4')](this,_0x126016,_0x3b44e4),_0x2bb41d=_0x280945[_0xda59('0x19b')](_0x9492ff,_0x1dc8c4);_0x15a99[_0xda59('0x124')](function(_0x2d87ea){_0x2d87ea[_0x9492ff][_0xda59('0x68')](_0x2d87ea,_0x2bb41d);});},_0x280945[_0xda59('0x35c')]=function(_0x105f76,_0x40706e){var _0xf70162=_0x280945[_0xda59('0x175')]['call'](this,_0x105f76);return _0x280945[_0xda59('0x267')](_0x105f76,_0x40706e,_0xf70162);},_0x280945[_0xda59('0x175')]=function(_0x32b931){if(!_0x280945['_TARGET_TYPES'][_0x32b931])return[];return _0x280945[_0xda59('0x34')][_0x32b931]();};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x215b44){'use strict';_0x215b44[_0xda59('0x2e9')]={'orig':{},'new':{}};var _0x1779e4=Sprite_Battler[_0xda59('0x3f4')],_0x314a74=_0x215b44[_0xda59('0x2e9')][_0xda59('0x2d6')],_0x3cb68b=_0x215b44[_0xda59('0x2e9')]['new'];_0x314a74[_0xda59('0x30f')]=_0x1779e4[_0xda59('0x30f')],_0x3cb68b['setBattler']=_0x1779e4['setBattler']=function(_0x304bfa){_0x3cb68b[_0xda59('0x1bc')]['call'](this,_0x304bfa),_0x314a74[_0xda59('0x30f')][_0xda59('0x68')](this,arguments);},_0x1779e4[_0xda59('0xd9')]=function(_0x88c81e){_0x3cb68b[_0xda59('0x328')][_0xda59('0x1e4')](this,_0x88c81e,_0xda59('0x11b'));},_0x1779e4[_0xda59('0x368')]=function(_0xf236af){_0x3cb68b[_0xda59('0x328')][_0xda59('0x1e4')](this,_0xf236af,_0xda59('0x3ad'));},_0x1779e4[_0xda59('0xba')]=function(){this[_0xda59('0x2e2')][_0xda59('0x28e')][_0xda59('0x30f')](undefined),this[_0xda59('0x2e2')][_0xda59('0x28e')][_0xda59('0xed')][_0xda59('0x14a')](this[_0xda59('0x2e2')]['bar']),delete this['_satb'][_0xda59('0x28e')],this[_0xda59('0x2e2')]['isBarErased']=!![];},_0x3cb68b[_0xda59('0x1bc')]=function(_0x1b150a){if(!_0x1b150a||_0x1b150a===this[_0xda59('0x34c')])return;var _0x46b103=this[_0xda59('0x2e2')];if(!_0x46b103)return _0x3cb68b[_0xda59('0x268')][_0xda59('0x1e4')](this,_0x1b150a);if(_0x46b103[_0xda59('0x28e')]&&!_0x46b103[_0xda59('0x296')])_0x46b103[_0xda59('0x28e')][_0xda59('0x30f')](_0x1b150a);},_0x3cb68b[_0xda59('0x268')]=function(_0x3d9b2c){this[_0xda59('0x2e2')]={'bar':new Window_SATBBar(_0x3d9b2c)},this[_0xda59('0x1ec')](this[_0xda59('0x2e2')][_0xda59('0x28e')]);},_0x3cb68b[_0xda59('0x328')]=function(_0x35d2be,_0x56830b){if(!_0x35d2be[_0xda59('0x15d')](this[_0xda59('0x34c')]))return;if(this[_0xda59('0x2e2')]&&this[_0xda59('0x2e2')][_0xda59('0x28e')])this[_0xda59('0x2e2')]['bar'][_0x56830b]();};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x497235){'use strict';_0x497235[_0xda59('0x26f')]={'orig':{},'new':{}};var _0x175670=Spriteset_Battle[_0xda59('0x3f4')],_0x55fe6f=_0x497235[_0xda59('0x26f')]['new'];_0x55fe6f[_0xda59('0x2d9')]=function(_0x3fbfbb){_0x3fbfbb[_0xda59('0xba')]();},_0x55fe6f[_0xda59('0xb4')]=function(_0x26aab4){_0x26aab4[_0xda59('0x124')](_0x55fe6f[_0xda59('0x2d9')]);},_0x55fe6f[_0xda59('0x288')]=function(_0x346bbe,_0x24cba1,_0xc8a8b0){_0xc8a8b0[_0xda59('0x124')](function(_0x444f6e){_0x444f6e[_0x24cba1](_0x346bbe);});},_0x175670[_0xda59('0x8c')]=function(_0x4c35ad){_0x55fe6f[_0xda59('0x38')][_0xda59('0x1e4')](this,_0x4c35ad,'refreshSATBWin');},_0x175670[_0xda59('0x2ed')]=function(_0x425e6a){_0x55fe6f[_0xda59('0x38')][_0xda59('0x1e4')](this,_0x425e6a,_0xda59('0x368'));},_0x175670[_0xda59('0x2cf')]=function(){_0x55fe6f[_0xda59('0xb4')](this[_0xda59('0x338')]),_0x55fe6f[_0xda59('0xb4')](this[_0xda59('0x190')]);},_0x55fe6f[_0xda59('0x38')]=function(_0x5193c4,_0x134974){_0x55fe6f[_0xda59('0x288')](_0x5193c4,_0x134974,this[_0xda59('0x338')]),_0x55fe6f[_0xda59('0x288')](_0x5193c4,_0x134974,this['_enemySprites']);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0xe2fe77){'use strict';_0xe2fe77['Window_Selectable']={'orig':{},'new':{}};var _0x34f28b=Window_Selectable[_0xda59('0x3f4')],_0x5ed475=_0xe2fe77[_0xda59('0x2f1')][_0xda59('0x15e')];_0x5ed475[_0xda59('0x16c')]=function(_0x446884){_0x446884();},_0x34f28b[_0xda59('0x349')]=_0x34f28b[_0xda59('0x349')]||function(_0x294472,_0x3c461d){if(this[_0xda59('0x3c4')](_0x294472))return this[_0xda59('0x3ae')][_0x294472][_0xda59('0x274')](_0x3c461d);this['_handlers'][_0x294472]=_0x3c461d[_0xda59('0x4e')]();},_0x34f28b[_0xda59('0x242')]=_0x34f28b['callHandlers']||function(_0x4e4bd3){if(!this[_0xda59('0x3c4')](_0x4e4bd3))return;this[_0xda59('0x3ae')][_0x4e4bd3][_0xda59('0x124')](_0x5ed475[_0xda59('0x16c')]);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x2441f7){'use strict';_0x2441f7[_0xda59('0x1f2')]={'orig':{},'new':{}};var _0x248436=_0x2441f7[_0xda59('0x1f2')][_0xda59('0x2d6')],_0x768d2d=Window_ActorCommand[_0xda59('0x3f4')],_0x268a33=Window_Selectable[_0xda59('0x3f4')],_0x3d7834=_0x2441f7[_0xda59('0x1f2')][_0xda59('0x15e')];_0x768d2d[_0xda59('0x112')]?(_0x248436[_0xda59('0x112')]=_0x768d2d[_0xda59('0x112')],_0x3d7834[_0xda59('0x112')]=_0x768d2d[_0xda59('0x112')]=function(){_0x248436[_0xda59('0x112')][_0xda59('0x68')](this,arguments),_0x3d7834[_0xda59('0x31a')]['call'](this);}):_0x768d2d[_0xda59('0x112')]=function(){_0x268a33[_0xda59('0x112')]['call'](this),_0x3d7834[_0xda59('0x31a')][_0xda59('0x1e4')](this);},_0x3d7834[_0xda59('0x31a')]=function(){if(!SATBManager[_0xda59('0x252')]([_0xda59('0x3b0')]))return;if(!this[_0xda59('0x256')]())return;var _0x3423e7=$gameSystem[_0xda59('0x36a')](_0xda59('0x122'))();_0x3d7834[_0xda59('0x374')][_0xda59('0x1e4')](this,_0x3423e7);var _0x1acd73=$gameSystem[_0xda59('0x36a')]('nextInputableActorKey')();_0x3d7834[_0xda59('0x374')][_0xda59('0x1e4')](this,_0x1acd73);var _0x10ea1d=$gameSystem[_0xda59('0x36a')](_0xda59('0x210'))();_0x10ea1d[_0xda59('0x124')](_0x3d7834['_procHotkey'],this);},_0x3d7834[_0xda59('0x374')]=function(_0x48d5cc){if(!Input[_0xda59('0x2de')](_0x48d5cc)&&!Input[_0xda59('0x202')](_0x48d5cc))return;this['callHandler'](_0x48d5cc);},_0x3d7834[_0xda59('0x282')]=function(_0x2dc6db){if(Input[_0xda59('0x2de')](_0x2dc6db))this[_0xda59('0x3')](_0x2dc6db);};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x593fe1){'use strict';_0x593fe1[_0xda59('0x21a')]={'orig':{},'new':{}};var _0x43f1fa=_0x593fe1[_0xda59('0x21a')][_0xda59('0x2d6')],_0x535efe=Window_BattleStatus[_0xda59('0x3f4')],_0x85d0b8=Window_Selectable[_0xda59('0x3f4')],_0x3352f9=_0x593fe1[_0xda59('0x21a')][_0xda59('0x15e')];_0x3352f9['START_FORCE_CHARGE_KEY']=function(_0x3aa6bf){return _0x3aa6bf+_0x3352f9[_0xda59('0x2ca')];},_0x3352f9['END_FORCE_CHARGE_KEY']=function(_0x1025e1){return _0x1025e1+_0x3352f9[_0xda59('0x2db')];},_0x3352f9[_0xda59('0x2ca')]=_0xda59('0x83'),_0x3352f9[_0xda59('0x2db')]=_0xda59('0x1dc'),_0x535efe['processHandling']?(_0x43f1fa[_0xda59('0x112')]=_0x535efe['processHandling'],_0x3352f9[_0xda59('0x112')]=_0x535efe['processHandling']=function(){_0x43f1fa[_0xda59('0x112')][_0xda59('0x68')](this,arguments),_0x3352f9[_0xda59('0x31a')][_0xda59('0x1e4')](this);}):_0x535efe[_0xda59('0x112')]=function(){_0x85d0b8[_0xda59('0x112')][_0xda59('0x1e4')](this),_0x3352f9['_procHandling']['call'](this);},_0x3352f9[_0xda59('0x31a')]=function(){if(!this[_0xda59('0x1ff')]())return;var _0x5e45f8;if(SATBManager[_0xda59('0x252')]([_0xda59('0x66')])){_0x5e45f8=$gameSystem['satbParamFunc'](_0xda59('0x1a3'))(),_0x5e45f8[_0xda59('0x124')](_0x3352f9[_0xda59('0x1a6')],this);var _0x1bf595=$gameSystem['satbParamFunc'](_0xda59('0x15b'))();_0x1bf595['forEach'](_0x3352f9[_0xda59('0x2f7')],this);}if(!SATBManager[_0xda59('0x252')]([_0xda59('0x49')]))return;var _0x40c08c=$gameSystem[_0xda59('0x36a')](_0xda59('0x384'))();_0x40c08c[_0xda59('0x3b1')](function(_0x3d3770){return!_0x5e45f8||!_0x5e45f8[_0xda59('0x15d')](_0x3d3770);})[_0xda59('0x124')](_0x3352f9[_0xda59('0x1a6')],this);},_0x3352f9['_procForceChargeHotkey']=function(_0x3b86c0){var _0x264348=_0x3352f9['START_FORCE_CHARGE_KEY'](_0x3b86c0);if(Input['isTriggered'](_0x3b86c0))return this[_0xda59('0x3')](_0x264348);var _0x4fd558=_0x3352f9[_0xda59('0x358')](_0x3b86c0);if(Input[_0xda59('0xf0')](_0x3b86c0))this[_0xda59('0x3')](_0x4fd558);},_0x3352f9[_0xda59('0x1a6')]=function(_0x16f229){if(Input[_0xda59('0x2de')](_0x16f229))this[_0xda59('0x242')](_0x16f229);};}(DoubleX_RMMV[_0xda59('0xda')]),function(){'use strict';var _0x40da79=Window_Base[_0xda59('0x3f4')];Window_SATBBar[_0xda59('0x3f4')]=Object['create'](_0x40da79);var _0x3403fa=Window_SATBBar[_0xda59('0x3f4')];_0x3403fa[_0xda59('0x29e')]=Window_SATBBar,_0x3403fa[_0xda59('0x3cc')]=function(_0x15a710){this[_0xda59('0x30f')](_0x15a710);var _0xeabbfd={'x':this['_x'](),'y':this['_y'](),'width':this['_w'](),'height':this['_h']()};_0x40da79[_0xda59('0x3cc')][_0xda59('0x1e4')](this,_0xeabbfd['x'],_0xeabbfd['y'],_0xeabbfd[_0xda59('0x3d6')],_0xeabbfd[_0xda59('0x233')]),this[_0xda59('0x198')]=0x0;},_0x3403fa['lineHeight']=function(){return $gameSystem[_0xda59('0x36a')]('atbBarLineH')['call'](this[_0xda59('0x34c')]);},_0x3403fa['standardFontSize']=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x189'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x179')]=function(){return 0x0;},_0x3403fa[_0xda59('0x3bf')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x117'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x3d4')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x36'))['call'](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x38d')]=function(){if(!SATBManager[_0xda59('0x252')](['IsBarEnabled']))return this[_0xda59('0x2a2')](_0xda59('0x323'),![]);var _0x38f1e6=this[_0xda59('0x323')];!$gameSystem[_0xda59('0x293')](_0xda59('0x360'))&&this['_updateProperty'](_0xda59('0x323'),this[_0xda59('0x7')]());if(!this[_0xda59('0x323')])return;if(_0x38f1e6&&$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return;this[_0xda59('0x26b')]();},_0x3403fa[_0xda59('0x46')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x127'))[_0xda59('0x1e4')](this[_0xda59('0x34c')],this);},_0x3403fa[_0xda59('0x30f')]=function(_0x1687ce){if(this[_0xda59('0x34c')]===_0x1687ce)return;var _0x17481c=this['_battler'];this[_0xda59('0x34c')]=_0x1687ce;if(!_0x1687ce)return this[_0xda59('0x2a2')](_0xda59('0x323'),![]);if(_0x17481c&&_0x17481c!==_0x1687ce)this['refreshWin']();},_0x3403fa[_0xda59('0x11b')]=function(){if(!SATBManager[_0xda59('0x252')]([_0xda59('0x3d2')]))return this[_0xda59('0x2a2')](_0xda59('0x323'),![]);$gameSystem[_0xda59('0x293')]('_isNoteCached')&&this[_0xda59('0x2a2')]('visible',this[_0xda59('0x7')]());if(this[_0xda59('0x79')]())this[_0xda59('0x26b')]();},_0x3403fa[_0xda59('0x3ad')]=function(){if(this[_0xda59('0x79')]())this['_refreshBar']();},_0x3403fa[_0xda59('0x79')]=function(){return this[_0xda59('0x323')]&&$gameSystem[_0xda59('0x293')]('_isParamFuncCached');},_0x3403fa['_refreshBar']=function(){this[_0xda59('0x372')]();var _0x495f88=this[_0xda59('0x11')](_0xda59('0x1a1'),this['_fillBarW']()),_0x2d04f0=this[_0xda59('0x11')](_0xda59('0x337'),this[_0xda59('0x5c')]());if(!_0x495f88&&!_0x2d04f0)return;this['contents'][_0xda59('0xf2')](),this[_0xda59('0x2af')]();},_0x3403fa[_0xda59('0x7')]=function(){return this[_0xda59('0x34c')][_0xda59('0x3f9')](_0xda59('0x3d7'));},_0x3403fa[_0xda59('0x26b')]=function(){this[_0xda59('0x2a2')]('x',this['_x']()),this['_updateProperty']('y',this['_y']()),this[_0xda59('0x2a2')](_0xda59('0x248'),this[_0xda59('0x3d4')]()),this['_updatePaintOpacity']();var _0x624ee9=this['_isUpdateWH'](),_0x291cc9=this[_0xda59('0x11')]('_fillW',this['_fillBarW']()),_0x3a9245=this['_isUpdateBarColors'](),_0x21abbf=this[_0xda59('0x11')](_0xda59('0xcd'),this[_0xda59('0x179')]()),_0x56f682=this[_0xda59('0x11')](_0xda59('0x183'),this[_0xda59('0x3bf')]()),_0x41dabb=this[_0xda59('0x11')](_0xda59('0x35e'),this[_0xda59('0x3d8')]()),_0x16f2d7=this[_0xda59('0x11')]('_textColor',this['_atbTextColor']()),_0x2a254a=this['_isUpdateTextXY'](),_0x3b98c6=this[_0xda59('0x11')](_0xda59('0x337'),this[_0xda59('0x5c')]()),_0x4bc428=this[_0xda59('0x11')](_0xda59('0x201'),this['lineHeight']());if(!_0x624ee9&&!_0x291cc9&&!_0x3a9245&&!_0x21abbf&&!_0x56f682&&!_0x41dabb&&!_0x16f2d7&&!_0x2a254a&&!_0x3b98c6&&!_0x4bc428)return;this[_0xda59('0x38c')][_0xda59('0xf2')]();if(_0x624ee9)this[_0xda59('0x38c')]['resize'](this['width'],this[_0xda59('0x233')]);if(_0x21abbf)this['updatePadding']();if(_0x41dabb)this[_0xda59('0x18b')]();if(_0x16f2d7)this['changeTextColor'](this[_0xda59('0x36f')]);this[_0xda59('0x2af')]();},_0x3403fa['_x']=function(){return $gameSystem['satbParamFunc'](_0xda59('0x8b'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa['_y']=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x116'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x2a2')]=function(_0x1488b2,_0x4a6ced){if(this[_0x1488b2]!==_0x4a6ced)this[_0x1488b2]=_0x4a6ced;},_0x3403fa[_0xda59('0x372')]=function(){var _0x2f7201=this['_isCacheUpdated'](_0xda59('0x60'),this[_0xda59('0x34c')]['canMakeSATBCmds']());if(_0x2f7201)this[_0xda59('0x34b')](this[_0xda59('0x60')]);},_0x3403fa[_0xda59('0x30a')]=function(){var _0x36883f=this[_0xda59('0x11')](_0xda59('0x3d6'),this['_w']()),_0x3b58d4=this[_0xda59('0x11')](_0xda59('0x233'),this['_h']());return _0x36883f||_0x3b58d4;},_0x3403fa['_w']=function(){return $gameSystem['satbParamFunc'](_0xda59('0x3a2'))[_0xda59('0x1e4')](this['_battler']);},_0x3403fa['_h']=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x10c'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x22d')]=function(){return this[_0xda59('0x3d6')]*this[_0xda59('0x34c')][_0xda59('0x150')]();},_0x3403fa[_0xda59('0x28a')]=function(){var _0x17aea3=this[_0xda59('0x11')](_0xda59('0x3db'),this[_0xda59('0x46')]()),_0x329c2e=this['_isCacheUpdated']('_color1',this['_barColor1']()),_0x5bc3a8=this[_0xda59('0x11')]('_color2',this[_0xda59('0x13e')]());return _0x17aea3||_0x329c2e||_0x5bc3a8;},_0x3403fa[_0xda59('0x357')]=function(){return $gameSystem['satbParamFunc']('atbBarColor1')['call'](this[_0xda59('0x34c')],this);},_0x3403fa[_0xda59('0x13e')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x75'))[_0xda59('0x1e4')](this[_0xda59('0x34c')],this);},_0x3403fa[_0xda59('0x109')]=function(){return $gameSystem[_0xda59('0x36a')]('atbBarTextColor')[_0xda59('0x1e4')](this[_0xda59('0x34c')],this);},_0x3403fa[_0xda59('0x2d1')]=function(){var _0x22cf66=this[_0xda59('0x11')](_0xda59('0x28'),this[_0xda59('0x5b')]()),_0x591722=this[_0xda59('0x11')](_0xda59('0xd4'),this[_0xda59('0x22')]());return _0x22cf66||_0x591722;},_0x3403fa[_0xda59('0x5b')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x394'))[_0xda59('0x1e4')](this['_battler']);},_0x3403fa[_0xda59('0x22')]=function(){return $gameSystem[_0xda59('0x36a')](_0xda59('0x32'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x5c')]=function(){return $gameSystem['satbParamFunc'](_0xda59('0x2b3'))[_0xda59('0x1e4')](this[_0xda59('0x34c')]);},_0x3403fa[_0xda59('0x11')]=function(_0x1bb86a,_0x374ea4){var _0x321989=this[_0x1bb86a]!==_0x374ea4;if(_0x321989)this[_0x1bb86a]=_0x374ea4;return _0x321989;},_0x3403fa[_0xda59('0x2af')]=function(){this[_0xda59('0x38c')]['fillRect'](0x0,0x0,this[_0xda59('0x3d6')],this['height'],this[_0xda59('0x3db')]),this[_0xda59('0x38c')][_0xda59('0x216')](0x0,0x0,this[_0xda59('0x1a1')],this[_0xda59('0x233')],this[_0xda59('0x309')],this[_0xda59('0x336')]);var _0x3ed599=this[_0xda59('0x217')](this[_0xda59('0x337')]);this[_0xda59('0x265')](this[_0xda59('0x337')],this[_0xda59('0x28')],this[_0xda59('0xd4')],_0x3ed599,_0xda59('0x2e4'));};}(),function(){'use strict';Window_SATBBase[_0xda59('0x3f4')]=Object[_0xda59('0xdd')](Window_Base[_0xda59('0x3f4')]);var _0x406ca0=Window_SATBBase[_0xda59('0x3f4')],_0x321d11=Window_Base[_0xda59('0x3f4')],_0x4677ab=Window_Selectable[_0xda59('0x3f4')];_0x406ca0[_0xda59('0x29e')]=Window_SATBBase,_0x406ca0[_0xda59('0x3cc')]=function(_0x39ffb9){this[_0xda59('0x40')]=this[_0xda59('0xca')]=!![],this['_lineHParam']=_0x39ffb9[_0xda59('0x3b8')],this['_textSizeParam']=_0x39ffb9['textSizeParam'],this[_0xda59('0x27b')]=_0x39ffb9[_0xda59('0x1d5')],this[_0xda59('0x3ff')]=_0x39ffb9[_0xda59('0x15c')],this[_0xda59('0x118')]=_0x39ffb9[_0xda59('0x14c')],this['_moduleParam']=_0x39ffb9[_0xda59('0x168')],this[_0xda59('0x25e')]=_0x39ffb9[_0xda59('0x14b')],this[_0xda59('0x54')]=_0x39ffb9['winXParam'],this[_0xda59('0xd7')]=_0x39ffb9[_0xda59('0x329')],this[_0xda59('0x1e9')]=_0x39ffb9[_0xda59('0x287')],this[_0xda59('0x1e6')]=_0x39ffb9[_0xda59('0x3a3')],this[_0xda59('0x22b')]=_0x39ffb9[_0xda59('0x173')],this[_0xda59('0x214')]=_0x39ffb9['textYParam'],this[_0xda59('0x2a2')](_0xda59('0x323'),this[_0xda59('0x7')]());var _0x31a098={'x':this['_x'](),'y':this['_y'](),'width':this['_w'](),'height':this['_h']()};_0x321d11[_0xda59('0x3cc')][_0xda59('0x1e4')](this,_0x31a098['x'],_0x31a098['y'],_0x31a098[_0xda59('0x3d6')],_0x31a098[_0xda59('0x233')]);if($gameSystem[_0xda59('0x293')]('_isParamFuncCached'))this[_0xda59('0x250')]();},_0x406ca0['lineHeight']=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,this[_0xda59('0x20b')],_0xda59('0x201'));},_0x406ca0[_0xda59('0x3d8')]=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,this[_0xda59('0x147')],_0xda59('0x35e'));},_0x406ca0[_0xda59('0x179')]=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,this['_paddingParam'],_0xda59('0xf7'));},_0x406ca0['textPadding']=function(){return SATBManager[_0xda59('0x1c5')]['call'](this,this[_0xda59('0x3ff')],_0xda59('0x183'));},_0x406ca0[_0xda59('0x3d4')]=function(){return SATBManager['funcParam']['call'](this,this[_0xda59('0x118')],_0xda59('0x203'));},_0x406ca0[_0xda59('0x38d')]=function(){if(!SATBManager[_0xda59('0x252')]([this[_0xda59('0x2d')]]))return this['_updateProperty'](_0xda59('0x323'),![]);_0x321d11[_0xda59('0x38d')][_0xda59('0x1e4')](this),this[_0xda59('0x9')]();if($gameSystem[_0xda59('0x293')](_0xda59('0x13a'))){if(!this[_0xda59('0x323')])return;this[_0xda59('0x2be')](),this[_0xda59('0x115')]();}else this[_0xda59('0x2bc')]();},_0x406ca0['setIsEnabled']=function(_0x4946e1){if(this['_isEnabled']===_0x4946e1)return;this[_0xda59('0x40')]=_0x4946e1,this[_0xda59('0x250')]();},_0x406ca0['refresh']=function(){if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))return;delete this[_0xda59('0x1d3')],delete this[_0xda59('0x28')],delete this['_textY'],delete this['_winX'],delete this[_0xda59('0x3a5')],delete this[_0xda59('0x201')],delete this[_0xda59('0x187')],delete this['_winH'],delete this[_0xda59('0xf7')],delete this[_0xda59('0x183')],delete this[_0xda59('0x35e')],delete this[_0xda59('0x203')],delete this[_0xda59('0x337')],this[_0xda59('0x2a2')](_0xda59('0x323'),this[_0xda59('0x7')]()),this[_0xda59('0x371')](),this[_0xda59('0x6f')]();},_0x406ca0['_updateAll']=function(){},_0x406ca0[_0xda59('0x2bc')]=function(){this[_0xda59('0x2a2')](_0xda59('0x323'),this[_0xda59('0x7')]());if(!this[_0xda59('0x323')])return;this[_0xda59('0x371')](),this[_0xda59('0x6f')](),this['_updateWhenVisible'](),this['_procTouch']();},_0x406ca0['_formattedText']=function(){return console['warn'](_0xda59('0x366')+_0xda59('0x35a')+this[_0xda59('0x29e')]),'';},_0x406ca0[_0xda59('0x1c2')]=function(){return![];},_0x406ca0[_0xda59('0x20f')]=function(){console[_0xda59('0x206')](_0xda59('0x14f')+this[_0xda59('0x29e')]);},_0x406ca0[_0xda59('0x7')]=function(){return SATBManager['funcParam'][_0xda59('0x1e4')](this,this[_0xda59('0x25e')],_0xda59('0x1d3'));},_0x406ca0[_0xda59('0x371')]=function(){this[_0xda59('0x2a2')]('x',this['_x']()),this[_0xda59('0x2a2')]('y',this['_y']());},_0x406ca0['_x']=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,this[_0xda59('0x54')],_0xda59('0x2d0'));},_0x406ca0['_y']=function(){return SATBManager['funcParam'][_0xda59('0x1e4')](this,this[_0xda59('0xd7')],_0xda59('0x3a5'));},_0x406ca0[_0xda59('0x6f')]=function(){this['_updateProperty']('backOpacity',this['standardBackOpacity']());},_0x406ca0[_0xda59('0x2a2')]=function(_0x13b527,_0x2f9827){if(this[_0x13b527]!==_0x2f9827)this[_0x13b527]=_0x2f9827;},_0x406ca0['_updateText']=function(){var _0x48fc50=this[_0xda59('0x30a')](),_0x561648=this['_isCacheUpdated'](_0xda59('0xca'),this[_0xda59('0x40')]),_0x35dfcb=this[_0xda59('0x11')](_0xda59('0x2a6'),this[_0xda59('0x179')]()),_0x5ef278=this[_0xda59('0x11')]('_lastTextPadding',this['textPadding']()),_0x5eaf75=this[_0xda59('0x11')](_0xda59('0x30e'),this['standardFontSize']()),_0x796569=this[_0xda59('0x2d1')](),_0x58c8cb=this[_0xda59('0x11')](_0xda59('0x36e'),this[_0xda59('0x5c')]()),_0x3a41bc=this[_0xda59('0x11')](_0xda59('0x30'),this['lineHeight']());if(!_0x48fc50&&!_0x561648&&!_0x35dfcb&&!_0x5ef278&&!_0x5eaf75&&!_0x796569&&!_0x58c8cb&&!_0x3a41bc)return;this[_0xda59('0x38c')][_0xda59('0xf2')]();if(_0x48fc50)this['contents'][_0xda59('0x9c')](this[_0xda59('0x3d6')],this[_0xda59('0x233')]);if(_0x561648)this[_0xda59('0x34b')](this[_0xda59('0x40')]);if(_0x35dfcb)this[_0xda59('0x224')]();if(_0x5eaf75)this['resetFontSettings']();this[_0xda59('0x265')](this['_lastText'],this[_0xda59('0xe0')],this['_lastTextY'],this['textWidth'](this[_0xda59('0x36e')]),_0xda59('0x2e4'));},_0x406ca0['_isUpdateWH']=function(){var _0x1c16e3=this[_0xda59('0x11')](_0xda59('0x3d6'),this['_w']()),_0x2b0bfb=this[_0xda59('0x11')](_0xda59('0x233'),this['_h']());return _0x1c16e3||_0x2b0bfb;},_0x406ca0['_w']=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,this[_0xda59('0x1e9')],_0xda59('0x187'));},_0x406ca0['_h']=function(){return SATBManager['funcParam']['call'](this,this[_0xda59('0x1e6')],_0xda59('0x3e8'));},_0x406ca0[_0xda59('0x2d1')]=function(){var _0xfac528=this[_0xda59('0x11')](_0xda59('0xe0'),this[_0xda59('0x5b')]()),_0x58062e=this[_0xda59('0x11')]('_lastTextY',this['_textYOffset']());return _0xfac528||_0x58062e;},_0x406ca0[_0xda59('0x5b')]=function(){return SATBManager[_0xda59('0x1c5')]['call'](this,this[_0xda59('0x22b')],_0xda59('0x28'));},_0x406ca0[_0xda59('0x22')]=function(){return SATBManager['funcParam'][_0xda59('0x1e4')](this,this[_0xda59('0x214')],_0xda59('0xd4'));},_0x406ca0[_0xda59('0x11')]=function(_0x5a4120,_0x1400f9){var _0x4e2220=this[_0x5a4120]!==_0x1400f9;if(_0x4e2220)this[_0x5a4120]=_0x1400f9;return _0x4e2220;},_0x406ca0[_0xda59('0x115')]=function(){if(!this[_0xda59('0x1c2')]())return![];if(!TouchInput[_0xda59('0x2de')]()||!this['_isTouchedInsideFrame']())return;this['_onTouch']();},_0x406ca0[_0xda59('0x143')]=_0x4677ab[_0xda59('0x3ac')];}(),function(){'use strict';var _0xe688f5=Window_SATBBase[_0xda59('0x3f4')];Window_SATBForceRunCmd[_0xda59('0x3f4')]=Object[_0xda59('0xdd')](_0xe688f5);var _0x2d0251=Window_SATBForceRunCmd[_0xda59('0x3f4')];_0x2d0251[_0xda59('0x29e')]=Window_SATBForceRunCmd,_0x2d0251[_0xda59('0x3cc')]=function(_0x33320e){this[_0xda59('0x2ea')]=_0x33320e,_0xe688f5[_0xda59('0x3cc')][_0xda59('0x1e4')](this,{'lineHParam':'forceATBRunCmdWinLineH','textSizeParam':_0xda59('0x29b'),'paddingParam':'forceATBRunCmdWinPadding','textPaddingParam':_0xda59('0x1da'),'backOpacityParam':_0xda59('0x24c'),'moduleParam':_0xda59('0x3ba'),'isShowParam':_0xda59('0x2'),'winXParam':_0xda59('0x2f3'),'winYParam':_0xda59('0x1b8'),'winWParam':'forceATBRunCmdWinW','winHParam':_0xda59('0x354'),'textXParam':_0xda59('0x12d'),'textYParam':_0xda59('0x31b')});},_0x2d0251[_0xda59('0xf2')]=function(){delete this[_0xda59('0x2ea')],this[_0xda59('0x3f5')]();},_0x2d0251[_0xda59('0x250')]=function(){_0xe688f5['refresh'][_0xda59('0x1e4')](this);if($gameSystem['satbParam'](_0xda59('0x13a')))this[_0xda59('0x125')]();},_0x2d0251[_0xda59('0x9')]=function(){if(this[_0xda59('0x26a')]())this[_0xda59('0x20f')]();},_0x2d0251[_0xda59('0x2be')]=function(){if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))this[_0xda59('0x125')]();},_0x2d0251[_0xda59('0x5c')]=function(){return SATBManager['funcParam']['call'](this,_0xda59('0x2cc'),'_text');},_0x2d0251['_canTouch']=function(){return!![];},_0x2d0251[_0xda59('0x20f')]=function(){this['_isEnabled']?this[_0xda59('0x1fc')]():SoundManager['playBuzzer']();},_0x2d0251[_0xda59('0x1fc')]=function(){SoundManager[_0xda59('0x1eb')](),this[_0xda59('0x2ea')](),this[_0xda59('0x250')]();},_0x2d0251['_isForceRunKeyTriggered']=function(){return Input[_0xda59('0x2de')]($gameSystem[_0xda59('0x36a')](_0xda59('0x311'))());};}(),function(){'use strict';var _0x1c9ef9=Window_SATBBase[_0xda59('0x3f4')];Window_SATBForceStopCmd[_0xda59('0x3f4')]=Object[_0xda59('0xdd')](_0x1c9ef9);var _0x164248=Window_SATBForceStopCmd[_0xda59('0x3f4')];_0x164248[_0xda59('0x29e')]=Window_SATBForceStopCmd,_0x164248[_0xda59('0x3cc')]=function(_0x159f5d){this['_onForceStop']=_0x159f5d,_0x1c9ef9[_0xda59('0x3cc')][_0xda59('0x1e4')](this,{'lineHParam':'forceATBStopCmdWinLineH','textSizeParam':'forceATBStopCmdTextSize','paddingParam':'forceATBStopCmdWinPadding','textPaddingParam':_0xda59('0x37d'),'backOpacityParam':'forceATBStopCmdBackOpacity','moduleParam':_0xda59('0x3ba'),'isShowParam':_0xda59('0x36d'),'winXParam':_0xda59('0x99'),'winYParam':_0xda59('0x378'),'winWParam':_0xda59('0x327'),'winHParam':_0xda59('0x38f'),'textXParam':_0xda59('0x19e'),'textYParam':_0xda59('0x94')});},_0x164248[_0xda59('0xf2')]=function(){delete this[_0xda59('0x63')],this['close']();},_0x164248[_0xda59('0x250')]=function(){_0x1c9ef9['refresh'][_0xda59('0x1e4')](this);if($gameSystem[_0xda59('0x293')]('_isParamFuncCached'))this[_0xda59('0x125')]();},_0x164248[_0xda59('0x9')]=function(){if(this[_0xda59('0x348')]())this[_0xda59('0x20f')]();},_0x164248[_0xda59('0x2be')]=function(){if(!$gameSystem['satbParam'](_0xda59('0x13a')))this['_updateText']();},_0x164248[_0xda59('0x5c')]=function(){return SATBManager[_0xda59('0x1c5')]['call'](this,_0xda59('0x352'),_0xda59('0x337'));},_0x164248[_0xda59('0x1c2')]=function(){return!![];},_0x164248[_0xda59('0x20f')]=function(){this[_0xda59('0x40')]?this[_0xda59('0x1fc')]():SoundManager['playBuzzer']();},_0x164248[_0xda59('0x1fc')]=function(){SoundManager[_0xda59('0x1eb')](),this[_0xda59('0x63')](),this['refresh']();},_0x164248[_0xda59('0x348')]=function(){var _0x5bd90a=$gameSystem[_0xda59('0x36a')](_0xda59('0x6e'))();return Input['isTriggered'](_0x5bd90a);};}(),function(_0xbab8c9){'use strict';Window_SATBForceStatus['prototype']=Object[_0xda59('0xdd')](Window_SATBBase['prototype']);var _0x38b0e2=Window_SATBForceStatus[_0xda59('0x3f4')],_0x55c8bf=Window_SATBBase[_0xda59('0x3f4')],_0x470c63=_0xbab8c9[_0xda59('0x5a')]={};_0x38b0e2[_0xda59('0x29e')]=Window_SATBForceStatus,(_0x470c63[_0xda59('0x177')]=_0xda59('0x255'),_0x470c63[_0xda59('0x2bd')]=_0xda59('0x155')),_0x38b0e2[_0xda59('0x3cc')]=function(){this['_forceState']='',_0x55c8bf['initialize'][_0xda59('0x1e4')](this,{'lineHParam':'forceATBStatWinLineH','textSizeParam':_0xda59('0x52'),'paddingParam':'forceATBStatWinPadding','textPaddingParam':'forceATBStatTextPadding','backOpacityParam':_0xda59('0x129'),'moduleParam':_0xda59('0x3ba'),'isShowParam':'isShowForceATBStatWin','winXParam':_0xda59('0x39e'),'winYParam':_0xda59('0xc2'),'winWParam':_0xda59('0x285'),'winHParam':_0xda59('0x2ba'),'textXParam':_0xda59('0x1f0'),'textYParam':'forceATBStatTextYOffset'});},_0x38b0e2['refresh']=function(){_0x55c8bf[_0xda59('0x250')]['call'](this);if($gameSystem[_0xda59('0x293')](_0xda59('0x13a')))this[_0xda59('0x125')]();},_0x38b0e2[_0xda59('0x161')]=function(){return this[_0xda59('0x209')]===_0x470c63[_0xda59('0x177')];},_0x38b0e2['isForceStop']=function(){return this[_0xda59('0x209')]===_0x470c63[_0xda59('0x2bd')];},_0x38b0e2[_0xda59('0xbd')]=function(){this['_onForceStateChange'](_0xda59('0x3d1'),_0x470c63[_0xda59('0x177')]);},_0x38b0e2[_0xda59('0x17')]=function(){this[_0xda59('0x320')](_0xda59('0x161'),_0x470c63['_FORCE_STOP']);},_0x38b0e2[_0xda59('0x2be')]=function(){if(!$gameSystem[_0xda59('0x293')](_0xda59('0x13a')))this[_0xda59('0x125')]();},_0x38b0e2[_0xda59('0x5c')]=function(){return SATBManager[_0xda59('0x1c5')][_0xda59('0x1e4')](this,this[_0xda59('0x38e')](),'_text');},_0x38b0e2[_0xda59('0x38e')]=function(){switch(this['_forceState']){case _0x470c63['_FORCE_RUN']:return _0xda59('0x1b9');case _0x470c63[_0xda59('0x2bd')]:return'forceStopATBStatText';default:return _0xda59('0xb6');}},_0x38b0e2[_0xda59('0x320')]=function(_0x48ee77,_0x1afb0d){var _0x13d181=this['_forceState'];this['_forceState']=this[_0x48ee77]()?'':_0x1afb0d;if(_0x13d181!==this[_0xda59('0x209')])this[_0xda59('0x250')]();};}(DoubleX_RMMV[_0xda59('0xda')]),function(_0x5e2da9){'use strict';_0x5e2da9['Scene_Battle']={'orig':{},'new':{}};var _0x9b1719=_0x5e2da9[_0xda59('0x390')][_0xda59('0x2d6')],_0x241b3f=Scene_Battle[_0xda59('0x3f4')],_0x3e48ea=_0x5e2da9[_0xda59('0x390')][_0xda59('0x15e')],_0x4b9eb7=_0x5e2da9[_0xda59('0x21a')][_0xda59('0x15e')];_0x3e48ea[_0xda59('0x55')]=function(_0x5a376f){if(_0x5a376f[_0xda59('0x2dc')])_0x5a376f[_0xda59('0x3d')]();if(_0x5a376f[_0xda59('0x323')])_0x5a376f[_0xda59('0x7f')]();},_0x3e48ea[_0xda59('0x259')]=function(_0x337da6){return _0x337da6['visible'];},_0x3e48ea[_0xda59('0x9a')]=function(_0x428374,_0x5926a2){_0x428374[_0xda59('0x250')](),_0x5926a2[_0xda59('0xad')]();},_0x9b1719[_0xda59('0x3cc')]=_0x241b3f[_0xda59('0x3cc')],_0x3e48ea[_0xda59('0x3cc')]=_0x241b3f[_0xda59('0x3cc')]=function(){_0x9b1719[_0xda59('0x3cc')][_0xda59('0x68')](this,arguments),this[_0xda59('0x2e2')]={'atbForceState':_0x3e48ea[_0xda59('0x324')],'wasWinActive':{}};},_0x9b1719['updateBattleProcess']=_0x241b3f['updateBattleProcess'],_0x3e48ea[_0xda59('0x3af')]=_0x241b3f[_0xda59('0x3af')]=function(){if(SATBManager[_0xda59('0x254')]())return _0x3e48ea[_0xda59('0x213')]['call'](this);_0x9b1719[_0xda59('0x3af')][_0xda59('0x68')](this,arguments);},_0x9b1719[_0xda59('0x18')]=_0x241b3f[_0xda59('0x18')],_0x3e48ea[_0xda59('0x18')]=_0x241b3f[_0xda59('0x18')]=function(){_0x3e48ea[_0xda59('0x2a5')][_0xda59('0x1e4')](this),_0x9b1719[_0xda59('0x18')][_0xda59('0x68')](this,arguments);},_0x9b1719[_0xda59('0x32c')]=_0x241b3f[_0xda59('0x32c')],_0x3e48ea[_0xda59('0x32c')]=_0x241b3f[_0xda59('0x32c')]=function(){_0x9b1719[_0xda59('0x32c')][_0xda59('0x68')](this,arguments);if(!_0x3e48ea[_0xda59('0x1bb')][_0xda59('0x1e4')](this))return;this[_0xda59('0xa4')]['x']=this[_0xda59('0x5e')]['x'];},_0x9b1719[_0xda59('0x20d')]=_0x241b3f['createAllWindows'],_0x3e48ea[_0xda59('0x20d')]=_0x241b3f[_0xda59('0x20d')]=function(){_0x9b1719[_0xda59('0x20d')]['apply'](this,arguments),this[_0xda59('0x2e2')][_0xda59('0x1e2')]=new Window_SATBForceStatus(),this[_0xda59('0x14')](this[_0xda59('0x2e2')][_0xda59('0x1e2')]),this[_0xda59('0x2e2')]['forceRunCmdWin']=new Window_SATBForceRunCmd(_0x3e48ea[_0xda59('0x2ea')][_0xda59('0x1a9')](this)),this[_0xda59('0x14')](this[_0xda59('0x2e2')]['forceRunCmdWin']),this['_satb'][_0xda59('0x1cd')]=new Window_SATBForceStopCmd(_0x3e48ea[_0xda59('0x63')][_0xda59('0x1a9')](this)),this[_0xda59('0x14')](this[_0xda59('0x2e2')][_0xda59('0x1cd')]);},_0x9b1719[_0xda59('0x1c6')]=_0x241b3f[_0xda59('0x1c6')],_0x3e48ea[_0xda59('0x1c6')]=_0x241b3f[_0xda59('0x1c6')]=function(){_0x9b1719[_0xda59('0x1c6')][_0xda59('0x68')](this,arguments);var _0x3fb7f5=$gameSystem['satbParamFunc'](_0xda59('0x1a3'))();_0x3fb7f5[_0xda59('0x124')](_0x3e48ea[_0xda59('0x27e')],this);var _0x33a414=$gameSystem[_0xda59('0x36a')](_0xda59('0x15b'))();_0x33a414[_0xda59('0x124')](_0x3e48ea[_0xda59('0x6d')],this),_0x3fb7f5=$gameSystem['satbParamFunc'](_0xda59('0x384'))(),_0x3fb7f5[_0xda59('0x124')](_0x3e48ea['_createCancelCooldownHotkey'],this);},_0x9b1719[_0xda59('0x137')]=_0x241b3f[_0xda59('0x137')],_0x3e48ea['createActorCommandWindow']=_0x241b3f[_0xda59('0x137')]=function(){_0x9b1719['createActorCommandWindow']['apply'](this,arguments);var _0x106b24=$gameSystem[_0xda59('0x36a')](_0xda59('0x122'))();this[_0xda59('0x2ff')]['setHandler'](_0x106b24,_0x3e48ea[_0xda59('0x397')][_0xda59('0x1a9')](this,-0x1));var _0x559544=$gameSystem[_0xda59('0x36a')](_0xda59('0xf3'))();this[_0xda59('0x2ff')][_0xda59('0x23f')](_0x559544,_0x3e48ea[_0xda59('0x397')][_0xda59('0x1a9')](this,0x1));var _0x4cf2a2=$gameSystem[_0xda59('0x36a')](_0xda59('0x210'))();_0x4cf2a2[_0xda59('0x124')](_0x3e48ea[_0xda59('0x160')],this);},_0x9b1719[_0xda59('0x110')]=_0x241b3f[_0xda59('0x110')],_0x3e48ea[_0xda59('0x110')]=_0x241b3f[_0xda59('0x110')]=function(){this[_0xda59('0x3a0')](),_0x9b1719[_0xda59('0x110')][_0xda59('0x68')](this,arguments);},_0x9b1719[_0xda59('0x34a')]=_0x241b3f[_0xda59('0x34a')],_0x3e48ea[_0xda59('0x34a')]=_0x241b3f['commandFight']=function(){if(SATBManager[_0xda59('0x254')]())return _0x3e48ea[_0xda59('0x9f')][_0xda59('0x1e4')](this);_0x9b1719[_0xda59('0x34a')][_0xda59('0x68')](this,arguments);},_0x9b1719[_0xda59('0x29c')]=_0x241b3f['commandEscape'],_0x3e48ea[_0xda59('0x29c')]=_0x241b3f['commandEscape']=function(){if(!BattleManager[_0xda59('0x73')](this))return this['startPartyCommandSelection']();_0x9b1719[_0xda59('0x29c')][_0xda59('0x68')](this,arguments);},_0x9b1719[_0xda59('0x241')]=_0x241b3f[_0xda59('0x241')],_0x3e48ea[_0xda59('0x241')]=_0x241b3f[_0xda59('0x241')]=function(){if(SATBManager[_0xda59('0x254')]())return _0x3e48ea['_selectNextCmd'][_0xda59('0x1e4')](this);_0x9b1719[_0xda59('0x241')]['apply'](this,arguments);},[_0xda59('0x231'),_0xda59('0x3c5'),_0xda59('0x2b5'),_0xda59('0x34d'),_0xda59('0x260'),_0xda59('0x3bb'),'onItemOk',_0xda59('0x2c9')][_0xda59('0x124')](function(_0x20751e){_0x9b1719[_0x20751e]=_0x241b3f[_0x20751e],_0x3e48ea[_0x20751e]=_0x241b3f[_0x20751e]=function(){if(!BattleManager[_0xda59('0x171')]())return;_0x9b1719[_0x20751e][_0xda59('0x68')](this,arguments);};}),_0x241b3f[_0xda59('0x37c')]=function(){if(!SATBManager['areModulesEnabled'](['IsWaitEnabled']))return!![];if(this[_0xda59('0x2e2')][_0xda59('0x1e2')][_0xda59('0x161')]())return!![];if(this[_0xda59('0x2e2')][_0xda59('0x1e2')]['isForceStop']())return![];return!$gameSystem[_0xda59('0x36a')](_0xda59('0x33'))[_0xda59('0x1e4')](this);},_0x241b3f[_0xda59('0x61')]=function(){_0x3e48ea[_0xda59('0xaa')][_0xda59('0x1e4')](this),_0x3e48ea[_0xda59('0x3b')][_0xda59('0x1e4')](this),_0x3e48ea[_0xda59('0x2d2')][_0xda59('0x1e4')](this),this[_0xda59('0x2e2')][_0xda59('0x1cc')][_0xda59('0xf2')](),this[_0xda59('0x14a')](this[_0xda59('0x2e2')][_0xda59('0x1cc')]),delete this[_0xda59('0x2e2')][_0xda59('0x1cc')],this[_0xda59('0x2e2')]['forceStopCmdWin']['clear'](),this[_0xda59('0x14a')](this[_0xda59('0x2e2')][_0xda59('0x1cd')]),delete this[_0xda59('0x2e2')]['forceStopCmdWin'],this[_0xda59('0x2e2')][_0xda59('0x1e2')][_0xda59('0x3f5')](),this[_0xda59('0x14a')](this[_0xda59('0x2e2')]['forceStatusWin']),delete this[_0xda59('0x2e2')][_0xda59('0x1e2')];},_0x241b3f[_0xda59('0x3a0')]=function(){if(!SATBManager[_0xda59('0x254')]())return;if(this['_satb'][_0xda59('0x1cc')])this[_0xda59('0x2e2')][_0xda59('0x1cc')]['refresh']();if(this[_0xda59('0x2e2')][_0xda59('0x1cd')])this[_0xda59('0x2e2')][_0xda59('0x1cd')][_0xda59('0x250')]();if(this[_0xda59('0x2e2')][_0xda59('0x1e2')])this[_0xda59('0x2e2')][_0xda59('0x1e2')][_0xda59('0x250')]();if(this[_0xda59('0xa4')][_0xda59('0x323')])return _0x3e48ea[_0xda59('0x9a')](this[_0xda59('0xa4')],this[_0xda59('0x3aa')]);else{if(this[_0xda59('0x3aa')][_0xda59('0x323')])return _0x3e48ea[_0xda59('0x9a')](this[_0xda59('0x3aa')],this['_actorWindow']);}this[_0xda59('0xa4')]['deselect'](),this[_0xda59('0x3aa')][_0xda59('0xad')]();if(this['_skillWindow'][_0xda59('0x323')])return this['_skillWindow']['refresh']();if(this[_0xda59('0x7a')][_0xda59('0x323')])return this['_itemWindow'][_0xda59('0x250')]();if(this[_0xda59('0x2ff')][_0xda59('0x2dc')])this[_0xda59('0x2ff')][_0xda59('0x250')]();},_0x241b3f[_0xda59('0x31c')]=function(){if(this['_satb'][_0xda59('0x3fc')])return;this[_0xda59('0x2e2')][_0xda59('0x3fc')]=!![],_0x3e48ea[_0xda59('0x246')][_0xda59('0x1e4')](this),this[_0xda59('0x2e2')][_0xda59('0x3fc')]=![];},_0x3e48ea[_0xda59('0x213')]=function(){BattleManager[_0xda59('0x1e8')]();if(BattleManager[_0xda59('0x283')]())_0x3e48ea[_0xda59('0x19')]['call'](this);},_0x3e48ea[_0xda59('0x19')]=function(){if(!this[_0xda59('0x3f0')][_0xda59('0x2dc')])return;var _0x39eab6=BattleManager[_0xda59('0x73')]();if(this[_0xda59('0x2e2')][_0xda59('0x235')]===_0x39eab6)return;this[_0xda59('0x2e2')]['canLastEsc']=_0x39eab6,this[_0xda59('0x3f0')][_0xda59('0x250')]();},_0x3e48ea['_updateInputWins']=function(){if(!SATBManager[_0xda59('0x254')]())return;var _0x30303e=_0x3e48ea[_0xda59('0x1ae')][_0xda59('0x1e4')](this);if(this[_0xda59('0x2e2')][_0xda59('0x2ab')]===_0x30303e)return;this[_0xda59('0x2e2')][_0xda59('0x2ab')]=_0x30303e;if(_0x30303e)return _0x3e48ea['_displayWins'][_0xda59('0x1e4')](this);[_0xda59('0xa4'),_0xda59('0x3aa'),'_skillWindow',_0xda59('0x7a')]['forEach'](_0x3e48ea[_0xda59('0x2f8')],this);},_0x3e48ea[_0xda59('0x1ae')]=function(){if($gameMessage['isBusy']())return![];return this[_0xda59('0x12f')]()&&!this[_0xda59('0x2ad')][_0xda59('0x2b1')]();},_0x3e48ea[_0xda59('0x6b')]=function(){if(!BattleManager['actor']())return _0x3e48ea['_displayWinWithNoInputtingActor'][_0xda59('0x1e4')](this);this[_0xda59('0x2ff')]['open']();var _0x54ecd6=this['_satb'][_0xda59('0x82')];if(_0x54ecd6[_0xda59('0xa4')])return this['selectActorSelection']();if(_0x54ecd6[_0xda59('0x3aa')])return this[_0xda59('0x14e')]();if(_0x54ecd6[_0xda59('0x19d')])return this[_0xda59('0x3c5')]();if(_0x54ecd6[_0xda59('0x7a')])return this[_0xda59('0xe9')]();this[_0xda59('0x2b9')]();},_0x3e48ea[_0xda59('0x305')]=function(){if(this[_0xda59('0x3f0')][_0xda59('0x2dc')])this[_0xda59('0x3f0')][_0xda59('0xe2')]();},_0x3e48ea[_0xda59('0x2f8')]=function(_0x186408){var _0x5c1754=this[_0x186408],_0x4ee43a=_0x5c1754['active'];this[_0xda59('0x2e2')][_0xda59('0x82')][_0x186408]=_0x4ee43a,_0x5c1754[_0xda59('0x3d')](),_0x5c1754[_0xda59('0x7f')]();},_0x3e48ea[_0xda59('0x1bb')]=function(){if(!SATBManager[_0xda59('0x254')]())return![];if(!this[_0xda59('0xa4')][_0xda59('0x323')])return![];return this[_0xda59('0xa4')]['x']!==this[_0xda59('0x5e')]['x'];},_0x3e48ea['_onForceRun']=function(){this[_0xda59('0x2e2')][_0xda59('0x1cd')]['setIsEnabled'](!![]),this[_0xda59('0x2e2')]['forceStatusWin'][_0xda59('0xbd')]();if(!this[_0xda59('0x2e2')][_0xda59('0x1e2')][_0xda59('0x161')]())return;this[_0xda59('0x2e2')][_0xda59('0x1cc')][_0xda59('0x58')](![]);},_0x3e48ea['_onForceStop']=function(){this[_0xda59('0x2e2')]['forceRunCmdWin']['setIsEnabled'](!![]),this[_0xda59('0x2e2')][_0xda59('0x1e2')][_0xda59('0x17')]();if(!this['_satb'][_0xda59('0x1e2')]['isForceStop']())return;this['_satb'][_0xda59('0x1cd')][_0xda59('0x58')](![]);},_0x3e48ea[_0xda59('0x27e')]=function(_0x5eb858,_0x2b97fa){this[_0xda59('0x5e')][_0xda59('0x349')](_0x5eb858,[$gameParty[_0xda59('0x29d')][_0xda59('0x1a9')]($gameParty,_0x2b97fa)]);},_0x3e48ea[_0xda59('0x6d')]=function(_0x492ba6,_0x217bb3){var _0x66dbe1=_0x4b9eb7[_0xda59('0xf')](_0x492ba6);this[_0xda59('0x5e')]['setHandler'](_0x66dbe1,$gameParty[_0xda59('0x8e')][_0xda59('0x1a9')]($gameParty,_0x217bb3));var _0x354964=_0x4b9eb7[_0xda59('0x358')](_0x492ba6);this['_statusWindow'][_0xda59('0x23f')](_0x354964,$gameParty[_0xda59('0x192')][_0xda59('0x1a9')]($gameParty,_0x217bb3));},_0x3e48ea[_0xda59('0x1a0')]=function(_0x95c8b3,_0x898c70){this[_0xda59('0x5e')][_0xda59('0x349')](_0x95c8b3,[$gameParty['onTryCancelActorCooldownSATB'][_0xda59('0x1a9')]($gameParty,_0x898c70)]);},_0x3e48ea[_0xda59('0x397')]=function(_0x4ccfe5){var _0x2bf125=$gameParty[_0xda59('0x154')]();if(!SATBManager[_0xda59('0x21e')](_0x2bf125))return SoundManager['playBuzzer']();_0x3e48ea[_0xda59('0x1fd')][_0xda59('0x1e4')](this,_0x4ccfe5,_0x2bf125);},_0x3e48ea[_0xda59('0x1fd')]=function(_0x2eaad8,_0x4a95a1){SoundManager['playCursor']();var _0x3976ca=SATBManager[_0xda59('0x1d4')](_0x2eaad8,_0x4a95a1);_0x3e48ea[_0xda59('0x322')][_0xda59('0x1e4')](this,_0x3976ca);},_0x3e48ea['_createActorCmdIndexHotkey']=function(_0x8a21dc,_0x1b6769){this['_actorCommandWindow'][_0xda59('0x23f')](_0x8a21dc,_0x3e48ea[_0xda59('0x182')][_0xda59('0x1a9')](this,_0x1b6769));},_0x3e48ea[_0xda59('0x182')]=function(_0x369a44){var _0x46b23e=$gameParty[_0xda59('0xb')]()[_0x369a44];if($gameParty['isUnselectedSATBInputableActor'](_0x46b23e))return _0x3e48ea[_0xda59('0x17e')][_0xda59('0x1e4')](this,_0x369a44);SoundManager[_0xda59('0x335')]();},_0x3e48ea[_0xda59('0x17e')]=function(_0x262b28){SoundManager[_0xda59('0x26e')](),_0x3e48ea['_onSelectActor'][_0xda59('0x1e4')](this,_0x262b28);},_0x3e48ea[_0xda59('0x9f')]=function(){var _0x1fdffb=$gameParty[_0xda59('0x154')]();_0x3e48ea[_0xda59('0x322')][_0xda59('0x1e4')](this,_0x1fdffb[0x0]);},_0x3e48ea[_0xda59('0x9e')]=function(){BattleManager[_0xda59('0x241')]();if(BattleManager[_0xda59('0x1d7')]()&&BattleManager[_0xda59('0x151')]())return this['startActorCommandSelection']();this[_0xda59('0xcf')]();},_0x3e48ea[_0xda59('0x246')]=function(){var _0x4e59aa=$gameParty[_0xda59('0x154')](),_0x20a240=this[_0xda59('0x5e')][_0xda59('0x3a1')]();if(_0x4e59aa['contains'](_0x20a240))return;if(_0x20a240>=0x0)return _0x3e48ea[_0xda59('0x1cf')]['call'](this);var _0x2abcbb=_0x4e59aa[_0xda59('0x286')]<=0x0;if(this[_0xda59('0x3f0')][_0xda59('0x2dc')])return _0x3e48ea[_0xda59('0x70')][_0xda59('0x1e4')](this,_0x2abcbb);if(_0x2abcbb)return;_0x3e48ea[_0xda59('0x322')][_0xda59('0x1e4')](this,_0x4e59aa[0x0]);},_0x3e48ea[_0xda59('0x1cf')]=function(){_0x3e48ea[_0xda59('0xaa')][_0xda59('0x1e4')](this),_0x3e48ea['_closeDeactivateActorCmdWin'][_0xda59('0x1e4')](this),_0x3e48ea[_0xda59('0x211')][_0xda59('0x1e4')](this)['some'](_0x3e48ea[_0xda59('0x259')])&&this[_0xda59('0x5e')]['open'](),this[_0xda59('0x5e')][_0xda59('0xad')]();},_0x3e48ea[_0xda59('0xaa')]=function(){_0x3e48ea[_0xda59('0x211')][_0xda59('0x1e4')](this)[_0xda59('0x124')](_0x3e48ea[_0xda59('0x55')]);},_0x3e48ea[_0xda59('0x3b')]=function(){this['_actorCommandWindow'][_0xda59('0x3f5')](),this[_0xda59('0x2ff')][_0xda59('0x3d')]();},_0x3e48ea['_selectionWins']=function(){return[this[_0xda59('0xa4')],this[_0xda59('0x3aa')],this[_0xda59('0x19d')],this['_itemWindow']];},_0x3e48ea['_updateActivePartyCmdWin']=function(_0x4646c9){if(_0x4646c9)_0x3e48ea[_0xda59('0x2d2')][_0xda59('0x1e4')](this);},_0x3e48ea[_0xda59('0x2d2')]=function(){this[_0xda59('0x3f0')][_0xda59('0x3f5')](),this[_0xda59('0x3f0')]['deactivate']();},_0x3e48ea[_0xda59('0x322')]=function(_0x5e625c){BattleManager[_0xda59('0x2fe')](_0x5e625c,_0xda59('0x17b')),this[_0xda59('0x2b9')]();};}(DoubleX_RMMV[_0xda59('0xda')]));