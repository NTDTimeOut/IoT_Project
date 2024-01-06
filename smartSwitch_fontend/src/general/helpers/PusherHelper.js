import Pusher from "pusher-js";

const pusher = new Pusher("5d67aac56829ec9622e1", {
    cluster: "ap1",
    encrypted: true,
});
const PusherHelper = {
    Publish: (channelName, eventName, data) => {
        pusher.trigger(channelName, eventName, data);
    },

    Subscribe: (channelName, eventName, callback) => {
        const channel = pusher.subscribe(channelName);
        channel.bind(eventName, callback);
    },
};

export default PusherHelper;
