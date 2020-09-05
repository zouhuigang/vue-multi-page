<style scoped>
    div >>> .van-grid-item__content {
        padding: 0 !important;
    }

    .itemContent {
        width: 100%;
        margin: 0 auto;
        background: #fff !important;
    }

    .itemContent .ul {
        width: 96%;
        margin: 0 auto;
    }

    .sitem {
        width: 50%;
        padding: 5px;
        float: left;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
    }

    .menu-search {
        margin-bottom: 10px;
    }
</style>
<template>
    <div id="app">
        <default-layout>
            <van-row type="flex">
                <van-col span="24" class="menu-search">
                    <menu-search @searchChange="searchChange"></menu-search>
                </van-col>
            </van-row>


            <div class="itemContent">
                <van-list
                        v-model="loading"
                        :error.sync="error"
                        error-text="请求失败，点击重新加载"
                        @load="onLoad"
                        :finished="finished"
                        :immediate-check="false"
                        finished-text="没有更多了"
                >
                    <div class="ul">
                        <div class="sitem" v-for="v in list" :key="v.pid">
                            <product-item
                                    :pic_link="v.pic_link"
                                    :pid="v.pid"
                                    :pname="v.pname"
                                    :p_materia="v.p_materia"
                                    :p_type="v.p_type"
                                    @selectChange="selectChange"
                            />
                        </div>
                    </div>

                </van-list>

            </div>

            <product-button v-if="selectProduct.length>0" :count="selectProduct.length"></product-button>

        </default-layout>
    </div>
</template>

<script>
    import DefaultLayout from '@/layout/default.vue'
    import ProductItem from 'components/ProductItem.vue'
    import MenuSearch from 'components/MenuSearch.vue'
    import ProductButton from 'components/ProductButton.vue'
    import {Toast} from "vant";
    import api from '@/libs/api.js';


    export default {
        name: 'app',
        components: {DefaultLayout, MenuSearch, ProductItem, ProductButton},
        data() {
            return {
                finished: false,
                error: false,
                list: this.$root.list,
                size: this.$root.size,
                page: 2,
                selectProduct: [],
                loading: false,
                searchObj: {
                    p_tint: ''
                },
                submitHandle: false
            }
        },
        methods: {
            onLoad() {
                if (!this.submitHandle) {
                    this.submitHandle = true
                    this.getProductList();
                }
            },
            selectChange(p_id) {
                let arrIndex = this.selectProduct.indexOf(p_id);
                if (arrIndex > -1) {
                    this.selectProduct.splice(arrIndex, 1);
                } else {
                    this.selectProduct.push(p_id);
                }
            },
            searchChange(valus) {
                this.searchObj = valus
                this.page = 1
                this.list = [];
                this.finished = false;
                this.loading = true;
                this.getProductList()
            },
            getProductList() {
                let _this = this;
                let form_data = {}
                form_data["p_tint"] = _this.searchObj.p_tint
                form_data["page"] = parseInt(_this.page)
                form_data["pageSize"] = parseInt(_this.size)
                return api.ProductList(form_data).then(res => {
                    if (res.status === 200) {
                        let datList = res.data.list;
                        if (datList.length > 0 && _this.loading) {
                            if (parseInt(this.page) === 1) {
                                console.info("第一个a");
                                _this.list = datList;
                            } else {
                                _this.list.push(...datList)
                            }
                            this.page++
                            this.loading = false;
                        } else {
                            if (parseInt(this.page) === 1) {
                                _this.list = []
                            }
                            this.loading = false;
                            _this.finished = true
                        }

                    } else {
                        Toast(res.error_description);
                        this.loading = false;
                    }
                    _this.submitHandle = false
                });
            }
        }
    }
</script>
