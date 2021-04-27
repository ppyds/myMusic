<template>
  <div id="search_input" :class='{active:active}' :style="{width: active ?activeWidth:'100%'}">
    <div :class='{active:active}' class="box">
      <div class="input">
        <label>
          <input ref="myRef" v-model="inputValue" :class='{active:active}' type="text" @blur="blur" @focus="focus"
                 @input="input"
                 @keydown="keydown">
        </label>
      </div>
      <ul :class='{active:active}' :style="{height:active?promptArr.length * 30 +'px':'0'}" class="prompt"><!--   提示  -->
        <li v-for="(item,index) in promptArr" :class="promptIndex === index?'active':''"
            @click="click" @mouseover="promptIndex = index"
            :key="item"
        >{{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


import {computed, defineComponent, reactive, ref, toRefs} from 'vue'


export default defineComponent({
  name: 'SearchInput',
  props: {
    promptArr: {
      type: Array
    },
    activeWidth: {
      type: String
    }
  },

  setup(props, context) {
    const promptArr = computed(() => props.promptArr)
    const activeWidth = computed(() => props.activeWidth)
    //获取 input 元素
    const myRef = ref(null);
    myRef.value = undefined;

    let data = reactive({
      active: '',
      promptIndex: -1,
      inputValue: '',
      height: '0',
      promptArr,
      activeWidth
    })

    const tab = (active, height) => {// 切换激活状态
      data.active = active
      data.height = height
    }
    const tips = () => {//向父组件请求提示数据
      context.emit('_tips', {
        key: data.inputValue
      })
    }
    const focus = () => { // 获取焦点时  将事件 触发父组件  并请求提示数据
      // context.emit('_focus')
      tab(true, '300px')
      if (!data.inputValue.length > 0) return
      tips()
    }
    const blur = () => {// 失去焦点是  触发父组件事件
      // context.emit('_blur')
      tab(false, '')
    }
    const input = () => {  // 请求提示
      tips()
    }

    const search = () => {  //搜索  重置promptIndex 更改 inputValue 为搜索的值
      const value = data.promptIndex === -1 ? data.inputValue : data.promptArr[data.promptIndex]
      context.emit('_getSearch', value)
      data.promptIndex = -1
      data.inputValue = value
    }
    const click = () => {
      search()
    }
    const keydown = (e) => { //键盘 上下键 选择提示语
      switch (e.keyCode) {
        case 40:
          data.promptIndex++
          (data.promptIndex > data.promptArr.length - 1) && (data.promptIndex = -1)
          break
        case 38:
          data.promptIndex--
          (data.promptIndex < -1) && (data.promptIndex = data.promptArr.length - 1)
          break
        case 13: // 回车 请求数据
          tab('', '')
          myRef.value.blur()
          search()
      }
    }


    return {
      ...toRefs(data),
      myRef,
      keydown,
      focus,
      blur,
      input,
      click

    }
  }
})
</script>
<style scoped>
#search_input {
  height: 30px;
  position: relative;
  text-indent: var(--px8);
  width: 100%;
  -webkit-app-region: no-drag !important;

}

#search_input *, #search_input {
  transition: .5s
}

#search_input.active {
  z-index: 9999;
}

.box {
  /*border: 1px solid var(--border_color1);*/
  box-shadow: var(--border_color1) 0 0 5px 0;
  border-radius: var(--border-radius_1);
  min-height: 30px;
  overflow: hidden;
  background-color: var(--color_1);
  backdrop-filter: var(--webkit_backdrop_filter_1);
}

.box.active {
  box-shadow: var(--color_2) 0 0 5px 0;
}

.input {
  height: 30px;
  box-sizing: border-box;

}

input {
  height: 100%;
  width: 100%;
  display: block;
  text-indent: inherit;
  background: var(--color_1);
}

input.active {
  color: #42b983;
  font-size: var(--font_big);
  background: var(--color_1);
  font-weight: var(--active_font_style);
  border-color: #42b983;

}

.prompt {
  height: 0;
  overflow: hidden;
}

.prompt.active {
  height: 300px;
}

.prompt li {
  height: 30px;
  line-height: 30px;
  font-size: var(--font_smale);
  cursor: pointer;
  transition: 0s !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.prompt li.active {
  color: var(--color_2);
  font-size: var(--font_big);
  box-shadow: var(--color_2) 0 0 5px 0;

}
</style>
