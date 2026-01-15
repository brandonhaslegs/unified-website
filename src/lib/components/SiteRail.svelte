<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { signOut } from '$lib/utils/auth';
	import Icon from '$lib/components/Icon.svelte';
	import mobileArtAbout from '$lib/../illustrations/Illustration 9.png';
	import mobileArtGuides from '$lib/../illustrations/Illustration 4.png';
	import mobileArtInstall from '$lib/../illustrations/Illustration 1.png';
	import mobileArtGarden from '$lib/../illustrations/Illustration 7.png';

	export let activeHref: string | null = null;
	let mobileNavOpen = false;

	const primaryNav = [
		{ label: 'About', href: '/' },
		{ label: 'Guides & Support', href: '/guides' },
		{ label: 'Install', href: '/install' },
		{ label: 'Garden', href: '/garden' }
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

	const gardenSubnav = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Account Settings', href: '/dashboard/settings' },
		{ label: 'Billing History', href: '/dashboard/receipts' },
		{ label: 'Help', href: '/dashboard/help' }
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
</script>

<div class="site-rail-mobile">
	<a class="site-rail-mobile-brand" href="/" on:click={closeMobileNav}>
		<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
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
	<div class="mobile-nav-overlay" id="mobile-site-nav" role="dialog" aria-modal="true">
		<div class="site-rail-mobile">
			<a class="site-rail-mobile-brand" href="/" on:click={closeMobileNav}>
				<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
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
		<nav class="mobile-nav-cards" aria-label="Mobile primary navigation">
			{#each mobileCards as card}
				<a class={`mobile-nav-card ${card.className}`} href={card.href} on:click={closeMobileNav}>
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
		<div class="mobile-nav-footer">
			<div>
				<p class="mobile-nav-heading">Resources</p>
				<a href="/faq" on:click={closeMobileNav}>FAQ</a>
				<a href="/updates" on:click={closeMobileNav}>Updates</a>
				<a href="https://radicle.xyz/blog" target="_blank" rel="noreferrer">Blog</a>
			</div>
			<div>
				<p class="mobile-nav-heading">Social</p>
				<a href="https://bsky.app/profile/radicle.xyz" target="_blank" rel="noreferrer">Bluesky</a>
				<a href="https://x.com/radicle" target="_blank" rel="noreferrer">Twitter</a>
				<a href="https://joinmastodon.org/" target="_blank" rel="noreferrer">Mastodon</a>
			</div>
		</div>
	</div>
{/if}

<nav class="site-rail" aria-label="Primary site navigation">
	<a class="site-rail-logo" href="/">
		<img src="/icons/Logo.svg" alt="radicle" class="site-logo-full" />
	</a>
	<div role="group" aria-label="Primary links">
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
			{#if item.href === '/garden' && $isAuthenticated}
				<div class="site-rail-subnav" role="group" aria-label="Garden">
					{#each gardenSubnav as subitem}
						{@const subActive =
							subitem.href === '/dashboard'
								? $page.url.pathname === subitem.href
								: $page.url.pathname.startsWith(subitem.href)}
						<a
							href={subitem.href}
							class={subActive ? 'site-rail-link-active' : undefined}
							aria-current={subActive ? 'page' : undefined}
						>
							{subitem.label}
						</a>
					{/each}
					<button type="button" class="site-rail-logout" on:click={handleSignOut}>
						Log out
					</button>
				</div>
			{/if}
		{/each}
	</div>
	<div class="site-rail-footer" role="group" aria-label="Secondary links">
		<a href="/updates">Updates</a>
		<a
			href="/faq"
			aria-current={$page.url.pathname === '/faq' ? 'page' : undefined}
		>
			FAQ
		</a>
	</div>
</nav>
