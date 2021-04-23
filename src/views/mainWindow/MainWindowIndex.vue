<template>
    <div id="box">
      <div id="top">
        <div id="nav_box">
          {{$route.path}}
          <div id="nav">
            <router-link to="/mainWindow/home">首页</router-link>
            <router-link to="/mainWindow/player">播放</router-link>
            <router-link to="/mainWindow/search">搜索</router-link>
            <router-link to="/mainWindow/Collect">收藏</router-link>
          </div>
        </div>

        <keep-alive>
          <router-view id="router_view_box"/>
        </keep-alive>

      </div>
      <div id="player_bar_box">
        <PlayerBar/>
      </div>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import PlayerBar from "@/views/mainWindow/Player";
import Header from "@/components/Header";
import {useRouter} from 'vue'
export default defineComponent({
  name: "Index",
  components: {
    PlayerBar,
    Header
  }
})
</script>

<style scoped>
#box {
  border-radius: var(--border-radius_2);
  --player_bar_box_height:72px
}

#top {
  display: flex;
  overflow: hidden;
  height:calc(100% - var(--player_bar_box_height))
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

#nav_box #nav a.router-link-active {
  color: var(--color_2);
  background: var(--color_1);
  font-weight: var(--active_font_style);
  box-shadow: var(--color_2) 0 0 5px 0;
  font-size: var(--font_big);
}

#router_view_box {
  background: var(--color_1);
  padding-top: 15px;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#player_bar_box{
  height:var(--player_bar_box_height);
}
</style>
