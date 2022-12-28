export const imageSummaryModal = {
    template: `
        <div class="image-modal">
            <p>Image title</p>
            <ul>
                </li>
                    <img v-bind:src="img.url" > 
                    <h6>{{ img.title }}</h6> 
                    <h6>{{img.description}}</h6>
                    <h6>uploaded by {{img.username}} on {{img.created_at}}</h6>
                </li>
            </ul>
        </div>
    `,

    // ------COMMUNCATION BETWEEN Parent and Child Components------
    // Properties that are passed in from parent
    props: ["id"],
    // Events that will emit, so parent can react to it
    emits: ["imageclosed"],
    // -------------------------------------------------------------

    data: () => {
        return {
            img: [],
        };
    },
    methods: {
        imageClose: function (evt) {
            // this.$emit from Vue that you can use to emit/send out events
            this.$emit("imageclosed", evt.target.value);
        },
    },
    mounted() {
        console.log("Vue app was mounted");
        fetch(`/image/${this.id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("data from server: ", data);
                this.img = data;
            });
    },
};
