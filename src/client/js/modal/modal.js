export const imageSummary = {
    template: `
            <div class="image-modal" @click="closeModal">
                <img v-bind:src="image.url" > 
            <div class="image-card-details">
                <h6>Title: {{ image.title }}</h6> 
                <h6>Description: {{image.description}}</h6>
                <h6>uploaded by: {{image.username}} on {{image.created_at}}</h6>
            </div>
 
        
            <form v-on:submit="handleCommentSubmit">
            <h1>Add a comment! </h1>
                    <div class="form-text-inputs-flex">
                        <span>Comment: </span><input type="text" name="filename" v-model="comment">
                        <span>Username: </span><input type="text" name="filename" v-model="username">
                        <button>Submit</button>
                     </div>
            </form> 

            <ul class="comments-list" v-if="comments.length > 0">
                    <li v-for="comment in comments">
                    
                        <h5>{{ comment.comment }} by user: {{comment.username}} at: {{comment.created_at}}</h5> 
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
            evt.preventDefault();
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
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log("data from server: ", data);
                    this.comments.unshift(data.comment);
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
                // console.log("this.img: ", this.comments, "this.data", data);
            });

        console.log("Vue modal app was mounted");
    },
};
