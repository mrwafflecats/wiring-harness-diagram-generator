//joi is for data validation
//this file is a model for pin objects between client, server and database

const { func } = require('joi')
const Joi = require('joi')
const db = require('./connection')


const schema = Joi.object().keys({
    id: Joi.string().required(),
    pin:{
        pinNum: Joi.string().required(),
        color: Joi.string(),//if there is no color it defaults to black (in the frontend)
        description: Joi.string()}
    //TODO: add the stuff for connection
})

const pins = db.get('pins')

function getAll(){
    return pins.find()
}

function createPin(pin){
    //validates the pin
    const result = Joi.validate(pin, schema)

    if(result.error == null)
        pins.insert(pin)    
    else
        //if the pin is invalid return an error
        return Promise.reject(result.error)
}

function updatePin({pinID, pin}){
    const result = Joi.validate(pin, schema)
    if(result.error == null)
        pins.update({id:pinID}, {$set: {pinNum: pin.pinNum, color: pin.color, description: pin.description }})
    else 
        return Promise.reject(result.error)
}

function deletePin(pin){
    const result = Joi.validate(pin, schema)

    if (result.error == null)
        pins.remove(pin)
    else
        return Promise.reject(result.error)
}

module.exports = {
    createPin,
    updatePin,
    deletePin,
    getAll
}