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
	<title>Radicle Desktop</title>
	<meta name="description" content="Local-first code collaboration on a peer-to-peer network" />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<SiteHeader ctaLabel="Download Radicle Desktop" showAuxLinks={false} auxLinkLabel="Get the CLI" auxLinkHref="/cli" />

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
				<h1 class="text-6xl md:text-7xl font-bold tracking-tight text-white dark:text-black mb-6">
					Radicle Desktop
				</h1>
				<p class="text-2xl text-secondary-light dark:text-black mb-10 leading-snug text-black">
					<span class="text-highlight">A simple, intuitive desktop app that makes contributing to the Radicle network easier than ever.</span>
				</p>
				<a
					href="https://desktop.radicle.xyz/"
					target="_blank"
					rel="noreferrer"
					class="inline-block px-8 py-4 rounded-sm text-lg font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-white btn-invert-hover-dark hover:text-black dark:hover:text-white"
				>
					<span>Download Radicle Desktop</span>
				</a>
			</div>
		</div>
	</section>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

		<section class="mt-20">
			<h2 class="text-3xl font-semibold text-primary-light dark:text-primary-dark mb-8">What’s in the box?</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
				<div>
					<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
						<Icon name="Inbox" size={24} className="icon-brand" />
					</div>
					<h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Notifications</h3>
					<p class="text-lg text-secondary-light dark:text-secondary-dark">
						Stay in the loop with built-in notifications designed for an inbox-zero workflow.
					</p>
				</div>
				<div>
					<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
						<Icon name="Patch" size={24} className="icon-brand" />
					</div>
					<h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Patches</h3>
					<p class="text-lg text-secondary-light dark:text-secondary-dark">
						Propose code changes with patches and review your teammates’ work using a familiar workflow.
					</p>
				</div>
				<div>
					<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
						<Icon name="Markdown" size={24} className="icon-brand" />
					</div>
					<h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Rich text &amp; embeds</h3>
					<p class="text-lg text-secondary-light dark:text-secondary-dark">
						Embed screenshots, videos, and other artifacts with Markdown support and reactions.
					</p>
				</div>
				<div>
					<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
						<Icon name="Issue" size={24} className="icon-brand" />
					</div>
					<h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Issues</h3>
					<p class="text-lg text-secondary-light dark:text-secondary-dark">
						Join discussions and manage work through issues directly in the app.
					</p>
				</div>
				<div>
					<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
						<Icon name="Offline" size={24} className="icon-brand" />
					</div>
					<h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Works offline</h3>
					<p class="text-lg text-secondary-light dark:text-secondary-dark">
						Write and review code offline, then sync with your team when you’re back online.
					</p>
				</div>
				<div>
					<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
						<Icon name="Code" size={24} className="icon-brand" />
					</div>
					<h3 class="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Code browser</h3>
					<p class="text-lg text-secondary-light dark:text-secondary-dark">
						Explore source code right in the app—no need to open your IDE.
					</p>
				</div>
			</div>
		</section>
	</main>

	<SiteFooter currentProduct="desktop" />
</div>
