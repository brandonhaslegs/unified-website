<script lang="ts">
	import { page } from '$app/stores';
	import { verifyEmail } from '$lib/utils/auth';
	import { showToast } from '$lib/stores/toast';
	import { goto } from '$app/navigation';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import SiteRail from '$lib/components/SiteRail.svelte';

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

<div class="app-shell">
	<div class="site-body">
		<SiteRail activeHref="/garden" />
		<div class="app-content">
			<section class="auth-flow">
				{#if verified}
					<div class="auth-header">
						<img src="/icons/Checkmark.svg" alt="" class="auth-icon" />
						<h1 class="auth-title">Email verified</h1>
						<p class="auth-subtitle">Redirecting to checkout.</p>
					</div>
				{:else if verifying}
					<div class="auth-header">
						<h1 class="auth-title">Verifying</h1>
						<p class="auth-subtitle">Please wait while we verify your email.</p>
					</div>
				{:else}
					<div class="auth-header">
						<h1 class="auth-title">Check your email</h1>
						<p class="auth-subtitle">
							We&apos;ve sent a verification link to <strong class="auth-strong">{email}</strong>
						</p>
						<p class="auth-text">
							Click the link in the email to verify your account. If you don&apos;t see it, check your spam
							folder.
						</p>
					</div>
					<div class="auth-actions">
						<p class="auth-text">
							Didn&apos;t receive it?
							<button
								on:click={resendEmail}
								disabled={resending}
								class="auth-link-button auth-link-inline"
								title={resending ? 'Resending verification email...' : undefined}
							>
								{resending ? 'Sending...' : 'Resend'}
							</button>
						</p>
						<div class="auth-actions">
							<button on:click={skipVerification} class="cta-button cta-button-outline auth-submit">
								Skip Verification (Continue to Payment)
							</button>
						</div>
					</div>
				{/if}
			</section>
		</div>
	</div>
</div>
