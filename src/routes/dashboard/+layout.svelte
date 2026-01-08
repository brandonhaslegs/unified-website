<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { signOut } from '$lib/utils/auth';
	import Toast from '$lib/components/Toast.svelte';
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

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<header class="bg-white dark:bg-gray-800 shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-4">
				<a href="/dashboard" class="text-xl font-bold text-gray-900 dark:text-gray-100">Radicle Garden</a>

				<div class="relative">
					<button
						on:click={() => (userMenuOpen = !userMenuOpen)}
						class="flex items-center space-x-3 text-sm focus:outline-none"
					>
						<div class="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
							{$user?.email?.[0].toUpperCase() || 'U'}
						</div>
						<span class="hidden md:block text-gray-700 dark:text-gray-300">{$user?.email}</span>
						<svg class="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if userMenuOpen}
						<div
							class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700"
							role="menu"
						>
							<a
								href="/dashboard/settings"
								class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
								role="menuitem"
							>
								Account Settings
							</a>
							<a
								href="/support"
								target="_blank"
								class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
								role="menuitem"
							>
								Support
							</a>
							<button
								on:click={handleSignOut}
								class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
								role="menuitem"
							>
								Log out
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main>
		<slot />
	</main>
</div>

<Toast />

