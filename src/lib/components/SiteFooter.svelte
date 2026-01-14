<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

export let currentProduct: 'cli' | 'desktop' | 'garden' | 'protocol' | null = null;
</script>

<div class="relative overflow-hidden">
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
</div>

<footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
	<div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Products</h2>
				<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
					<li class="flex items-baseline gap-2">
						<a
							href="/cli"
							class="link-highlight"
						>
							<span>CLI</span>
						</a>
						{#if currentProduct === 'cli'}
							<span class="ml-2 inline-flex items-center gap-0.5 rounded-sm bg-brand/20 dark:bg-brand/30 pl-1 pr-2 py-1 text-xs font-semibold text-primary-light dark:text-primary-dark">
								<Icon name="PinFilled" size={12} className="icon-current" />
								<span>You are here</span>
							</span>
						{/if}
					</li>
					<li class="flex items-baseline gap-2">
						<a href="/desktop" class="link-highlight">
							<span>Desktop</span>
						</a>
						{#if currentProduct === 'desktop'}
							<span class="inline-flex items-center gap-0.5 rounded-sm bg-brand/20 dark:bg-brand/30 pl-1 pr-2 py-1 text-xs font-semibold text-primary-light dark:text-primary-dark">
								<Icon name="PinFilled" size={12} className="icon-current" />
								<span>You are here</span>
							</span>
						{/if}
					</li>
					<li class="flex items-baseline gap-2">
						<a href="/garden" class="link-highlight">
							<span>Garden</span>
						</a>
						{#if currentProduct === 'garden'}
							<span class="inline-flex items-center gap-0.5 rounded-sm bg-brand/20 dark:bg-brand/30 pl-1 pr-2 py-1 text-xs font-semibold text-primary-light dark:text-primary-dark">
								<Icon name="PinFilled" size={12} className="icon-current" />
								<span>You are here</span>
							</span>
						{/if}
					</li>
					<li class="flex items-baseline gap-2">
						<a href="/protocol" class="link-highlight">
							<span>Protocol</span>
						</a>
						{#if currentProduct === 'protocol'}
							<span class="inline-flex items-center gap-0.5 rounded-sm bg-brand/20 dark:bg-brand/30 pl-1 pr-2 py-1 text-xs font-semibold text-primary-light dark:text-primary-dark">
								<Icon name="PinFilled" size={12} className="icon-current" />
								<span>You are here</span>
							</span>
						{/if}
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Blog</h2>
				<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">14.08.2025</span>
						<a
							href="https://radicle.xyz/2025/08/14/jujutsu-with-radicle.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight inline-block max-w-full"
						>
							<span>Jujutsu + Radicle = ❤️</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">12.08.2025</span>
						<a
							href="https://radicle.xyz/2025/08/12/canonical-references.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight inline-block max-w-full"
						>
							<span>Canonical References</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">23.07.2025</span>
						<a
							href="https://radicle.xyz/2025/07/23/using-radicle-ci-for-development.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight inline-block max-w-full"
						>
							<span>Using Radicle CI for Development</span>
						</a>
					</li>
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
						<span class="font-mono font-semibold text-brand-text shrink-0 text-xs">30.05.2025</span>
						<a
							href="https://radicle.xyz/2025/05/30/radicle-with-github-actions.html"
							target="_blank"
							rel="noreferrer"
							class="truncate link-highlight inline-block max-w-full"
						>
							<span>How we used Radicle with GitHub Actions</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Contact</h2>
				<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
					<li class="flex items-baseline">
						<a href="mailto:feedback@radicle.xyz" target="_blank" rel="noreferrer" class="link-highlight">
							<span>feedback@radicle.xyz</span>
						</a>
					</li>
					<li class="flex items-baseline">
						<a
							href="https://bsky.app/profile/radicle.xyz"
							target="_blank"
							rel="noreferrer"
							class="link-highlight"
						>
							<span>Bluesky</span>
						</a>
					</li>
					<li class="flex items-baseline">
						<a
							href="https://radicle.zulipchat.com/"
							target="_blank"
							rel="noreferrer"
							class="link-highlight"
						>
							<span>Zulip</span>
						</a>
					</li>
					<li class="flex items-baseline">
						<a
							href="https://radicle.xyz/feed.xml"
							target="_blank"
							rel="noreferrer"
							class="link-highlight"
						>
							<span>RSS</span>
						</a>
					</li>
					<li class="flex items-baseline">
						<a href="https://x.com/radicle" target="_blank" rel="noreferrer" class="link-highlight">
							<span>X</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
