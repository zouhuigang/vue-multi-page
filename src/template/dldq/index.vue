<template>
<div>
   <Card style="width:50%;margin:50px auto;">

        <p slot="title">点来点去 <span v-if="file !== null" style="color:red">{{ file.name }} 总数: {{stuCount}} </span>
        </p>
         <div style="margin-top:30px;">
            <h1 class="main-title animate__animated animate__bounce" align="center">
              <span v-if="curStu.id != 0">{{curStu.id}}</span> {{curStu.realname}}
            </h1>
        </div>
        


        <p style="text-align:center;margin:50px;">
          <Button v-if="go" type="error" style="width:200px;font-size:25px;" Large @click="stopGame">停止</Button>
          <Button  v-else type="primary" style="width:200px;font-size:25px;" Large @click="startGame">开始</Button>
        </p>
        <Row>
          <Col span="18">
            <audio ref="audio" id="audio" loop="loop" @play="onPlay" @pause="onPause" :src="Bg"  hidden></audio>
            <Icon type="ios-pause" v-if="audio.playing" color="#007aff" @click="startPlayOrPause" />
            <Icon type="ios-play" color="#007aff" v-else @click="startPlayOrPause"/>
          </Col>
          <Col span="6" style="text-align:right;">
            <Upload
                :before-upload="handleUpload"
                :action="actionUrl">
              <Button icon="ios-cloud-upload-outline">上传名单</Button>
          </Upload>
        </Col>
        </Row>
    </Card>
</div>
</template>


<script>
    import { Poptip,Row,Icon } from 'zantui';
    import Bg from '@/assets/bg.mp3'
    export default {
        name: 'app',
        data() {
            return {
                Bg,
                show: true,
                actionUrl:"#",
                file: null,
                loadingStatus: false,
                stuList:[],
                stuCount:0,
                curStu:{
                  id:0,
                  realname:"别紧张~"
                },
                go:false,
                timer:"",
                audio: {
                  // 该字段是音频是否处于播放状态的属性
                  playing: false
                }
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
              if(this.stuList.length == 0){
                this.$Message.error('请上传名单');
                return false;
              }
              this.go = true;
              if(this.stuList.length>0){
                this.timer = setInterval(this.randomStu, 20); 
              }
              this.play();
            },
            stopGame(){
              this.go = false;
              clearInterval(this.timer);
              this.pause();
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
                /**
                 * （1）在微软的MS-DOS和Windows中，使用“回车CR('\r')”和“换行LF('\n')”两个字符作为换行符;
                 * （2）Windows系统里面，每行结尾是 回车+换行(CR+LF)，即“\r\n”；
                 * （3）Unix系统里，每行结尾只有 换行CR，即“\n”；
                 * （4）Mac系统里，每行结尾是 回车CR即'\r'。
               */
                var asd = cont.split(/\r|\n/)
                for (let i = 0; i < asd.length; i++) {
                      if(asd[i] == ""){
                        continue;
                      }
                      let obj = {}
                      let str = asd[i]
                      obj.id = str.split(",")[0]
                      obj.realname = str.split(",")[1]
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
            // 控制音频的播放与暂停
            startPlayOrPause () {
              return this.audio.playing ? this.pause() : this.play()
            },
            // 播放音频
            play () {
              this.$refs.audio.play()
            },
            // 暂停音频
            pause () {
              this.$refs.audio.pause()
            },
            // 当音频播放
            onPlay () {
              this.audio.playing = true
            },
            // 当音频暂停
            onPause () {
              this.audio.playing = false
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
