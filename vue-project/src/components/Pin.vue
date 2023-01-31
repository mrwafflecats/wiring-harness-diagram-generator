<script>
export default{
    props: {
        initPinNum: String,
        initColor: String,
        initDescription: String,
        editModeProp: Boolean,
        id:{ required: true} 
    },
    emits:['delete'],
    data() {
        return {
            // id: this.idProp,
            pin:{
            pinNum: this.initPinNum,
            color: this.initColor,
            description: this.initDescription,
            connection: { pinNum: "", connector: "" },
            },            
        };
    },
}
</script>

<template>
    <div>
        <h5>Pin ID: {{ id }}</h5>
    </div>
    <div v-if="!editModeProp">
        <h5>{{pin.pinNum}}</h5>
        <h5>{{pin.color}}</h5>
        <h5>{{pin.description}}</h5> 
        <h5>Connected to pin {{pin.connection.pinNum}} on connector {{pin.connection.connector}}</h5>
    </div>

    <div v-if="editModeProp">
        <input v-model="pin.pinNum">
        <input v-model="pin.color">
        <input v-model="pin.description">
        <button @click="$emit('delete')">X</button>
    </div>
    <!-- when button is submited for edit mode, send the new data to backend,, maybe get out of editmode? -->
    
</template>

<style>

</style>