<script lang="ts">
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/stores/toast';
	import SiteRail from '$lib/components/SiteRail.svelte';

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

<div class="app-shell">
	<div class="site-body">
		<SiteRail activeHref="/garden" />
		<div class="app-content">
			<section class="auth-flow auth-flow-wide">
				<header class="auth-header">
					<h1 class="auth-title">Complete your subscription</h1>
					<p class="auth-subtitle">Enter your payment details to get started with Always On Node</p>
				</header>

				<hr class="auth-divider" />

				<div class="checkout-section">
					<h2 class="section-heading">Order Summary</h2>
					<div class="checkout-row">
						<span>Always On Node</span>
						<span>$10.00</span>
					</div>
					<div class="checkout-row checkout-meta">
						<span>Billed monthly</span>
						<span>Starting today</span>
					</div>
				</div>

				<hr class="auth-divider" />

				<div class="checkout-section">
					<h2 class="section-heading">Payment Details</h2>
					<form on:submit|preventDefault={handleSubmit} class="auth-form">
						<div class="auth-field">
							<label for="name" class="auth-label">Name on card</label>
							<input
								id="name"
								type="text"
								bind:value={nameOnCard}
								placeholder="John Doe"
								required
								class="auth-input"
							/>
						</div>

						<div class="auth-field">
							<label for="cardNumber" class="auth-label">Card number</label>
							<input
								id="cardNumber"
								type="text"
								value={cardNumber}
								on:input={handleCardNumberInput}
								placeholder="1234 5678 9012 3456"
								maxlength="19"
								required
								class="auth-input"
							/>
						</div>

						<div class="checkout-grid">
							<div class="auth-field">
								<label for="expiry" class="auth-label">Expiry date</label>
								<input
									id="expiry"
									type="text"
									value={expiryDate}
									on:input={handleExpiryInput}
									placeholder="MM/YY"
									maxlength="5"
									required
									class="auth-input"
								/>
							</div>
							<div class="auth-field">
								<label for="cvc" class="auth-label">CVC</label>
								<input id="cvc" type="text" bind:value={cvc} placeholder="123" maxlength="4" required class="auth-input" />
							</div>
						</div>

						<button type="submit" disabled={loading} class="cta-button auth-submit">
							{loading ? 'Processing...' : 'Pay $10.00'}
						</button>
						<p class="auth-meta">Secure payment via Stripe.</p>
					</form>
				</div>
			</section>
		</div>
	</div>
</div>
