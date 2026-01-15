<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
	import CliInstallBlock from '$lib/components/CliInstallBlock.svelte';
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
	<title>Radicle CLI</title>
</svelte:head>

<div class="site-shell">
	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<SiteContentHeader showCta={false} />
			<section class="site-hero" bind:this={heroEl}>
				<div class="space-y-6">
					<h1 class="hero-title">Command-line control for Radicle</h1>
					<p class="hero-subtitle">
						The command line interface for working with Radicle repositories, patches, and identities.
					</p>
					<CliInstallBlock />
				</div>
				<div class="hero-art" style="background-image: var(--hero-image);"></div>
			</section>

			<section class="space-y-10">
				<h2 class="section-heading">Why developers love the CLI</h2>
				<p class="hero-subtitle">Everything you need to work with Radicle from the terminal.</p>
				<div class="feature-list">
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Node‑backed CLI</h3>
							<p class="feature-text">
								The Radicle Stack ships with a CLI, web interface, and TUI backed by the Radicle Node and HTTP daemon. It’s modular, so you can swap parts or build your own clients.
							</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Signed artifacts</h3>
							<p class="feature-text">
								Social artifacts are stored in Git and signed using public‑key cryptography, so the CLI can verify authenticity and authorship.
							</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Git + gossip</h3>
							<p class="feature-text">
								Radicle uses Git for efficient data transfer between peers and a custom gossip protocol to exchange repository metadata.
							</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Run your own node</h3>
							<p class="feature-text">
								Operate your own node for censorship‑resistant collaboration and a resilient network without relying on third parties.
							</p>
							<a class="cli-node-link" href="/garden">Learn about our always on node →</a>
						</div>
					</div>
				</div>
			</section>
		</div>
		<SiteFooter currentProduct="cli" />
	</div>
</div>
