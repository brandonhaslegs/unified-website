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
		return status === 'paid' ? 'text-green-600' : 'text-red-600';
	}
</script>

<svelte:head>
	<title>Receipts - Radicle Garden</title>
</svelte:head>

<div class="app-content">
	<h1 class="section-heading">Billing History</h1>

	{#if loading}
		<div class="app-meta">Loading...</div>
	{:else if receipts.length === 0}
		<p class="app-meta">No receipts found</p>
	{:else}
		<div class="app-panel">
			<table class="app-table">
				<thead>
					<tr>
						<th class="pr-6">
							Date
						</th>
						<th class="pr-6">
							Amount
						</th>
						<th class="pr-6">
							Status
						</th>
						<th>
							Invoice
						</th>
					</tr>
				</thead>
				<tbody>
					{#each receipts as receipt (receipt.id)}
						<tr>
							<td class="pr-6">
								{formatDate(receipt.date)}
							</td>
							<td class="pr-6">
								{formatCurrency(receipt.amount, receipt.currency)}
							</td>
							<td class="pr-6">
								<span
									class="inline-flex app-meta {getStatusBadgeColor(receipt.status)}"
								>
									{receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
								</span>
							</td>
							<td class="app-meta">
								<a
									href={receipt.invoiceUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="link-highlight"
								>
									<span>Download PDF</span>
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
