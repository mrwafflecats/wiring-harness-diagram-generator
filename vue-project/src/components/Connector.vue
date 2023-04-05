<script>
import Pin from './Pin.vue'
import PinInput from './PinInput.vue'

//url to backend 
const API_Pins = "http://localhost:4000/pins"
const API_Connectors = "http://localhost:4000/connectors"

export default {
    emits: ['editCon'],
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
            pinswithID: [],
            editMode: false,
            nameInput: "",
            errorString: ""
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
        },
        UpdateName(){
            fetch(API_Connectors, {
                method: "POST",
                body: JSON.stringify({ id: this.id, name:this.nameInput}),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.details) {
                        const error = result.details
                            .map(detail => detail.pin)
                            .join(". ")

                        this.errorString = error
                    } else {
                        this.errorString = ""
                        this.showMessageForm = false
                        this.messages.push(result)
                    }
            })
            .then(() =>{
                this.$emit('editCon')
                this.editMode = false
            })
        }
    }
}

</script>

<template>

        <h2 v-if="!editMode" @click="editMode = true">Connector: {{ name }}</h2>

        <div v-if="editMode">
            <input v-model="nameInput">
            <button @click="UpdateName">Update</button>
        </div>
    <ul>
        <li v-for="p in pinswithID" :key="p.id">
            <Pin :init-pin-num="p.pin.pinNum" :init-color="p.pin.color" :init-description="p.pin.description" :id="p.id" @edit-pin="GetPins" />
        </li>
    </ul>
    <PinInput :connector-i-d="id" @add-pin="GetPins"></PinInput>
</template>