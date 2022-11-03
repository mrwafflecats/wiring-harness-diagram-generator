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
        name:'',
        pins: [Pin]
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
    <li v-for="pin in pins">
        <h3>{{pin}}</h3>
    </li>
    <PinInput @add-pin="(x) =>AddPin(x)"/>
</template>