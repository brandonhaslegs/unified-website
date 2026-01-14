<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';

export let ctaLabel = 'Get one for $10/month';
export let ctaHref = '/auth/signup';
export let showAuxLinks = true;
export let auxLinkLabel: string | null = null;
export let auxLinkHref: string | null = null;
export let ctaIcon: string | null = null;
export let ctaCopyText: string | null = null;
export let showCta = true;
let ctaCopied = false;
let ctaCopyTimeout: ReturnType<typeof setTimeout> | null = null;

	const pages = [
		{ label: 'CLI', value: '/cli' },
		{ label: 'Desktop', value: '/desktop' },
		{ label: 'Protocol', value: '/protocol' },
		{ label: 'Garden', value: '/garden' }
	];
	$: currentValue =
		$page.url.pathname.startsWith('/cli')
			? '/cli'
			: $page.url.pathname.startsWith('/desktop')
				? '/desktop'
				: $page.url.pathname.startsWith('/protocol')
					? '/protocol'
					: $page.url.pathname.startsWith('/garden')
						? '/garden'
						: '/garden';
	$: currentLabel = pages.find((pageOption) => pageOption.value === currentValue)?.label ?? 'Garden';

function handlePageChange(event: Event) {
	const target = event.target as HTMLSelectElement;
	goto(target.value);
}

function handleCtaCopy() {
	if (!ctaCopyText) return;
	navigator.clipboard.writeText(ctaCopyText);
	ctaCopied = true;
	if (ctaCopyTimeout) {
		clearTimeout(ctaCopyTimeout);
	}
	ctaCopyTimeout = setTimeout(() => {
		ctaCopied = false;
	}, 3000);
}

</script>

<header class="bg-white text-black dark:bg-black dark:text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		<div class="flex flex-wrap items-center gap-3">
			<div class="flex items-center gap-3 mr-auto">
				<Icon name="Logo" size={28} className="icon-brand" />
				<span class="text-lg font-semibold tracking-tight">Radicle</span>
				<label class="sr-only" for="page-switcher">Page</label>
				<div class="relative inline-flex items-center gap-1">
					<span class="text-lg font-normal">{currentLabel}</span>
					<Icon name="ChevronDown" size={14} className="icon-current" />
					<select
						id="page-switcher"
						class="absolute inset-0 opacity-0 cursor-pointer"
						on:change={handlePageChange}
						value={currentValue}
					>
						{#each pages as pageOption}
							<option value={pageOption.value}>
								{pageOption.label}
							</option>
						{/each}
					</select>
				</div>
			</div>
			{#if showAuxLinks}
				<div class="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:ml-auto">
					<a href="/desktop" class="link-highlight">
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
			{#if showCta}
				{#if ctaCopyText}
					<button
						type="button"
						on:click={handleCtaCopy}
						class="bg-brand text-black px-4 py-2 rounded-sm font-semibold transition btn-invert-hover btn-invert-hover-white-dark hover:text-white dark:hover:text-black w-full sm:w-auto sm:ml-3 text-center"
						aria-label={ctaLabel}
					>
						<span class="inline-flex items-center gap-2">
							{#if ctaIcon}
								<Icon name={ctaCopied ? 'Checkmark' : ctaIcon} size={14} className="icon-black cta-icon" />
							{/if}
							<span>{ctaLabel}</span>
						</span>
					</button>
				{:else}
					<a
						href={ctaHref}
						class="bg-brand text-black px-4 py-2 rounded-sm font-semibold transition btn-invert-hover btn-invert-hover-white-dark hover:text-white dark:hover:text-black w-full sm:w-auto sm:ml-3 text-center"
					>
						<span class="inline-flex items-center gap-2">
							{#if ctaIcon}
								<Icon name={ctaIcon} size={14} className="icon-black cta-icon" />
							{/if}
							<span>{ctaLabel}</span>
						</span>
					</a>
				{/if}
			{/if}
		</div>
	</div>
</header>
