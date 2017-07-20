const Command = require('command')

//Defaults
let sysmsg=false, //display system messages for ids (Default false)  
	enabled=true //default enable/disable module

module.exports = function mobidfinder(dispatch) {
	const command = Command(dispatch)
	
	let idlist=[],
		targetlist=[],
		index
	
	command.add('mobid', () => {
		if(enabled) {
			enabled=false,
			command.message('Mob ID finder Disabled')
		}
		else
			enabled=true,
			command.message('Mob ID finder Enabled. Kill the mob and ids should be displayed.')
	})
	
	command.add('mobidsysmsg', () => {
		if(sysmsg) {
			sysmsg=false,
			command.message('Mob ID sysmsg disabled')
		}
		else
			sysmsg=true,
			command.message('Mob ID sysmsg enabled')
	})
	
	dispatch.hook('S_SPAWN_NPC', 3, event => {
		if(enabled) {
			idlist.push(event.huntingZoneId,event.templateId),
			targetlist.push(event.id.low)
		}
	})
	
	dispatch.hook('S_DESPAWN_NPC', 1,event => {
		if(enabled && event.type===5) {
			index=targetlist.indexOf(event.target.low)*2
			if(index!==-2) {     
				console.log('Monster id: huntingZoneId:' + idlist[index] +' templateId:'+idlist[index+1])
				if(sysmsg) command.message('Monster id: huntingZoneId:' + idlist[index] +' templateId:'+idlist[index+1])
			}
		}
		else if(enabled && event.type===1) {
			index=targetlist.indexOf(event.target.low)
			if(index!==-1) {
				targetlist.splice(index,1),
				idlist.splice(index*2,2)
			}
		}	
	})
	
	dispatch.hook('S_LOAD_TOPO', 1,event => {
		idlist=[],
		targetlist=[]
	})
}
