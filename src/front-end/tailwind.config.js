const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: ['index.html', 'src/**/*.tsx'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		},
		colors: {
			'main-blue': '#67ACEC',
			'deep-blue': '#1863A8',
			'blue-40': '#C2DEF7',
			gray: '#F6F4F4'
		}
	},
	// experimental: { optimizeUniversalDefaults: true },
	plugins: [formsPlugin]
}
module.exports = config
