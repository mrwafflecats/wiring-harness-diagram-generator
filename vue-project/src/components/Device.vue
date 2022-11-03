<script>
import Connector from "./Connector.vue"

export default{
    components:{
        Connector
    },
    data(){
        return{
            id:'',
            name:'',
            connectors:[]
        }
    }
}
</script>

<template>
<li v-for="connector in connectors">{{connector}}</li>
<!-- TODO add a way to create new connectors -->
</template>