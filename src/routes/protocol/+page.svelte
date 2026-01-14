<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import { onMount } from 'svelte';

	let heroEl: HTMLElement;

	const illustrationModules = import.meta.glob('/src/illustrations/*.png', {
		eager: true,
		import: 'default'
	});
	const illustrationUrls = Object.values(illustrationModules) as string[];

	onMount(() => {
		if (!heroEl || illustrationUrls.length === 0) {
			return;
		}

		const heroImage =
			illustrationUrls.find((url) => url.includes('illustration1.png')) ?? illustrationUrls[0];
		heroEl.style.setProperty('--hero-image', `url("${heroImage}")`);
	});
</script>

<svelte:head>
	<title>Radicle Protocol</title>
	<meta name="description" content="Local-first, peer-to-peer code collaboration built on Git." />
</svelte:head>

<div class="site-shell">
	<SiteHeader showAuxLinks={false} ctaLabel="About the protocol" ctaHref="/protocol/guide" />

	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<section class="site-hero" bind:this={heroEl}>
				<div class="space-y-6">
					<h1 class="hero-title">A local-first protocol for peer-to-peer code</h1>
					<p class="hero-subtitle">
						A local-first, peer-to-peer protocol for sovereign code collaboration—built on Git and backed by cryptographic identities.
					</p>
					<div class="flex flex-wrap items-center gap-3">
						<a href="/protocol/user-guide" class="cta-button">User guide</a>
						<a href="/protocol/seeder-guide" class="cta-button cta-button-outline">Seeder guide</a>
					</div>
				</div>
				<div class="hero-art" style="background-image: var(--hero-image);"></div>
			</section>

			<section class="space-y-10">
				<h2 class="section-heading">How the protocol works</h2>
				<p class="hero-subtitle">Your data, forever and secure.</p>
				<div class="feature-list">
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Cryptographic identities</h3>
							<p class="feature-text">Code and social artifacts are tied to cryptographic identities, enabling verifiable authorship and authenticity.</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Git data transfer</h3>
							<p class="feature-text">Repositories are synced peer‑to‑peer using Git’s efficient data transfer, keeping collaboration familiar and fast.</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Gossip for metadata</h3>
							<p class="feature-text">A custom gossip protocol exchanges repository metadata, enabling discovery without centralized servers.</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Run your own node</h3>
							<p class="feature-text">Operate your own node for censorship‑resistant collaboration and a resilient network without reliance on third parties.</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Signed social artifacts</h3>
							<p class="feature-text">Issues, patches, and discussions are stored in Git and signed with public‑key cryptography.</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Modular by design</h3>
							<p class="feature-text">The stack includes a CLI, web UI, and TUI backed by the Radicle Node and HTTP daemon, and can be extended or replaced.</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	<SiteFooter currentProduct="protocol" />
</div>
