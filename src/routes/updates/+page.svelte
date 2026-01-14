<script lang="ts">
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
</script>

<svelte:head>
	<title>Radicle Updates</title>
</svelte:head>

<div class="site-shell">
	<SiteHeader showAuxLinks={false} />

	<div class="site-body">
		<SiteRail />
		<div class="space-y-16">
			<section class="space-y-6">
				<h1 class="hero-title">Updates</h1>
				<p class="hero-subtitle">Latest releases and announcements from the Radicle team.</p>
			</section>

			<section class="space-y-10">
				<h2 class="section-heading">Release notes</h2>
				<ul class="space-y-6 text-secondary-light dark:text-secondary-dark">
					<li class="space-y-2">
						<span class="font-mono">30.09.2025</span>
						<a
							href="https://radicle.xyz/2025/09/30/radicle-1.5.0.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.5.0 released. ✨ — The Radicle team is delighted to announce the release of Radicle 1.5.0 (5fea9ac0), code name Hibiscus. The Hibiscus flower tends to bloom from late spring through autumn, and can be made into a nice warming tea.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">04.09.2025</span>
						<a
							href="https://radicle.xyz/2025/09/04/radicle-1.4.0.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.4.0 released. — The Radicle team is delighted to announce the release of Radicle 1.4.0 (bbd1e2c), code name Lily. Going forward, we want to name our releases after the abundant flowers and plants of this earth.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">12.08.2025</span>
						<a
							href="https://radicle.xyz/2025/08/12/radicle-1.3.0.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.3.0 released. — This release contains 48 commits by 7 contributors. We would like to thank everyone for their continued effort in helping us improve the Radicle protocol and tooling via their contributions and usage reports.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">17.07.2025</span>
						<a
							href="https://radicle.xyz/2025/07/17/radicle-1.2.1.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.2.1 released. — This release contains 50 commits by 11 contributors. It’s amazing to see that we continue to have contributors in the double digits.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">13.06.2025</span>
						<a
							href="https://radicle.xyz/2025/06/13/radicle-desktop.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle Desktop is out. 🖥️ — Today, we’re excited to officially introduce Radicle Desktop — a simple, intuitive desktop app that makes contributing to the Radicle network easier than ever.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">02.06.2025</span>
						<a
							href="https://radicle.xyz/2025/06/02/radicle-1.2.0.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.2.0 released. — This release contains 106 commits by 16 contributors.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">05.12.2024</span>
						<a
							href="https://radicle.xyz/2024/12/05/radicle-1.1.0.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.1.0 released. — This release contains 47 commits by 8 contributors.
						</a>
					</li>
					<li class="space-y-2">
						<span class="font-mono">10.09.2024</span>
						<a
							href="https://radicle.xyz/2024/09/10/radicle-1.0.0.html"
							target="_blank"
							rel="noreferrer"
							class="block"
						>
							Radicle 1.0.0 released. — After five months of feedback and 17 release candidates, we are ready to launch Radicle 1.0.0.
						</a>
					</li>
				</ul>
			</section>
		</div>
	</div>

	<SiteFooter />
</div>
