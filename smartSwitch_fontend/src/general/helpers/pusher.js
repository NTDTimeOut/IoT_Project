import Pusher from "pusher-js";

const pusher = new Pusher("5d67aac56829ec9622e1", {
    cluster: "ap1",
    encrypted: true,
});

export default pusher;
