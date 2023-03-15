<script>
import Connector from "./Connector.vue"

const API_URL = "http://localhost:4000/devices"

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
    computed:{
        connectors(){
            let temp = []
            for (var i = 0; i < this.connectorswithID.length; i++)
                temp.push(this.connectorswithID[i].connector)
            return temp
        }
    },
    methods:{
        AddConnector(name){
            fetch(API_URL, {
                method: "POST",
                body: name,
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
                    }
            })
        },
        GetConnectors(){
            fetch(API_URL)
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
<li v-for="connector in connectors"><Connector :name="connector"/></li>
<!-- TODO add a way to create new connectors -->
<input v-model="connectorInput" placeholder="Connector Name">
<button @click="AddConnector(connectorInput)">Add Connector</button>
</template>