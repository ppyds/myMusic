<template>
  <div id="box">
    <div id="top">
      <div id="nav_box">
        <div id="nav">
          <router-link to="/">首页</router-link>
          <router-link to="/player">播放</router-link>
          <router-link to="/search">搜索</router-link>
          <router-link to="/Collect">收藏</router-link>
        </div>
      </div>

      <div id="router_view_box">
        <router-view/>
      </div>

    </div>
    <PlayerBar/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import PlayerBar from "@/components/PlayerBar";
import Header from "@/components/Header";

export default defineComponent({
  name: "Index",
  components: {
    PlayerBar,
    Header
  },
  setup(props, context) {

  }
})
</script>

<style scoped>
#box {
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: var(--border-radius_2);
}

#top {
  display: flex;
  flex: 1;
}

#nav_box {
  width: 198px;
  /*border-right: 1px solid var(--border_color1);*/
  padding: var(--padding_12);
  padding-top: 0;
  text-indent: var(--px8);
  box-sizing: border-box;
  flex-shrink: 0;
  backdrop-filter: var(--webkit_backdrop_filter_1);

}

#nav_box #nav a {
  display: block;
  height: 36px;
  font-size: var(--font_smale);
  line-height: 36px;
  border-radius: var(--border-radius_1);
  margin: 6px 0;
}

#nav_box #nav a.router-link-exact-active {
  color: var(--color_2);
  background: var(--color_1);
  font-weight: var(--active_font_style);
  box-shadow: var(--color_2) 0 0 5px 0;
  font-size: var(--font_big);
}

#router_view_box {
  background: var(--color_1);
  height: 100%;
  width: 100%;
}
</style>