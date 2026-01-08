<script lang="ts">
	import { onMount } from 'svelte';
	import { getReceipts } from '$lib/utils/api';
	import { formatDate, formatCurrency } from '$lib/utils/format';

	interface Receipt {
		id: string;
		date: string;
		amount: number;
		currency: string;
		status: 'paid' | 'failed';
		invoiceUrl: string;
	}

	let receipts: Receipt[] = [];
	let loading = true;

	onMount(async () => {
		try {
			receipts = await getReceipts() as Receipt[];
		} catch (error) {
			console.error('Failed to load receipts:', error);
		} finally {
			loading = false;
		}
	});

	function getStatusBadgeColor(status: string) {
		return status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
	}
</script>

<svelte:head>
	<title>Receipts - Radicle Garden</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<h1 class="text-2xl font-bold text-gray-900 mb-6">Billing History</h1>

	{#if loading}
		<div class="bg-white shadow rounded-lg p-6">
			<div class="animate-pulse space-y-4">
				<div class="h-12 bg-gray-200 rounded"></div>
				<div class="h-12 bg-gray-200 rounded"></div>
				<div class="h-12 bg-gray-200 rounded"></div>
			</div>
		</div>
	{:else if receipts.length === 0}
		<div class="bg-white shadow rounded-lg p-6 text-center">
			<p class="text-gray-500">No receipts found</p>
		</div>
	{:else}
		<div class="bg-white shadow rounded-lg overflow-hidden">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Date
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Amount
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Status
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Invoice
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each receipts as receipt (receipt.id)}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{formatDate(receipt.date)}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{formatCurrency(receipt.amount, receipt.currency)}
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusBadgeColor(receipt.status)}"
								>
									{receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<a
									href={receipt.invoiceUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="text-green-600 hover:text-green-900"
								>
									Download PDF
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

