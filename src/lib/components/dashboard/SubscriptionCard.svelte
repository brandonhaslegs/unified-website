<script lang="ts">
  import { formatDate, formatCurrency } from "$lib/utils/format";

  export let subscription: import("$lib/utils/api").Subscription;
  export let showCancel = true;
  export let showReceipts = true;
</script>

<div class="app-panel">
  <h3 class="section-heading subscription-title">Subscription</h3>

  <div class="space-y-10">
    <div class="subscription-row">
      <div class="subscription-col">
        <p class="app-meta">Plan</p>
        <p class="app-value">{subscription.planName}</p>
      </div>

      <div class="subscription-col">
        <p class="app-meta">Next payment</p>
        <p class="app-value">
          {formatCurrency(
            subscription.nextPaymentAmount,
            subscription.currency
          )}
        </p>
        <p class="app-meta">on {formatDate(subscription.nextPaymentDate)}</p>
      </div>

      <div class="subscription-actions">
        {#if showReceipts}
          <a
            href="/dashboard/receipts"
            class="cta-button subscription-receipts"
          >
            View Receipts
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>
