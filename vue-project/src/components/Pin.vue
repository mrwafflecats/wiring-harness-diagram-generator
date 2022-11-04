<script>
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
    <!-- <div @click="this.editMode = !this.editMode"> -->
    <h5>{{pin._pinNum}}</h5>
    <h5>{{pin._color}}</h5>
    <h5>{{pin._description}}</h5> 
    <h5>Connected to pin {{pin.connection.pinNum}} on connector {{pin.connection.connector}}</h5>
    <!-- </div> -->
    <!-- <PinInput v-show="editMode" @add-pin="(x)=>ChangePin(x)" :pinNum="this.pin._pinNum" :color="this.pin._color" :description="this.pin._description"/> -->

</template>

<style>

</style>