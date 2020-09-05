<style scoped>
    .desc {
        width: 100%;
        height: 100px;
    }
</style>
<template>
    <div style="margin-bottom: 10px;">
        <van-image
                width="100%"
                height="100"
                :src="pic_link"
        />
        <div class="desc">
            <van-row type="flex">
                <van-col span="24"><p style="font-size: 12px;font-weight:bold;margin:0;">{{p_type}}</p></van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="24"><p style="font-size: 10px;margin:0;">材质:{{p_materia}}</p></van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="24">{{pname}}</van-col>
            </van-row>
        </div>

        <van-row type="flex">
            <van-col offset="12" span="12">
                <van-button color="#1989fa" round size="small" v-if="mySelect" @click="selectChange">取消选择
                </van-button>
                <van-button color="#000" round size="small" v-else
                            @click="selectChange">加入选择
                </van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: 'ProductItem',
        props: {
            p_materia: {
                type: String,
                default: ""
            },
            pname: {
                type: String,
                default: ""
            },
            p_type: {
                type: String,
                default: ""
            },
            pic_link: {
                type: String,
                default: ""
            },
            pid: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                p_id: parseInt(this.pid),
                mySelect: false
            }
        },
        methods: {
            selectChange() {
                this.mySelect = !this.mySelect
                this.$emit('selectChange', this.p_id)
            },
        }
    }
</script>
