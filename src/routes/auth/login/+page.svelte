<script lang="ts">
  import { goto } from "$app/navigation";
  import { signIn } from "$lib/utils/auth";
  import { user, isAuthenticated } from "$lib/stores/auth";
  import { showToast } from "$lib/stores/toast";
  import SiteRail from "$lib/components/SiteRail.svelte";

  let email = "test@example.com";
  let password = "password123";
  let rememberMe = false;
  let loading = false;
  let errors: Record<string, string> = {};

  async function handleSubmit() {
    errors = {};

    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    loading = true;
    try {
      const result: any = await signIn({ email, password });
      user.set(result.user);
      isAuthenticated.set(true);
      if (rememberMe && typeof window !== "undefined") {
        localStorage.setItem("rememberMe", "true");
      }
      showToast("Logged into your node", "success");
      goto("/dashboard");
    } catch (error: any) {
      showToast(error.message || "Login failed", "error");
      errors.submit = error.message || "Login failed";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Radicle Garden</title>
</svelte:head>

<div class="app-shell">
  <div class="site-body">
    <SiteRail activeHref="/garden" />
    <div class="app-content">
      <section class="auth-flow">
        <header class="auth-header">
          <h1 class="auth-title">Sign in to your account</h1>
          <p class="auth-subtitle">
            Or <a href="/auth/signup" class="auth-link">create a new account</a>
          </p>
        </header>

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

          <div class="auth-field">
            <label for="password" class="auth-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              bind:value={password}
              class={`auth-input${errors.password ? " auth-input-error" : ""}`}
              placeholder="••••••••"
            />
            {#if errors.password}
              <p class="auth-error">{errors.password}</p>
            {/if}
          </div>

          <div class="auth-checkbox-row">
            <label class="auth-checkbox-row">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                bind:checked={rememberMe}
                class="auth-checkbox"
              />
              <span>Remember me</span>
            </label>
            <a href="/auth/forgot-password" class="auth-link"
              >Forgot password?</a
            >
          </div>

          {#if errors.submit}
            <p class="auth-error">{errors.submit}</p>
          {/if}

          <button
            type="submit"
            disabled={loading}
            class="cta-button auth-submit"
            title={loading ? "Signing in..." : undefined}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </div>
  </div>
</div>
