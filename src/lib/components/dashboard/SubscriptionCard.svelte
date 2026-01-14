<script lang="ts">
	import { formatDate, formatCurrency } from '$lib/utils/format';
	import Modal from '../Modal.svelte';
	import { showToast } from '$lib/stores/toast';

	export let subscription: import('$lib/utils/api').Subscription;

	let cancelModalOpen = false;

	function handleCancelSubscription() {
		// TODO: Implement cancel subscription
		showToast('Subscription cancellation requested', 'info');
		cancelModalOpen = false;
	}
</script>

<div class="app-panel">
	<h3 class="section-heading">Subscription</h3>

	<div class="space-y-6">
		<div class="flex items-start gap-6">
			<div class="flex-1">
				<p class="app-meta">Plan</p>
				<p class="app-value">{subscription.planName}</p>
			</div>

			<div class="flex-1">
				<p class="app-meta">Next Payment</p>
				<p class="app-value">
					{formatCurrency(subscription.nextPaymentAmount, subscription.currency)}
				</p>
				<p class="app-meta">on {formatDate(subscription.nextPaymentDate)}</p>
			</div>
		</div>

		<div class="flex gap-3 pt-2">
			<a
				href="/dashboard/receipts"
				class="cta-button flex-1 text-center"
			>
				View Receipts
			</a>
			<button
				on:click={() => (cancelModalOpen = true)}
				class="cta-button cta-button-danger flex-1 text-center"
			>
				Cancel Subscription
			</button>
		</div>
	</div>
</div>

<Modal
	open={cancelModalOpen}
	title="Cancel Subscription"
	on:close={() => (cancelModalOpen = false)}
>
	<p class="app-meta mb-4">
		Are you sure you want to cancel your subscription? Your Always On Node will stop running and
		you'll lose access to your seeded repositories.
	</p>
	<div class="flex gap-3">
		<button
			on:click={() => (cancelModalOpen = false)}
			class="cta-button cta-button-outline flex-1"
		>
			Keep Subscription
		</button>
		<button
			on:click={handleCancelSubscription}
			class="cta-button cta-button-danger flex-1"
		>
			Cancel Subscription
		</button>
	</div>
</Modal>
