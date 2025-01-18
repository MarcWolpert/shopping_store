// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		testTimeout: 30000,
		reporters: ['json'],
		outputFile: './test-output.json',
	},
});
