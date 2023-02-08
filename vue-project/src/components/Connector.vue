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
        }
    },
    mounted() {
        //gets the pins from the database
        fetch(API_URL)
            .then(response => response.json())
            .then(result => {
                this.pins = result
            })
    },
    methods: {
    }
}

</script>

<template>
    <h2>Connector: {{name}}</h2>
    <ul>
        <li v-for="pin in pins" :key="pin.id">
            <Pin :id="pin.id" :init-pin-num="pin.pinNum" :init-color="pin.color" :init-description="pin.description"/>
        </li>
    </ul>
</template>