<script lang="ts">
  import { formatDate, formatCurrency } from "$lib/utils/format";
  import Icon from "$lib/components/Icon.svelte";

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
            href="https://billing.stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-button subscription-receipts"
          >
            View Receipts
            <Icon name="OpenExternal" size={20} className="icon-match" />
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>
