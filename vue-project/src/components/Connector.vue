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
        // TODO: auto create id, automatically increase the pin number after adding a pin
        id: '',
        // name:'',
        pins: []
        }  

    },
    methods:{
        AddPin(pin){
            this.pins.push(pin)
        }
    }
}
</script>

<template>
    <h2>Connector: {{name}}</h2>
    <!-- TODO: add way to edit pins and connectors, add connection prop  -->

    <li v-for="pin in pins">
        <Pin :pin-num="pin.pinNum" :color="pin.color" :description="pin.description"/>
    </li>
    <PinInput @add-pin="(x)=>AddPin(x)"/>
</template>