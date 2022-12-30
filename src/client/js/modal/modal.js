export const imageSummary = {
    template: `
            <div class="image-modal">
                <img v-bind:src="image.url" > 
                <h6>{{ image.title }}</h6> 
                <h6>{{image.description}}</h6>
                <h6>uploaded by {{image.username}} on {{image.created_at}}</h6>
                <button @click="imageClose">Close</button>
            </div>
    `,
    // no need for v-for because & loop here to access img Array because it is coming as rows[0] from server & just object

    // ------COMMUNCATION BETWEEN Parent and Child Components------
    // Properties that are passed in from parent
    props: ["id"],
    // Events that will emit, so parent can react to it
    emits: ["imageclosed"],
    // -------------------------------------------------------------

    data: () => {
        return {
            image: {},
        };
    },
    methods: {
        imageClose: function (evt) {
            this.$emit("imageclosed", evt.target.value);
        },
    },
    mounted() {
        fetch(`/image/${this.id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from modal: ", data);
                this.image = data;
                console.log("this.img: ", this.image, "this.data", data);
            });
        console.log("Vue modal app was mounted");
    },
};
