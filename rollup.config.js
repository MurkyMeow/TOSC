import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: {
    file: path.resolve(__dirname, 'app', 'public', 'bundle.js'),
    format: 'iife',
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript(),
    copy({
      targets: [
        { src: 'src/index.html', dest: 'app/public' },
        { src: 'favicons', dest: 'app/public' },
        { src: 'img', dest: 'app/public' },
      ],
    }),
  ],
};
