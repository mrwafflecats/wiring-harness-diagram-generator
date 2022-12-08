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
            // TODO it doesn't account for a char to be before the digit and changes the char instead of the digit
            //likely solution to be in the regex
            this.$emit('addPin', this.pin)
            //js is witchcraft 
            if (this.autoIncrement){
                var str = this.pin.pinNum
                var numIndex = str.search(/\d*/)
                var numArray = str.match(/\d*/)
                var digitCount = numArray.length
                ++numArray[numArray.length-1]

                if(numArray[numArray.length-1] == "0")
                    ++numArray[numArray.length-2]                    
                
                if(numArray[numArray.length-2] == "0")
                    ++numArray[numArray.length-3]                
        //if you somehow manage to get a connector with more than 1000 pins on it, you are doing something wrong
            var tempStr = str.split('')
            tempStr.splice(numIndex,digitCount,numArray.toString())
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