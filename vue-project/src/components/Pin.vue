<script>
export default{
    data() {
        return{
            pin:'',
            color: '',
            description: '',

        }
    }
}
</script>

<template>
<input :value="pin" placeholder="pin">
<input :value="color" placeholder="color">
<input :value="description" placeholder="description">
</template>

<style>

</style>