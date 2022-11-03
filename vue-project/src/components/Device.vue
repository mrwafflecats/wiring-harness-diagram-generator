<script>
import Connector from "./Connector.vue"

export default{
    components:{
        Connector
    },
    data(){
        return{
            id:'',
            name:'dev 1',
            connectorInput:'',
            connectors:[]
        }
    },
    methods:{
        AddConnector(name){
            this.connectors.push(name)
        }
    }
}
</script>

<template>
<h2>Device: {{this.name}}</h2>
<li v-for="connector in connectors"><Connector :name="connector"/></li>
<!-- TODO add a way to create new connectors -->
<input v-model="connectorInput" placeholder="Connector Name"/>
<button @click="AddConnector(connectorInput)">Add Connector</button>
</template>