// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";

// ---------- 插件 ----------
import pluginVue from "eslint-plugin-vue";

// Prettier
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

// ---------- 解析器 ----------
import * as vueParser from "vue-eslint-parser";

// ---------- 配置 ----------
export default [
	// 1️⃣ 忽略文件
	{
		ignores: [
			"**/dist/**",
			"**/public/**",
			"**/node_modules/**",
			"**/*.min.js",
			"**/*.config.*",
			"**/*.tsbuildinfo",
			"**/manifest.json",
		],
	},

	// 2️⃣ JS 通用
	{
		...js.configs.recommended,
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				uni: "readonly",
				BlobPart: "readonly",
			},
		},
		rules: {
			"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"no-console": "off",
		},
	},

	// 3️⃣ Vue SFC
	{
		files: ["**/*.vue"],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: null,
				sourceType: "module",
			},
		},
		plugins: {
			vue: pluginVue,
		},
		processor: pluginVue.processors[".vue"],
		rules: {
			...pluginVue.configs["flat/recommended"].rules,
			"vue/no-v-html": "off",
			"vue/require-default-prop": "off",
			"vue/multi-word-component-names": "off",
			"vue/html-self-closing": [
				"error",
				{
					html: { void: "always", normal: "always", component: "always" },
					svg: "always",
					math: "always",
				},
			],
			"vue/block-order": ["error", { order: ["script", "template", "style"] }],
			"vue/no-multiple-template-root": "off",
		},
	},

	// 4️⃣ Prettier(必须放最后，覆盖格式化冲突)
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			...eslintConfigPrettier.rules,
			"prettier/prettier": ["error", { endOfLine: "auto" }],
		},
	},
];
