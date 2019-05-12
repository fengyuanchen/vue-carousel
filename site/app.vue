<template>
  <div class="app">
    <header class="navbar navbar-light navbar-expand-md">
      <nav class="container">
        <a
          class="navbar-brand"
          href="./"
        >
          {{ name }}
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbar-collapse"
          class="collapse navbar-collapse justify-content-end"
          role="navigation"
        >
          <nav class="nav navbar-nav">
            <a
              class="nav-link"
              href="//github.com/fengyuanchen/vue-carousel"
              title="View the GitHub project"
            >
              GitHub
            </a>
            <a
              class="nav-link"
              href="//github.com/fengyuanchen/vue-carousel/blob/master/LICENSE"
            >
              License
            </a>
            <a
              class="nav-link"
              href="//fengyuanchen.github.io"
              title="Explore more projects"
            >
              Explore
            </a>
            <a
              class="nav-link"
              :href="author.url"
              title="About the author"
            >
              About
            </a>
          </nav>
        </div>
      </nav>
    </header>
    <main>
      <div class="jumbotron bg-primary text-white rounded-0">
        <div class="container">
          <div class="row">
            <div class="col-md">
              <h1>
                {{ name }} <small class="h6">
                  v{{ version }}
                </small>
              </h1>
              <p class="lead">
                {{ description }}
              </p>
            </div>
            <div class="col-md">
              <div
                ref="carbonads"
                class="carbonads"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="markdown-body">
          <readme />
        </div>
      </div>
    </main>
    <footer>
      <div class="container">
        <p class="heart" />
        <nav class="nav flex-wrap justify-content-center mb-3">
          <a
            class="nav-link"
            href="//github.com/fengyuanchen/vue-carousel"
          >
            GitHub
          </a>
          <a
            class="nav-link"
            href="//github.com/fengyuanchen/vue-carousel/blob/master/LICENSE"
          >
            License
          </a>
          <a
            class="nav-link"
            :href="author.url"
          >
            About
          </a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script>
import pkg from '../package.json';
import Readme from '../src/README.md';

pkg.name = pkg.name.replace(/^.+\//, '');

export default {
  components: {
    Readme,
  },

  data() {
    return pkg;
  },

  mounted() {
    const script = document.createElement('script');

    script.async = true;
    script.id = '_carbonads_js';
    script.src = '//cdn.carbonads.com/carbon.js?serve=CKYI55Q7&placement=fengyuanchengithubio';
    this.$refs.carbonads.appendChild(script);
  },
};
</script>

<style lang="scss">
  .markdown-body {
    table {
      display: table;
    }

    code {
      white-space: nowrap;
    }
  }

  .carbonads {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    overflow: hidden;
    padding: 1rem;

    @media (min-width: 768px) {
      float: right;
      margin-bottom: -1rem;
      margin-top: -1rem;
      max-width: 360px;
    }
  }

  .carbon {
    &-wrap {
      overflow: hidden;
    }

    &-img {
      clear: left;
      display: block;
      float: left;
    }

    &-text,
    &-poweredby {
      display: block;
      margin-left: 140px;

      &,
      &:focus,
      &:hover {
        color: #fff;
        text-decoration: none;
      }
    }

    &-poweredby {
      color: #ddd;
    }
  }

  .heart {
    color: #ddd;
    display: block;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 0;
    margin-top: 1rem;
    position: relative;
    text-align: center;
    width: 100%;

    &:hover {
      color: #ff4136;
    }

    &::before {
      border-top: 1px solid #eee;
      content: '';
      display: block;
      height: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 50%;
    }

    &::after {
      background-color: #fff;
      content: '♥';
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      position: relative;
      z-index: 1;
    }
  }
</style>
