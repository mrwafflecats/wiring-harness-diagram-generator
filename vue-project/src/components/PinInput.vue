<script>
export default{

    //issue when creating pininput component
    props:{
        pinNum:{default: 'pin'},
        color: {default: 'black'},
        description: {default: 'Add a description'},
        connection: {default: {pinNum: '', connector:''}}
    },
    data() {
        return{
            // id:Number
            pin:{
            _pinNum: this.pinNum,
            _color: this.color,
            _description: this.description,
            _connection: {pinNum: this.connection.pinNum, connector: this.connection.connector}
        }
    };
},
    emits:['addPin'],
    methods:{
        AddPin(){
            this.$emit('addPin', { pinNum:this._pinNum, color: this._color, description: this._description, connection: this._connection})
        }
    }
}
</script>

<template>
<input v-model="_pinNum" placeholder="pin">
<input v-model="_color" placeholder="color">
<input v-model="_description" placeholder="Add a description">
<button @click="AddPin">Add Pin</button>
</template>

<style>

</style>