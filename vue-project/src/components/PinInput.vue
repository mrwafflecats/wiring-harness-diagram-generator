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
        },
        autoIncrement: true //automatically increments the pin number
    };
},
    emits:['addPin'],
    methods:{
        AddPin(){
            // TODO: the pin increments before adding it, which is annoying and should be the other way around
            this.$emit('addPin', this.pin)
            //js is witchcraft 
            if (this.autoIncrement){

                var str = this.pin.pinNum
                var numIndex = str.search(/\d/)
            
                var numArray = str.match(/\d*/)//does not seperate the digits, treats it as one digit
                var digitCount = () => {
                    if (numArray >= 10)
                        return 2
                    if (numArray >= 100)
                        return 3
                    else 
                        return 1
                }//if you somehow manage to get a connector with more than 1000 pins on it, you are doing something wrong
                console.log(numIndex)
                numArray++
               

            var tempStr = str.split('')
            tempStr.splice(numIndex, digitCount(), numArray.toString())
            var tempStr = tempStr.join('')

            this.pin.pinNum = tempStr

            }
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