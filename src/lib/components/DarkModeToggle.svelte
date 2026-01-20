<script lang="ts">
	import { onMount } from 'svelte';

	type ThemePreference = 'light' | 'dark' | 'system';

	const storageKey = 'theme';
	let theme = $state<ThemePreference>('system');
	let mediaQuery: MediaQueryList | null = null;

	const getStoredTheme = () => {
		const stored = localStorage.getItem(storageKey);
		if (stored === 'light' || stored === 'dark' || stored === 'system') {
			return stored;
		}
		return 'system';
	};

	const applyTheme = (nextTheme: ThemePreference, prefersDark: boolean) => {
		const isDark = nextTheme === 'dark' || (nextTheme === 'system' && prefersDark);
		document.documentElement.classList.toggle('dark', isDark);
	};

	const setTheme = (nextTheme: ThemePreference) => {
		theme = nextTheme;
		localStorage.setItem(storageKey, nextTheme);
		applyTheme(nextTheme, mediaQuery?.matches ?? false);
		window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }));
	};

	onMount(() => {
		mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		theme = getStoredTheme();
		applyTheme(theme, mediaQuery.matches);

		const handleChange = (event: MediaQueryListEvent) => {
			if (theme === 'system') {
				applyTheme(theme, event.matches);
			}
		};

		const handleThemeChange = (event: Event) => {
			const nextTheme = (event as CustomEvent<ThemePreference>).detail;
			if (nextTheme === 'light' || nextTheme === 'dark' || nextTheme === 'system') {
				theme = nextTheme;
				applyTheme(theme, mediaQuery?.matches ?? false);
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		window.addEventListener('theme-change', handleThemeChange);

		return () => {
			mediaQuery?.removeEventListener('change', handleChange);
			window.removeEventListener('theme-change', handleThemeChange);
		};
	});
</script>

<div class="theme-toggle" role="group" aria-label="Theme">
	<button
		type="button"
		class="theme-toggle-button"
		class:is-active={theme === 'light'}
		onclick={() => setTheme('light')}
	>
		Light
	</button>
	<button
		type="button"
		class="theme-toggle-button"
		class:is-active={theme === 'dark'}
		onclick={() => setTheme('dark')}
	>
		Dark
	</button>
	<button
		type="button"
		class="theme-toggle-button"
		class:is-active={theme === 'system'}
		onclick={() => setTheme('system')}
	>
		System
	</button>
</div>
