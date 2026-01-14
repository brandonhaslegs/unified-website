<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';

	let heroEl: HTMLElement;
	let copied = false;
	let copyTimeout: ReturnType<typeof setTimeout> | null = null;

	const illustrationModules = import.meta.glob('/src/illustrations/*.{png,jpg,jpeg,webp,avif}', {
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

<div class="min-h-screen bg-white dark:bg-black">
	<SiteHeader
		ctaLabel="Install the CLI"
		ctaIcon="Copy"
		ctaCopyText="curl -sSLf https://radicle.xyz/install | sh"
		showAuxLinks={false}
		auxLinkLabel="Get the desktop app"
		auxLinkHref="/desktop"
	/>

	<section class="relative overflow-hidden" bind:this={heroEl}>
		<div class="absolute inset-y-0 left-0 right-0 flex justify-center" aria-hidden="true">
			<div class="w-full max-w-7xl">
				<div
					class="h-full w-[125%] relative left-1/2 -translate-x-1/2"
					style="background-image: var(--hero-image); background-size: cover; background-position: center center;"
				></div>
			</div>
		</div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
			<div class="max-w-3xl">
				<h1 class="text-[clamp(4rem,12vw,11rem)] font-bold tracking-tight text-white dark:text-black mb-6">
					CLI
				</h1>
				<p class="text-2xl text-secondary-light dark:text-black mb-10 leading-snug text-black">
					<span class="text-highlight">The command line interface for working with Radicle repositories, patches, and identities.</span>
				</p>
				<div class="inline-flex flex-col space-y-3 rounded-sm bg-white text-black dark:bg-black dark:text-white p-4 sm:p-5 w-fit max-w-full">
					<p class="text-lg font-normal">Install the CLI</p>
					<div class="inline-flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black rounded-sm px-4 py-3 text-sm font-mono max-w-[520px] w-auto">
						<pre class="truncate whitespace-nowrap overflow-hidden text-ellipsis min-w-0 flex-1">curl -sSLf https://radicle.xyz/install | sh</pre>
						<button
							type="button"
							class="p-1 rounded-sm bg-white/10 text-white dark:bg-black/10 dark:text-black relative overflow-hidden flex items-center justify-center flex-shrink-0"
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
		</div>
	</section>

	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<section class="grid grid-cols-1 md:grid-cols-2 gap-12">
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Device" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Node‑backed CLI</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					The Radicle Stack ships with a CLI, web interface, and TUI that are backed by the Radicle Node and HTTP daemon. It’s modular, so you can swap parts or build your own clients.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Key" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Signed artifacts</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Social artifacts are stored in Git and signed using public‑key cryptography, so the CLI can verify authenticity and authorship.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Git" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Git + gossip</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Radicle uses Git for efficient data transfer between peers and a custom gossip protocol to exchange repository metadata.
				</p>
			</div>
			<div>
				<div class="h-12 w-12 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-4">
					<Icon name="Seed" size={24} className="icon-brand" />
				</div>
				<h2 class="text-2xl font-semibold text-primary-light dark:text-primary-dark mb-3">Run your own node</h2>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Operate your own node for censorship‑resistant collaboration and a resilient network without relying on third parties.
					<a href="/garden" class="text-brand border-b border-brand">Learn about our always-on node.</a>
				</p>
			</div>
		</section>
	</main>

	<SiteFooter currentProduct="cli" />
</div>
