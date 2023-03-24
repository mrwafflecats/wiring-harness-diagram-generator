<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue'

//url to backend 
const API_Pins = "http://localhost:4000/pins"
const API_Connectors = "http://localhost:4000/connectors"

export default {
    components: {
        Pin,
        PinInput
    },
    props: {
        name: String,
        id: Number
    },

    data: function () {
        return {
            // id: '',
            // name:'',
            pinswithID: []
        }
    },
    computed: {
        pins() {
            var temp = []
            for (var i = 0; i < this.pinswithID.length; i++)
                temp.push(this.pinswithID[i].pin)
            return temp
        }
    },
    methods: {
        GetPins() {
            //gets the pins from the database
            fetch(API_Pins + '/' + this.id)
                .then(response => response.json())
                .then(result => {
                    this.pinswithID = result
                })
        }
    }
}

</script>

<template>
    <h2>Connector: {{ name }}</h2>
    <ul>
        <li v-for="p in pinswithID" :key="p.id">
            <Pin :init-pin-num="p.pin.pinNum" :init-color="p.pin.color" :init-description="p.pin.description" :id="p.id" />
        </li>
    </ul>
    <PinInput :connector-i-d="id" @add-pin="GetPins"></PinInput>
</template>