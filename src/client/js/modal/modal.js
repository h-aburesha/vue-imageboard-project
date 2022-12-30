export const imageSummary = {
    template: `
            <div class="image-modal">
                <img v-bind:src="img.url" > 
                <h6>{{ img.title }}</h6> 
                <h6>{{img.description}}</h6>
                <h6>uploaded by {{img.username}} on {{img.created_at}}</h6>
                <button @click="imageClose">Close</button>
            </div>
    `,
    // no need for v-for because & loop here to access img Array because it is coming as rows[0] from server & just object

    // ------COMMUNCATION BETWEEN Parent and Child Components------
    // Properties that are passed in from parent
    props: ["imageidprop"],
    // Events that will emit, so parent can react to it
    emits: ["imageclosed"],
    // -------------------------------------------------------------

    data: () => {
        return {
            img: {},
        };
    },
    methods: {
        imageClose: function (evt) {
            this.$emit("imageclosed", evt.target.value);
        },
    },
    mounted() {
        fetch(`/image/${this.imageidprop}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from modal: ", data);
                this.img = data;
                console.log("this.img: ", this.img, "this.data", data);
            });
        // console.log("Vue modal app was mounted");
    },
};
