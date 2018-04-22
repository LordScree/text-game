/*
 * Map layout:
 * 
 * An area is divided into multiple zones.
 * Each zone is a coordinate in a 2D matrix, e.g.:
 * [0,0] [0,1] [0,2] [0,3] [0,4]
 * [1,0] [1,1] [1,2] [1,3] [1,4]
 * [2,0] [2,1] [2,2] [2,3] [2,4]
 * [3,0] [3,1] [3,2] [3,3] [3,4]
 * [4,0] [4,1] [4,2] [4,3] [4,4]
 * 
 * Zone exits (to another zone) denoted by flags enum "Direction":
 * 0 = None
 * 1 = North
 * 2 = East
 * 4 = South
 * 8 = West
 * 
 * Example area, showing the exits for each zone:
 * 
 * |  ^  |     |
 * |     |     |
 * |  v  |_ _ _|
 * |  ^  |     |
 * |    >|<    |
 * |     |  v  |
 * 
 * This would become (as numeric exit values):
 * 
 * [5][0]
 * [3][12]
 * 
 * See below another example...
 * NOTE 1: 3,1, although inaccessible from within this area could be accessible vertically via a zone in another area... 
 *         Haven't really thought about how this might work yet - possibly additional enum values for up/down?
 * NOTE 2: There are horizontal entrances/exits from this zone at 0,0, 0,3 and 4,4.
 * NOTE 3: 1,0 and 3,1 are inaccessible and have no exits. That's fine.
 * 
 *  ^                         
 * [05]  [00]  [04]  [02]><[12]
 *  ^v          ^v          ^v 
 * [03]><[10]><[13]  [00]  [05]
 *              ^v          ^v 
 * [06]><[10]><[15]><[14]><[13]
 *   v          ^v    ^v    ^v 
 *<[12] <[08]  [05]  [01]  [05]
 *  ^v          ^v          ^v 
 * [03]><[10]><[09]  [02]><[13]
 *                           v 
 * 
 * A map has:
 *  - A name. 
 *  - N areas.
 * Each area has: 
 *  - A name.
 *  - A matrix of zones (with equal sides - e.g. 2x2, 3x3, 5x5, 50x50, etc.. Remember: not all zones have to be accessible).
 * Each zone has:
 *  - A name.
 *  - A numeric value denoting the exits from that zone.
 */

const direction = {
    none: 0,
    north: 1,
    east: 2,
    south: 4,
    west: 8
}

var gameMap = function (name) {
    if (!name) {
        throw "Name is required!"
    }

    this._name = name
    this._areas = []

    this.getAreas = function () {
        return this._areas
    }

    this.addArea = function (area) {
        if(!area) {
            throw "Area is required!"
        }
        if(!(area.constructor === gameArea)) {
            throw "Area must be a gameArea!"
        }
        if(area.length < 1) {
            throw "Area must be non-empty!"
        }
        this._areas.push(area)
    }

    this.getName = function () {
        return this._name
    }
}

var gameArea = function (name, size) {
    if (!name) {
        throw "Name is required!"
    }
    if (!size) {
        throw "Size is required!"
    }
    if (!Number.isInteger(size)) {
        throw "Size must be an integer!"
    }

    this._name = name
    this._zones = Array(size).fill(Array(size))
    this._initialized = false

    this.getName = function () {
        return this._name
    }

    this.setZones = function (zones) {
        if(!zones) {
            throw "Zones is required!"
        }
        if(!(zones.constructor === Array)){
            throw "Zones must be a gameZone[]!"
        }
        if(!zones.length === this._zones.length) {
            throw "Zones x dimension doesn't equal expected length: " + _zones.length + "!"
        }
        if(!zones[0].length === this._zones[0].length) {
            throw "Zones y dimension doesn't equal expected length: " + _zones[0].length + "!"
        }
        // TODO: Find some elegant way of checking that all dimensions are fine (e.g. without looping through the whole matrix).
        this._zones = zones
    }

    this.getZones = function () {
        return this._zones
    }

    this.getZoneAtCoords = function (x, y) {
        if (this._zones.length >= x) {
            throw "X is too large!"
        }
        if (this._zones[x].length >= y) {
            throw "Y is too large!"
        }

        return this._zones[x][y]
    }

    this.validateZones = function () {
        throw "Not yet implemented!"
    }
}

var gameZone = function (name, exits) {
    if(!name) {
        throw "Name is required!"
    }
    if(!Number.isInteger(exits)) {
        throw "Exits must be an integer!"
    }

    this._name = name
    this._exits = exits

    this.getName = function () {
        return this._name
    }

    this.getExits = function () {
        return this._exits
    }
}

module.exports.direction = direction
module.exports.gameMap = gameMap
module.exports.gameArea = gameArea
module.exports.gameZone = gameZone
