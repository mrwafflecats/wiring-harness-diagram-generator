<script>
import Connector from "./Connector.vue"

const API_Devices = "http://localhost:4000/devices"
const API_Connectors = "http://localhost:4000/connectors"

export default{
    emits: ['editDev'],
    components:{
        Connector
    },
    props: {
        id: Number,
        name: String
    },
    data(){
        return{
            error: '',
            connectorInput:'',
            connectorswithID:[],
            newName: '',
            editMode: false
        }
    },
    methods:{
        AddConnector(name){
            fetch(API_Connectors, {
                method: "POST",
                body: JSON.stringify({name: name}),
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
        GetConnectors(){
            //TODO get connectors that are associated with this device only
            fetch(API_Connectors+ '/' + this.id)//TODO set this up in Datamanager api so it takes id in route url
                .then(response => response.json())
                .then(result => {
                    this.connectorswithID = result
                })
        },
        DeleteDevice(){

        },
        UpdateDevice(){
            fetch(API_Devices, {
                method: "POST",
                body: JSON.stringify({name: this.newName, id: this.id}),
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

        }
    }
}
</script>

<template>
<h2>Device: {{this.name}}</h2>
<li v-for="connector in connectorswithID"><Connector :name="connector.connector.name" :id="connector.id"/></li>
<!-- TODO add a way to create new connectors -->
<input v-model="connectorInput" placeholder="Connector Name">
<button @click="AddConnector(connectorInput)">Add Connector</button>
<button @click="GetConnectors()">Get connectors</button>
</template>