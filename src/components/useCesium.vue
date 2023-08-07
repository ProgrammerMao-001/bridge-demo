<!--
 * @Description:  cesium 引入天地图 页面
 * @Author: mhf
 * @Date: 2023-08-07 15:07:25
-->
<template>
    <div class="viewer">
        <vc-viewer @ready="ready">
            <vc-layer-imagery ref="layerText" :alpha="alpha" :brightness="brightness" :contrast="contrast"
                              :sort-order="20">
                <vc-provider-imagery-tianditu map-style="cva_c"
                                              token="436ce7e50d27eede2f2929307e6b33c0"></vc-provider-imagery-tianditu>
            </vc-layer-imagery>
            <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast" :sort-order="10">
                <vc-provider-imagery-tianditu
                        :map-style="mapStyle"
                        token="436ce7e50d27eede2f2929307e6b33c0"
                ></vc-provider-imagery-tianditu>
            </vc-layer-imagery>
        </vc-viewer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                protocol: 'http',
                mapStyle: 'img_c',
                alpha: 1, // 透明度
                brightness: 1, // 亮度
                contrast: 1 // 对比度
            }
        },
        methods: {
            ready({Cesium, viewer}) {
                this.Cesium = Cesium
                this.viewer = viewer
            }
        }
    }
</script>


<style lang="scss">
    .viewer {
        width: 100vw;
        height: 100vh;
    }
</style>
