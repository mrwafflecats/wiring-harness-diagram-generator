<script>
export default{

    data() {
        return{
            // id:Number
            pin:{
            pinNum: '',
            color: '',
            description: '',
            connection: {pinNum: '', connector: ''}
        }
    };
},
    emits:['addPin'],
    methods:{
        AddPin(){
            this.$emit('addPin', this.pin)
        }
    }
}
</script>

<template>
<input v-model="pin.pinNum" placeholder="pin">
<input v-model="pin.color" placeholder="color">
<input v-model="pin.description" placeholder="Add a description">
<button @click="AddPin">Add Pin</button>
</template>

<style>

</style>