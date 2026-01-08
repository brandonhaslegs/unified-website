<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Payment Successful - Radicle Garden</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="max-w-md w-full text-center">
		<div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
			<svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		</div>
		<h1 class="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
		<p class="text-gray-600 mb-6">
			Thank you for subscribing to Always On Node. Your service is now active.
		</p>
		<button
			on:click={() => goto('/dashboard')}
			class="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
		>
			Go to Dashboard
		</button>
	</div>
</div>

