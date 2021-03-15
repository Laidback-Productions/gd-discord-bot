module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		mongo: true,
	},
	parserOptions: {
		ecmaVersion: 12,
		experimentalObjectRestSpread: true,
	},
	rules: {
		indent: ["error", "tab", { SwitchCase: 2 }],
		indent: ["error", "tab"],
		"comma-spacing": "error",
		"comma-style": "error",
		"linebreak-style": ["error", "windows"],
		quotes: ["warn", "double"],
		semi: ["warn", "always"],
		"no-console": "off",
		yoda: "error",
	},
};
