<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";
  import SubscriptionCard from "$lib/components/dashboard/SubscriptionCard.svelte";
  import { getSubscription } from "$lib/utils/api";
  import type { Subscription } from "$lib/utils/api";

  let currentPassword = "";
  let newPassword = "";
  let confirmPassword = "";
  let changePasswordLoading = false;
  let deleteLoading = false;
  let subscription: Subscription | null = null;
  let subscriptionLoading = true;

  let errors: Record<string, string> = {};

  function validatePasswordChange(): boolean {
    errors = {};

    if (!currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Those passwords don’t match";
    }

    return Object.keys(errors).length === 0;
  }

  async function handlePasswordChange() {
    if (!validatePasswordChange()) {
      return;
    }

    changePasswordLoading = true;
    try {
      // TODO: Implement password change API call
      showToast("Password changed", "success");
      currentPassword = "";
      newPassword = "";
      confirmPassword = "";
    } catch (error: any) {
      showToast(error.message || "That didn’t work", "error");
    } finally {
      changePasswordLoading = false;
    }
  }

  onMount(async () => {
    try {
      subscription = await getSubscription();
    } catch (error) {
      console.error("Failed to load subscription:", error);
    } finally {
      subscriptionLoading = false;
    }
  });

  $: canSubmitPasswordChange =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length > 0 &&
    confirmPassword.trim().length > 0 &&
    !changePasswordLoading;
</script>

<svelte:head>
  <title>Account settings - Radicle Garden</title>
</svelte:head>

<div class="app-content">
  <div class="space-y-16">
    {#if subscriptionLoading}
      <div class="app-meta">Loading subscription...</div>
    {:else if subscription}
      <SubscriptionCard {subscription} showCancel={false} />
    {/if}

    <!-- Email Section -->
    <div class="app-panel">
      <h2 class="section-heading">Email address</h2>
      <div class="email-row">
        <p class="app-meta">{$user?.email}</p>
        <button
          disabled
          class="cta-button cta-button-outline opacity-70 text-black dark:text-white cursor-not-allowed"
          title="Email changes are not available yet."
        >
          Change email
        </button>
      </div>
    </div>

    <!-- Password Change Section -->
    <div class="app-panel">
      <h2 class="section-heading mb-4">Change password</h2>
      <form
        on:submit|preventDefault={handlePasswordChange}
        class="change-password-form"
      >
        <div class="change-password-grid">
          <div class="space-y-2">
            <label for="currentPassword" class="auth-label"
              >Current password</label
            >
            <input
              id="currentPassword"
              type="password"
              bind:value={currentPassword}
              class={`auth-input${errors.currentPassword ? " auth-input-error" : ""}`}
            />
            {#if errors.currentPassword}
              <p class="auth-error">{errors.currentPassword}</p>
            {/if}
          </div>

          <div class="space-y-2">
            <label for="newPassword" class="auth-label">New password</label>
            <input
              id="newPassword"
              type="password"
              bind:value={newPassword}
              class={`auth-input${errors.newPassword ? " auth-input-error" : ""}`}
            />
            {#if errors.newPassword}
              <p class="auth-error">{errors.newPassword}</p>
            {/if}
          </div>

          <div class="space-y-2">
            <label for="confirmPassword" class="auth-label"
              >Confirm new password</label
            >
            <input
              id="confirmPassword"
              type="password"
              bind:value={confirmPassword}
              class={`auth-input${errors.confirmPassword ? " auth-input-error" : ""}`}
            />
            {#if errors.confirmPassword}
              <p class="auth-error">{errors.confirmPassword}</p>
            {/if}
          </div>

          <div class="change-password-actions">
            <button
              type="submit"
              disabled={!canSubmitPasswordChange}
              class="cta-button subscription-receipts"
              title={canSubmitPasswordChange
                ? undefined
                : "Enter current, new, and confirm passwords to continue."}
            >
              {changePasswordLoading ? "Changing..." : "Change password"}
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Danger Zone -->
    <div class="app-panel">
      <h2 class="section-heading text-red-600 danger-title">Danger zone</h2>
      <div class="danger-row">
        <div>
          <p class="app-meta danger-label">Delete account</p>
          <p class="app-meta">Permanently delete your account and all data</p>
        </div>
        <a
          href="/dashboard/delete-account"
          class="cta-button cta-button-danger"
        >
          Delete account
        </a>
      </div>
      <div class="danger-row mt-6">
        <div>
          <p class="app-meta danger-label">Cancel subscription</p>
          <p class="app-meta">Stop billing and shut down your Always On Node</p>
        </div>
        <a
          href="/dashboard/cancel-subscription"
          class="cta-button cta-button-danger"
        >
          Cancel subscription
        </a>
      </div>
    </div>
  </div>
</div>
