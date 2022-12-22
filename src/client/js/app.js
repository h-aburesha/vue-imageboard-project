import * as Vue from "./vue.js";

Vue.createApp({});

Vue.createApp({
    data: () => {
        return {
            heading: "Here are some cities",
            headingClass: "h1-header",
            cities: [],
            greeting: "Martin",
            count: 0,
        };
    },
    methods: {
        handleClick(e) {
            console.log("Button clicked with event: ", e);

            this.anotherFunction();
        },
        anotherFunction() {
            console.log("additional log");
        },
        emphasize(evt) {
            // evt.target.style.textDecoration = 'underline';
            evt.target.classList.add("underlined");
            this.count += 1;
        },
        deemphasize(evt) {
            // evt.target.style.textDecoration = '';
            evt.target.classList.remove("underlined");
        },
    },
    updated() {
        // updated is executed when a variable from data is used in html and has changed
        console.log("Vue app was updated");
    },
    created() {
        console.log("Vue app was created");
        fetch("/cities")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from server: ", data);
                this.cities = data;
            });
    },
    mounted() {
        console.log("Vue app was mounted");
    },
}).mount("#main");
