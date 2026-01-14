<script lang="ts">
	import { goto } from '$app/navigation';
	import { signUp } from '$lib/utils/auth';
	import { showToast } from '$lib/stores/toast';
	import { user } from '$lib/stores/auth';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';

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
			errors.confirmPassword = 'Passwords do not match';
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
		<SiteRail />
		<div class="app-content">
			<SiteContentHeader showCta={false} />
			<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
				Create your account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Or
				<a href="/auth/login" class="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
					sign in to your existing account
				</a>
			</p>
		</div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
			<div class="space-y-4">
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
						class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm {errors.email
							? 'border-red-500 dark:border-red-500'
							: ''}"
						placeholder="you@example.com"
					/>
					{#if errors.email}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
					{/if}
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						bind:value={password}
						class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm {errors.password
							? 'border-red-500 dark:border-red-500'
							: ''}"
						placeholder="••••••••"
					/>
					{#if errors.password}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
					{/if}
					{#if password}
						<div class="mt-2">
							<div class="flex space-x-1">
								{#each Array(5) as _, i}
									<div
										class="h-1 flex-1 rounded {passwordStrength > i
											? passwordStrength <= 2
												? 'bg-red-500'
												: passwordStrength <= 4
													? 'bg-yellow-500'
													: 'bg-green-500'
											: 'bg-gray-200 dark:bg-gray-700'}"
									></div>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						required
						bind:value={confirmPassword}
						class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm {errors.confirmPassword
							? 'border-red-500 dark:border-red-500'
							: ''}"
						placeholder="••••••••"
					/>
					{#if errors.confirmPassword}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
					{/if}
				</div>

				<div class="flex items-center">
					<input
						id="terms"
						name="terms"
						type="checkbox"
						bind:checked={acceptedTerms}
						class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
					/>
					<label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
						I accept the
						<a href="/terms" class="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">Terms of Service</a>
					</label>
				</div>
				{#if errors.terms}
					<p class="text-sm text-red-600 dark:text-red-400">{errors.terms}</p>
				{/if}
			</div>

			<div>
				<button
					type="submit"
					disabled={loading}
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? 'Creating account...' : 'Sign up'}
				</button>
			</div>
		</form>
			</div>
		</div>
	</div>
</div>
