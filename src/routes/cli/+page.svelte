<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
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
	<title>Radicle CLI</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<SiteHeader ctaLabel="Get the CLI" />

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
				<h1 class="text-[clamp(4rem,12vw,11rem)] font-bold tracking-tight text-white dark:text-black mb-6">
					CLI
				</h1>
				<p class="text-2xl text-secondary-light dark:text-black mb-10 leading-snug text-black">
					<span class="text-highlight">The command line interface for working with Radicle repositories, patches, and identities.</span>
				</p>
				<a
					href="https://radicle.xyz/#get-started"
					target="_blank"
					rel="noreferrer"
					class="inline-block px-8 py-4 rounded-sm text-lg font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-white btn-invert-hover-dark hover:text-black dark:hover:text-white"
				>
					<span>Get the CLI</span>
				</a>
			</div>
		</div>
	</section>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<section class="grid grid-cols-1 md:grid-cols-2 gap-12">
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Device" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Node‑backed CLI</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					The Radicle Stack ships with a CLI, web interface, and TUI that are backed by the Radicle Node and HTTP daemon. It’s modular, so you can swap parts or build your own clients.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Key" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Signed artifacts</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Social artifacts are stored in Git and signed using public‑key cryptography, so the CLI can verify authenticity and authorship.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Git" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Git + gossip</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Radicle uses Git for efficient data transfer between peers and a custom gossip protocol to exchange repository metadata.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Seed" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Run your own node</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Operate your own node for censorship‑resistant collaboration and a resilient network without relying on third parties.
				</p>
			</div>
		</section>
	</main>

	<SiteFooter currentProduct="cli" />
</div>
