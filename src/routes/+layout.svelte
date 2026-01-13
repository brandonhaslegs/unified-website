<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const applyScheme = (isDark: boolean) => {
			document.documentElement.classList.toggle('dark', isDark);
		};

		applyScheme(mediaQuery.matches);
		const handleChange = (event: MediaQueryListEvent) => applyScheme(event.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	});
</script>

<slot />
