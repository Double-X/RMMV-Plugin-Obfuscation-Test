This repository tests the idea of obfuscating the plugin implementation codes, then only exposes(with minifying then deminifying) the directly relevant parts of the user requests involved(of course, only those needing accesses to the implementations should be entertained).
The supposed workflow of revealing parts of codes is as follows:
1. Users asks plugin developers to make some tunes and tweaks on the plugins but failed to do so(goes to 2)
2. If such tunes and tweaks can be done by editing parameters/configurations/notetags/script calls/plugin commands, then teach those users to do so, otherwise go to 3
3. If these tunes and tweaks are(after considering all factors) worthwhile to be supported by the plugins directly, then upgrade the plugins to support them, otherwise go to 4
4. If these tunes and tweaks can be independent from the plugins, then teach those users to make those workarounds, otherwise go to 5
5. Gives the minimum amount of relevant codes to the users, and ensures those codes won't work without the rest of the plugins
If you think you've successfully deobfuscated the whole thing, please submit your fully deobfuscated version via a pull request :)
