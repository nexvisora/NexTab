import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const dev = process.env.ROLLUP_WATCH;

const plugins = [
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  filesize(),
];

if (dev) {
  plugins.push(
    serve({
      open: true,
      contentBase: ['dist', 'docs'],
      port: 3000,
    }),
    livereload({
      watch: 'dist',
    })
  );
}

export default [
  // ESM build
  {
    input: 'js/framework.js',
    output: {
      file: 'dist/js/framework.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  // UMD build (minified)
  {
    input: 'js/framework.js',
    output: {
      file: 'dist/js/framework.min.js',
      format: 'umd',
      name: 'NexTab',
      sourcemap: true,
    },
    plugins: [...plugins, terser()],
  },
  // Individual components (tree-shakable)
  {
    input: {
      modal: 'js/components/modal.js',
      dropdown: 'js/components/dropdown.js',
      tooltip: 'js/components/tooltip.js',
      datepicker: 'js/plugins/datepicker.js',
    },
    output: {
      dir: 'dist/js/components',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
];
