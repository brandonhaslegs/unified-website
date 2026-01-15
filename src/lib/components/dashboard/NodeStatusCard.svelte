<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import type { NodeStatus } from "$lib/utils/api";

  export let nodeStatus: NodeStatus;
  export let repoCount = 0;

  $: storageBreakdown = [
    { label: "Repos", value: `${repoCount}` },
    { label: "Lines of code", value: "1,794" },
    { label: "Issues", value: "42" },
    { label: "Patches", value: "17" },
    { label: "Peers", value: "6" },
    { label: "Uptime", value: "99.9%" },
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

  $: diskData = [
    { label: "Repo data", value: "8.2 GB", className: "disk-segment-repos" },
    { label: "Images", value: "127 MB", className: "disk-segment-images" },
    { label: "Indexes", value: "420 MB", className: "disk-segment-indexes" },
  ];

  $: usedBySegments = diskData.reduce(
    (sum, segment) => sum + sizeToGB(segment.value),
    0
  );
  $: otherSize = Math.max(nodeStatus.diskUsed - usedBySegments, 0);
  $: emptySize = Math.max(nodeStatus.diskTotal - nodeStatus.diskUsed, 0);

  $: nonFreeSegments = [
    ...diskData.map((segment) => ({
      ...segment,
      sizeGB: sizeToGB(segment.value),
      percentage: (sizeToGB(segment.value) / nodeStatus.diskTotal) * 100,
    })),
    {
      label: "Other",
      value: `${otherSize.toFixed(1)} GB`,
      className: "disk-segment-other",
      sizeGB: otherSize,
      percentage: (otherSize / nodeStatus.diskTotal) * 100,
    },
  ].sort((a, b) => b.sizeGB - a.sizeGB);

  $: freeSegment = {
    label: "Free",
    value: `${emptySize.toFixed(1)} GB`,
    className: "disk-segment-empty",
    sizeGB: emptySize,
    percentage: (emptySize / nodeStatus.diskTotal) * 100,
  };

  $: diskSegments = [...nonFreeSegments, freeSegment];
</script>

<div class="app-panel node-status-panel">
  <div class="node-status-header">
    <h3 class="node-status-title">Node Status</h3>
    <div class="node-status-indicator">
      <span class="node-status-dot {nodeStatus.running ? 'is-live' : 'is-down'}"
      ></span>
      <span class="node-status-state"
        >{nodeStatus.running ? "Running" : "Stopped"}</span
      >
      <a
        href="https://app.radicle.xyz/nodes/{nodeStatus.nodeId}"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-button cta-button-outline"
      >
        <span>View Node Details</span>
        <Icon name="OpenExternal" size={14} className="icon-current" />
      </a>
    </div>
  </div>

  <div class="space-y-8">
    {#if !nodeStatus.running && nodeStatus.reason}
      <p class="auth-error">{nodeStatus.reason}</p>
    {/if}

    <div class="node-status-meter">
      <div class="node-status-meter-header">
        <span class="node-status-meter-label">Disk Space</span>
        <span class="node-status-total">
          {nodeStatus.diskUsed.toFixed(1)} GB / {nodeStatus.diskTotal} GB
        </span>
      </div>
      <div class="node-status-bar">
        {#each diskSegments as segment}
          <div
            class={`node-status-bar-segment ${segment.className}`}
            style={`width: ${segment.percentage}%`}
            title={`${segment.label} · ${segment.value}`}
          ></div>
        {/each}
      </div>
      <div class="disk-breakdown">
        {#each diskSegments as segment}
          <div class="disk-breakdown-item">
            <span class={`disk-breakdown-swatch ${segment.className}`}></span>
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
      <div>
        <span class="node-status-breakdown-value">{item.value}</span>
        <span class="node-status-breakdown-label">{item.label}</span>
      </div>
    {/each}
  </div>
</div>
