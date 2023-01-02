export const imageSummary = {
    template: `
            <div class="image-modal">
                <img v-bind:src="image.url" > 
                <h6>{{ image.title }}</h6> 
                <h6>{{image.description}}</h6>
                <h6>uploaded by {{image.username}} on {{image.created_at}}</h6>
 
        
            <form v-on:submit="handleCommentSubmit">
                    <div class="form-text-inputs-flex">
                        <span>Comment: </span><input type="text" name="filename" v-model="comment">
                        <span>Username: </span><input type="text" name="filename" v-model="username">
                        <button>Submit</button>
                     </div>
            </form> 

            <ul class="comments-list" v-if="comments.length > 0">
                    <li v-for="comment in comments">
                        <h1>{{ comment.comment }}</h1> 
                    </li>
            </ul> 


            <button @click="closeModal">Close</button>
            </div>


    `,
    // no need for v-for because & loop here to access img Array because it is coming as rows[0] from server & just object

    // ------COMMUNCATION BETWEEN Parent and Child Components------
    // Properties that are passed in from parent
    props: ["id"],
    // Events that will emit, so parent can react to it
    emits: ["close"],
    // -------------------------------------------------------------

    data: () => {
        return {
            image: {},
            comments: [],
            comment: "",
            username: "",
            image_id: "",
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        handleCommentSubmit(evt) {
            // evt.preventDefault();
            // console.log(this.comment, this.username);
            fetch("/add-comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: this.comment,
                    username: this.username,
                    image_id: this.id,
                }),
            });
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

        fetch(`/comments/${this.id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("comments data: ", data);
                this.comments = data;
                console.log("this.img: ", this.comments, "this.data", data);
            });

        console.log("Vue modal app was mounted");
    },
};
