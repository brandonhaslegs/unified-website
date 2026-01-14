<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/utils/auth';
	import { user, isAuthenticated } from '$lib/stores/auth';
	import { showToast } from '$lib/stores/toast';
	import SiteRail from '$lib/components/SiteRail.svelte';
	import SiteContentHeader from '$lib/components/SiteContentHeader.svelte';

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

<div class="app-shell">
	<div class="site-body">
		<SiteRail />
		<div class="app-content">
			<SiteContentHeader showCta={false} />
			<div class="max-w-md space-y-10">
			<div class="space-y-3">
				<h2 class="section-heading">Sign in to your account</h2>
				<p class="app-meta">
					Or
					<a href="/auth/signup" class="link-highlight">
						<span>create a new account</span>
					</a>
				</p>
			</div>

			<form class="space-y-8" on:submit|preventDefault={handleSubmit}>
				<div class="space-y-6">
					<div class="space-y-2">
						<label for="email" class="app-meta">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							bind:value={email}
							class="app-input {errors.email ? 'border-red-500' : ''}"
							placeholder="you@example.com"
						/>
						{#if errors.email}
							<p class="app-meta text-red-600">{errors.email}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="password" class="app-meta">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							bind:value={password}
							class="app-input {errors.password ? 'border-red-500' : ''}"
							placeholder="••••••••"
						/>
						{#if errors.password}
							<p class="app-meta text-red-600">{errors.password}</p>
						{/if}
					</div>

					<div class="flex items-center justify-between">
						<label class="inline-flex items-center gap-2 app-meta">
							<input
								id="rememberMe"
								name="rememberMe"
								type="checkbox"
								bind:checked={rememberMe}
								class="h-4 w-4 border border-black/40 dark:border-white/40"
							/>
							<span>Remember me</span>
						</label>

						<a href="/auth/forgot-password" class="app-meta link-highlight">
							<span>Forgot password?</span>
						</a>
					</div>
				</div>

				{#if errors.submit}
					<p class="app-meta text-red-600">{errors.submit}</p>
				{/if}

				<div>
					<button type="submit" disabled={loading} class="cta-button w-full">
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</div>
			</form>
			</div>
		</div>
	</div>
</div>
