<script>
import Device from "./components/Device.vue"

//url to beckend server route
const API_URL = "http://localhost:4000/pins"

//a lot of stuff here will likely be moved to another component, for now it's here for
//the sake of documentation
export default {
    data() {
        return {
            error: "",
            pins: [],
            pin: {
                pinNum:'',
                color:'',
                description:''
            }
        }
    },
    mounted() {
        fetch(API_URL).then(response => response.json()).then(result => {
            this.pins = result
        })
    },
    methods:{
        AddPin(){
            fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(this.pin),
                headers: {
                    "content-type": "application/json"
                }
            }).then(response => response.json())
            .then(result => {
                if(result.details){
                    //there was an error
                    const error = result.details
                    .map(detail => detail.pin)
                    .join(". ")

                    this.error = error
                } else {
                    this.error = ""
                    this.showMessageForm = false
                    this.messages.push(result)
                }
            })
        }
    }
}
</script>

<template>
    <!-- TODO make 'Add device' button -->
    <div class="wrapper">
        <Device></Device>
    </div>
</template>