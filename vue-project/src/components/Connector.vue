<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue'

//url to backend 
const API_URL = "http://localhost:4000/pins"

export default {
    components: {
        Pin,
        PinInput
    },
    props: ['name'],
    data: function () {
        return {
            // TODO: auto create id
            // id: '',
            // name:'',
            pins: [],
            //since mongo automatically creates a unique id when an object is added, we can access using _id
            //keep in mind _id is stored as an ObjectId and NOT a string
        }
    },
    methods: {
        GetPins(){
            //gets the pins from the database
            fetch(API_URL)
            .then(response => response.json())
            .then(result => {
                this.pins = result
            })
        }
    }
}

</script>

<template>
    <h2>Connector: {{name}}</h2>
    <ul>
        <li v-for="pin in pins" :key="pin.id">
            <Pin :id="pin._id" :init-pin-num="pin.pinNum" :init-color="pin.color" :init-description="pin.description"/>
        </li>
    </ul>
    <PinInput></PinInput>
    <button @click="GetPins">fetch pins</button>
</template>