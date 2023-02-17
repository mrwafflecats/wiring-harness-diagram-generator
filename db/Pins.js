//joi is for data validation
//this file is a model for pin objects between client, server and database

const { func } = require('joi')
const Joi = require('joi')

const schema = Joi.object().keys({
    id: Joi.string().required(),
    pin: {
        pinNum: Joi.string().required(),
        color: Joi.string().allow(''),//if there is no color it defaults to black (in the frontend)
        description: Joi.string().allow(''),
        connection: {
            pinNum: Joi.string().allow(''),
            connector: Joi.string().allow('')
        }
    }
    //TODO: add the stuff for connection
})

var pins = []

function getAll() {
    return pins.find()
}

function createPin(pin) {
    //validates the pin
    const tempSchema = 
    Joi.object().keys({
        pin: {
            pinNum: Joi.string().required(),
            color: Joi.string().allow(''),//if there is no color it defaults to black (in the frontend)
            description: Joi.string().allow(''),
            connection: {
                pinNum: Joi.string().allow(''),
                connector: Joi.string().allow('')
            }
        }
        //TODO: add the stuff for connection
    })
    const result = tempSchema.validate(pin)
    

    if (result.error == null)
        pins.push({id: pins.length, pin: pin})
    else
        //if the pin is invalid return an error
        return Promise.reject(result.error)
}

function updatePin(pin) {
    const result = schema.validate(pin)
    if (result.error == null){
        const index = pins.findIndex((x) => x.id == pin.id)
        pins[index]= pin
    }
    else
        return Promise.reject(result.error)
}

function deletePin(pin) {
    const result = schema.validate(pin)

    if (result.error == null){
        const index = pins.findIndex((x) => x.id == pin.id)
        var deleted  = pins.splice(index, 1)
        if (deleted != pin) 
            console.error("Something has gone terribly wrong with deleting \n The pin to be deleted: " + pin + "\n The pin that was deleted: " + deleted)
    }
    else
        return Promise.reject(result.error)
}

module.exports = {
    createPin,
    updatePin,
    deletePin,
    getAll
}