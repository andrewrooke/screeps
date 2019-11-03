var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.task == 'load') {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
                else if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
                    creep.moveTo(sources[0]);
                }
            }
            else {
                    creep.memory.task = 'repair';
                }
        }
        else {
            var con_targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var rep_wall_targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            rep_wall_targets.sort((a,b) => a.hits - b.hits);
            if(con_targets.length > 0 && creep.store[RESOURCE_ENERGY] > 0) {
                if(creep.build(con_targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(con_targets[0]);
                }
            }
            else if(rep_wall_targets.length > 0 && creep.store[RESOURCE_ENERGY] > 0) {
                if(creep.repair(rep_wall_targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(rep_wall_targets[0]);
                }
            }
            else if (creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.task = 'load';
            }
        }
    }
};

module.exports = roleRepairer;

