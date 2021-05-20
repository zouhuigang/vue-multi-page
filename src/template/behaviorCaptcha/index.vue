<template>
    <Card class="postTool">
        <p slot="title">
            发帖通素材包监控列表
        </p>
    </Card>
</template>


<script>
    import { Poptip,Row  } from 'zantui';
    import api from '@/libs/api.js';
    export default {
        name: 'app',
        data() {
            return {
                similarShow:false,
                expectAdCount:0,
                titleTotal:0,
                contentTotal:0,
                combinationTotal:0,
                similarDelayShow:false,
                differ:false,
                left:"",
                right:"",
                similar:0,
                statusList: [
                    {
                        value: '',
                        label: '不限制'
                    },
                    {
                        value: 'advance',
                        label: '预创建'
                    },
                    {
                        value: 'draft',
                        label: '草稿'
                    },
                    {
                        value: 'publish',
                        label: '推广中'
                    },
                    {
                        value: 'deleted',
                        label: '已删除'
                    },
                    {
                        value: 'finished',
                        label: '推广结束'
                    }],
                userId:this.$root.userId,
                status:this.$root.status,
                curpage: this.$root.page,
                total: this.$root.total,
                pageSize: this.$root.pageSize,
                col: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    }
                ],
                data: this.$root.vos
            }
        },
        methods: {
            jumpPage(nextPage) {
                this.curpage = nextPage;
                this.search();
            },
            jump(errLink, target){
                if(target == '_blank') {
                    window.open(errLink,'_blank')
                }else{
                    window.location.href = errLink;
                }

            },
            transformParamToUrl(param) {
                const tempObj = []
                if (!param || typeof param !== 'object') {
                    return
                }

                for (let i in param) {
                    if (param.hasOwnProperty(i) && param[i]) {
                        tempObj.push(i)
                        tempObj.push('=')
                        tempObj.push(param[i])
                        tempObj.push('&')
                    }
                }
                // remove the last field &
                tempObj.pop()
                return tempObj.join('')
            },
            jumpSearch(){
                this.curpage = 1;
                this.search();
            },
            showDiffer(){
                this.differ = true;
            },
            search() {
                let searchParam = {
                    'page': parseInt(this.curpage),
                    'status': this.status,
                    'userId': parseInt(this.userId),
                };

                window.location.href = '?' + this.transformParamToUrl(searchParam);
            },
            similarCount(id,type){
                return api.similarCount(id,type,{}).then( res => {
                    if(res.code == api.ERR_OK){
                        if(res.data){
                            this.expectAdCount = res.data.total;
                            this.contentTotal = res.data.contentTotal;
                            this.titleTotal = res.data.titleTotal;
                            this.combinationTotal = res.data.combinationTotal;
                            this.similarShow = true;
                        }else{
                            this.similarDelayShow = true;
                        }
                    }
                });
            },
            differHandle(){
                let params = {};
                params["left"] = this.left
                params["right"] = this.right
                return api.differSimilar(params).then( res => {
                    if(res.code == api.ERR_OK){
                        this.similar = res.data;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .postTool {
        margin: 15px auto;
        width: 1200px;
    }
    .search {
        margin: 20px 0;
    }
    div >>> .opt{
        margin:0 2px;
    }
</style>
