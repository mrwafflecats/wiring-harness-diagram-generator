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
            fetch(API + "connections")
            .then(response => response.json())
            .then(result => this.connections = result)
        },
        GetDevices(){
            fetch(API + "devices")
            .then(response => response.json())
            .then(result => this.devices = result)
        },
        GetConnectors(){
            fetch(API + "connectors")
            .then(response => response.json())
            .then(result => this.connectors = result)
        },
        GetPins(){
            fetch(API + "pins")
            .then(response => response.json())
            .then(result => this.pins = result)
        }
    }

}
</script>

<template>

</template>