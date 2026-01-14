<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';

	let heroEl: HTMLElement;

	const illustrationModules = import.meta.glob('/src/illustrations/*.{png,jpg,jpeg,webp,avif}', {
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
	<title>Radicle Protocol</title>
	<meta name="description" content="Local-first, peer-to-peer code collaboration built on Git." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<SiteHeader
		showAuxLinks={false}
		ctaLabel="About the protocol"
		ctaHref="/protocol/guide"
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
				<h1 class="text-6xl md:text-7xl font-bold tracking-tight text-white dark:text-black mb-6">
					Radicle Protocol
				</h1>
				<p class="text-2xl text-secondary-light dark:text-black mb-10 leading-snug text-black">
					<span class="text-highlight">A local-first, peer-to-peer protocol for sovereign code collaboration—built on Git and backed by cryptographic identities.</span>
				</p>
				<div class="flex flex-col items-start gap-6">
					<div class="flex flex-col gap-3 rounded-sm bg-white text-black dark:bg-black dark:text-white p-4 sm:p-5 w-fit max-w-full">
						<p class="text-base font-semibold">Get started as a&#8230;</p>
						<div class="flex flex-wrap items-center gap-5">
							<a
								href="/protocol/user-guide"
								class="inline-block px-5 py-3 rounded-sm text-base font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-brand"
							>
								<span>User</span>
							</a>
							<a
								href="/protocol/seeder-guide"
								class="inline-block px-5 py-3 rounded-sm text-base font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-brand"
							>
								<span>Seeder</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Key" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Cryptographic identities</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Code and social artifacts are tied to cryptographic identities, enabling verifiable authorship and authenticity.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Git" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Git data transfer</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Repositories are synced peer‑to‑peer using Git’s efficient data transfer, keeping collaboration familiar and fast.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Share" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Gossip for metadata</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					A custom gossip protocol exchanges repository metadata, enabling discovery without centralized servers.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Seed" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Run your own node</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Operate your own node for censorship‑resistant collaboration and a resilient network without reliance on third parties.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Lock" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Signed social artifacts</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Issues, patches, and discussions are stored in Git and signed with public‑key cryptography.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Settings" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Modular by design</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					The stack includes a CLI, web UI, and TUI backed by the Radicle Node and HTTP daemon, and can be extended or replaced.
				</p>
			</div>
		</section>
	</main>

	<SiteFooter currentProduct="protocol" />
</div>
