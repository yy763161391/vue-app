<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>
<script>
import svgIcon from './components/common/svg'
export default {
    components:{
      svgIcon
    }
}
</script>
<style lang="scss">
@import './style/common';

.fade-enter-active,.fade-leave-active{
  transition: opacity 0.6s;
}
.fade-enter,.fade-leave-to{
opacity: 0;
}
</style>
