<script lang="ts">
  import guideIllustration1 from "$lib/../illustrations/Illustration 1.png";
  import guideIllustration2 from "$lib/../illustrations/Illustration 2.png";
  import guideIllustration3 from "$lib/../illustrations/Illustration 3.png";

  export let userGuideHref = "/protocol/user-guide";
  export let protocolGuideHref = "/protocol/guide";
  export let seederGuideHref = "/protocol/seeder-guide";
</script>

<div class="guide-card-grid">
  <a class="guide-card" href={userGuideHref}>
    <div
      class="guide-card-art"
      style={`background-image: url(${guideIllustration1});`}
      aria-hidden="true"
    ></div>
    <div class="guide-card-title">User guide →</div>
    <div class="guide-card-subtitle">Your introduction to using Radicle</div>
  </a>
  <a class="guide-card" href={protocolGuideHref}>
    <div
      class="guide-card-art"
      style={`background-image: url(${guideIllustration2});`}
      aria-hidden="true"
    ></div>
    <div class="guide-card-title">Protocol guide →</div>
    <div class="guide-card-subtitle">How Radicle works under the hood</div>
  </a>
  <a class="guide-card" href={seederGuideHref}>
    <div
      class="guide-card-art"
      style={`background-image: url(${guideIllustration3});`}
      aria-hidden="true"
    ></div>
    <div class="guide-card-title">Seeder guide →</div>
    <div class="guide-card-subtitle">How to run a Radicle seed node</div>
  </a>
</div>
