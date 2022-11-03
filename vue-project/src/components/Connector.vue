<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue';

export default{
    components: {
        Pin,
        PinInput        

    },
    data() {     
        return{
        id: '',
        name:'con 1',
        pins: [{pinNum:'',color:'',description:'', connection:''}]
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
    <h2>Connector: {{this.name}}</h2>
    <li v-for="pin in pins">
        <Pin :pin-num="pin.pinNum" :color="pin.color" :description="pin.description"/>
    </li>
    <PinInput @add-pin="(x) =>AddPin(x)"/>
</template>