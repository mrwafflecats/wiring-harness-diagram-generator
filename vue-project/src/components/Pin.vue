<script>
import PinInput from './PinInput.vue';

export default{
    components: {PinInput},
    props: {
        pinNum: String,
        color: String,
        description: String
    },
    data() {
        return {
            id: "",
            pin:{
            _pinNum: this.pinNum,
            _color: this.color,
            _description: this.description,
            connection: { pinNum: "", connector: "" },
            },
            editMode: false
        };
    },
    methods:{
        ChangePin(newPin){
            this.pin = newPin
        }
    }
}
</script>

<template>
    <h5>{{pin._pinNum}}</h5>
    <h5>{{pin._color}}</h5>
    <h5>{{pin._description}}</h5> 
    <h5>Connected to pin {{pin.connection.pinNum}} on connector {{pin.connection.connector}}</h5>
    <button @click="editMode = !editMode">Edit</button>
    <PinInput v-if="editMode" @add-pin="(x)=>ChangePin(x)" :pinNum="pin._pinNum" :color="pin._color" :description="pin._description" :connection="pin.connection"/>

</template>

<style>

</style>