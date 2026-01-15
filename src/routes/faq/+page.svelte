<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
</script>

<svelte:head>
	<title>FAQ</title>
</svelte:head>

<div class="site-shell">
	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<SiteContentHeader showCta={false} />
			<section class="space-y-6">
				<h1 class="hero-title">FAQ</h1>
			</section>

			<section class="space-y-16">
				<div class="faq-section">
					<h2 class="section-heading">General</h2>
					<div class="faq-list">
						<div class="faq-item">What is Radicle? How is it different from Git/GitHub?</div>
						<div class="faq-item">Who is using Radicle currently? How many users does it have?</div>
						<div class="faq-item">What do you mean by “peer‑to‑peer”?</div>
						<div class="faq-item">Isn’t Git already peer‑to‑peer? Why do I need Radicle?</div>
						<div class="faq-item">Do I need to run a node to use Radicle?</div>
					</div>
				</div>

				<div class="faq-section">
					<h2 class="section-heading">Technical</h2>
					<div class="faq-list">
						<div class="faq-item">What is Radicle? How is it different from Git/GitHub?</div>
						<div class="faq-item">Who is using Radicle currently? How many users does it have?</div>
						<div class="faq-item">What do you mean by “peer‑to‑peer”?</div>
						<div class="faq-item">Isn’t Git already peer‑to‑peer? Why do I need Radicle?</div>
						<div class="faq-item">Do I need to run a node to use Radicle?</div>
					</div>
				</div>

				<div class="faq-section">
					<h2 class="section-heading">User experience</h2>
					<div class="faq-list">
						<div class="faq-item">What is Radicle? How is it different from Git/GitHub?</div>
						<div class="faq-item">Who is using Radicle currently? How many users does it have?</div>
						<div class="faq-item">What do you mean by “peer‑to‑peer”?</div>
						<div class="faq-item">Isn’t Git already peer‑to‑peer? Why do I need Radicle?</div>
						<div class="faq-item">Do I need to run a node to use Radicle?</div>
					</div>
				</div>

				<div class="faq-section">
					<h2 class="section-heading">History</h2>
					<div class="faq-list">
						<div class="faq-item">What is the history of the Radicle project?</div>
					</div>
				</div>

				<div class="faq-section">
					<h2 class="section-heading">Monetization &amp; funding</h2>
					<div class="faq-list">
						<div class="faq-item">What is Radicle? How is it different from Git/GitHub?</div>
						<div class="faq-item">Who is using Radicle currently? How many users does it have?</div>
						<div class="faq-item">What do you mean by “peer‑to‑peer”?</div>
						<div class="faq-item">Isn’t Git already peer‑to‑peer? Why do I need Radicle?</div>
						<div class="faq-item">Do I need to run a node to use Radicle?</div>
					</div>
				</div>

				<div class="faq-section">
					<h2 class="section-heading">Legal</h2>
					<div class="faq-list">
						<div class="faq-item">Am I liable as a Node Operator?</div>
					</div>
				</div>
			</section>
		</div>
		<SiteFooter />
	</div>
</div>
