<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue';

export default{
    components: {
        Pin,
        PinInput        
    },
    props:['name'],
    data() {     
        return{
        // TODO: auto create id
        id: '',
        // name:'',
        pins: [],
        editMode: false
        }        
    },
    methods:{
        AddPin(pin){
            this.pins.push(pin)
            },
        DeletePin(id){
            this.pins.splice(id, 1);
            }
        }
    }

</script>

<template>
    <h2>Connector: {{name}}</h2>
    <!-- TODO: add way to edit connectors, add connection prop  -->

    <li v-for="pin in pins" :key="pin.id">
        <Pin :id-prop="pins.length" :init-pin-num="pin.pinNum" :init-color="pin.color" :init-description="pin.description" :edit-mode-prop="editMode"/>        
    </li>
    <button @click="editMode = !editMode">Edit Mode</button>
    <PinInput @add-pin="AddPin"/>
</template>