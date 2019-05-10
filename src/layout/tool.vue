<template>
    <i-article>
        <article>
          <router-view></router-view>
        </article>
    </i-article>
</template>
<script type="application/javascript">
  import iArticle from '../../components/article.vue';

    export default {
        components: {
            iArticle
        },
        data () {
          return {}
        }
    }
</script>