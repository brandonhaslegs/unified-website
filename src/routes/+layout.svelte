<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const storageKey = 'theme';
		let theme: 'light' | 'dark' | 'system' = 'system';

		const getStoredTheme = () => {
			const stored = localStorage.getItem(storageKey);
			if (stored === 'light' || stored === 'dark' || stored === 'system') {
				return stored;
			}
			return 'system';
		};

		const applyTheme = (nextTheme: typeof theme, prefersDark: boolean) => {
			const isDark = nextTheme === 'dark' || (nextTheme === 'system' && prefersDark);
			document.documentElement.classList.toggle('dark', isDark);
		};

		const handleChange = (event: MediaQueryListEvent) => {
			if (theme === 'system') {
				applyTheme(theme, event.matches);
			}
		};

		const handleThemeChange = (event: Event) => {
			const nextTheme = (event as CustomEvent<typeof theme>).detail;
			if (nextTheme === 'light' || nextTheme === 'dark' || nextTheme === 'system') {
				theme = nextTheme;
				applyTheme(theme, mediaQuery.matches);
			}
		};

		theme = getStoredTheme();
		applyTheme(theme, mediaQuery.matches);

		mediaQuery.addEventListener('change', handleChange);
		window.addEventListener('theme-change', handleThemeChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
			window.removeEventListener('theme-change', handleThemeChange);
		};
	});
</script>

<slot />
