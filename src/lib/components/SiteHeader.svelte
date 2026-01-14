<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

export let ctaLabel = 'Get one for $10/month';
export let showAuxLinks = true;
export let auxLinkLabel: string | null = null;
export let auxLinkHref: string | null = null;

	const pages = [
		{ label: 'CLI', value: '/cli' },
		{ label: 'Desktop', value: '/desktop' },
		{ label: 'Garden', value: '/garden' }
	];
	$: currentValue =
		$page.url.pathname === '/cli'
			? '/cli'
			: $page.url.pathname === '/desktop'
				? '/desktop'
				: '/garden';
	let pageSelect: HTMLSelectElement;

	function handlePageChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value;
		updateSelectWidth();
		goto(value);
	}

	function updateSelectWidth() {
		if (!pageSelect) return;
		const text = pageSelect.options[pageSelect.selectedIndex]?.text ?? '';
		pageSelect.style.width = `${text.length + 1}ch`;
	}

	onMount(() => {
		updateSelectWidth();
	});
</script>

<header class="bg-white text-black dark:bg-black dark:text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		<div class="flex flex-wrap items-center gap-3">
			<div class="flex items-center gap-3 mr-auto">
				<Icon name="Logo" size={28} className="icon-brand" />
				<span class="text-lg font-semibold tracking-tight">Radicle</span>
				<label class="sr-only" for="page-switcher">Page</label>
				<div class="relative inline-flex items-center">
					<select
						id="page-switcher"
						class="text-lg font-normal bg-transparent border-0 p-0 pr-4 appearance-none w-auto min-w-0"
						on:change={handlePageChange}
						value={currentValue}
						bind:this={pageSelect}
					>
						{#each pages as pageOption}
							<option value={pageOption.value}>
								{pageOption.label}
							</option>
						{/each}
					</select>
					<Icon name="ChevronDown" size={14} className="icon-current pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
				</div>
			</div>
			{#if showAuxLinks}
				<div class="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:ml-auto">
					<a href="https://desktop.radicle.xyz/" class="link-highlight">
						<span>Download Radicle</span>
					</a>
					<span class="hidden sm:block h-6 w-px bg-black/20 dark:bg-white/30" aria-hidden="true"></span>
					<button on:click={() => goto('/dashboard')} class="link-highlight">
						<span>Log in</span>
					</button>
				</div>
			{:else if auxLinkLabel && auxLinkHref}
				<div class="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:ml-auto">
					<a href={auxLinkHref} class="link-highlight">
						<span>{auxLinkLabel}</span>
					</a>
				</div>
			{/if}
				<a
					href="/auth/signup"
					class="bg-brand text-black px-4 py-2 rounded-sm font-semibold transition btn-invert-hover btn-invert-hover-white-dark hover:text-white dark:hover:text-black w-full sm:w-auto sm:ml-3 text-center"
				>
					<span>{ctaLabel}</span>
				</a>
		</div>
	</div>
</header>
