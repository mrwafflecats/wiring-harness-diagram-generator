<script>
//url to backend
const API_URL = "http://localhost:4000/pins"
export default {
    emits: ['addPin'],
    data() {
        return {
            // id:Number
            errorString: "",
            pin: {
                pinNum: '',
                color: '',
                description: '',
                connection: { pinNum: '', connector: '' }
            },
            autoIncrement: true, // automatically increments the pin number
        };
    },

    methods: {
        AddPin() {
            fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(this.pin),
                headers: {
                    "content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.details) {
                        //there was an error
                        const error = result.details
                            .map(detail => detail.pin)
                            .join(". ")

                        this.error = error
                    } else {
                        this.error = ""
                        this.showMessageForm = false
                        this.messages.push(result)
                    }
                })
                .then(this.AutoIncrement)
        },
        AutoIncrement() {
            //js is witchcraft 
            if (this.autoIncrement) {

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
    <form @submit.prevent="AddPin">
        <input v-model.lazy="pin.pinNum" placeholder="pin">
        <input v-model.lazy="pin.color" placeholder="color">
        <input v-model.lazy="pin.description" placeholder="Add a description">
        <button type="submit">Add Pin</button>
    </form>

    <input type="checkbox" v-model="autoIncrement" name="check" />
    <label for="check">Auto-Increment</label>
</template>

<style>

</style>