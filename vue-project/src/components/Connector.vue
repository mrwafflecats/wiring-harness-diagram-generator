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
            fetch(API_URL)
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
        <li v-for="pin in pins" :key="pin.id">
            <Pin :id="pin._id" :init-pin-num="pin.pinNum" :init-color="pin.color" :init-description="pin.description" />
        </li>
    </ul>
    <PinInput :connector-i-d="id"></PinInput>
    <button @click="GetPins">fetch pins</button>
</template>