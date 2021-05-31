<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="scss">
p{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  margin: 0 auto;
  max-width: 650px;
  padding: 50px 20px 50px 20px;
}
body{
  padding: 0;
  // max-width: 650px;
  // min-width: 375px;
  margin: 0 auto !important;
  background: #f8f8f8;
}

</style>
