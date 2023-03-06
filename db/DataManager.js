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


//PIN STUFF
function getAll() {//TODO change this to a more sensible name/method
    return new Promise((resolve, reject) => {
        resolve(pins)
    })
}

function PinCreate(pin) {
    //TODO change the schema so it take connector and device data into account
    const tempSchema = 
    Joi.object().keys({
            pinNum: Joi.string().required(),
            color: Joi.string().allow(null,''),//if there is no color it defaults to black (in the frontend)
            description: Joi.string().allow(null, ''),
            connection: {
                pinNum: Joi.string().allow(null, ''),
                connector: Joi.string().allow(null, '')
        }
    })
    const result = tempSchema.validate(pin)    

    if (result.error == null)
        pins.push({id: pins.length, pin: pin})
    else
        //if the pin is invalid return an error
        return Promise.reject(result.error)
    return Promise.resolve()
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
        var deleted  = pins.splice(index, 1)
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

function ConCreate(con){

}

function ConUpdate(con){

}

function ConDelete(con){

}

function ConGet(con){

}

//DEVICE STUFF
function DevCreate(dev){

}

function DevUpdate(dev){
    
}

function DevDelete(dev){

}

function DevGet(dev){

}

module.exports = {
    PinCreate,
    PinDelete,
    PinUpdate,
    getAll,
    ConCreate,
    ConUpdate,
    ConDelete,
    ConGet,
    DevCreate,
    DevUpdate,
    DevDelete,
    DevGet
}