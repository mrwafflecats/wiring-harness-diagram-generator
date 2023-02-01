<script>
import Device from "./components/Device.vue"

//url to beckend server route
const API_URL = "http://localhost:4000/pins"

export default {
    data() {
        return {
            error: "",
            pins: []
        }
    },
    mounted() {
        fetch(API_URL).then(response => response.json()).then(result => {
            this.pins = result
        })
    }
}
</script>

<template>
    <!-- TODO make 'Add device' button -->
    <div class="wrapper">
        <Device></Device>
    </div>
</template>