<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { page } from '$app/stores';

	let heroEl: HTMLElement;

	const illustrationModules = import.meta.glob('/src/illustrations/*.png', {
		eager: true,
		import: 'default'
	});
	const illustrationUrls = Object.values(illustrationModules) as string[];

	$: if (heroEl && illustrationUrls.length > 0) {
		const path = $page.url.pathname;
		let hash = 0;
		for (let i = 0; i < path.length; i += 1) {
			hash = (hash * 31 + path.charCodeAt(i)) >>> 0;
		}
		const index = hash % illustrationUrls.length;
		heroEl.style.setProperty('--hero-image', `url("${illustrationUrls[index]}")`);
	}
</script>

<svelte:head>
	<title>Radicle Garden - Always On Node</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<div class="bg-white dark:bg-black">
		<SiteHeader />

		<!-- Hero Section -->
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
				<div class="max-w-4xl relative z-10">
				<h1 class="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tight text-black mb-6 leading-none">Always-on node for your Radicle repos</h1>
				<p class="text-2xl md:text-3xl text-secondary-light dark:text-black mb-12 leading-snug text-black">
					<span class="text-highlight">The security of Radicle with the convenience of availability.</span>
				</p>
				<a
					href="/auth/signup"
					class="inline-block px-10 py-5 rounded-sm text-xl font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-white btn-invert-hover-dark hover:text-black dark:hover:text-white"
				>
					<span>Get one for $10/month</span>
				</a>
				</div>
			</div>
		</section>
	</div>

	<!-- Benefits Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<h2 class="text-5xl md:text-6xl font-bold text-primary-light dark:text-primary-dark mb-20">Why run an always‑on node?</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Clock" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">24/7 Repository Availability</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Your repositories are always accessible, even when your local machine is offline.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Online" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">No Local Resource Usage</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Keep your repositories seeded without using your own bandwidth or storage.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Revision" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Automatic Syncing</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Your repositories stay up-to-date automatically with all the latest changes.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Share" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Easy Team Sharing</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Share your repositories with team members without requiring them to run their own nodes.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Seed" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Reliable Infrastructure</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Built on Radicle's decentralized network for maximum reliability and uptime.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Settings" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Simple Setup</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Get started in minutes with no complex configuration or hardware requirements.
				</p>
			</div>
		</div>
	</section>

	<SiteFooter currentProduct="garden" />

</div>
