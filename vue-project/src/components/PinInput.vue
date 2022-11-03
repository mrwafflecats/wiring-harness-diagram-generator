<script>
export default{
    data() {
        return{
            // id:Number,
            pin:{
            pinNum:'',
            color: '',
            description: '',
            connection: {pinNum: '', connector: ''}
        }
    }
},
    emits:['addPin'],
    methods:{
        AddPin(){
            this.$emit('addPin', {id: this.id, pinNum:this.pinNum,color: this.color, description: this.description, connection: this.connection})
        }
    }
}
</script>

<template>
<input v-model="pinNum" placeholder="pin">
<input v-model="color" placeholder="color">
<input v-model="description" placeholder="Add a description">
<button @click="AddPin">Add Pin</button>
</template>

<style>

</style>