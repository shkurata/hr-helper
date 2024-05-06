import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest,
        ...globals.node,
			},
		},
	},
	pluginJs.configs.recommended,
	eslintConfigPrettier,
];
