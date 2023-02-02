<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue'

//url to backend 
const API_URL = "http://localhost:4000/pins"

export default{
    components: {
        Pin,
        PinInput        
    },
    props:['name'],
    data: function() {     
        return{
        // TODO: auto create id
        // id: '',
        // name:'',
        pins: [],
        editMode: false,
        }
    },
    mounted() {
        //gets the pins from the database 
        fetch(API_URL).then(response => response.json()).then(result => {
            this.pins = result
        })
    },
    methods:{
        DeletePin(pinId){
            //TODO: this will send the pin to delete to the backend
            const id = this.pins.findIndex((pin) => pin.id === pinId)
            this.pins.splice(id, 1)
        },

    }}

</script>

<template>
    <h2>Connector: {{name}}</h2>
    <!-- TODO: add way to edit connectors, add connection prop  -->
    <ul>
        <li v-for="pin in pins" :key="pin.id">
            <Pin :id="pin.id" :init-pin-num="pin.pinNum" :init-color="pin.color" :init-description="pin.description" :edit-mode-prop="editMode" @delete="DeletePin(pin.id)"/>
        </li>
    </ul>

    <button @click="editMode = !editMode">Edit Mode</button>
    <!-- check when getting out of editmode before sending the changes to backend -->
    <PinInput @add-pin="AddPin"/>
</template>