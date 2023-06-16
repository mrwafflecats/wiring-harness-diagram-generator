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
            pinswithID: [],
            editMode: false,
            newName: this.name,
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
        DeleteConnector() {
            fetch(API_Connectors, {
                method: "DELETE",
                body: JSON.stringify({ id: this.id }),
                headers: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.details) {
                        const error = result.details
                            .map(detail => detail.pin)
                            .join(". ")

                        this.error = error
                    } else {
                        this.error = ""
                        this.showMessageForm = false
                        // this.messages.push(result)
                    }
                })
                .then(() => {
                    this.$emit('editCon')
                    this.editMode = false
                })
        },
        UpdateName(){
            fetch(API_Connectors, {
                method: "PUT",
                body: JSON.stringify({ id: this.id, name:this.newName}),
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
                        // this.messages.push(result)
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
            <input v-model="newName">
            <button @click="UpdateName">Update</button>
            <button @click="DeleteConnector">Delete Connector</button>
        </div>
    <ul>
        <li v-for="p in pinswithID" :key="p.id">
            <Pin :init-pin-num="p.pin.pinNum" :init-color="p.pin.color" :init-description="p.pin.description" :id="p.id" @edit-pin="GetPins" />
        </li>
    </ul>
    <PinInput :connector-i-d="id" @add-pin="GetPins"></PinInput>
</template>