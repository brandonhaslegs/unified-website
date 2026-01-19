<script lang="ts">
	import { goto } from '$app/navigation';
	import { signUp } from '$lib/utils/auth';
	import { showToast } from '$lib/stores/toast';
	import { user } from '$lib/stores/auth';
	import SiteRail from '$lib/components/SiteRail.svelte';

	let email = 'test@example.com';
	let password = 'password123';
	let confirmPassword = 'password123';
	let acceptedTerms = true;
	let loading = false;

	let errors: Record<string, string> = {};

	function validateForm(): boolean {
		errors = {};

		if (!email) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Invalid email format';
		}

		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		}

		if (password !== confirmPassword) {
			errors.confirmPassword = 'Those passwords don’t match';
		}

		if (!acceptedTerms) {
			errors.terms = 'You must accept the terms of service';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validateForm()) {
			return;
		}

		loading = true;
		try {
			const result = await signUp({ email, password });
			showToast('Verification email sent! Please check your inbox.', 'success');
			goto('/auth/verify-email?email=' + encodeURIComponent(email));
		} catch (error: any) {
			showToast(error.message || 'Sign up failed. Please try again.', 'error');
		} finally {
			loading = false;
		}
	}

	function getPasswordStrength(): number {
		if (!password) return 0;
		let strength = 0;
		if (password.length >= 8) strength += 1;
		if (password.length >= 12) strength += 1;
		if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
		if (/\d/.test(password)) strength += 1;
		if (/[^a-zA-Z\d]/.test(password)) strength += 1;
		return strength;
	}

	$: passwordStrength = getPasswordStrength();
</script>

<svelte:head>
	<title>Sign Up - Radicle Garden</title>
</svelte:head>

<div class="app-shell">
	<div class="site-body">
		<SiteRail activeHref="/garden" />
		<div class="app-content">
			<section class="auth-flow">
				<header class="auth-header">
					<h1 class="auth-title">Create your account</h1>
					<p class="auth-subtitle">
						Or
						<a href="/auth/login" class="auth-link">sign in to your existing account</a>
					</p>
				</header>

				<form class="auth-form" on:submit|preventDefault={handleSubmit}>
					<div class="auth-field">
						<label for="email" class="auth-label">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							bind:value={email}
							class={`auth-input${errors.email ? ' auth-input-error' : ''}`}
							placeholder="you@example.com"
						/>
						{#if errors.email}
							<p class="auth-error">{errors.email}</p>
						{/if}
					</div>

					<div class="auth-field">
						<label for="password" class="auth-label">Password</label>
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
						{#if password}
							<div class="password-strength" aria-hidden="true">
								{#each Array(5) as _, i}
									<div
										class={`password-bar ${passwordStrength > i
											? passwordStrength <= 2
												? 'password-bar-weak'
												: passwordStrength <= 4
													? 'password-bar-medium'
													: 'password-bar-strong'
											: 'password-bar-empty'}`}
									></div>
								{/each}
							</div>
						{/if}
					</div>

					<div class="auth-field">
						<label for="confirmPassword" class="auth-label">Confirm Password</label>
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

					<div class="auth-checkbox-row">
						<input
							id="terms"
							name="terms"
							type="checkbox"
							bind:checked={acceptedTerms}
							class="auth-checkbox"
						/>
						<label for="terms">
							I accept the <a href="/terms" class="auth-link">Terms of Service</a>
						</label>
					</div>
					{#if errors.terms}
						<p class="auth-error">{errors.terms}</p>
					{/if}

					<button
						type="submit"
						disabled={loading}
						class="cta-button auth-submit"
						title={loading ? 'Creating account...' : undefined}
					>
						{loading ? 'Creating account...' : 'Sign up'}
					</button>
				</form>
			</section>
		</div>
	</div>
</div>
