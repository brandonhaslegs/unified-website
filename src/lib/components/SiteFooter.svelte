<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let currentProduct: 'cli' | 'desktop' | 'garden' | null = null;
</script>

<footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
	<div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Products</h2>
				<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
					<li class="flex items-center gap-2">
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
					<li class="flex items-center gap-2">
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
					<li class="flex items-center gap-2">
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
					<li>
						<a href="mailto:feedback@radicle.xyz" target="_blank" rel="noreferrer" class="link-highlight">
							<span>feedback@radicle.xyz</span>
						</a>
					</li>
					<li>
						<a
							href="https://bsky.app/profile/radicle.xyz"
							target="_blank"
							rel="noreferrer"
							class="link-highlight"
						>
							<span>Bluesky</span>
						</a>
					</li>
					<li>
						<a
							href="https://radicle.zulipchat.com/"
							target="_blank"
							rel="noreferrer"
							class="link-highlight"
						>
							<span>Zulip</span>
						</a>
					</li>
					<li>
						<a
							href="https://radicle.xyz/feed.xml"
							target="_blank"
							rel="noreferrer"
							class="link-highlight"
						>
							<span>RSS</span>
						</a>
					</li>
					<li>
						<a href="https://x.com/radicle" target="_blank" rel="noreferrer" class="link-highlight">
							<span>X</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
