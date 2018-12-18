//Defaults
let sysmsg=false, //display system messages for ids (Default false)  
	enabled=true //default enable/disable module

module.exports = function mobidfinder(dispatch) {
	
	let idlist=new Map()
	
	dispatch.command.add('mobid', () => {
			enabled = !enabled
			if(!enabled) idlist.clear()
			dispatch.command.message(enabled ? 'Mob ID finder Enabled. Kill the mob and ids should be displayed.' : 'Mob ID finder Disabled')
	})
	
	dispatch.command.add('mobidsysmsg', () => {
			sysmsg = !sysmsg
			dispatch.command.message(`Mob ID sysmsg ${sysmsg ? 'enabled' :'disabled'}`)
	})
	
	dispatch.hook('S_SPAWN_NPC', 10, event => {
		if(enabled) idlist.set(event.gameId,`${event.huntingZoneId}_${event.templateId}`);
	})
	
	dispatch.hook('S_DESPAWN_NPC', 3,event => {
		if(enabled && event.type===5) {
			if(idlist.has(event.gameId)) {     
				console.log(`Monster id (huntingZoneId_templateId): ${idlist.get(event.gameId)}`)
				if(sysmsg) dispatch.command.message(`Monster id (huntingZoneId_templateId): ${idlist.get(event.gameId)}`)
				idlist.delete(event.gameId)
			}
		}			
	})
	
	dispatch.hook('S_LOAD_TOPO', "raw",event => {
		idlist.clear()
	})
}

