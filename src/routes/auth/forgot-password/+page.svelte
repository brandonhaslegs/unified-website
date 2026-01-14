<script lang="ts">
	import { goto } from '$app/navigation';
	import { requestPasswordReset } from '$lib/utils/auth';
	import { showToast } from '$lib/stores/toast';
	import SiteRail from '$lib/components/SiteRail.svelte';

	let email = 'test@example.com';
	let loading = false;
	let submitted = false;
	let errors: Record<string, string> = {};

	async function handleSubmit() {
		errors = {};

		if (!email) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Invalid email format';
		}

		if (Object.keys(errors).length > 0) {
			return;
		}

		loading = true;
		try {
			await requestPasswordReset(email);
			submitted = true;
			showToast('Password reset email sent!', 'success');
		} catch (error: any) {
			showToast(error.message || 'Failed to send reset email', 'error');
			errors.submit = error.message || 'Failed to send reset email';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Forgot Password - Radicle Garden</title>
</svelte:head>

<div class="app-shell">
	<div class="site-body">
		<SiteRail />
		<div class="app-content">
			<div class="max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Reset your password</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Or
				<a href="/auth/login" class="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
					sign in to your account
				</a>
			</p>
		</div>

		{#if submitted}
			<div class="text-center">
				<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">Check your email</h3>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
					We've sent password reset instructions to <strong class="text-gray-900 dark:text-gray-100">{email}</strong>
				</p>
				<p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
					Didn't receive the email? Check your spam folder or
					<button
						on:click={() => {
							submitted = false;
							email = '';
						}}
						class="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-medium"
					>
						try again
					</button>
				</p>
			</div>
		{:else}
			<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Email address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						bind:value={email}
						class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm {errors.email
							? 'border-red-500 dark:border-red-500'
							: ''}"
						placeholder="you@example.com"
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
					{/if}
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
						{loading ? 'Sending...' : 'Send reset link'}
					</button>
				</div>
			</form>
		{/if}
			</div>
		</div>
	</div>
</div>
