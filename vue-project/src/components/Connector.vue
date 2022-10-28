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

    }
}
</script>

<template>
    <li v-for="pin in pins">
        <h3>{{pin.pinNum}}</h3>
    </li>
    <PinInput/>
</template>