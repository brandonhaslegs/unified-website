<script lang="ts">
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/stores/toast';

	let loading = false;

	function handleCancel() {
		loading = true;
		setTimeout(() => {
			showToast('Subscription cancellation requested', 'info');
			goto('/dashboard');
		}, 800);
	}
</script>

<div class="app-content">
	<section class="auth-flow">
		<header class="auth-header">
			<h1 class="auth-title">Cancel subscription</h1>
			<p class="auth-subtitle">
				Are you sure you want to cancel? Your Always On Node will stop running and you'll lose
				access to your seeded repositories.
			</p>
		</header>

		<div class="auth-actions">
			<a href="/dashboard/settings" class="cta-button cta-button-outline auth-submit">Keep subscription</a>
			<button type="button" class="cta-button cta-button-danger auth-submit" disabled={loading} on:click={handleCancel}>
				{loading ? 'Cancelling...' : 'Cancel subscription'}
			</button>
		</div>
	</section>
</div>
