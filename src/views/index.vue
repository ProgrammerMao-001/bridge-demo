<template>
    <div>
        <div>
            <router-link to="/aPage"> aPage (threeJs) </router-link>
        </div>

        <div>
            <router-link to="/bPage"> bPage (threeJs) </router-link>
        </div>

        <div>
            <router-link to="/cPage"> cPage(cesium)</router-link>
        </div>

        <div>
            <router-link to="/useCesium"> useCesium(cesium)</router-link>
        </div>

        <div>
            <router-link to="/dPage"> dPage(canvas) </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {},
        props: {},
        data() {
            return {};
        },
        methods: {},
        created() {
        },
        mounted() {
        },
    };
</script>

<style lang="scss" scoped>

</style>
