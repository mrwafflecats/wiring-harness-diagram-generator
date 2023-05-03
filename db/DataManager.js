const { func } = require('joi')
const Joi = require('joi')

//that moment when you realize your data structure is ass and redundant

const schema = Joi.object().keys({
    id: Joi.number().required(),
    pin: {
        pinNum: Joi.string().required(),
        color: Joi.string().allow(null, ''),//if there is no color it defaults to black (in the frontend)
        description: Joi.string().allow(null, ''),
        connection: {
            pinNum: Joi.string().allow(null, ''),
            connector: Joi.string().allow(null, '')
        }
    }
})

//every db entry, no matter what it is, will get it's own unique id
var pins = []
var connectors = []
var devices = []
var idCount = 0


//PIN STUFF
function PinGet(conID) {
    return new Promise((resolve, reject) => {
        let id = conID.conID
        let conIndex = connectors.findIndex(x => x.id == id)
        if (conIndex == -1)
            reject("No such connector id")
        else {
            let pinIDs = connectors[conIndex].connector.pins
            let pinstoSend = pins.filter(pin => pinIDs.includes(pin.id))
            resolve(pinstoSend)
        }
    })
}

function PinCreate(newPin) {
    //TODO add the pin to the connector
    //pins should be created under a connector, a pin should not be created without a connector 
    //should check if pin is not already an exact copy of another
    //if it's not, just create the pin 
    //if it is, get the connector and add the pin to the connector
    const tempSchema =
        Joi.object().keys({
            pin: {
                pinNum: Joi.string().required(),
                color: Joi.string().allow(null, ''),//if there is no color it defaults to black (in the frontend)
                description: Joi.string().allow(null, ''),
                connection: {
                    pinNum: Joi.string().allow(null, ''),
                    connector: Joi.string().allow(null, '')
                }
            },
            connectorID: Joi.number().required()
        })
    const result = tempSchema.validate(newPin)

    if (result.error == null) {
        let existingPinIndex = pins.findIndex(x => x.pin == newPin.pin)
        if (existingPinIndex != -1)
            return ConAddPin(newPin.connecterID, existingPinIndex)
        else {
            pins.push({ id: idCount, pin: newPin.pin })
            idCount++
            return ConAddPin(newPin.connectorID, pins.length - 1)
        }
    }
    else
        //if the pin is invalid return an error
        return Promise.reject(result.error)
}

function PinUpdate(pin) {

    const result = schema.validate(pin)
    if (result.error == null) {
        const index = pins.findIndex((x) => x.id == pin.id)
        pins[index] = pin
    }
    else
        return Promise.reject(result.error)
    return Promise.resolve()
}

function PinDelete(pin) {

    const index = pins.findIndex((x) => x.id == pin.id)

    if (index == -1) {
        let error = 'No such ID in pins to delete'
        return Promise.reject(error)
    }
    else {
        let deleted = pins.splice(index, 1)
        return Promise.resolve("Pin deleted: " + deleted)
    }

}

//CONNECTOR STUFF
//TODO add the error handling stuff
function ConCreate(conName) {
    //the param should be a string that represents the connector name
    //the pins array is just an array of the id's of pins 
    connectors.push({ id: idCount, connector: { name: conName.name, pins: [] } })
    idCount++
    return Promise.resolve()
}

function ConUpdate(con) {
    //the param should be an id and the new name 
    //should not update the pins
    let index = connectors.findIndex(x => x.id == con.id)
    if (index == -1) {
        let error = 'No such ID in connectors to update'
        return Promise.reject(error)
    }
    connectors[index].connecter.name = con.name
    return Promise.resolve()
}

function ConDelete(con) {
    //the param should be an id 
    //will also delete the pin data
    let index = connectors.findIndex(x => x.id == con.id)
    if (index == -1) {
        let error = 'No such ID in connectors to delete'
        return Promise.reject(error)
    }
    connectors.splice(index, 1)
    return Promise.resolve()
}

function ConGet(conID) {
    return new Promise((resolve, reject) => {
        let id = conID.id
        let devIndex = devices.findIndex(x => x.id == id)
        if (devIndex == -1)
            reject("No such device id")
        else {
            let conIDs = devices[devIndex].device.connectors
            let constoSend = connectors.filter(con => conIDs.includes(con.id))
            resolve(constoSend)
        }

    })
}

//adds a pin from pins to the connector pin array
function ConAddPin(conID, pinIndex) {
    let conIndex = connectors.findIndex(x => x.id == conID)
    if (conIndex == -1)
        return Promise.reject('No such ID in connectors (ConAddPin())')

    connectors[conIndex].connector.pins.push(pins[pinIndex].id)
    return Promise.resolve()
}

//DEVICE STUFF

function DevCreate(devName) {
    devices.push({ id: idCount, device: { name: devName, connectors: [] } })
    idCount++
    return Promise.resolve()
}

function DevUpdate(dev) {
    let index = devices.findIndex(x => x.id == dev.id)
    if (index == -1) {
        let error = 'No such ID in devices'
        return Promise.reject(error)
    }
    devices[index].device.name = dev.name
    return Promise.resolve()
}

function DevDelete(dev) {
    let index = devices.findIndex(x => x.id == dev.id)
    if (index == -1) {
        let error = 'No such ID in devices'
        return Promise.reject(error)
    }
    devices.splice(index, 1)
    return Promise.resolve()
}

function DevGet() {
    return new Promise((resolve, reject) => {
        resolve(devices)
    })
}

module.exports = {
    PinCreate,
    PinDelete,
    PinUpdate,
    PinGet,
    ConCreate,
    ConUpdate,
    ConDelete,
    ConGet,
    DevCreate,
    DevUpdate,
    DevDelete,
    DevGet
}