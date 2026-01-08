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

<div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
	<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Subscription</h3>

	<div class="space-y-4">
		<div class="flex items-start gap-3">
			<div class="flex-1">
				<p class="text-sm text-gray-600 dark:text-gray-400">Plan</p>
				<p class="text-lg font-medium text-gray-900 dark:text-gray-100">{subscription.planName}</p>
			</div>

			<div class="flex-1">
				<p class="text-sm text-gray-600 dark:text-gray-400">Next Payment</p>
				<p class="text-lg font-medium text-gray-900 dark:text-gray-100">
					{formatCurrency(subscription.nextPaymentAmount, subscription.currency)}
				</p>
				<p class="text-sm text-gray-500 dark:text-gray-400">on {formatDate(subscription.nextPaymentDate)}</p>
			</div>
		</div>

		<div class="flex space-x-3 pt-2">
			<a
				href="/dashboard/receipts"
				class="flex-1 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
			>
				View Receipts
			</a>
			<button
				on:click={() => (cancelModalOpen = true)}
				class="flex-1 px-4 py-2 border border-red-300 dark:border-red-700 rounded-md text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
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
	<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
		Are you sure you want to cancel your subscription? Your Always On Node will stop running and
		you'll lose access to your seeded repositories.
	</p>
	<div class="flex space-x-3">
		<button
			on:click={() => (cancelModalOpen = false)}
			class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
		>
			Keep Subscription
		</button>
		<button
			on:click={handleCancelSubscription}
			class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
		>
			Cancel Subscription
		</button>
	</div>
</Modal>

