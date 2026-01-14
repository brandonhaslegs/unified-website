<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
	import heroIllustration from '$lib/../illustrations/Illustration 4.png';
</script>

<svelte:head>
	<title>Radicle</title>
</svelte:head>

<div class="site-shell">
	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<SiteContentHeader ctaLabel="Install Radicle 1.5.0" ctaHref="/cli" />
			<section class="site-hero">
				<h1 class="hero-title">A privacy-preserving, censorship-resistant network for code collaboration.</h1>
				<div class="hero-art" style={`background-image: url(${heroIllustration});`} aria-hidden="true"></div>
				<p class="hero-subtitle">
					<span style="color: #FFFFFF;">Radicle is a peer-to-peer code collaboration stack built on Git.</span> No central servers. No middlemen. Just cryptographic sovereignty and full control over your data, identity, and workflow.
				</p>
			</section>

			<section class="space-y-10">
				<div class="feature-list">
					<div class="feature-item">
						<span class="feature-dot feature-dot-active" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Your data, forever and secure.</h3>
							<p class="feature-text">
								All social artifacts are stored in Git, and signed using public-key cryptography. Radicle verifies the authenticity and authorship of all data for you.
							</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Evolvable &amp; extensible.</h3>
							<p class="feature-text">
								Radicle’s Collaborative Objects (COBs) provide Radicle’s social primitive. This enables features such as issues, discussions and code review to be implemented as Git objects. Developers can extend Radicle’s capabilities to build any kind of collaboration flow they see fit.
							</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Unparalleled autonomy.</h3>
							<p class="feature-text">
								Radicle enables users to run their own nodes, ensuring censorship-resistant code collaboration and fostering a resilient network without reliance on third parties.
							</p>
						</div>
					</div>
					<div class="feature-item">
						<span class="feature-dot" aria-hidden="true"></span>
						<div>
							<h3 class="feature-title">Local-first.</h3>
							<p class="feature-text">
								Radicle is local-first, providing always-available functionality even without internet access. Users own their data, making migration, backup, and access easy both online and offline.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	<SiteFooter />
</div>
