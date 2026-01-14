<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { onMount } from 'svelte';

	let heroEl: HTMLElement;

	const illustrationModules = import.meta.glob('/src/illustrations/*.{png,jpg,jpeg,webp,avif}', {
		eager: true,
		import: 'default'
	});
	const illustrationUrls = Object.values(illustrationModules) as string[];

	onMount(() => {
		if (!heroEl || illustrationUrls.length === 0) {
			return;
		}

		const index = Math.floor(Math.random() * illustrationUrls.length);
		heroEl.style.setProperty('--hero-image', `url("${illustrationUrls[index]}")`);
	});
</script>

<svelte:head>
	<title>Radicle Garden - Always On Node</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black">
	<div class="bg-white dark:bg-black">
		<SiteHeader />

		<!-- Hero Section -->
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
				<div class="max-w-4xl relative z-10">
				<h1 class="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tight text-white dark:text-black mb-6 leading-none">Always-on node for your Radicle repos</h1>
				<p class="text-2xl md:text-3xl text-secondary-light dark:text-black mb-12 leading-snug text-black">
					<span class="text-highlight">The security of Radicle with the convenience of availability.</span>
				</p>
				<a
					href="/auth/signup"
					class="inline-block px-10 py-5 rounded-sm text-xl font-semibold transition bg-black text-white dark:bg-white dark:text-black btn-invert-hover btn-invert-hover-white btn-invert-hover-dark hover:text-black dark:hover:text-white"
				>
					<span>Get one for $10/month</span>
				</a>
				</div>
			</div>
		</section>
	</div>

	<!-- Benefits Section -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<h2 class="text-5xl md:text-6xl font-bold text-primary-light dark:text-primary-dark mb-20">Why run an always‑on node?</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Clock" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">24/7 Repository Availability</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Your repositories are always accessible, even when your local machine is offline.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Online" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">No Local Resource Usage</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Keep your repositories seeded without using your own bandwidth or storage.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Revision" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Automatic Syncing</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Your repositories stay up-to-date automatically with all the latest changes.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Share" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Easy Team Sharing</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Share your repositories with team members without requiring them to run their own nodes.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Seed" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Reliable Infrastructure</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Built on Radicle's decentralized network for maximum reliability and uptime.
				</p>
			</div>

			<div>
				<div class="h-16 w-16 bg-brand/20 dark:bg-brand/30 rounded-sm flex items-center justify-center mb-6">
					<Icon name="Settings" size={32} className="icon-brand" />
				</div>
				<h3 class="text-2xl font-bold text-primary-light dark:text-primary-dark mb-3">Simple Setup</h3>
				<p class="text-lg text-secondary-light dark:text-secondary-dark">
					Get started in minutes with no complex configuration or hardware requirements.
				</p>
			</div>
		</div>
	</section>

	<section class="relative">
		<div class="absolute inset-y-0 left-0 right-0 flex justify-center" aria-hidden="true">
			<div class="w-full max-w-7xl">
				<div class="h-full w-[125%] relative left-1/2 -translate-x-1/2 bg-brand/20 dark:bg-brand/10"></div>
			</div>
		</div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div class="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 items-start">
				<h2 class="text-4xl md:text-5xl font-semibold text-primary-light dark:text-primary-dark">Updates</h2>
				<ul class="space-y-3 text-lg text-secondary-light dark:text-secondary-dark min-w-0 overflow-hidden">
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">30.09.2025</span>
						<a
							href="https://radicle.xyz/2025/09/30/radicle-1.5.0.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.5.0 released. ✨ — The Radicle team is delighted to announce the release of Radicle 1.5.0 (5fea9ac0), code name Hibiscus. The Hibiscus flower tends to bloom from late spring through autumn, and can be made into a nice warming tea. So grab your cup and take a seat, while we walk through this 1.5.0 release.</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">04.09.2025</span>
						<a
							href="https://radicle.xyz/2025/09/04/radicle-1.4.0.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.4.0 released. — The Radicle team is delighted to announce the release of Radicle 1.4.0 (bbd1e2c), code name Lily. Going forward, we want to name our releases after the abundant flowers and plants of this earth. We chose Lily as the first in honor of Finland’s national flower, the Lily of the Valley. The team is making this release from Helsinki 🇫🇮</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">12.08.2025</span>
						<a
							href="https://radicle.xyz/2025/08/12/radicle-1.3.0.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.3.0 released. — The Radicle team is delighted to announce the release of Radicle 1.3.0 (29043134a). This release contains 48 commits by 7 contributors. We would like to thank everyone for their continued effort in helping us improve the Radicle protocol and tooling via their contributions and usage reports 👾</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">17.07.2025</span>
						<a
							href="https://radicle.xyz/2025/07/17/radicle-1.2.1.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.2.1 released. — The Radicle team is delighted to announce the release of Radicle 1.2.1 (29043134a). This release contains 50 commits by 11 contributors. It’s amazing to see that we continue to have contributors in the double digits – thank you for your time and effort ✨</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">13.06.2025</span>
						<a
							href="https://radicle.xyz/2025/06/13/radicle-desktop.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle Desktop is out. 🖥️ — Today, we’re excited to officially introduce Radicle Desktop - a simple, intuitive desktop app that makes contributing to the Radicle network easier than ever.</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">02.06.2025</span>
						<a
							href="https://radicle.xyz/2025/06/02/radicle-1.2.0.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.2.0 released. — The Radicle team is delighted to announce the release of Radicle 1.2.0. This release contains 106 commits by 16 contributors 📈.</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">05.12.2024</span>
						<a
							href="https://radicle.xyz/2024/12/05/radicle-1.1.0.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.1.0 released. — The Radicle team is delighted to announce the release of Radicle 1.1.0. This release contains 47 commits by 8 contributors.</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">10.09.2024</span>
						<a
							href="https://radicle.xyz/2024/09/10/radicle-1.0.0.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight text-lg min-w-0 flex-1 block w-full"
						>
							<span>Radicle 1.0.0 released. — On March 26th, we announced the first release candidate for Radicle 1.0.0. Today, after five months of feedback and 17 release candidates, we are ready to launch Radicle 1.0.0.</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<SiteFooter currentProduct="garden" />

</div>
