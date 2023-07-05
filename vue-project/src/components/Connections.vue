<script>
const API = "http://localhost:4000/"

export default{

    data: function(){
        return {
            connections: [],
            devices: [],
            connectors: [],
            pins: []
        }
    },

    methods:{
        GetConnections(){
            fetch(API_Connections)
            .then(response => response.json())
            .then(result => this.connections = result)
        }

    }

}
</script>

<template>

</template>