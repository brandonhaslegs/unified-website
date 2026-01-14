<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import guideHtml from '$lib/content/seeder-guide.html?raw';
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
	<title>Radicle Seeder Guide</title>
	<meta name="description" content="How to run a Radicle seed node." />
</svelte:head>

<div class="site-shell">
	<div class="site-body">
		<SiteRail />
		<div class="space-y-12">
			<SiteContentHeader showCta={false} />
			<section class="site-hero" bind:this={heroEl}>
				<div class="space-y-5">
					<a href="/protocol" class="cta-button cta-button-outline cta-button-small w-fit">
						<Icon name="ArrowLeft" size={14} className="icon-text" />
						<span>Back</span>
					</a>
					<h1 class="hero-title">Radicle Seeder Guide</h1>
					<p class="hero-subtitle">Run a seed node to keep repositories available.</p>
				</div>
				<div class="hero-art" style="background-image: var(--hero-image);"></div>
			</section>

			<main class="max-w-4xl">
				<article class="guide-content text-primary-light dark:text-primary-dark">
					{@html guideHtml}
				</article>
			</main>
		</div>
	</div>

	<SiteFooter currentProduct="protocol" />
</div>
