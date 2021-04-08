<template>
  <button :class="{active:active}" :style="{height,width}" @click="click" @mousedown="mouseDown" @mouseup="mouseUp">
    {{ value }}
  </button>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "mBtn",
  props: {
    click: {
      type: Function
    },
    value: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String
    }
  },
  setup(props, context) {
    let active = ref(false)
    const mouseDown = () =>
        active.value = true
    const mouseUp = () =>
        active.value = false
    return {
      active,
      mouseDown,
      mouseUp
    }
  }
})
</script>

<style scoped>
button {
  transition: .5s;
  background: var(--color_2);
  padding: 0 10px;
  height: 30px;
  border-radius: var(--border-radius_1);
  color: #ffffff;
  font-size: var(--font_smale);
  font-weight: var(--active_font_style);
}

button.active {
  box-shadow: var(--color_2) 0 0 10px 0;
  transform: scale(.95);
}
</style>