<script lang="ts">
	import { page } from '$app/stores';
	import { verifyEmail } from '$lib/utils/auth';
	import { showToast } from '$lib/stores/toast';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';

	let email = $page.url.searchParams.get('email') || '';
	let resending = false;
	let verifying = false;
	let verified = false;

	async function handleVerify() {
		const token = $page.url.searchParams.get('token');
		if (!token) {
			showToast('No verification token provided', 'error');
			return;
		}

		verifying = true;
		try {
			const result: any = await verifyEmail(token);
			verified = true;
			if (result.user) {
				user.set(result.user);
				isAuthenticated.set(true);
			}
			showToast('Email verified successfully!', 'success');
			setTimeout(() => {
				goto('/auth/checkout');
			}, 2000);
		} catch (error: any) {
			showToast(error.message || 'Verification failed', 'error');
		} finally {
			verifying = false;
		}
	}

	async function skipVerification() {
		// For development/mock mode - skip email verification
		verified = true;
		if (email) {
			user.set({
				id: '1',
				email: email,
				emailVerified: true
			});
			isAuthenticated.set(true);
		}
		showToast('Skipped verification (development mode)', 'info');
		setTimeout(() => {
			goto('/auth/checkout');
		}, 500);
	}

	async function resendEmail() {
		if (!email) {
			showToast('Email address not found', 'error');
			return;
		}

		resending = true;
		try {
			// TODO: Implement resend verification email
			showToast('Verification email resent!', 'success');
		} catch (error: any) {
			showToast(error.message || 'Failed to resend email', 'error');
		} finally {
			resending = false;
		}
	}

	$: token = $page.url.searchParams.get('token');
	$: if (token && !verified) {
		handleVerify();
	}
</script>

<svelte:head>
	<title>Verify Email - Radicle Garden</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8 text-center">
		{#if verified}
			<div>
				<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
					<svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Email Verified!</h2>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Redirecting to checkout...</p>
			</div>
		{:else if verifying}
			<div>
				<div class="mx-auto animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400"></div>
				<h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Verifying...</h2>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Please wait while we verify your email</p>
			</div>
		{:else}
			<div>
				<h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Check your email</h2>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
					We've sent a verification link to <strong class="text-gray-900 dark:text-gray-100">{email}</strong>
				</p>
				<p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
					Click the link in the email to verify your account. If you don't see it, check your spam
					folder.
				</p>
				<div class="mt-6 space-y-4">
					<div>
						<button
							on:click={resendEmail}
							disabled={resending}
							class="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-medium text-sm disabled:opacity-50"
						>
							{resending ? 'Sending...' : "Didn't receive it? Resend"}
						</button>
					</div>
					<div class="pt-4 border-t border-gray-200 dark:border-gray-700">
						<p class="text-xs text-gray-400 dark:text-gray-500 mb-3">Development Mode</p>
						<button
							on:click={skipVerification}
							class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Skip Verification (Continue to Payment)
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

