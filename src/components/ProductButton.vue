<style scoped>

    .navbar-fixed-bottom {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 100px;
    }

    .navbar-fixed-bottom .reddot {
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        top: -6px;
        right: -6px;
        background: #ff3e3e;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }

    .navbar-fixed-bottom .footer {
        width: 100%;
        padding: 8px 0px 6px 0px;
        border-top: 1px solid #ccc;
    }

    .navbar-fixed-bottom .footer i {
        font-size: 22px;
    }

    .navbar-fixed-bottom .footer h6 {
        height: 22px;
        line-height: 22px;
    }

    .navbar-fixed-bottom .footer h6.ico {
        height: 25px;
        line-height: 25px;
    }

    .navbar-fixed-bottom .footer a {
        color: #a0a0a0;
    }

    .navbar-fixed-bottom .footer a.actived {
        /*color: #ff6046;	color:#00af19;*/
        color: #000;
        font-weight: bold;
    }

    .cartButton {
        background: #ffffff;
        color: #1989fa;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        height: 45px;
        box-sizing: border-box;
        border-radius: 25px;
    }
</style>
<template>
    <div class="navbar-fixed-bottom">
        <div class="cartButton">
            <div style="width:90%;margin:0 auto;">
                <div style="float: left;margin-top: 5px;margin-left: 10px;">
                    <van-icon name="cart-circle" color="#1989fa" size="35"/>
                </div>
                <div style="float: left;line-height: 45px;margin-left:10px;">
                    <p style="display: inline-block;font-size: 14px;margin:0px;">已选择{{myCount}}个产品，生成推荐链接</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductButton',
        props: {
            count: {
                type: Number,
                default: ""
            }
        },
        data() {
            return {
                myCount: parseInt(this.count)
            }
        },
        watch: {
            count(val) {
                this.myCount = parseInt(val);
            },
        }
    }
</script>
