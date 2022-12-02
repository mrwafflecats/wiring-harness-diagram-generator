<script>
import PinInput from './PinInput.vue';

export default{
    components: {PinInput},
    props: {
        initPinNum: String,
        initColor: String,
        initDescription: String
    },
    data() {
        return {
            id: "",
            pin:{
            pinNum: this.initPinNum,
            color: this.initColor,
            description: this.initDescription,
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
    <div v-if="!editMode">
        <h5>{{pin.pinNum}}</h5>
        <h5>{{pin.color}}</h5>
        <h5>{{pin.description}}</h5> 
        <h5>Connected to pin {{pin.connection.pinNum}} on connector {{pin.connection.connector}}</h5>
    </div>

    <div v-if="editMode">
        <input v-model="pin.pinNum">
        <input v-model="pin.color">
        <input v-model="pin.description">
    </div>

    <button @click="editMode = !editMode">Edit</button>
    

</template>

<style>

</style>