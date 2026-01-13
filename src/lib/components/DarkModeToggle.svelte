<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	let darkMode = $state(false);

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		setDarkMode(mediaQuery.matches);
		const handleChange = (event: MediaQueryListEvent) => setDarkMode(event.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	});

	function setDarkMode(isDark: boolean) {
		darkMode = isDark;
		document.documentElement.classList.toggle('dark', darkMode);
	}

	function toggleDarkMode() {
		setDarkMode(!darkMode);
	}
</script>

<button
	onclick={toggleDarkMode}
	class="p-2 rounded-lg hover:bg-surface-subtle-light dark:hover:bg-surface-subtle-dark transition"
	aria-label="Toggle dark mode"
>
	{#if darkMode}
		<Icon name="Sun" size={24} />
	{:else}
		<Icon name="Moon" size={24} />
	{/if}
</button>
