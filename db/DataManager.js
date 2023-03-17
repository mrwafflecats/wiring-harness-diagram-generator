//joi is for data validation
//this file is a model for pin objects between client, server and database

const { func } = require('joi')
const Joi = require('joi')

const schema = Joi.object().keys({
    id: Joi.string().required(),
    pin: {
        pinNum: Joi.string().required(),
        color: Joi.string().allow(null,''),//if there is no color it defaults to black (in the frontend)
        description: Joi.string().allow(null, ''),
        connection: {
            pinNum: Joi.string().allow(null, ''),
            connector: Joi.string().allow(null, '')
        }
    }
    //TODO: add the stuff for connection
})

//every db entry, no matter what it is, will get it's own unique id
var pins = []
var connectors = []
var devices = []
var idCount = 0


//PIN STUFF
function PinGet(conID) {
    return new Promise((resolve, reject) => {
        let conIndex = connectors.findIndex(x => x.id == conID.id)
        if (conIndex == -1)
            reject("No such connector id")        
        else{
            let pinIDs = connectors[conIndex].connector.pins
            let pinstosend = pins.filter(pin => pinIDs.includes(pin.id) )
            resolve(pinstosend)
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
        pin:{pinNum: Joi.string().required(),
            color: Joi.string().allow(null,''),//if there is no color it defaults to black (in the frontend)
            description: Joi.string().allow(null, ''),
            connection: {
                pinNum: Joi.string().allow(null, ''),
                connector: Joi.string().allow(null, '')}            
        },
        connectorID: Joi.number().required()
    })
    const result = tempSchema.validate(newPin)    

    if (result.error == null){
        let existingPinIndex = pins.findIndex(x => x.pin == newPin.pin)
        if(existingPinIndex != -1)
            return ConAddPin(newPin.connecterID, existingPinIndex)
        else{
            pins.push({id: idCount, pin: newPin})
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
    if (result.error == null){
        const index = pins.findIndex((x) => x.id == pin.id)
        pins[index]= pin
    }
    else
        return Promise.reject(result.error)
    return Promise.resolve()
}

function PinDelete(pin) {
    const result = schema.validate(pin)

    if (result.error == null){
        const index = pins.findIndex((x) => x.id == pin.id)
        let deleted  = pins.splice(index, 1)
        if (deleted != pin) {
            let error = "Something has gone terribly wrong with deleting \n The pin to be deleted: " + pin + "\n The pin that was deleted: " + deleted
            console.error(error)
            return Promise.reject(error)
        }            
    }
    else
        return Promise.reject(result.error)
    return Promise.resolve()
}

//CONNECTOR STUFF
//TODO add the error handling stuff
function ConCreate(conName){
    //the param should be a string that represents the connector name
    //the pins array is just an array of the id's of pins 
    connectors.push({id: idCount, connector: {name: conName.name, pins: []}})
    idCount++
    return Promise.resolve()
}

function ConUpdate(con){
    //the param should be an id and the new name 
    //should not update the pins
    let index = connectors.findIndex(x => x.id == con.id)
    if (index == -1){
        let error = 'No such ID in connectors to update'
        return Promise.reject(error)
    }
    connectors[index].connecter.name = con.name
    return Promise.resolve()
}

function ConDelete(con){
    //the param should be an id 
    //will also delete the pin data
    let index = connectors.findIndex(x => x.id == con.id)
    if (index == -1){
        let error = 'No such ID in connectors to delete'
        return Promise.reject(error)
    }
    connectors.splice(index, 1)
    return Promise.resolve()
}

function ConGet(){
    return new Promise((resolve, reject) => {
        resolve(connectors)
    })
}

//adds a pin from pins to the connector pin array
function ConAddPin(conID, pinIndex){
    let conIndex = connectors.findIndex(x => x.id == conID)
    if (conIndex == -1)
        return Promise.reject('No such ID in connectors (ConAddPin())')
    
    connectors[conIndex].con.pins.push(pins[pinIndex].id)
    return Promise.resolve()
}

//DEVICE STUFF

function DevCreate(devName){
    devices.push({id: idCount, device:{name: devName, connectors:[]}})
    idCount++
    return Promise.resolve()
}

function DevUpdate(dev){
    let index = devices.findIndex(x => x.id == dev.id)
    if (index == -1){
        let error = 'No such ID in devices'
        return Promise.reject(error)
    }
    devices[index].device.name = dev.name
    return Promise.resolve()
}

function DevDelete(dev){
    let index = devices.findIndex(x => x.id == dev.id)
    if (index == -1){
        let error = 'No such ID in devices'
        return Promise.reject(error)
    }
    devices.splice(index, 1)
    return Promise.resolve()
}

function DevGet(){
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