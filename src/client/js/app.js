import * as Vue from "./vue.js";
import { imageSummary } from "./modal/modal.js";

window.addEventListener("popstate", (e) => {
    console.log("popstate event: ", location.hash, e.state);
    // show whatever is appropriate for the new url
    // if you need it, e.state has the data you passed to `pushState`
});

Vue.createApp({
    data: () => {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            showModal: false,
            thisImageId: null,
            loading: false,
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
            history.pushState({}, "", `/#${this.thisImageId}`);
        },
        closeModal() {
            console.log("closeModal");
            history.pushState({}, "", `/`);
            this.showModal = false;
            this.thisImageId = null;
        },
        // moreImages() {
        //     function getLowestImageId(images) {
        //         images.sort((a, b) => a.id - b.id);
        //         return images[0].id;
        //     }
        //     const lowestId = getLowestImageId(this.images);
        //     fetch("/moreimages", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ lowestId }),
        //     })
        //         .then((res) => {
        //             return res.json();
        //         })
        //         .then((data) => {
        //             console.log("app.js /moreimages from server: ", data);
        //             this.images.unshift(data.image);
        //         });
        //     console.log(lowestId);
        // },
        like(imageId, likes) {
            console.log(imageId, likes);
            fetch("/add-likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageId,
                    likes,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("data.like: ", data.like.likes, this.images);
                    const index = this.images.findIndex(
                        (image) => image.id === data.like.id
                    );
                    if (index !== -1) {
                        this.images[index].likes = data.like.likes;
                    }
                });
        },
        handleSubmit(evt) {
            evt.preventDefault();
            this.loading = true;

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
                    // console.log("app.js /add-formdata from server: ", data);
                    this.images.unshift(data.image);
                    this.loading = false;

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
                // console.log("app.js /images data from server: ", data);
                this.images = data;
            });
    },
    mounted() {
        console.log("Vue app was mounted");
        // this.currentImageId = window.location.hash.slice(1);
        if (!this.thisImageId && window.location.hash) {
            this.thisImageId = window.location.hash.split("#")[1];
            this.showModal = true;
        }
        this.thisImageId = window.location.hash.slice(1);
        addEventListener("popstate", (e) => {
            console.log(
                "popstate event: ",
                location.href,
                e.state,
                this.thisImageId,
                window.location.hash
            ); //.hash, e.state
            if (!this.showModal && window.location.hash) {
                this.thisImageId = window.location.hash.split("#")[1];
                this.showModal = true;
            }
            if (this.showModal && !window.location.hash) {
                this.thisImageId = null;
                this.showModal = false;
            }
        });
    },
}).mount("#main");
