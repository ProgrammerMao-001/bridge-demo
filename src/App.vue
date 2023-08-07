<template>
    <div id="app">
        <useCesium />
<!--        <router-view/>-->
    </div>
</template>

<script>
    import useCesium from "@/components/useCesium";
    export default {
        name: 'App',
        components: {useCesium}
    }
</script>

<style>
    #app, * {
        margin: 0;
        padding: 0;
    }
</style>
