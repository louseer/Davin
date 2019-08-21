<style>
.circular {
  -webkit-animation: rotate 2s linear infinite;
  animation: rotate 2s linear infinite;
  height: 100%;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes color {
  0%,
  100% {
    stroke: #e62129;
  }

  40% {
    stroke: #e62129;
  }
  66% {
    stroke: #e62129;
  }
  80%,
  90% {
    stroke: #e62129;
  }
}

@keyframes rotate {
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

.loader {
  width: 40px;
  height: 40px;
  position: absolute;
  top:50%;
  left: 50%;
  margin:-25px 0 0 -25px;
}
</style>

<template>
  <div v-show="isShowLoading" style="z-index:999999">
    <Spin fix :style="{background:'rgba(255,255,255,0.5)'}">
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20"
            fill="none" stroke-width="5" stroke-miterlimit="10">
          </circle>
        </svg>
      </div>
    </Spin>
  </div>
</template>

<script>
import { Spin } from 'iview'

export default {
  name: 'loading',
  components: { Spin },
  computed: {
    isShowLoading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="less" scoped>
#loading {
  display: none;
  background: transparent;
}
</style>
