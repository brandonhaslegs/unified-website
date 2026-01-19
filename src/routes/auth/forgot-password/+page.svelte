<script lang="ts">
  import { goto } from "$app/navigation";
  import { requestPasswordReset } from "$lib/utils/auth";
  import { showToast } from "$lib/stores/toast";
  import SiteRail from "$lib/components/SiteRail.svelte";

  let email = "test@example.com";
  let loading = false;
  let submitted = false;
  let errors: Record<string, string> = {};

  async function handleSubmit() {
    errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    loading = true;
    try {
      await requestPasswordReset(email);
      submitted = true;
      showToast("Password reset email sent", "success");
    } catch (error: any) {
      showToast(error.message || "Failed to send reset email", "error");
      errors.submit = error.message || "Failed to send reset email";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Forgot Password - Radicle Garden</title>
</svelte:head>

<div class="app-shell">
  <div class="site-body">
    <SiteRail activeHref="/garden" />
    <div class="app-content">
      <section class="auth-flow">
        <header class="auth-header">
          <h1 class="auth-title">Reset your password</h1>
          <p class="auth-subtitle">
            Or <a href="/auth/login" class="auth-link"
              >sign in to your account</a
            >
          </p>
        </header>

        {#if submitted}
          <div class="auth-header">
            <img src="/icons/Inbox.svg" alt="" class="auth-icon" />
            <h2 class="auth-title">Check your email</h2>
            <p class="auth-subtitle">
              We’ve sent password reset instructions to <strong
                class="auth-strong">{email}</strong
              >
            </p>
            <p class="auth-text">
              Didn’t receive the email? Check your spam folder or
              <button
                on:click={() => {
                  submitted = false;
                  email = "";
                }}
                class="auth-link-button auth-link-inline"
              >
                try again
              </button>
            </p>
          </div>
        {:else}
          <form class="auth-form" on:submit|preventDefault={handleSubmit}>
            <div class="auth-field">
              <label for="email" class="auth-label">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                bind:value={email}
                class={`auth-input${errors.email ? " auth-input-error" : ""}`}
                placeholder="you@example.com"
              />
              {#if errors.email}
                <p class="auth-error">{errors.email}</p>
              {/if}
            </div>

            {#if errors.submit}
              <p class="auth-error">{errors.submit}</p>
            {/if}

            <button
              type="submit"
              disabled={loading}
              class="cta-button auth-submit"
              title={loading ? "Sending reset email..." : undefined}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        {/if}
      </section>
    </div>
  </div>
</div>
