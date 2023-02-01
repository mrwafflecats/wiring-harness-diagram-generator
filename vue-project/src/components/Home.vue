<script>
import Device from "./components/Device.vue"

//url to beckend server route
const API_URL = "http://localhost:4000/pins";

export default{
  mounted(){
  fetch(API_URL)
}
}
</script>

<template>
    <!-- TODO make 'Add device' button -->
    <div class="wrapper">
        <Device></Device>
    </div>
</template>