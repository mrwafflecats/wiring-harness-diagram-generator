<script>
const API_Connections = "http://localhost:4000/connections"

export default{
    props: {
        id: Number,
        name: String
    },
    data: function(){
        return {
            newName: "",
            devA: -1,
            conA: -1,
            pinA: -1,
            devB: -1,
            conB: -1,
            pinB: -1,
            color: ""
        }
    },

    methods:{
        DeleteConnection(){
            fetch(API_Connections, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(response => response.json())
                .then(result => {
                    if (result.details) {
                        const error = result.details
                            .map(detail => detail.pin)
                            .join(". ")
                        this.error = error
                    } else {
                        this.error = ""
                        this.showMessageForm = false
                        // this.messages.push(result)
                    }
                })
        },
        UpdateConnection(){
            fetch(API_Connections + '/' + this.id, {
                method: "PUT",
                body: JSON.stringify({ name: this.newName }),
                headers: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (result.details) {
                        const error = result.details
                            .map(detail => detail.pin)
                            .join(". ")
                        this.error = error
                    } else {
                        this.error = ""
                        this.showMessageForm = false
                        // this.messages.push(result)
                    }
                })
        }
    }

}
</script>

<template>

</template>