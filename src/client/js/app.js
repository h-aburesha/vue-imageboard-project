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
            likes: 0,
            thisImageId: 5, // hard coded, dunno why it doesnot update from openModal(evt) event though console.log give correct values
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
        openModal(evt) {
            console.log("openModal(evt.target.id): ", evt.target.id);
            this.thisImageId = evt.target.id;
            console.log("this.thisImageId: ", this.thisImageId);
        },
        like(evt) {
            this.likes++;
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
                    this.images = data;
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
