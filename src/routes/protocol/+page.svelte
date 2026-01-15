<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
	import illustration1 from '$lib/../illustrations/Illustration 1.png';
	import illustration2 from '$lib/../illustrations/Illustration 2.png';
	import illustration3 from '$lib/../illustrations/Illustration 3.png';
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
	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<SiteContentHeader showCta={false} />
			<section class="site-hero" bind:this={heroEl}>
				<div class="space-y-6">
					<h1 class="hero-title">A local-first protocol for peer-to-peer code</h1>
					<p class="hero-subtitle">
						A local-first, peer-to-peer protocol for sovereign code collaboration—built on Git and backed by cryptographic identities.
					</p>
				</div>
			</section>

			<section class="space-y-10">
				<div class="guide-card-grid">
					<a class="guide-card" href="/protocol/user-guide">
						<div
							class="guide-card-art"
							style={`background-image: url(${illustration1});`}
							aria-hidden="true"
						></div>
						<div class="guide-card-title">User guide →</div>
						<div class="guide-card-subtitle">Your introduction to using Radicle</div>
					</a>
					<a class="guide-card" href="/protocol/guide">
						<div
							class="guide-card-art"
							style={`background-image: url(${illustration2});`}
							aria-hidden="true"
						></div>
						<div class="guide-card-title">Protocol guide →</div>
						<div class="guide-card-subtitle">How Radicle works under the hood</div>
					</a>
					<a class="guide-card" href="/protocol/seeder-guide">
						<div
							class="guide-card-art"
							style={`background-image: url(${illustration3});`}
							aria-hidden="true"
						></div>
						<div class="guide-card-title">Seeder guide →</div>
						<div class="guide-card-subtitle">How to run a Radicle seed node</div>
					</a>
				</div>
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
		<SiteFooter currentProduct="protocol" />
	</div>
</div>
