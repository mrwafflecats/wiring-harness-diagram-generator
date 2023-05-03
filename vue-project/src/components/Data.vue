<script>
import Device from './Device.vue'

const API_Devices = "http://localhost:4000/devices"

export default{
    components:{
        Device
    },
  data: function(){
    return{
      devices: [],
      deviceInput: '',
      error: ''
    }
  },
  methods:{
    GetDevices(){
      fetch(API_Devices)
      .then(response => response.json())
      .then(result => this.devices = result)
    },
    AddDevice(name){
      fetch(API_Devices, {
        method: "POST",
        body: JSON.stringify({name: name}),
        headers: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                }
      })
      .then(response => response.json)
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
        .then(this.GetDevices())//this doens't wait for the data before updating, i think
    },
    DeleteDevice(){

    },
    UpdateDevice(){

    }
    
  }
}
</script>

<template>
      <ul>
        <li v-for="d in devices" :key=d.id>
          <Device :id="d.id" :name="d.device.name"/>
        </li>
      </ul>
      <input v-model="deviceInput">
      <button @click="AddDevice(deviceInput)">Add Device</button>
      <button @click="GetDevices()">get devices</button>
</template>