<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';

	let heroEl: HTMLElement;
	let copied = false;
	let copyTimeout: ReturnType<typeof setTimeout> | null = null;

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

	function handleCopy() {
		navigator.clipboard.writeText('curl -sSLf https://radicle.xyz/install | sh');
		copied = true;
		if (copyTimeout) {
			clearTimeout(copyTimeout);
		}
		copyTimeout = setTimeout(() => {
			copied = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>Radicle CLI</title>
</svelte:head>

<div class="site-shell">
	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<SiteContentHeader ctaLabel="Install the CLI" ctaCopyText="curl -sSLf https://radicle.xyz/install | sh" />
			<section class="site-hero" bind:this={heroEl}>
				<div class="space-y-6">
					<h1 class="hero-title">Command-line control for Radicle</h1>
					<p class="hero-subtitle">
						The command line interface for working with Radicle repositories, patches, and identities.
					</p>
					<div class="feature-card">
						<p class="text-secondary-light dark:text-secondary-dark mb-3">Install the CLI</p>
						<div class="flex items-center gap-3 bg-black text-white rounded-sm px-4 py-3 font-mono">
							<pre class="truncate whitespace-nowrap overflow-hidden text-ellipsis min-w-0 flex-1">curl -sSLf https://radicle.xyz/install | sh</pre>
							<button
								type="button"
								class="p-1 rounded-sm bg-white/10 text-white relative overflow-hidden flex items-center justify-center flex-shrink-0"
								aria-label="Copy install command"
								on:click={handleCopy}
							>
								<span class="relative block h-4 w-4 flex items-center justify-center overflow-hidden">
									<Icon
										name="Copy"
										size={14}
										className={`icon-terminal absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${copied ? 'top-[120%] opacity-0' : 'top-1/2 opacity-100'}`}
									/>
									<Icon
										name="Checkmark"
										size={14}
										className={`icon-terminal absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${copied ? 'top-1/2 opacity-100' : 'top-[-60%] opacity-0'}`}
									/>
								</span>
							</button>
						</div>
					</div>
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
								<a href="/garden" class="text-brand border-b border-brand ml-1">Learn about our always-on node.</a>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	<SiteFooter currentProduct="cli" />
</div>
