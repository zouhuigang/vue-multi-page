<template>
<div class="navbar-fixed-bottom">
        <div class="footer clearfix">
            <div class="col-4">
                <router-link to='/' tag="a" class="tac">
                    <h6 class="ico">
                        <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconhome"></use>
                        </svg>
                    </h6>
                    <h6>首页</h6>
                </router-link>
            </div>
            <div class="col-4">
              <router-link to='/user' tag="a" class="tac">
                    <h6 class="ico">
                        <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#iconavatarmanstylepeoplehairstylebarbersho"></use>
                        </svg>
                    </h6>
                    <h6>我的</h6>
              </router-link>
            </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data () {
    return {
      actived: ''
    }
  },
  methods:{
      jump() {
         this.$router.push({   path:'/user'})
      }
  }
}
</script>
<style scoped>
.icon {
  width: 25px; 
  height: 25px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
}
.tac {
  text-align: center;
}

.col-4 {
    float: left;
    width: 50%;
}
.navbar-fixed-bottom {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background: #ffffff;
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
	color:#000;
    font-weight: bold;
}

</style>
