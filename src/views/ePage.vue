<template>
    <div class="ePage">
        <canvas
                ref="canvas"
                width="800"
                height="900"
                @mousedown="canvasMouseDown"
                @mousemove="canvasMouseMove"
                @mouseup="canvasMouseUp"
        ></canvas>

        <el-popover
                placement="top"
                id="popover"
                width="200"
                v-model="showPopover"
        >
            <div class="popover-top">
                <i>{{ content }}</i>
            </div>
        </el-popover>

        <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="50%">
            <span>{{ content }}</span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "ePage",
        components: {},
        props: {},
        data() {
            return {
                canvas: null,
                ctx: null, // 创建画布
                canvasWidth: 800,  // 画布宽度
                canvasHeight: 900, // 画布高度
                timer: null, // 定时器
                isClick: false, // 判断鼠标是否点击
                sensorImgList: [],
                backgroundImg: {
                    url: require("/public/img/road.png"),
                    x: 0,
                    y: 0,
                    width: 800,
                    height: 900
                },
                canvasSensorImg: [
                    {
                        channelId: 12,
                        width: 44,
                        height: 44,
                        url: require("/public/img/deviceMarker.png"),
                        x: 247,
                        y: 233,
                        title: '应急车辆',
                    },
                    {
                        channelId: 13,
                        width: 44,
                        height: 44,
                        url: require("/public/img/drillPlanMarker.png"),
                        x: 400,
                        y: 400,
                        title: '紧急逃生',
                    },
                    {
                        channelId: 15,
                        width: 44,
                        height: 44,
                        url: require("/public/img/easyDisasterMarker.png"),
                        x: 0,
                        y: 0,
                        title: '易灾地点',
                    },
                ], // 图标集合
                index: -1, // 记录需要移动的图片的开关
                showPopover: false, // 是否展示小弹窗
                content: null, // 悬浮框里面的内容
                dialogTitle: "", // 弹窗标题
                dialogVisible: false, // 是否打开弹窗
            };
        },
        methods: {
            canvasMouseDown(e) {
                console.log(e, '鼠标点击')
                this.isClick = true;
                this.index = this.isMouseInIcon(e, this.canvasSensorImg);
                if (this.index === -1) {
                    console.log("点击canvas但没选中图标");
                    this.showPopover = false
                    return;
                }
                console.log('选中的图标是：', this.canvasSensorImg[this.index])
                // this.showDialog()
            },

            showDialog() {
                this.isClick = false;
                this.dialogVisible = true;
                this.dialogTitle = this.content
            },

            canvasMouseMove(e) {
                console.log(this.index, this.isClick)
                /* 未选中图标并且移动鼠标 */
                if (!this.isClick) {
                    /* 在图标范围内移动鼠标 */
                    let index = this.isMouseInIcon(e, this.canvasSensorImg);
                    if (index !== -1) {
                        this.content = this.canvasSensorImg[index].title
                        this.$nextTick(() => {
                            const dom = document.getElementById("popover");
                            dom.style.position = "absolute";
                            dom.style.top = this.canvasSensorImg[index].y + 40 + "px";
                            dom.style.left = this.canvasSensorImg[index].x - 60 + "px";
                            this.showPopover = true;
                        });
                    } else {
                        return;
                    }
                }

                /* 选中图标并且移动鼠标 */
                if (this.index !== -1 && this.isClick) {
                    this.showPopover = false;
                    let x = e.offsetX;
                    let y = e.offsetY;
                    this.canvasSensorImg[this.index].x =
                        this.canvasSensorImg[this.index].x < 0
                            ? 0
                            : x - this.canvasSensorImg[this.index].width / 2;
                    this.canvasSensorImg[this.index].y =
                        this.canvasSensorImg[this.index].y < 0
                            ? 0
                            : y - this.canvasSensorImg[this.index].height / 2;
                }

            },
            canvasMouseUp(e) {
                this.isClick = false;
                console.log(this.isClick)
                console.log(e, 'canvasMouseUp')
            },

            /**
             * @Event 方法
             * @description: 创建画布
             * */
            init() {
                this.canvas = this.$refs.canvas;
                this.ctx = this.canvas.getContext("2d");
                this.loadBgImg();
                this.refreshCanvas();
            },

            /**
             * @Event 方法
             * @description: 创建背景，图标，移动图标
             * */
            loadBgImg() {
                let img = new Image();
                let bgImg = this.backgroundImg;
                img.src = bgImg.url;
                img.onload = () => {
                    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.ctx.drawImage(img, bgImg.x, bgImg.y, bgImg.width, bgImg.height);
                    this.drawCanvasSensorImg();
                    // this.loadSensorImg();
                };
            },

            /**
             * @Event 方法
             * @description: 绘制移动的图片
             * */
            drawCanvasSensorImg() {
                let imgList = [];
                for (let i = 0; i < this.canvasSensorImg.length; i++) {
                    let img = new Image();
                    let sensorImg = this.canvasSensorImg[i];
                    img.src = sensorImg.url;
                    let imgs = {};
                    imgs.img = img;
                    imgs.x = sensorImg.x;
                    imgs.y = sensorImg.y;
                    imgs.width = sensorImg.width;
                    imgs.height = sensorImg.height;
                    imgList.push(imgs);
                }
                this.drawImg(imgList);
            },

            /**
             * @Event 方法
             * @description: 加载图标
             * */
            loadSensorImg() {
                let imgList = [];
                for (let i = 0; i < this.sensorImgList.length; i++) {
                    let img = new Image();
                    let sensorImg = this.sensorImgList[i];
                    img.src = sensorImg.url;
                    let imgs = {};
                    imgs.img = img;
                    imgs.x = sensorImg.x;
                    imgs.y = sensorImg.y;
                    imgs.width = sensorImg.width;
                    imgs.height = sensorImg.height;
                    // console.log(imgs)
                    imgList.push(imgs);
                }
                this.drawImg(imgList);
            },

            /**
             * @Event 方法
             * @description: 定时器刷新画布
             * */
            refreshCanvas() {
                if (this.timer != null) {
                    return;
                }
                this.timer = setInterval(() => {
                    this.loadBgImg();
                }, 20);
            },

            /**
             * @Event 方法
             * @description: 绘制图片方法
             * */
            drawImg(imgList) {
                for (let i = 0; i < imgList.length; i++) {
                    this.ctx.drawImage(
                        imgList[i].img,
                        imgList[i].x,
                        imgList[i].y,
                        imgList[i].width,
                        imgList[i].height
                    );
                }
            },

            /**
             * @Event 方法
             * @description: 判断鼠标是否在图标范围内,并返回下标
             * */
            isMouseInIcon(e, imgList) {
                let x = e.offsetX;
                let y = e.offsetY;
                for (let i = 0; i < imgList.length; i++) {
                    let imgX = imgList[i].x;
                    let imgY = imgList[i].y;
                    let imgWidth = imgList[i].width;
                    let imgHeight = imgList[i].height;
                    if (
                        x > imgX &&
                        x < imgX + imgWidth &&
                        y > imgY &&
                        y < imgY + imgHeight
                    ) {
                        return i;
                    }
                }
                return -1;
            },

        },
        created() {
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },
    };
</script>

<style lang="scss" scoped>
    .ePage {
        width: 804px;
        height: 902px;
        border: 2px dashed lightgreen;

        .popover-top {
            text-align: center;
        }
    }
</style>
