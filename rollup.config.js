import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import { createRequire } from 'node:module';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const sourcemap = isProd ? undefined : 'inline';

export default [
    {
        input: 'src/index.ts', // Update with the path to your entry file
        output: [
            {
                sourcemap,
                file: packageJson.main,
                format: 'cjs',
                exports: 'named',
                interop: 'auto',
            },
            // ES2015 modules version so consumers can tree-shake
            {
                sourcemap,
                file: packageJson.module,
                format: 'es',
                exports: 'named',
                interop: 'esModule',
            },
        ],
        plugins: [del({ targets: 'dist/*' }), typescript({ tsconfig: 'tsconfig.json' }), ...(isProd ? [terser()] : [])],
    },
    {
        input: 'dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
        external: [/\.(css|less|scss)$/],
    },
];
