<template>
  <header
      id="header"
      :style="{
            appRegion: isMaxWindow?'no-drag':'drag'
          }"
  >
    <div id="Search_box">
      <SearchInput
          :prompt-arr="promptArr"
          active-width="70%"
          style="display: block; width: 70%;min-width: 500px;margin: auto;app-region:no-drag"
          @_get="_get"
          @_tips="prompt"
      />
    </div>
    <div id="ControlButton_box">
      <ControlButton/>
    </div>
  </header>
</template>

<script>
import SearchInput from "@/components/SearchInput";
import ControlButton from "@/components/ControlButton";
import {computed, defineComponent} from 'vue'
import {useStore} from "vuex";

export default defineComponent({
  name: 'Header',
  components: {
    SearchInput,
    ControlButton
  },
  setup() {
    let store = useStore()
    let promptArr = computed(() => store.getters["search/getPromptArr"])
    let prompt = store._actions['search/prompt'][0]
    let search = store._actions['search/search'][0]
    let isMaxWindow = computed(() => store.getters.isMaxWindow)
    const _get = (key) => {
      search({key})
    }
    return {
      promptArr,
      prompt,
      isMaxWindow,
      _get
    }
  }
})
</script>

<style scoped>
#header {
  /*backdrop-filter: var(--webkit_backdrop_filter_1);*/
  height: 50px;
  /*-webkit-app-region: drag !important;*/
  user-select: none;
  display: flex;
}

#Search_box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
}

#ControlButton_box {
  padding-right: 20px;
}
</style>