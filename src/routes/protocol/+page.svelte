<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>Radicle Protocol</title>
	<meta name="description" content="Local-first, peer-to-peer code collaboration built on Git." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<SiteHeader
		ctaLabel="More about the protocol"
		ctaHref="https://radicle.xyz/guides/protocol/"
		showAuxLinks={false}
		auxLinkLabel="Get started as a user"
		auxLinkHref="https://radicle.xyz/guides/user/"
	/>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<div class="max-w-3xl">
			<h1 class="text-6xl md:text-7xl font-bold tracking-tight text-primary-light dark:text-primary-dark mb-6">
				Radicle Protocol
			</h1>
			<p class="text-2xl text-secondary-light dark:text-secondary-dark mb-10 leading-snug">
				A local-first, peer-to-peer protocol for sovereign code collaboration—built on Git and backed by cryptographic identities.
			</p>
			<div class="flex flex-wrap items-center gap-4">
				<a
					href="https://radicle.xyz/guides/protocol/"
					target="_blank"
					rel="noreferrer"
					class="inline-block px-8 py-4 rounded-sm text-lg font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-white btn-invert-hover-dark hover:text-black dark:hover:text-white"
				>
					<span>More about the protocol</span>
				</a>
			</div>
		</div>

		<section class="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
