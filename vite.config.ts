import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		server: {
			proxy: {
				"/api": {
					target: process.env.VITE_API_ENDPOINT || "http://127.0.0.1:3000",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
				},
			},
		},
	});
};
