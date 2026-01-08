<script lang="ts">
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/stores/toast';

	let loading = false;
	let cardNumberRaw = '4242424242424242';
	let expiryDateRaw = '1225';
	let cvc = '123';
	let nameOnCard = 'John Doe';

	function handleSubmit() {
		loading = true;
		// Simulate payment processing
		setTimeout(() => {
			showToast('Payment successful!', 'success');
			goto('/dashboard');
		}, 1500);
	}

	function formatCardNumber(value: string) {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		const matches = v.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || '';
		const parts = [];
		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4));
		}
		if (parts.length) {
			return parts.join(' ');
		} else {
			return v;
		}
	}

	function formatExpiryDate(value: string) {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
		if (v.length >= 2) {
			return v.substring(0, 2) + '/' + v.substring(2, 4);
		}
		return v;
	}

	function handleCardNumberInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const raw = target.value.replace(/\s+/g, '');
		cardNumberRaw = raw;
	}

	function handleExpiryInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const raw = target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
		expiryDateRaw = raw;
	}

	$: cardNumber = formatCardNumber(cardNumberRaw);
	$: expiryDate = formatExpiryDate(expiryDateRaw);
</script>

<svelte:head>
	<title>Checkout - Radicle Garden</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-2xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Complete your subscription</h1>
			<p class="mt-2 text-gray-600 dark:text-gray-400">Enter your payment details to get started with Always On Node</p>
		</div>

		<!-- Order Summary -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
			<h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
			<div class="space-y-3">
				<div class="flex justify-between">
					<span class="text-gray-600 dark:text-gray-400">Always On Node</span>
					<span class="font-medium text-gray-900 dark:text-gray-100">$10.00</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600 dark:text-gray-400">Billed monthly</span>
					<span class="text-sm text-gray-500 dark:text-gray-400">Starting today</span>
				</div>
				<div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
					<div class="flex justify-between items-center">
						<span class="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</span>
						<span class="text-2xl font-bold text-gray-900 dark:text-gray-100">$10.00</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Payment Form -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
			<h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Payment Details</h2>
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Name on card
					</label>
					<input
						id="name"
						type="text"
						bind:value={nameOnCard}
						placeholder="John Doe"
						required
						class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
					/>
				</div>

				<div>
					<label for="cardNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Card number
					</label>
					<input
						id="cardNumber"
						type="text"
						value={cardNumber}
						on:input={handleCardNumberInput}
						placeholder="1234 5678 9012 3456"
						maxlength="19"
						required
						class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="expiry" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Expiry date
						</label>
						<input
							id="expiry"
							type="text"
							value={expiryDate}
							on:input={handleExpiryInput}
							placeholder="MM/YY"
							maxlength="5"
							required
							class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
						/>
					</div>
					<div>
						<label for="cvc" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVC</label>
						<input
							id="cvc"
							type="text"
							bind:value={cvc}
							placeholder="123"
							maxlength="4"
							required
							class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
						/>
					</div>
				</div>

				<div class="pt-4 border-t border-gray-200 dark:border-gray-700">
					<button
						type="submit"
						disabled={loading}
						class="w-full bg-green-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
					>
						{loading ? 'Processing...' : 'Pay $10.00'}
					</button>
					<p class="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
						Powered by Stripe • Your payment information is secure
					</p>
				</div>
			</form>
		</div>

		<!-- Security Notice -->
		<div class="mt-6 text-center">
			<div class="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
				<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
				<span>Secure payment • Encrypted and secure</span>
			</div>
		</div>
	</div>
</div>

