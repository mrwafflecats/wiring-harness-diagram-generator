<script>
import Connector from "./Connector.vue"

const API_Devices = "http://localhost:4000/devices"
const API_Connectors = "http://localhost:4000/connectors"

export default {
    emits: ['editDev'],
    components: {
        Connector
    },
    props: {
        id: Number,
        name: String
    },
    data() {
        return {
            error: '',
            connectorInput: '',
            connectorswithID: [],
            newName: this.name,
            editMode: false
        }
    },
    methods: {
        AddConnector(name) {
            fetch(API_Connectors + '/' + this.id, {
                method: "POST",
                body: JSON.stringify({ name: name }),
                headers: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => response.json())
                .then(result => {
                    if (result.details) {
                        //there was an error
                        const error = result.details
                            .map(detail => detail.pin)
                            .join(". ")

                        this.error = error
                    } else {
                        this.error = ""
                        this.GetConnectors()
                    }
                })
        },
        GetConnectors() {
            fetch(API_Connectors + '/' + this.id)
                .then(response => response.json())
                .then(result => {
                    this.connectorswithID = result
                })
        },
        DeleteDevice() {
            fetch(API_Devices, {
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
                        this.messages.push(result)
                    }
                })
                .then(this.$emit('editDev'))
        },
        UpdateDevice() {
            fetch(API_Devices, {
                method: "PUT",
                body: JSON.stringify({ name: this.newName, id: this.id }),
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
                .then(()=>{
                    this.$emit('editDev')
                    this.editMode = false
                })
        },


    }
}
</script>

<template>
    <h2 v-if="!editMode" @click="editMode = true">Device: {{ this.name }}</h2>

    <div v-if="editMode">
        <input v-model="newName">
        <button @click="UpdateDevice()">Update Device</button>
    </div>

    <li v-for="connector in connectorswithID">
        <Connector :name="connector.connector.name" :id="connector.id" />
    </li>
    <!-- TODO add a way to create new connectors -->
    <input v-model="connectorInput" placeholder="Connector Name">
    <button @click="AddConnector(connectorInput)">Add Connector</button>
    <button @click="GetConnectors()">Get connectors</button></template>