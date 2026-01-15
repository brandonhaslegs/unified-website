<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { signOut } from '$lib/utils/auth';

	export let activeHref: string | null = null;

	const primaryNav = [
		{ label: 'About', href: '/' },
		{ label: 'Guides & Support', href: '/guides' },
		{ label: 'Install', href: '/install' },
		{ label: 'Garden', href: '/garden' }
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
</script>

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
