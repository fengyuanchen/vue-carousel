<template>
  <div class="demo">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .demo {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    border: 1px solid #eee;
    padding: 1rem;
    position: relative;

    & + pre {
      border-radius: .25rem;
      border: 1px solid #eee;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 0;
      margin-bottom: 1rem;
    }
  }
</style>
