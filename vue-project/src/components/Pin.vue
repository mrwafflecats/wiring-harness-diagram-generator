<script>
export default{
    data() {
        return{
            id:'',
            pinNum:'',
            color: 'black',
            description: 'Add a description',
            connection: {pinNum: '', connector: ''}
        }
    }
}
</script>

<template>
    <h3>{{pinNum}}</h3>
    <h3>{{description}}</h3>
    <h3>Connected to pin {{connection.pinNum}} on connector {{connection.connector}}</h3>
</template>

<style>

</style>