<script>
import Device from "./components/Device.vue"

const API_Devices = "http://localhost:4000/devices"

export default{
  data(){
    return{
      devices: [],
      deviceInput: ''
    }
  },
  methods:{
    GetDevices(){
      fetch(API_Devices)
      .then(response => response.json)
      .then(result => this.devices = result)
    },
    AddDevice(){
      fetch(API_Devices, {
        method: "POST",
        body: JSON.stringify(this.deviceInput)
      })
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
      <button @click="AddDevice()">Add Device</button>
</template>