<template>
  <!--  -->
  <view
    :style="{ position: position, 'z-index': zIndex, '--opacity': maskOpacity }"
    class="container"
    :class="[
      mask ? 'mask' : '',
      maskMini ? 'mask-mini' : '',
      (mask || maskMini) && maskDark ? 'mask-dark' : ''
    ]"
    @click.prevent="handleClick">
    <view class="inner">
      <view class="main">
        <loading0 v-if="type == 'circle'" :color="color"></loading0>
        <loading1 v-if="type == 'pulse'" :color="color"></loading1>
        <loading2 v-if="type == 'bounce'"></loading2>
        <loading3 v-if="type == 'eyes'"></loading3>
        <loading4 v-if="type == 'surround'"></loading4>
        <loading5 v-if="type == 'sun'"></loading5>
        <loading6 v-if="type == 'love'"></loading6>
        <loading7 v-if="type == 'sword'" :color="color"></loading7>
        <loading8 v-if="type == 'atom'" :color="color"></loading8>
        <loading9 v-if="type == 'gear'"></loading9>
        <loading10 v-if="type == 'radar'"></loading10>
        <loading11 v-if="type == 'annulus'" :color="color"></loading11>
        <loading12 v-if="type == 'wobble'" :color="color"></loading12>
        <loading13 v-if="type == 'equal'" :color="color"></loading13>
      </view>
      <view
        class="tips"
        v-if="showText"
        :style="{ color: textColor, fontSize: textSize, marginTop: textGap }">
        {{ text }}
      </view>
    </view>
  </view>
</template>

<script>
import loading0 from './comps/loading-circle.vue'
import loading1 from './comps/loading-pulse.vue'
import loading2 from './comps/loading-bounce.vue'
import loading3 from './comps/loading-eyes.vue'
import loading4 from './comps/loading-surround.vue'
import loading5 from './comps/loading-sun.vue'
import loading6 from './comps/loading-love.vue'
import loading7 from './comps/loading-sword.vue'
import loading8 from './comps/loading-atom.vue'
import loading9 from './comps/loading-gear.vue'
import loading10 from './comps/loading-radar.vue'
import loading11 from './comps/loading-annulus.vue'
import loading12 from './comps/loading-wobble.vue'
import loading13 from './comps/loading-equal.vue'

export default {
  name: 'Loading',
  components: {
    loading0,
    loading1,
    loading2,
    loading3,
    loading4,
    loading5,
    loading6,
    loading7,
    loading8,
    loading9,
    loading10,
    loading11,
    loading12,
    loading13
  },
  props: {
    type: {
      type: String,
      default: 'bounce'
    },
    position: {
      type: String,
      default: 'fixed'
    },
    zIndex: {
      type: Number,
      default: 9
    },
    mask: {
      type: Boolean,
      default: false
    },
    maskOpacity: {
      type: Number,
      default: 0.1
    },
    maskMini: {
      type: Boolean,
      default: false
    },
    maskDark: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#344AD9'
    },
    showText: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '数据加载中...'
    },
    textSize: {
      type: String,
      default: '28rpx'
    },
    textColor: {
      type: String,
      default: '#666'
    },
    textGap: {
      type: String,
      default: '40rpx'
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.tips {
  text-align: center;
}

.mask {
  z-index: 999 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, var(--opacity));
  transform: translate(0, 0);
}

.mask-mini {
  height: 300rpx;
  width: 300rpx;
  border-radius: 20rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mask-dark {
  background: rgba(7, 17, 27, var(--opacity));
}
</style>
