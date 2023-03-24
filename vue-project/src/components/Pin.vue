<script>
const API_URL = "http://localhost:4000/pins"
export default {
    emits: ['editPin'],
    props: {
        initPinNum: String,
        initColor: String,
        initDescription: String,
        id: { required: true }
    },
    data() {
        return {
            errorString: "",
            pin: {
                pinNum: this.initPinNum,
                color: this.initColor,
                description: this.initDescription,
                connection: { pinNum: "", connector: "" },
            },
            editMode: false
        };
    },
    methods: {
        ToggleEditMode() {
            //TODO: check if any changes were made, if none were made don't send anything
            if (this.editMode) {
                fetch(API_URL, {
                    method: "PUT",
                    body: JSON.stringify({ id: this.id, pin: this.pin }),
                    headers: {
                        "content-type": "application/json"//TODO: figure out what this header stuff does
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
                    .then(this.$emit("editPin"))

                this.editMode = false
            }
            else
                this.editMode = true
        },
        Delete() {
            fetch(API_URL, {
                method: "DELETE",
                body: JSON.stringify({ id: this.id, pin: this.pin }),
                headers: {
                    "content-type": "application/json"//TODO: figure out what this header stuff does
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
                        this.messages.push(result)
                    }
                })
        }
    }
}
</script>

<template>
    <div v-if="!editMode">
        <h5>{{ pin.pinNum }}</h5>
        <h5>{{ pin.color }}</h5>
        <h5>{{ pin.description }}</h5>
        <h5>Connected to pin {{ pin.connection.pinNum }} on connector {{ pin.connection.connector }}</h5>
    </div>

    <div v-if="editMode">
        <input v-model="pin.pinNum">
        <input v-model="pin.color">
        <input v-model="pin.description">
        <button @click="Delete">Delete</button>
    </div>
    <button @click="ToggleEditMode">Edit Mode</button>

</template>

<style>

</style>