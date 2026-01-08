<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/utils/auth';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { showToast } from '$lib/stores/toast';

	let email = 'test@example.com';
	let password = 'password123';
	let rememberMe = false;
	let loading = false;
	let errors: Record<string, string> = {};

	async function handleSubmit() {
		errors = {};

		if (!email) {
			errors.email = 'Email is required';
		}
		if (!password) {
			errors.password = 'Password is required';
		}

		if (Object.keys(errors).length > 0) {
			return;
		}

		loading = true;
		try {
			const result: any = await signIn({ email, password });
			user.set(result.user);
			isAuthenticated.set(true);
			if (rememberMe && typeof window !== 'undefined') {
				localStorage.setItem('rememberMe', 'true');
			}
			showToast('Logged in successfully!', 'success');
			goto('/dashboard');
		} catch (error: any) {
			showToast(error.message || 'Login failed. Please try again.', 'error');
			errors.submit = error.message || 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Login - Radicle Garden</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Sign in to your account</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Or
				<a href="/auth/signup" class="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
					create a new account
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
						class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm {errors.email
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
						class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm {errors.password
							? 'border-red-500 dark:border-red-500'
							: ''}"
						placeholder="••••••••"
					/>
					{#if errors.password}
						<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
					{/if}
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="rememberMe"
							name="rememberMe"
							type="checkbox"
							bind:checked={rememberMe}
							class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
						/>
						<label for="rememberMe" class="ml-2 block text-sm text-gray-900 dark:text-gray-100">
							Remember me
						</label>
					</div>

					<div class="text-sm">
						<a href="/auth/forgot-password" class="font-medium text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300">
							Forgot password?
						</a>
					</div>
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
					{loading ? 'Signing in...' : 'Sign in'}
				</button>
			</div>
		</form>
	</div>
</div>

