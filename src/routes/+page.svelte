<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import AppLogo from '$lib/components/AppLogo.svelte';
	import heroIllustration from '$lib/../illustrations/Illustration 7.png';
	import featureIllustration from '$lib/../illustrations/home-page-features.png';
</script>

<svelte:head>
	<title>Radicle Garden - Always On Node</title>
</svelte:head>

<div class="site-shell">
	<div class="garden-landing">
		<div class="garden-landing-inner">
			<section class="site-hero">
				<div>
					<AppLogo class="app-logo garden-hero-logo" />
					<div class="hero-title-stack">
						<h1 class="hero-title">An always-on node for your Radicle repos.</h1>
						<p class="hero-title hero-title-muted">
							The security of Radicle with the convenience of availability.
						</p>
					</div>
					<div class="hero-actions">
						<a href="/auth/signup" class="cta-button cta-button-brand" target="_blank" rel="noreferrer">Get one for $10/month</a>
						<a href="/auth/login" class="cta-button cta-button-outline" target="_blank" rel="noreferrer">Log in</a>
					</div>
				</div>
				<div
					class="hero-art"
					style={`background-image: url(${heroIllustration});`}
				></div>
			</section>

			<section class="space-y-10 garden-why">
				<h2 class="section-heading">Why run an always‑on node?</h2>
				<p class="hero-subtitle">Stay online, stay replicated, stay in control.</p>
				<div class="features-split">
					<div class="feature-list">
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">24/7 repository availability</h3>
								<p class="feature-text">Your repositories are always accessible, even when your local machine is offline.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">No local resource usage</h3>
								<p class="feature-text">Keep your repositories seeded without using your own bandwidth or storage.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Automatic syncing</h3>
								<p class="feature-text">Your repositories stay up-to-date automatically with all the latest changes.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Easy team sharing</h3>
								<p class="feature-text">Share your repositories with team members without requiring them to run their own nodes.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Reliable infrastructure</h3>
								<p class="feature-text">Built on Radicle's decentralized network for maximum reliability and uptime.</p>
							</div>
						</div>
						<div class="feature-item">
							<span class="feature-dot" aria-hidden="true"></span>
							<div>
								<h3 class="feature-title">Simple setup</h3>
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
			<SiteFooter currentProduct="garden" />
		</div>
	</div>
</div>
