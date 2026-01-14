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
			errors.confirmPassword = 'Passwords do not match';
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
		<SiteRail />
		<div class="app-content">
			<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Set new password</h2>
		</div>

		{#if !token}
			<div class="text-center">
				<p class="text-red-600 dark:text-red-400">Invalid or missing reset token</p>
				<a href="/auth/forgot-password" class="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 mt-4 inline-block">
					Request a new reset link
				</a>
			</div>
		{:else}
			<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
				<div class="space-y-4">
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							New Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							bind:value={password}
							class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm {errors.password
								? 'border-red-500 dark:border-red-500'
								: ''}"
							placeholder="••••••••"
						/>
						{#if errors.password}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
						{/if}
					</div>

					<div>
						<label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Confirm New Password
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							bind:value={confirmPassword}
							class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm {errors.confirmPassword
								? 'border-red-500 dark:border-red-500'
								: ''}"
							placeholder="••••••••"
						/>
						{#if errors.confirmPassword}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
						{/if}
					</div>
				</div>

				{#if errors.submit}
					<p class="text-sm text-red-600 dark:text-red-400 text-center">{errors.submit}</p>
				{/if}

				<div>
					<button
						type="submit"
						disabled={loading}
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? 'Resetting...' : 'Reset password'}
					</button>
				</div>
			</form>
		{/if}
			</div>
		</div>
	</div>
</div>
