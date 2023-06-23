<script>
const API_Connections = "http://localhost:4000/connections"

export default{

    data: function(){
        return {
            connections: [],
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