<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import guideHtml from '$lib/content/protocol-guide.html?raw';
	import { onMount } from 'svelte';

	let heroEl: HTMLElement;

	const illustrationModules = import.meta.glob('/src/illustrations/*.{png,jpg,jpeg,webp,avif}', {
		eager: true,
		import: 'default'
	});
	const illustrationUrls = Object.values(illustrationModules) as string[];

	onMount(() => {
		if (!heroEl || illustrationUrls.length === 0) {
			return;
		}

		const index = Math.floor(Math.random() * illustrationUrls.length);
		heroEl.style.setProperty('--hero-image', `url("${illustrationUrls[index]}")`);
	});
</script>

<svelte:head>
	<title>Radicle Protocol Guide</title>
	<meta name="description" content="How Radicle works under the hood." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<SiteHeader
		ctaLabel="About the protocol"
		ctaHref="/protocol/guide"
		showAuxLinks={false}
		auxLinkLabel="Get started as a user"
		auxLinkHref="https://radicle.xyz/guides/user/"
	/>

	<section class="relative overflow-hidden" bind:this={heroEl}>
		<div class="absolute inset-y-0 left-0 right-0 flex justify-center" aria-hidden="true">
			<div class="w-full max-w-7xl">
				<div
					class="h-full w-[125%] relative left-1/2 -translate-x-1/2"
					style="background-image: var(--hero-image); background-size: cover; background-position: center center;"
				></div>
			</div>
		</div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
			<div class="max-w-3xl">
				<a
					href="/protocol"
					class="inline-flex items-center gap-2 text-sm font-semibold mb-4 px-3 py-2 rounded-sm bg-white text-black dark:bg-black dark:text-white"
				>
					<Icon name="ArrowLeft" size={14} className="icon-text" />
					<span>Back</span>
				</a>
				<h1 class="text-6xl md:text-7xl font-bold tracking-tight text-white dark:text-black mb-6">
					Radicle Protocol Guide
				</h1>
				<p class="text-2xl text-secondary-light dark:text-black mb-10 leading-snug text-black">
					<span class="text-highlight">How Radicle works under the hood.</span>
				</p>
			</div>
		</div>
	</section>

	<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<article class="guide-content text-primary-light dark:text-primary-dark">
			{@html guideHtml}
		</article>
	</main>

	<SiteFooter currentProduct="protocol" />
</div>
