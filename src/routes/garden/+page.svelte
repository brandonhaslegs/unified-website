<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
	import { page } from '$app/stores';
	import featureIllustration from '$lib/../illustrations/Illustration 2.png';

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

<div class="site-shell">
	<div class="site-body">
		<SiteRail />
		<div class="garden-sections">
			<SiteContentHeader showCta={false} />
			<section class="site-hero" bind:this={heroEl}>
				<div class="space-y-6">
					<h1 class="hero-title">Always-on node for your Radicle repos</h1>
					<p class="hero-subtitle">The security of Radicle with the convenience of availability.</p>
					<div class="hero-actions">
						<a href="/auth/signup" class="cta-button" target="_blank" rel="noreferrer">Get one for $10/month</a>
						<a href="/auth/login" class="cta-button cta-button-outline" target="_blank" rel="noreferrer">Log in</a>
					</div>
				</div>
				<div
					class="hero-art"
					style="background-image: var(--hero-image);"
				></div>
			</section>

			<section class="space-y-10">
				<h2 class="section-heading">Why run an always‑on node?</h2>
				<p class="hero-subtitle">Stay online, stay replicated, stay in control.</p>
				<div class="features-split">
					<div class="feature-list">
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">24/7 Repository Availability</h3>
								<p class="feature-text">Your repositories are always accessible, even when your local machine is offline.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">No Local Resource Usage</h3>
								<p class="feature-text">Keep your repositories seeded without using your own bandwidth or storage.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Automatic Syncing</h3>
								<p class="feature-text">Your repositories stay up-to-date automatically with all the latest changes.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Easy Team Sharing</h3>
								<p class="feature-text">Share your repositories with team members without requiring them to run their own nodes.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Reliable Infrastructure</h3>
								<p class="feature-text">Built on Radicle's decentralized network for maximum reliability and uptime.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Simple Setup</h3>
								<p class="feature-text">Get started in minutes with no complex configuration or hardware requirements.</p>
							</div>
						</div>
					</div>
					<div class="feature-illustration" style={`background-image: url(${featureIllustration});`} aria-hidden="true"></div>
				</div>
			</section>

			<section class="garden-access">
				<h2 class="section-heading">More ways to access Radicle</h2>
				<div class="garden-access-grid">
					<article class="garden-access-card">
						<div class="garden-access-media garden-access-media-cli" aria-hidden="true"></div>
						<div class="garden-access-body">
							<h3>Radicle CLI</h3>
							<p>
								Work directly from your terminal with Git-native commands. Lightweight,
								scriptable, and built for developers who love the command line.
							</p>
							<a class="garden-access-link" href="/cli">Install 1.4.0 <span aria-hidden="true">→</span></a>
						</div>
					</article>
					<article class="garden-access-card">
						<div class="garden-access-media garden-access-media-desktop" aria-hidden="true"></div>
						<div class="garden-access-body">
							<h3>Desktop</h3>
							<p>
								Browse, publish, and collaborate through a simple app. A visual way to
								discover projects and contribute without touching the terminal.
							</p>
							<a class="garden-access-link" href="/desktop">Download app <span aria-hidden="true">→</span></a>
						</div>
					</article>
				</div>
			</section>
		</div>
		<SiteFooter currentProduct="garden" />
	</div>
</div>
