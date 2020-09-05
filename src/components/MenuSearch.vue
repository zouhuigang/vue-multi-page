<template>
    <div class="hello">
        <van-cell is-link @click="showPopupProduct">
            <p v-if="p_style||p_area||p_type||p_materia||p_tint">
                已选（
                风格:{{p_style}}
                区域:{{p_area}}
                功能:{{p_type}}
                材质:{{p_materia}}
                色系:{{p_tint}}）
            </p>
            <p v-else>全部产品</p>
        </van-cell>
        <van-popup v-model="show" position="top" :style="{ height: '30%' }">
            <van-form @submit="onSubmit">

                <van-row type="flex">
                    <van-col span="12">
                        <van-field
                                readonly
                                clickable
                                name="p_style"
                                :value="p_style"
                                label="按风格"
                                placeholder="点击选择"
                                @click="p_style_show = true"
                        />
                    </van-col>
                    <van-col span="12">
                        <van-field
                                readonly
                                clickable
                                name="p_area"
                                :value="p_area"
                                label="按区域"
                                placeholder="点击选择"
                                @click="p_area_show = true"
                        />
                    </van-col>
                </van-row>

                <van-row type="flex">
                    <van-col span="12">
                        <van-field
                                readonly
                                clickable
                                name="p_type"
                                :value="p_type"
                                label="按功能"
                                placeholder="点击选择"
                                @click="p_type_show = true"
                        />
                    </van-col>
                    <van-col span="12">
                        <van-field
                                readonly
                                clickable
                                name="p_materia"
                                :value="p_materia"
                                label="按材质"
                                placeholder="点击选择"
                                @click="p_materia_show = true"
                        />
                    </van-col>
                </van-row>
                <van-row type="flex">
                    <van-col span="12">
                        <van-field
                                readonly
                                clickable
                                name="p_tint"
                                :value="p_tint"
                                label="按色系"
                                placeholder="点击选择"
                                @click="p_tint_show = true"
                        />
                    </van-col>
                </van-row>

                <van-popup v-model="p_style_show" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="p_style_cls"
                            @confirm="onConfirm"
                            @cancel="p_style_show = false"
                    />
                </van-popup>

                <van-popup v-model="p_area_show" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="p_area_cls"
                            @confirm="onAreaConfirm"
                            @cancel="p_area_show = false"
                    />
                </van-popup>
                <van-popup v-model="p_type_show" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="p_type_cls"
                            @confirm="onTypeConfirm"
                            @cancel="p_type_show = false"
                    />
                </van-popup>
                <van-popup v-model="p_materia_show" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="p_materia_cls"
                            @confirm="onMateriaConfirm"
                            @cancel="p_materia_show = false"
                    />
                </van-popup>

                <van-popup v-model="p_tint_show" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="p_tint_cls"
                            @confirm="onTintConfirm"
                            @cancel="p_tint_show = false"
                    />
                </van-popup>
                <div style="margin: 16px;">
                    <van-button color="#000" round block native-type="submit">
                        搜索
                    </van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: 'MenuSearch',
        data() {
            return {
                msg: '测试组件',
                zIndex: 999,
                show: false,
                password: '',
                p_style: '',
                p_style_cls: ['全部风格', '新中式', '简欧', '现代', '美式'],
                p_style_show: false,

                p_area: '',
                p_area_cls: ['全部区域', '客厅', '餐厅', '卧室', '书房', '厨房', '洗手间'],
                p_area_show: false,

                p_type: '',
                p_type_cls: ['全部功能', '沙发', '椅子', '桌子', '床', '柜子'],
                p_type_show: false,

                p_materia: '',
                p_materia_cls: ['全部材质', '红木', '胡桃木', '水曲柳', '钢材', '塑料', '布艺', '原木'],
                p_materia_show: false,

                p_tint: '',
                p_tint_cls: ['全部颜色', '红', '黄', '绿'],
                p_tint_show: false,

            }
        },
        methods: {
            showPopupProduct() {
                let that = this;
                that.$nextTick(function () {
                    that.show = true;
                });
            },
            onSubmit(values) {
                this.$emit('searchChange', values)
                this.show = false
            },
            onConfirm(value) {
                this.p_style = value;
                this.p_style_show = false;
            },
            onAreaConfirm(value) {
                this.p_area = value;
                this.p_area_show = false;
            },
            onTypeConfirm(value) {
                this.p_type = value;
                this.p_type_show = false;
            },
            onMateriaConfirm(value) {
                this.p_materia = value;
                this.p_materia_show = false;
            },
            onTintConfirm(value) {
                this.p_tint = value;
                this.p_tint_show = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
