import * as Vue from "./vue.js";
import { imageSummary } from "./modal/modal.js";

Vue.createApp({
    data: () => {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            showModal: false,
            thisImageId: null, // hard coded, dunno why it doesnot update from openModal(evt) event though console.log give correct values
        };
    },
    components: {
        "image-summary": imageSummary,
    },
    methods: {
        handleFileChange(evt) {
            console.log("evt", evt);
            this.file = evt.target.files[0];
        },
        openModal(id) {
            console.log("openModal(evt.target.id): ", id);
            this.thisImageId = id;
            this.showModal = true;
            console.log("this.thisImageId: ", this.thisImageId);
        },
        closeModal() {
            this.showModal = false;
        },
        like(imageId, likes) {
            console.log(imageId, likes);
        },
        handleSubmit(evt) {
            evt.preventDefault();

            const formData = new FormData();

            formData.append("title", this.title);
            formData.append("username", this.username);
            formData.append("description", this.description);
            formData.append("file", this.file);

            fetch("/add-formdata", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("data from server: ", data);
                    this.images.unshift(data.image);

                    // this.images = data;
                    // add an element to images array mit "push" oder "unshift" zB
                });
        },
    },
    updated() {
        // updated is executed when a variable from data is used in html and has changed
        // console.log("Vue app was updated");
    },
    created() {
        console.log("Vue app was created");
        fetch("/images")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from server: ", data);
                this.images = data;
            });
    },
    mounted() {
        console.log("Vue app was mounted");
    },
}).mount("#main");
