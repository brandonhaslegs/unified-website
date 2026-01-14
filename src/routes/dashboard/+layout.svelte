<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { signOut } from '$lib/utils/auth';
	import Toast from '$lib/components/Toast.svelte';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import { browser } from '$app/environment';

	let userMenuOpen = false;

	function handleSignOut() {
		signOut();
		user.set(null);
		isAuthenticated.set(false);
		goto('/auth/login');
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.relative')) {
			userMenuOpen = false;
		}
	}

	onMount(() => {
		if (browser && !$isAuthenticated) {
			goto('/auth/login');
		}

		if (browser) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="app-shell">
	<!-- Main Content -->
	<main>
		<div class="site-body">
			<SiteRail />
			<div class="app-content">
				<div class="content-topbar">
					<p class="content-tagline">Stop building the future on borrowed ground</p>
					<div class="relative">
						<button
							on:click={() => (userMenuOpen = !userMenuOpen)}
							class="flex items-center gap-3 app-meta focus:outline-none"
						>
							<div class="h-8 w-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
								{$user?.email?.[0].toUpperCase() || 'U'}
							</div>
							<span class="hidden md:block">{$user?.email}</span>
							<img src="/icons/ChevronDown.svg" alt="" class="icon-current w-4 h-4" />
						</button>

						{#if userMenuOpen}
							<div
								class="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-sm py-2 z-10"
								role="menu"
							>
								<a href="/dashboard/settings" class="block px-4 py-2 app-meta" role="menuitem">
									Account Settings
								</a>
								<a href="/support" target="_blank" class="block px-4 py-2 app-meta" role="menuitem">
									Support
								</a>
								<button on:click={handleSignOut} class="block w-full text-left px-4 py-2 app-meta" role="menuitem">
									Log out
								</button>
							</div>
						{/if}
					</div>
				</div>
				<slot />
			</div>
		</div>
	</main>
</div>

<Toast />
