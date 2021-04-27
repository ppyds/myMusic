<template>
  <div id="Slider"
       ref="EleSlider"
       :style="{
  backgroundImage:`linear-gradient(to right,var(--color_2) ${!isMousemove?position / max* 100:moveLeft}%,var(--color_1) 0)`,
}"
       @mousedown.native="mouseDown"
       @mouseup="mouseUp">
<!--    <div-->
<!--        :class="{-->
<!--          active:active-->
<!--        }"-->
<!--        :style="{-->
<!--          left:`${!isMousemove?position / max* 100:moveLeft}%`-->
<!--        }"-->
<!--        class="radio"-->
<!--    >-->
<!--    </div>-->
    <div
        :class="{
          active:active
        }"
        class="tips"
    >
      <p>{{ tips }}</p>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, ref} from 'vue'
import {offsetBodyLeft} from '@/tools'

export default defineComponent({
  name: "Slider",
  props: {
    tips: {
      type: String
    },
    position: {
      type: Number
    },
    max: {
      type: Number
    }
  },
  setup(props, context) {
    let isMousemove = ref(false)
    let moveLeft = ref(0)
    let EleSlider = ref(null)
    let active = ref(false)
    let tips = ref(computed(() => props.tips))
    const mouseDown = (e) => {
      let eleLeft = offsetBodyLeft(EleSlider.value)
      let eleWidth = EleSlider.value.offsetWidth
      let left = (e.x - eleLeft) / eleWidth * 100
      if (left <= 0) left = 0
      if (left >= 100) left = 100
      moveLeft.value = left;
      window.onmousemove = (e) => {
        isMousemove.value = true
        active.value = true
        let left = (e.x - eleLeft) / eleWidth * 100
        if (left <= 0) left = 0
        if (left >= 100) left = 100
        moveLeft.value = left;
        context.emit('input', moveLeft.value)
      }


      window.onmouseup = () => {
        isMousemove.value = false
        window.onmousemove = window.onmouseup = null
        active.value = false
        context.emit('mouseUp', moveLeft.value)
      }
    }
    const mouseUp = () => {
      window.onmousemove = null
    }
    return {
      mouseUp,
      mouseDown,
      EleSlider,
      moveLeft,
      isMousemove,
      active,
      tips
    }
  }
})
</script>

<style scoped>
#Slider_box {
  padding: 5px 20px
}

#Slider {
  position: relative;
  height: 3px;
  user-select: none;
}

#Slider .tips {
  position: absolute;
}

#Slider .radio {
  --width: 10px;
  content: attr(data-tips);
  display: block;
  position: absolute;
  top: -4px;
  height: var(--width);
  width: var(--width);
  background: yellow;
  border-radius: 50%;
  transition: transform .5s;
}

#Slider .tips {
  height: 30px;
  font-size: var(--font_big);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 30px;
  text-align: center;
  opacity: 0;
  transition: .5s
}

#Slider .tips.active {
  top: -40px;
  opacity: 1;
}

#Slider .tips p {
  background: rgba(255, 255, 255, 1);
  display: inline-block;
  padding: 0 15px;
  border-radius: 40px;
}

#Slider .radio.active {
  transform: scale(1.5);
}
</style>
