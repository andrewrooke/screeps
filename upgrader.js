var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.task == 'pickup') {
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
                    creep.memory.task = 'dropoff';
                }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            else if (creep.store[RESOURCE_ENERGY] > 0) {
                creep.upgradeController(creep.room.controller);
            }
            else {
                creep.memory.task = 'pickup';
            }
        }
    }
};

module.exports = roleUpgrader;