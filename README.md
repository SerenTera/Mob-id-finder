# Mob-id-finder
Easy way to find a mob's huntingZoneId and templateId by killing the mob

If you know the name of the mob, you can find it easily from datacenter, or shinra's data files. Else use this if you have no idea whats the name of the mob

Written quickly, might have bugs, but it should serve its purpose. Module is by default enabled, so change the defaults in index.js to avoid spamming your console, or better yet, remove module after you are done getting the ids.

Requires Commands module by Pinkie-Pie

## Commands
- mobid: toggles the enabling/disabling of this module (default is enabled). 

- mobidsysmsg: toggles whether to display the ids in ingame chat or not. Default is disabled.

## Instruction
After making sure this module is enabled, load the target mob onto your screen and then kill it (strongly suggest you only hit that target mob). The killed mob huntingZoneId and templateId ids will be displayed on the console (command prompt) by default. Then just use it for warnme or whatever other module.

If only killing the target mob is not possible, then just kill 2 or more of the same surrounding mobs and look for the id which is the odd one out or something.

Remember to remove this module after you are done getting the ids
