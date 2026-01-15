<script lang="ts">
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/stores/toast';

	let loading = false;

	function handleDelete() {
		loading = true;
		setTimeout(() => {
			showToast('Account deletion requested', 'info');
			goto('/auth/login');
		}, 800);
	}
</script>

<div class="app-content">
	<section class="auth-flow">
		<header class="auth-header">
			<h1 class="auth-title">Delete account</h1>
			<p class="auth-subtitle">
				Are you sure you want to delete your account? This action cannot be undone. All your data,
				repositories, and subscription will be permanently deleted.
			</p>
		</header>

		<div class="auth-actions">
			<a href="/dashboard/settings" class="cta-button cta-button-outline auth-submit">Keep account</a>
			<button type="button" class="cta-button cta-button-danger auth-submit" disabled={loading} on:click={handleDelete}>
				{loading ? 'Deleting...' : 'Delete account'}
			</button>
		</div>
	</section>
</div>
