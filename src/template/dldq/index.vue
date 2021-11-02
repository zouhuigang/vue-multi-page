<template>
<div>
   <Card style="width:50%;margin:20px auto;">
      <Upload
            :before-upload="handleUpload"
            :action="actionUrl">
          <Button icon="ios-cloud-upload-outline">上传学生名单</Button>
       </Upload>

        <p slot="title">点来点去 <span v-if="file !== null" style="color:red">{{ file.name }} 班级总人数: {{stuCount}} </span>
        </p>
         <div>
            <h1 class="main-title animate__animated animate__bounce" align="center">
              {{curStu.id}} {{curStu.realname}}
            </h1>
        </div>
        


        <p style="text-align:center;margin:20px">
           <Button v-if="go" type="primary" large @click="stopGame">暂停</Button>
          <Button  v-else type="primary" large @click="startGame">点击开始</Button>
        </p>
    </Card>
</div>
</template>


<script>
    import { Poptip,Row  } from 'zantui';
    export default {
        name: 'app',
        data() {
            return {
                show: true,
                actionUrl:"#",
                file: null,
                loadingStatus: false,
                stuList:[],
                stuCount:0,
                curStu:{
                  id:0,
                  realname:"匿名"
                },
                go:false,
                timer:""
            }
        },
         beforeCreate() {
            // 读取文件
            FileReader.prototype.reading = function ({encode} = pms) {
              let bytes = new Uint8Array(this.result);    //无符号整型数组
              let text = new TextDecoder(encode || 'UTF-8').decode(bytes);
              return text;
            };
            /* 重写readAsBinaryString函数 */
            FileReader.prototype.readAsBinaryString = function (f) {
              if (!this.onload)       //如果this未重写onload函数，则创建一个公共处理方式
                this.onload = e => {  //在this.onload函数中，完成公共处理
                  let rs = this.reading();
                };
              this.readAsArrayBuffer(f);  //内部会回调this.onload方法
            };
      },
        methods: {
            startGame() {
              this.go = true;
              if(this.stuList.length>0){
                this.timer = setInterval(this.randomStu, 20); 
              }
              
            },
            stopGame(){
              this.go = false;
              clearInterval(this.timer);
            },
            randomStu(){
                var randomIndex = parseInt(Math.random() * this.stuList.length);
                this.curStu = this.stuList[randomIndex];
            },
            handleUpload(file) {
              this.file = file;
              this.read(file);
              return false;
           },
            read(f) {
              this.stuList = [];
              this.stuCount = 0;
              let rd = new FileReader();
			        rd.onload = e => {  
                let cont = rd.reading({encode: 'utf-8'});
                //截取内容中的回车换行符返回是数组
                var asd = cont.split("\n")
                for (let i = 0; i < asd.length; i++) {
                      let obj = {}
                      let str = asd[i]
                      obj.id = str.split(",")[0]
                      obj.realname = str.split(",")[1]
                      console.info(obj.realname);
                      this.stuList.push(obj)
                }
                this.stuCount = this.stuList.length;
              };
              rd.readAsBinaryString(f);
            },
            getRequest(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return r[2];
                    return "";
            },
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

            }
        },
        created: function () {
            let t = this.getRequest("t");
            this.shareUrl = 'https://www.tv8081.cn/tongj/index_cy.html?partnerId='+t;
            this.coords1 = "0,300,828,1616";
            this.coords2 = "0,300,828,1616";
            console.info(this.coords1,this.clientHeight);
        },
        mounted() {
        }
    }
</script>

<style scoped>
  .main-title {
    font-size: 80px;
  }
</style>
