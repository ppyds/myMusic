<template>
  <button  :style="{height,width}" @click="click">
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

button:active {
  box-shadow: var(--color_2) 0 0 10px 0;
  transform: scale(.95);
}
</style>