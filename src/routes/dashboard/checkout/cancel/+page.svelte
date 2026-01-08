<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Payment Cancelled - Radicle Garden</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="max-w-md w-full text-center">
		<div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
			<svg class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		</div>
		<h1 class="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
		<p class="text-gray-600 mb-6">
			Your payment was cancelled. You can try again anytime.
		</p>
		<div class="flex space-x-4 justify-center">
			<button
				on:click={() => goto('/dashboard')}
				class="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
			>
				Return to Dashboard
			</button>
			<button
				on:click={() => goto('/dashboard/checkout')}
				class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
			>
				Try Again
			</button>
		</div>
	</div>
</div>

