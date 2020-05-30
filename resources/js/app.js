/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");
import Vue from "vue";
import Toaster from "v-toaster";

// For Autoscroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

// For Notification
import "v-toaster/dist/v-toaster.css";
Vue.use(Toaster, { timeout: 5000 });
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component("message", require("./components/MessageComponent.vue").default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    data: {
        message: "",
        chat: {
            message: [],
            user: [],
            color: [],
            time: []
        },
        typing: "",
        numberOfUser: 0,
        onlineUsers: []
    },
    watch: {
        message() {
            window.Echo.private("chat").whisper("typing", {
                name: this.message
            });
        }
    },
    methods: {
        send() {
            if (this.message.length != 0) {
                this.chat.message.push(this.message);
                this.chat.user.push("You");
                this.chat.color.push("success");
                this.chat.time.push(this.getTime());
                window.axios
                    .post("/send", {
                        message: this.message,
                        chat: this.chat
                    })
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                this.message = "";
            }
        },
        getOldMessages() {
            window.axios
                .post("/getOldMessage")
                .then(response => {
                    console.log(response);
                    if (response.data != "") {
                        this.chat = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteSession() {
            window.axios
                .post("/deleteSession")
                .then(response =>
                    this.$toaster.success("Chat history is deleted")
                );
        },
        getTime() {
            let date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var strTime = hours + ":" + minutes + " " + ampm;
            return strTime;
        },
        isOnline(id) {
            return this.onlineUsers.indexOf(id) > -1 ? true : false;
        }
    },
    mounted() {
        this.getOldMessages();
        window.Echo.private("chat")
            .listen("ChatEvent", e => {
                //console.log(e);
                this.chat.message.push(e.message);
                this.chat.user.push(e.user.name);
                this.chat.color.push("warning");
                this.chat.time.push(this.getTime());
                window.axios
                    .post("/saveToSession", {
                        chat: this.chat
                    })
                    .then(response => {})
                    .catch(error => {
                        console.log(error);
                    });
                //console.log(e);
            })
            .listenForWhisper("typing", e => {
                if (e.name !== "") {
                    this.typing = "Typing...";
                } else {
                    this.typing = "";
                }
            });
        window.Echo.join("chat")
            .here(users => {
                this.numberOfUser = users.length;
            })
            .joining(user => {
                this.$toaster.success(user.user.name + " joind the chat room");
                this.onlineUsers.push(user.user);
                this.numberOfUser += 1;
            })
            .leaving(user => {
                this.$toaster.error(user.user.name + " leaved the chat room");
                this.onlineUsers = this.onlineUsers.filter(
                    u => u.id !== user.user.id
                );
                this.numberOfUser -= 1;
            });
    }
});
