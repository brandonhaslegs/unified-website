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
		goto('/garden');
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
			<SiteRail activeHref="/garden" />
			<div class="app-content">
				<slot />
			</div>
		</div>
	</main>
</div>

<Toast />
