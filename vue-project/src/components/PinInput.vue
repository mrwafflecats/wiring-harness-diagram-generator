<script>
export default{
    data() {
        return{
            // id:Number,
            pin:{
            pinNum:'',
            color: 'black',
            description: 'Add a description',
            connection: {pinNum: '', connector: ''}}

        }
    },
    emits:['addPin'],
    methods:{
    }
}
</script>

<template>
<input :value="pinNum" placeholder="pin">
<input :value="color" placeholder={{color}}>
<input :value="description" placeholder={{description}}>
<button @click="$emit('addPin', this.pin)">Add Pin</button>
</template>

<style>

</style>