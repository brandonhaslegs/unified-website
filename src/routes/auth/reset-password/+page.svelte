<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { resetPassword } from '$lib/utils/auth';
	import { showToast } from '$lib/stores/toast';
	import SiteRail from '$lib/components/SiteRail.svelte';

	let password = 'password123';
	let confirmPassword = 'password123';
	let loading = false;
	let errors: Record<string, string> = {};

	$: token = $page.url.searchParams.get('token');

	function validateForm(): boolean {
		errors = {};

		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		}

	if (password !== confirmPassword) {
		errors.confirmPassword = 'Those passwords don’t match';
	}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!token) {
			showToast('Invalid reset token', 'error');
			return;
		}

		if (!validateForm()) {
			return;
		}

		loading = true;
		try {
			await resetPassword(token, password);
			showToast('Password reset successful!', 'success');
			setTimeout(() => {
				goto('/auth/login');
			}, 2000);
		} catch (error: any) {
			showToast(error.message || 'Password reset failed', 'error');
			errors.submit = error.message || 'Password reset failed';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Reset Password - Radicle Garden</title>
</svelte:head>

<div class="app-shell">
	<div class="site-body">
		<SiteRail activeHref="/garden" />
		<div class="app-content">
			<section class="auth-flow">
				<header class="auth-header">
					<h1 class="auth-title">Set new password</h1>
				</header>

				{#if !token}
					<div class="auth-actions">
						<p class="auth-error">Invalid or missing reset token</p>
						<a href="/auth/forgot-password" class="auth-link">Request a new reset link</a>
					</div>
				{:else}
					<form class="auth-form" on:submit|preventDefault={handleSubmit}>
						<div class="auth-field">
							<label for="password" class="auth-label">New Password</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								bind:value={password}
								class={`auth-input${errors.password ? ' auth-input-error' : ''}`}
								placeholder="••••••••"
							/>
							{#if errors.password}
								<p class="auth-error">{errors.password}</p>
							{/if}
						</div>

						<div class="auth-field">
							<label for="confirmPassword" class="auth-label">Confirm New Password</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								bind:value={confirmPassword}
								class={`auth-input${errors.confirmPassword ? ' auth-input-error' : ''}`}
								placeholder="••••••••"
							/>
							{#if errors.confirmPassword}
								<p class="auth-error">{errors.confirmPassword}</p>
							{/if}
						</div>

						{#if errors.submit}
							<p class="auth-error">{errors.submit}</p>
						{/if}

						<button
							type="submit"
							disabled={loading}
							class="cta-button auth-submit"
							title={loading ? "Resetting password..." : undefined}
						>
							{loading ? 'Resetting...' : 'Reset password'}
						</button>
					</form>
				{/if}
			</section>
		</div>
	</div>
</div>
