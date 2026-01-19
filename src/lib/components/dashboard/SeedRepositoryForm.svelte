<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { seedRepository } from "$lib/utils/api";
  import { showToast } from "$lib/stores/toast";
  import Icon from "$lib/components/Icon.svelte";

  const dispatch = createEventDispatcher();

  export let rid = "";
  let loading = false;
  let error = "";
  let copied = false;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  function validateRid(rid: string): boolean {
    // Basic RID format validation (rad:git:...)
    return /^rad:git:[a-zA-Z0-9]+$/.test(rid.trim());
  }

  $: canSubmit = validateRid(rid) && !loading;

  async function handleSubmit() {
    error = "";

    if (!rid.trim()) {
      error = "RID is required";
      return;
    }

    if (!validateRid(rid.trim())) {
      error = "Invalid RID format. Expected format: rad:git:...";
      return;
    }

    loading = true;
    try {
      await seedRepository(rid.trim());
      showToast(`Seeded ${rid.trim()}`, "success");
      rid = "";
      dispatch("success");
    } catch (err: any) {
      error = err.message || "Failed to seed repo";
      showToast(error, "error");
    } finally {
      loading = false;
    }
  }

  function copyCommand() {
    navigator.clipboard.writeText("rad get repo ID");
    showToast("Copied to clipboard", "success");
    copied = true;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="space-y-2">
    <label for="rid" class="auth-label">Repository ID (RID)</label>
    <input
      id="rid"
      type="text"
      bind:value={rid}
      placeholder="rad:git:..."
      class={`auth-input font-mono${error ? " auth-input-error" : ""}`}
    />
    {#if error}
      <p class="auth-error">{error}</p>
    {/if}
    <div class="app-meta seed-inline">
      <span>To get your Repo ID, run</span>
      <span class="terminal-command border border-black/10 dark:border-white/10 rounded-sm p-3 font-mono seed-command">
        <span class="terminal-command-row">
          <code>rad get repo ID</code>
          <button type="button" on:click={copyCommand} class="ml-2 app-meta" title="Copy">
            <Icon name={copied ? "Checkmark" : "Copy"} size={14} className="icon-current" />
          </button>
        </span>
      </span>
    </div>
  </div>
  <button
    type="submit"
    disabled={!canSubmit}
    class="cta-button"
    title={canSubmit ? undefined : "Enter a valid rad:git: RID to seed"}
  >
    {loading ? "Seeding..." : "Seed Repository"}
  </button>
</form>
