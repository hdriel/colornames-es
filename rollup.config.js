import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import generatePackageJson from 'rollup-plugin-generate-package-json';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import { createRequire } from 'node:module';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');

const isProd = process.env.NODE_ENV === 'production';

export default [
    {
        input: 'src/index.ts', // Update with the path to your entry file
        output: [
            {
                sourcemap: 'inline',
                file: packageJson.main,
                format: 'cjs',
                interop: 'auto',
            },
            // ES2015 modules version so consumers can tree-shake
            {
                sourcemap: 'inline',
                file: packageJson.module,
                format: 'es',
                interop: 'esModule',
            },
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: 'tsconfig.json',
                exclude: ['**/__tests__', '**/*.test.ts'],
            }),
            ...(isProd ? [terser()] : []),
            filesize(),
        ],
    },
    {
        input: 'dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },
];
