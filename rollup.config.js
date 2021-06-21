import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';

const outDir = path.resolve(__dirname, 'app', 'public');

export default {
  input: 'src/index.ts',
  output: {
    dir: outDir,
    format: 'iife',
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    css({ output: 'index.css' }),
    typescript({
      incremental: true,
      tsBuildInfoFile: outDir,
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'app/public' },
        { src: 'favicons', dest: 'app/public' },
        { src: 'img', dest: 'app/public' },
      ],
    }),
  ],
};
