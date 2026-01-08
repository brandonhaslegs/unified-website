<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loadStripe } from '@stripe/stripe-js';

	const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_...';

	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
			if (!stripe) {
				error = 'Failed to load Stripe';
				loading = false;
				return;
			}

			// TODO: Create checkout session via API
			// For now, redirect to a mock checkout
			const sessionId = 'mock_session_id';
			
			const result = await stripe.redirectToCheckout({
				sessionId: sessionId
			});

			if (result.error) {
				error = result.error.message || 'Checkout failed';
				loading = false;
			}
		} catch (err: any) {
			error = err.message || 'Failed to initialize checkout';
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Checkout - Radicle Garden</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	{#if loading}
		<div class="text-center">
			<div class="mx-auto animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
			<p class="mt-4 text-gray-600">Redirecting to checkout...</p>
		</div>
	{:else if error}
		<div class="text-center">
			<div class="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
				<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
			<h2 class="text-xl font-semibold text-gray-900 mb-2">Checkout Error</h2>
			<p class="text-gray-600 mb-4">{error}</p>
			<a
				href="/dashboard"
				class="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
			>
				Return to Dashboard
			</a>
		</div>
	{/if}
</div>

