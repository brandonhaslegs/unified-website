<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import { onDestroy, onMount } from 'svelte';

	let heroEl: HTMLElement;
	let heroCanvas: HTMLCanvasElement;

	const illustrationModules = import.meta.glob('/src/illustrations/*.{png,jpg,jpeg,webp,avif}', {
		eager: true,
		import: 'default'
	});
	const illustrationUrls = Object.values(illustrationModules) as string[];

	onMount(() => {
		if (!heroCanvas || !heroEl || illustrationUrls.length === 0) {
			return;
		}

		const ctx = heroCanvas.getContext('2d');
		if (!ctx) {
			return;
		}

		const pixelCanvas = document.createElement('canvas');
		const pixelCtx = pixelCanvas.getContext('2d');
		if (!pixelCtx) {
			return;
		}

		let animationFrame = 0;
		let resizeObserver: ResizeObserver | null = null;
		let startTime = performance.now();
		const dissolveDurationMs = 7000;

		const images: HTMLImageElement[] = [];
		let currentIndex = Math.floor(Math.random() * illustrationUrls.length);
		let nextIndex = (currentIndex + 1) % illustrationUrls.length;

		const loadImages = illustrationUrls.map(
			(url) =>
				new Promise<HTMLImageElement>((resolve) => {
					const img = new Image();
					img.src = url;
					img.onload = () => resolve(img);
				})
		);

		const pickNextIndex = () => {
			if (illustrationUrls.length <= 1) {
				return currentIndex;
			}
			let candidate = currentIndex;
			while (candidate === currentIndex) {
				candidate = Math.floor(Math.random() * illustrationUrls.length);
			}
			return candidate;
		};

		const resize = () => {
			const rect = heroEl.getBoundingClientRect();
			heroCanvas.width = Math.max(1, Math.floor(rect.width * window.devicePixelRatio));
			heroCanvas.height = Math.max(1, Math.floor(rect.height * window.devicePixelRatio));
			heroCanvas.style.width = `${rect.width}px`;
			heroCanvas.style.height = `${rect.height}px`;
			ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
		};

		const drawCover = (context: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
			const scale = Math.max(width / img.width, height / img.height);
			const sw = width / scale;
			const sh = height / scale;
			const sx = (img.width - sw) / 2;
			const sy = (img.height - sh) / 2;
			context.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
		};

		const drawPixelated = (img: HTMLImageElement, alpha: number, pixelSize: number) => {
			const width = heroCanvas.width / window.devicePixelRatio;
			const height = heroCanvas.height / window.devicePixelRatio;
			const pixelWidth = Math.max(1, Math.floor(width / pixelSize));
			const pixelHeight = Math.max(1, Math.floor(height / pixelSize));

			pixelCanvas.width = pixelWidth;
			pixelCanvas.height = pixelHeight;
			pixelCtx.clearRect(0, 0, pixelWidth, pixelHeight);
			pixelCtx.imageSmoothingEnabled = true;
			drawCover(pixelCtx, img, pixelWidth, pixelHeight);

			ctx.save();
			ctx.globalAlpha = alpha;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(pixelCanvas, 0, 0, pixelWidth, pixelHeight, 0, 0, width, height);
			ctx.restore();
		};

		const animate = (time: number) => {
			const elapsed = time - startTime;
			const progress = Math.min(1, elapsed / dissolveDurationMs);
			const eased = progress;
			const pixelSize = Math.round(40 - 28 * eased);

			ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
			drawPixelated(images[currentIndex], 1 - eased, pixelSize);
			drawPixelated(images[nextIndex], eased, pixelSize);

			if (progress >= 1) {
				currentIndex = nextIndex;
				nextIndex = pickNextIndex();
				startTime = time;
			}

			animationFrame = requestAnimationFrame(animate);
		};

		Promise.all(loadImages).then((loaded) => {
			images.push(...loaded);
			resize();

			resizeObserver = new ResizeObserver(resize);
			resizeObserver.observe(heroEl);
			animationFrame = requestAnimationFrame(animate);
		});

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	});

	onDestroy(() => {
		// Cleanup handled by onMount return.
	});
</script>

<svelte:head>
	<title>Radicle Garden - Always On Node</title>
</svelte:head>

<div class="min-h-screen bg-surface-light dark:bg-surface-dark">
	<div class="bg-brand">
		<!-- Header -->
		<header class="bg-black text-white">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div class="flex flex-wrap items-center gap-3">
					<div class="flex items-center gap-3 mr-auto">
						<Icon name="Logo" size={28} className="icon-brand" />
						<span class="text-lg font-semibold tracking-tight">Radicle</span>
					</div>
					<div class="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:ml-auto">
						<a
							href="https://desktop.radicle.xyz/"
							class="px-3 py-2 rounded-sm transition btn-invert-hover btn-invert-hover-white hover:text-black"
						>
							<span>Download Radicle</span>
						</a>
						<span class="hidden sm:block h-6 w-px bg-white/30" aria-hidden="true"></span>
						<button
							on:click={() => goto('/dashboard')}
							class="px-3 py-2 rounded-sm transition btn-invert-hover btn-invert-hover-white hover:text-black"
						>
							<span>Log in</span>
						</button>
					</div>
					<a
						href="/auth/signup"
						class="bg-brand text-black px-4 py-2 rounded-sm font-semibold transition btn-invert-hover btn-invert-hover-white hover:text-black w-full sm:w-auto sm:ml-3 text-center"
					>
						<span>Get one for $10/month</span>
					</a>
				</div>
			</div>
		</header>

		<!-- Hero Section -->
		<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden" bind:this={heroEl}>
			<canvas class="absolute inset-0 h-full w-full opacity-100 pointer-events-none" bind:this={heroCanvas}></canvas>
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
					<Icon name="SeedFilled" size={32} className="icon-brand" />
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

	<section class="bg-brand/20 dark:bg-brand/30">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div class="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 items-start">
				<h2 class="text-4xl md:text-5xl font-semibold text-primary-light dark:text-primary-dark">Updates</h2>
				<ul class="space-y-3 text-lg text-secondary-light dark:text-secondary-dark min-w-0 overflow-hidden">
					<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap min-w-0">
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">30.09.2025</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">04.09.2025</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">12.08.2025</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">17.07.2025</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">13.06.2025</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">02.06.2025</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">05.12.2024</span>
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
						<span class="font-mono font-semibold text-brand shrink-0 text-xs">10.09.2024</span>
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

	<footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
		<div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Contact</h2>
					<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
						<li>
							<a
								href="mailto:feedback@radicle.xyz"
								target="_blank"
								rel="noreferrer"
								class="link-highlight"
							>
								<span>feedback@radicle.xyz</span>
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
								href="https://x.com/radicle"
								target="_blank"
								rel="noreferrer"
								class="link-highlight"
							>
								<span>X</span>
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
					</ul>
				</div>

				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Products</h2>
					<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
						<li>
							<a
								href="https://radicle.xyz/#get-started"
								target="_blank"
								rel="noreferrer"
								class="link-highlight"
							>
								<span>CLI</span>
							</a>
						</li>
						<li>
							<a
								href="https://radicle.xyz/desktop"
								target="_blank"
								rel="noreferrer"
								class="link-highlight"
							>
								<span>Desktop</span>
							</a>
						</li>
						<li class="text-primary-light dark:text-primary-dark">
							Garden
							<span class="ml-2 inline-flex items-center gap-0.5 rounded-sm bg-brand/20 dark:bg-brand/30 px-1 py-1 text-xs font-semibold text-primary-light dark:text-primary-dark">
								<Icon name="PinFilled" size={12} className="icon-current" />
								<span>You are here</span>
							</span>
						</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h2 class="text-xl font-semibold text-primary-light dark:text-primary-dark">Blog</h2>
					<ul class="space-y-2 text-secondary-light dark:text-secondary-dark">
						<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
							<span class="font-mono font-semibold text-brand shrink-0 text-xs">14.08.2025</span>
							<a
								href="https://radicle.xyz/2025/08/14/jujutsu-with-radicle.html"
								target="_blank"
								rel="noreferrer"
								class="truncate link-highlight min-w-0 flex-1"
							>
								<span>Jujutsu + Radicle = ❤️</span>
							</a>
						</li>
						<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
							<span class="font-mono font-semibold text-brand shrink-0 text-xs">12.08.2025</span>
							<a
								href="https://radicle.xyz/2025/08/12/canonical-references.html"
								target="_blank"
								rel="noreferrer"
								class="truncate link-highlight min-w-0 flex-1"
							>
								<span>Canonical References</span>
							</a>
						</li>
						<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
							<span class="font-mono font-semibold text-brand shrink-0 text-xs">23.07.2025</span>
							<a
								href="https://radicle.xyz/2025/07/23/using-radicle-ci-for-development.html"
								target="_blank"
								rel="noreferrer"
								class="truncate link-highlight min-w-0 flex-1"
							>
								<span>Using Radicle CI for Development</span>
							</a>
						</li>
						<li class="flex items-baseline gap-2 overflow-hidden whitespace-nowrap">
							<span class="font-mono font-semibold text-brand shrink-0 text-xs">30.05.2025</span>
							<a
								href="https://radicle.xyz/2025/05/30/radicle-with-github-actions.html"
								target="_blank"
								rel="noreferrer"
								class="truncate link-highlight min-w-0 flex-1"
							>
								<span>How we used Radicle with GitHub Actions</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>

</div>
