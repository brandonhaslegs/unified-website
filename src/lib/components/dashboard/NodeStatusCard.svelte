<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import type { NodeStatus, Repository } from "$lib/utils/api";
  import repoImage1 from "$lib/../illustrations/Illustration 5.png";
  import repoImage2 from "$lib/../illustrations/Illustration 6.png";
  import repoImage3 from "$lib/../illustrations/Illustration 2.png";
  import repoImage4 from "$lib/../illustrations/Illustration 3.png";

  export let nodeStatus: NodeStatus;
  export let repositories: Repository[] = [];

  $: storageBreakdown = [
    { label: "Repos", value: `${repositories.length}` },
    {
      label: "Issues",
      value: `${repositories.reduce((sum, repo) => sum + (repo.issuesCount ?? 0), 0)}`
    },
    {
      label: "Patches",
      value: `${repositories.reduce((sum, repo) => sum + (repo.patchesCount ?? 0), 0)}`
    },
  ];

  function sizeToGB(value: string) {
    const normalized = value.trim().toUpperCase();
    if (normalized.endsWith("GB")) {
      return parseFloat(normalized.replace("GB", "").trim());
    }
    if (normalized.endsWith("MB")) {
      return parseFloat(normalized.replace("MB", "").trim()) / 1024;
    }
    return parseFloat(normalized);
  }

  function formatStorage(valueGB: number) {
    if (valueGB < 1) {
      return `${Math.round(valueGB * 1024)} MB`;
    }
    return `${valueGB.toFixed(1)} GB`;
  }

  $: repoSizes = repositories
    .map((repo) => ({
      ...repo,
      sizeGB: sizeToGB(repo.storageSize)
    }))
    .sort((a, b) => b.sizeGB - a.sizeGB);

  $: topRepos = repoSizes.slice(0, 4);
  $: otherReposSize = repoSizes.slice(4).reduce((sum, repo) => sum + repo.sizeGB, 0);
  $: totalRepoSize = repoSizes.reduce((sum, repo) => sum + repo.sizeGB, 0);
  $: scaleFactor = totalRepoSize > 0 ? nodeStatus.diskUsed / totalRepoSize : 0;

  const repoImages = [repoImage1, repoImage2, repoImage3, repoImage4];

  $: repoSegments = [
    ...topRepos.map((repo, index) => ({
      label: repo.name || repo.rid.slice(0, 8),
      value: formatStorage(repo.sizeGB * scaleFactor),
      className: `disk-segment-repo-${index + 1}`,
      image: repoImages[index],
      sizeGB: repo.sizeGB * scaleFactor,
      percentage: ((repo.sizeGB * scaleFactor) / nodeStatus.diskTotal) * 100,
    })),
    ...(otherReposSize > 0
      ? [
          {
            label: "Other repos",
            value: formatStorage(otherReposSize * scaleFactor),
            className: "disk-segment-other-repos",
            image: "",
            sizeGB: otherReposSize * scaleFactor,
            percentage: ((otherReposSize * scaleFactor) / nodeStatus.diskTotal) * 100,
          },
        ]
      : []),
  ];

  $: freeSize = Math.max(nodeStatus.diskTotal - nodeStatus.diskUsed, 0);
  $: freeSegment = {
    label: "Free",
    value: formatStorage(freeSize),
    className: "disk-segment-empty",
    image: "",
    sizeGB: freeSize,
    percentage: (freeSize / nodeStatus.diskTotal) * 100,
  };

  $: diskSegments = [...repoSegments, freeSegment];
</script>

  <div class="app-panel node-status-panel">
    <div class="node-status-header">
    <div class="node-status-heading">
      <h3 class="node-status-title">Node status</h3>
      <span
        class={`node-status-pill ${nodeStatus.running ? "is-live" : "is-down"}`}
      >
        <span
          class="node-status-dot {nodeStatus.running ? 'is-live' : 'is-down'}"
        ></span>
        {nodeStatus.running ? "Running" : "Stopped"}
      </span>
    </div>
    <div class="node-status-indicator">
      <a
        href="https://app.radicle.xyz/nodes/{nodeStatus.nodeId}"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-button cta-button-outline"
      >
        <span>View node details</span>
        <Icon name="OpenExternal" size={20} className="icon-current" />
      </a>
    </div>
  </div>

  <div class="space-y-8">
    {#if !nodeStatus.running && nodeStatus.reason}
      <p class="auth-error">{nodeStatus.reason}</p>
    {/if}

    <div class="node-status-meter">
      <div class="node-status-meter-header">
        <span class="node-status-meter-label">Disk space</span>
        <span class="node-status-total">
          {nodeStatus.diskUsed.toFixed(1)} GB / {nodeStatus.diskTotal} GB
        </span>
      </div>
      <div class="node-status-bar">
        {#each diskSegments as segment}
          <div
            class={`node-status-bar-segment ${segment.className}`}
            style={`width: ${segment.percentage}%; ${segment.image ? `background-image: url('${segment.image}')` : ''}`}
            title={`${segment.label} · ${segment.value}`}
          ></div>
        {/each}
      </div>
      <div class="disk-breakdown">
        {#each diskSegments as segment}
          <div class="disk-breakdown-item">
            <span
              class={`disk-breakdown-swatch ${segment.className}`}
              style={segment.image ? `background-image: url('${segment.image}')` : ''}
            ></span>
            <span class="disk-breakdown-label">{segment.label}</span>
            <span class="disk-breakdown-value">{segment.value}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
<div class="node-status-meter">
  <div class="node-status-meter-label">Stats</div>
  <div class="node-status-breakdown">
    {#each storageBreakdown as item}
      <div class="node-status-cell">
        <span class="node-status-breakdown-value">{item.value}</span>
        <span class="node-status-breakdown-label">{item.label}</span>
      </div>
    {/each}
  </div>
</div>
