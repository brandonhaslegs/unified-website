<script lang="ts">
  import { onMount } from "svelte";
  import { formatRelativeTime } from "$lib/utils/format";
  import { unseedRepository } from "$lib/utils/api";
  import { showToast } from "$lib/stores/toast";
  import Modal from "../Modal.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import type { Repository } from "$lib/utils/api";
  import { getNodeStatus } from "$lib/utils/api";

  export let repositories: Repository[];
  export let searchQuery = "";

  let nodeId = "";

  $: filteredRepos = repositories.filter((repo) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      repo.rid.toLowerCase().includes(query) ||
      repo.name?.toLowerCase().includes(query) ||
      false
    );
  });

  let unseedingRid: string | null = null;
  let unseedModalOpen = false;

  onMount(async () => {
    try {
      const status = await getNodeStatus();
      nodeId = status.nodeId;
    } catch {
      // Ignore error
    }
  });

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard", "success");
  }

  function handleUnseed(rid: string) {
    unseedingRid = rid;
    unseedModalOpen = true;
  }

  async function confirmUnseed() {
    if (!unseedingRid) return;

    try {
      await unseedRepository(unseedingRid);
      repositories = repositories.filter((r) => r.rid !== unseedingRid);
      showToast("Repository unseeded", "success");
      unseedModalOpen = false;
      unseedingRid = null;
    } catch (error: any) {
      showToast(error.message || "Failed to unseed repository", "error");
    }
  }

  function getStatusBadgeColor(state: string) {
    switch (state) {
      case "fetched":
        return "text-green-600";
      case "fetching":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "app-meta";
    }
  }
</script>

<div class="space-y-4">
  {#if filteredRepos.length === 0 && repositories.length > 0}
    <p class="app-meta text-center py-4">No repositories found</p>
  {:else if repositories.length === 0}
    <div class="text-center py-8">
      <p class="app-meta">No repositories seeded yet.</p>
      <p class="app-meta mt-1">Add your first repository below.</p>
    </div>
  {:else}
    <div class="repo-cards">
      {#each filteredRepos as repo (repo.id)}
        <div class="repo-card">
          <div class="repo-card-header">
            <div>
              <p class="repo-card-title">{repo.name || "N/A"}</p>
              <div class="repo-card-rid">
                <code class="font-mono app-meta">{repo.rid}</code>
                <button
                  on:click={() => copyToClipboard(repo.rid)}
                  class="app-meta"
                  title="Copy RID"
                >
                  <Icon name="Copy" size={14} className="icon-current" />
                </button>
              </div>
            </div>
            <div class="repo-card-actions">
              {#if repo.visibility === "public" && repo.fetchState === "fetched" && nodeId}
                <a
                  href="https://app.radicle.xyz/{nodeId}/{repo.rid}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cta-button cta-button-outline"
                >
                  View
                  <Icon
                    name="OpenExternal"
                    size={14}
                    className="icon-current"
                  />
                </a>
              {:else}
                <button
                  type="button"
                  class="cta-button cta-button-outline"
                  disabled
                >
                  View
                </button>
              {/if}
              <button
                on:click={() => handleUnseed(repo.rid)}
                class="cta-button cta-button-danger"
              >
                Unseed
              </button>
            </div>
          </div>

          <div class="repo-card-meta">
            <div>
              <p class="app-meta">Status</p>
              <p class="repo-card-value {getStatusBadgeColor(repo.fetchState)}">
                {repo.fetchState.charAt(0).toUpperCase() +
                  repo.fetchState.slice(1)}
              </p>
            </div>
            <div>
              <p class="app-meta">Visibility</p>
              <p class="repo-card-value">
                {repo.visibility.charAt(0).toUpperCase() +
                  repo.visibility.slice(1)}
              </p>
            </div>
            <div>
              <p class="app-meta">Storage</p>
              <p class="repo-card-value">{repo.storageSize}</p>
            </div>
            <div>
              <p class="app-meta">Last Updated</p>
              <p class="repo-card-value">
                {formatRelativeTime(repo.lastUpdated)}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<Modal
  open={unseedModalOpen}
  title="Unseed Repository"
  on:close={() => (unseedModalOpen = false)}
>
  <p class="app-meta mb-4">
    Are you sure you want to unseed this repository? This will remove it from
    your Always On Node.
  </p>
  <div class="flex space-x-3">
    <button
      on:click={() => (unseedModalOpen = false)}
      class="cta-button cta-button-outline flex-1"
    >
      Cancel
    </button>
    <button
      on:click={confirmUnseed}
      class="cta-button cta-button-danger flex-1"
    >
      Unseed
    </button>
  </div>
</Modal>
