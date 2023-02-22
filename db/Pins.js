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

var pins = []

function getAll() {
    return new Promise((resolve, reject) => {
        resolve(pins)
    })
}

function createPin(pin) {
    //validates the pin
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

function updatePin(pin) {
    const result = schema.validate(pin)
    if (result.error == null){
        const index = pins.findIndex((x) => x.id == pin.id)
        pins[index]= pin
    }
    else
        return Promise.reject(result.error)
    return Promise.resolve()
}

function deletePin(pin) {
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

module.exports = {
    createPin,
    updatePin,
    deletePin,
    getAll
}