<script>
export default{
    data() {
        return{
            id:Number,
            pinNum:'',
            color: 'black',
            description: 'Add a description',
            connection: {pinNum: '', connector: ''}
        }
    }
}
</script>

<template>
<input :value="pinNum" placeholder="pin">
<input :value="color" placeholder={{color}}>
<input :value="description" placeholder={{description}}>
</template>

<style>

</style>