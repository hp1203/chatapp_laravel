<template>
    <div class="mb-2">
        <li class="d-flex flex-column list-group-item" :class="className">
            <span class="d-flex"><slot></slot></span>
            <small class="font-weight-lighter float-right align-self-end">{{
                time
            }}</small>
        </li>
        <small class="badge float-right" :class="badgeClass">{{ user }}</small>
    </div>
</template>

<script>
export default {
    props: ["color", "user", "time"],
    computed: {
        className() {
            return "list-group-item-" + this.color;
        },
        badgeClass() {
            return "badge-" + this.color;
        }
    },
    mounted() {
        console.log("Component mounted.");
    }
};
</script>
