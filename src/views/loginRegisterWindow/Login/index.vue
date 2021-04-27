<template>
  <div id="login">
    <div id="form">
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name:'Login',
  setup(){
    document.querySelector('title').innerHTML ='登录，注册'
  }
})
</script>

<style scoped>
div{
  -webkit-app-region: no-drag;
}
#form{
  position: absolute;
  top: 50px;
  z-index:99;
  width:300px;
  background: var(--color_1);
  border-radius: var(--border-radius_2);
  padding: 20px;
  backdrop-filter: var(--webkit_backdrop_filter_1);
}
</style>
