<template>
  <div class="demo">
    <slot />
  </div>
</template>

<style lang="scss">
  .demo {
    border: 1px solid #eee;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    padding: 1rem;
    position: relative;

    & + pre {
      border: 1px solid #eee;
      border-radius: 0.25rem;
      border-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      margin-bottom: 1rem;
    }
  }
</style>
