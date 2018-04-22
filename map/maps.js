const engine = require('./engine');

var map1 = new engine.gameMap("Example Starter Map")

var area1 = new engine.gameArea("Area 000", 2)
area1.setZones([
    [
        new engine.gameZone("Zone 0,0", engine.direction.south), 
        new engine.gameZone("Zone 0,1", engine.direction.none)
    ],
    [
        new engine.gameZone("Zone 1,0", engine.direction.north | engine.direction.east), 
        new engine.gameZone("Zone 1,1", engine.direction.west | engine.direction.south)
    ]
])
map1.addArea(area1)

var area2zones = [
    [
        new engine.gameZone("Zone 0,0", 5),
        new engine.gameZone("Zone 0,1", 0),
        new engine.gameZone("Zone 0,2", 4),
        new engine.gameZone("Zone 0,3", 2),
        new engine.gameZone("Zone 0,4", 12)
    ],
    [
        new engine.gameZone("Zone 1,0", 3),
        new engine.gameZone("Zone 1,1", 10),
        new engine.gameZone("Zone 1,2", 13),
        new engine.gameZone("Zone 1,3", 0),
        new engine.gameZone("Zone 1,4", 5)
    ],
    [
        new engine.gameZone("Zone 2,0", 5),
        new engine.gameZone("Zone 2,1", 10),
        new engine.gameZone("Zone 2,2", 15),
        new engine.gameZone("Zone 2,3", 14),
        new engine.gameZone("Zone 2,4", 13)
    ],
    [
        new engine.gameZone("Zone 3,0", 12),
        new engine.gameZone("Zone 3,1", 8),
        new engine.gameZone("Zone 3,2", 5),
        new engine.gameZone("Zone 3,3", 1),
        new engine.gameZone("Zone 3,4", 5)
    ],
    [
        new engine.gameZone("Zone 4,0", 3),
        new engine.gameZone("Zone 4,1", 10),
        new engine.gameZone("Zone 4,2", 9),
        new engine.gameZone("Zone 4,3", 2),
        new engine.gameZone("Zone 4,4", 13)
    ]
]

var area2 = new engine.gameArea("Area 001", 5)
area2.setZones(area2zones)

map1.addArea(area2)

// Global scope?
var maps = [map1]

module.exports.getMapByName = function getMapByName(mapName) {
    return maps.find(m => m.getName() === mapName)
}

module.exports.addMap = function (newMap) {
    maps.push(newMap)
}
