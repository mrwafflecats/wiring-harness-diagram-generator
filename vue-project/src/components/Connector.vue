<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue'


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
        pins: [{pinNum:'', color:'',description:'' }],
        editMode: false,
        }
    },
    methods:{
        AddPin(pin){
            //TODO: not needed anymore 
            this.pins.push(pin)
            console.log(this.pins)
            },
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