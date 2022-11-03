<script>
export default{
    props:[
        'pinNum',
        'color',
        'description'
    ],
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
    <h6>{{pinNum}}</h6>
    <h6>{{description}}</h6> 
    <h6>Connected to pin {{connection.pinNum}} on connector {{connection.connector}}</h6>
</template>

<style>

</style>