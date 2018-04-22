
var test = require('tape')
var engine = require('../map/engine')
var maps = require('../map/maps')


test('Map "Example Starter Map"', function(t){
    t.plan(7)

    var mapName = "Example Starter Map"
    var exampleMap = maps.getMapByName(mapName)

    t.true(exampleMap, 'Example map exists')
    
    var areas = exampleMap.getAreas()
    t.true(areas, 'Example map has areas')

    var actual = areas.length
    var expected = 2 // we expect the example map to have 2 areas.
    t.equal(actual, expected, 'Example map has two areas')

    var zones = areas[0].getZones()
    t.true(zones, 'Zones exists')

    var actual2 = zones.length
    expected = 2 // we expect the first example zone to be a matrix of size 2...
    t.equal(actual2, expected, 'First example zone is size 2...')

    var actual3 = zones[0].length
    expected = 2
    t.equal(actual3, expected, 'First example zone [0] is size 2...')

    var actual4 = zones[0][0].getExits()
    expected = engine.direction.south
    t.equal(actual4, expected, 'First example zone 0,0 exits south')
})

test('Multiple directions', function(t){
    t.plan(4)

    var northAndEast = engine.direction.north | engine.direction.east
    t.equal(northAndEast, 3, "North and East should be 3")
    var southAndWest = engine.direction.south | engine.direction.west
    t.equal(southAndWest, 12, "South and West should be 12")
    t.equal((southAndWest & engine.direction.south), engine.direction.south, "South and West OR South should be South")
    t.equal(((southAndWest & engine.direction.north) === engine.direction.north), false, "South and West OR North should not be North")
})

test('Direction', function(t){
    t.plan(5)

    t.equal(engine.direction.none, 0, "None should be 0")
    t.equal(engine.direction.north, 1, "North should be 1")
    t.equal(engine.direction.east, 2, "East should be 2")
    t.equal(engine.direction.south, 4, "South should be 4")
    t.equal(engine.direction.west, 8, "West should be 8")
})
