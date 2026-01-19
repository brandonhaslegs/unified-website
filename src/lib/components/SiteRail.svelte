<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { signOut } from '$lib/utils/auth';
	import Icon from '$lib/components/Icon.svelte';
	import AppLogo from '$lib/components/AppLogo.svelte';
	import mobileArtAbout from '$lib/../illustrations/Illustration 9.png';
	import mobileArtGuides from '$lib/../illustrations/Illustration 4.png';
	import mobileArtInstall from '$lib/../illustrations/Illustration 1.png';
	import mobileArtGarden from '$lib/../illustrations/Illustration 7.png';
	import { fade, fly } from 'svelte/transition';

	export let activeHref: string | null = null;
	let mobileNavOpen = false;

	const primaryNav = [
		{ label: 'About', href: '/' },
		{ label: 'Guides & Support', href: '/guides' },
		{ label: 'Install', href: '/install' },
		{ label: 'Garden', href: '/garden' }
	];

	const appNav = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Account Settings', href: '/dashboard/settings' },
		{ label: 'Billing History', href: '/dashboard/receipts' },
		{ label: 'Help', href: '/dashboard/help' }
	];

	const mobileCards = [
		{
			label: 'About',
			description: 'An introduction to the Radicle network.',
			href: '/',
			art: mobileArtAbout,
			className: 'mobile-card-about'
		},
		{
			label: 'Guides & Support',
			description: 'Everything you need to get started.',
			href: '/guides',
			art: mobileArtGuides,
			className: 'mobile-card-guides'
		},
		{
			label: 'Install',
			description: 'Install Radicle CLI or download the desktop app.',
			href: '/install',
			art: mobileArtInstall,
			className: 'mobile-card-install'
		},
		{
			label: 'Garden',
			description: 'Run a node with our always-on Garden service.',
			href: '/garden',
			art: mobileArtGarden,
			className: 'mobile-card-garden',
			isNew: true
		}
	];

	function handleSignOut() {
		signOut();
		user.set(null);
		isAuthenticated.set(false);
		goto('/garden');
	}

	function closeMobileNav() {
		mobileNavOpen = false;
	}

	$: isAppContext =
		$page.url.pathname.startsWith('/dashboard') ||
		$page.url.pathname.startsWith('/auth');
	$: isAuthPage = $page.url.pathname.startsWith('/auth');
	$: showAppNav = isAppContext && !isAuthPage;
</script>

<div class="site-rail-mobile">
	<a class="site-rail-mobile-brand" href="/" on:click={closeMobileNav}>
		{#if isAppContext}
			<AppLogo />
		{:else}
			<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
		{/if}
	</a>
	<button
		type="button"
		class="site-rail-mobile-toggle"
		class:mobile-toggle-open={mobileNavOpen}
		aria-expanded={mobileNavOpen}
		aria-controls="mobile-site-nav"
		on:click={() => (mobileNavOpen = !mobileNavOpen)}
	>
		<Icon name="MenuDots" size={18} className="icon-current" />
	</button>
</div>

{#if mobileNavOpen}
	<div
		class="mobile-nav-overlay"
		id="mobile-site-nav"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 180 }}
	>
		<div class="site-rail-mobile">
			<a class="site-rail-mobile-brand" href="/" on:click={closeMobileNav}>
				{#if isAppContext}
					<AppLogo />
				{:else}
					<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
				{/if}
			</a>
			<button
				type="button"
				class="site-rail-mobile-toggle"
				class:mobile-toggle-open={mobileNavOpen}
				aria-expanded={mobileNavOpen}
				aria-controls="mobile-site-nav"
				on:click={() => (mobileNavOpen = false)}
			>
				<Icon name="MenuDots" size={18} className="icon-current" />
			</button>
		</div>
		{#if showAppNav}
			<nav class="mobile-nav-links" aria-label="Mobile app navigation">
				{#each appNav as item}
					{@const isActive =
						item.href === '/dashboard'
							? $page.url.pathname === item.href
							: $page.url.pathname.startsWith(item.href)}
					<a
						href={item.href}
						class="mobile-nav-link"
						class:mobile-nav-link-active={isActive}
						aria-current={isActive ? 'page' : undefined}
						on:click={closeMobileNav}
						in:fly={{ y: 10, duration: 140, opacity: 0 }}
						out:fly={{ y: 10, duration: 120, opacity: 0 }}
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<div class="mobile-nav-footer" transition:fly={{ y: 10, duration: 200 }}>
				{#if $isAuthenticated}
					<button type="button" class="site-rail-logout" on:click={handleSignOut}>
						Log out
					</button>
				{/if}
			</div>
		{:else if !isAppContext}
			<nav class="mobile-nav-cards" aria-label="Mobile primary navigation">
				{#each mobileCards as card, index}
					<a
						class={`mobile-nav-card ${card.className}`}
						href={card.href}
						on:click={closeMobileNav}
						in:fly={{ y: 14, duration: 160, delay: 30 * index, opacity: 0 }}
						out:fly={{ y: 10, duration: 140, delay: 20 * index, opacity: 0 }}
					>
						<div>
							<div class="mobile-nav-title">
								<span>{card.label}</span>
								{#if card.isNew}
									<span class="site-rail-badge">New</span>
								{/if}
							</div>
							<p>{card.description}</p>
						</div>
						<div
							class="mobile-nav-art"
							style={`background-image: url(${card.art});`}
							aria-hidden="true"
						></div>
					</a>
				{/each}
			</nav>
			<div class="mobile-nav-footer" transition:fly={{ y: 10, duration: 200 }}>
				<div>
					<h2 class="site-footer-heading">Resources</h2>
					<a class="site-footer-link" href="/faq" on:click={closeMobileNav}>FAQ</a>
					<a class="site-footer-link" href="/updates" on:click={closeMobileNav}>Updates</a>
					<a class="site-footer-link" href="https://radicle.xyz/blog" target="_blank" rel="noreferrer">Blog</a>
				</div>
				<div>
					<h2 class="site-footer-heading">Social</h2>
					<a class="site-footer-link" href="https://bsky.app/profile/radicle.xyz" target="_blank" rel="noreferrer">Bluesky</a>
					<a class="site-footer-link" href="https://x.com/radicle" target="_blank" rel="noreferrer">Twitter</a>
					<a class="site-footer-link" href="https://joinmastodon.org/" target="_blank" rel="noreferrer">Mastodon</a>
				</div>
			</div>
		{/if}
	</div>
{/if}

<nav class="site-rail" aria-label="Primary site navigation">
	<a class="site-rail-logo" href="/">
		{#if isAppContext}
			<AppLogo />
		{:else}
			<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
		{/if}
	</a>
	<div role="group" aria-label="Primary links">
		{#if showAppNav}
			{#each appNav as item}
				{@const isActive =
					item.href === '/dashboard'
						? $page.url.pathname === item.href
						: $page.url.pathname.startsWith(item.href)}
				<a
					href={item.href}
					class="site-rail-link"
					class:site-rail-link-active={isActive}
					aria-current={isActive ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		{:else if !isAppContext}
			{#each primaryNav as item}
				{@const isActive =
					activeHref
						? activeHref === item.href
						: item.href === '/'
							? $page.url.pathname === '/'
							: $page.url.pathname.startsWith(item.href)}
				<a
					href={item.href}
					class="site-rail-link"
					class:site-rail-link-active={isActive}
					aria-current={isActive ? 'page' : undefined}
				>
					{item.label}
					{#if item.href === '/garden'}
						<span class="site-rail-badge">New</span>
					{/if}
				</a>
			{/each}
		{/if}
	</div>
	<div class="site-rail-footer" role="group" aria-label="Secondary links">
		{#if showAppNav && $isAuthenticated}
			<button type="button" class="site-rail-logout" on:click={handleSignOut}>
				Log out
			</button>
		{:else if !isAppContext}
			<a href="/updates">Updates</a>
			<a
				href="/faq"
				aria-current={$page.url.pathname === '/faq' ? 'page' : undefined}
			>
				FAQ
			</a>
		{/if}
	</div>
</nav>
