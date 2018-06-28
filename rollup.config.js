import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import changeCase from 'change-case';
import commonjs from 'rollup-plugin-commonjs';
import createBanner from 'create-banner';
import nodeResolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import pkg from './package.json';

pkg.name = pkg.name.replace(/^.+\//, '');

const banner = createBanner({
  data: {
    year: '2018-present',
  },
});

export default {
  input: 'src/index.vue',
  output: [
    {
      banner,
      name: changeCase.pascalCase(pkg.name),
      file: `dist/${pkg.name}.js`,
      format: 'umd',
      globals: {
        vue: 'Vue',
      },
    },
    {
      banner,
      file: `dist/${pkg.name}.common.js`,
      format: 'cjs',
    },
    {
      banner,
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
    },
  ],
  external: ['vue'],
  plugins: [
    alias({
      '@chenfengyuan/create-vue-component': 'node_modules/@chenfengyuan/create-vue-component/src/index.js',
    }),
    nodeResolve(),
    commonjs(),
    vue(),
    babel({
      plugins: ['external-helpers'],
    }),
  ],
};
