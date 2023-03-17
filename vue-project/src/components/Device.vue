<script>
import Connector from "./Connector.vue"

const API_Devices = "http://localhost:4000/devices"
const API_Connectors = "http://localhost:4000/connectors"

export default{
    components:{
        Connector
    },
    data(){
        return{
            error: '',
            id:'',
            name:'dev 1',
            connectorInput:'',
            connectorswithID:[]
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
            fetch(API_Connectors)
                .then(response => response.json())
                .then(result => {
                    this.connectorswithID = result
                })
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
</template>