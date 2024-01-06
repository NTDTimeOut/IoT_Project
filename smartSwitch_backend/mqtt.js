require('dotenv').config({ path: '.env' });
const mqtt = require("mqtt");
const { updateData, retrieveData } = require("./controllers/deviceController");

const clusterURL = process.env.CLUSTER_URL;
const webclientOptions = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
};
const topic = "/data_device";
const connectMQTT = () => {
    try {
        const client = mqtt.connect(clusterURL, webclientOptions);
        
        client.on("connect", () => {
            client.subscribe(topic);
            console.log("MQTT connected!");
        });
        client.on("message", (tp, msg) => {
            var data = JSON.parse(msg);
            if (!data?.message) {
                updateData(data);
            } else
                console.log(
                    "Request to retrieve data of the device from the database"
                );
        });
    } catch (err) {
        console.log(err);
    }
};
module.exports = { connectMQTT };
