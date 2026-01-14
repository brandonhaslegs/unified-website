<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import HoverDropdown from "$lib/components/HoverDropdown.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { page } from "$app/stores";

  let heroEl: HTMLElement;
  let copied = false;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  const installOptions = [
    {
      label: "Apple Silicon",
      value: "apple",
      commands: [
        {
          label: "Download and open",
          text: "curl --output ~/Downloads/radicle-desktop-0.8.0-a250dc9-aarch64.dmg https://files.radicle.xyz/releases/radicle-desktop/latest/radicle-desktop-aarch64.dmg && open ~/Downloads/radicle-desktop-0.8.0-a250dc9-aarch64.dmg",
        },
      ],
    },
    {
      label: "Linux AppImage",
      value: "appimage",
      commands: [
        {
          label: "Download AppImage",
          text: "curl --output radicle-desktop-0.8.0-a250dc9-amd64.AppImage https://files.radicle.xyz/releases/radicle-desktop/latest/radicle-desktop-amd64.AppImage",
        },
      ],
    },
    {
      label: "Debian/Ubuntu",
      value: "debian",
      commands: [
        {
          label: "Install keyring",
          text: "curl -LO https://radicle.xyz/apt/radicle-archive-keyring.deb\nchmod a+r radicle-archive-keyring.deb\nsudo apt install ./radicle-archive-keyring.deb",
        },
        {
          label: "Add this to /etc/apt/sources.list",
          text: "deb [signed-by=/usr/share/radicle/radicle-archive-keyring.asc] https://radicle.xyz/apt release main",
        },
        {
          label: "Install Radicle Desktop",
          text: "sudo apt update\nsudo apt install radicle-desktop",
        },
      ],
    },
    {
      label: "Arch Linux",
      value: "arch",
      commands: [
        {
          label: "Install with yay",
          text: "yay -S radicle-desktop",
        },
      ],
    },
    {
      label: "NixOS",
      value: "nix",
      commands: [
        {
          label: "Run with nix",
          text: "nix run 'git+https://seed.radicle.xyz/z4D5UCArafTzTQpDZNQRuqswh3ury.git?rev=a250dc94ed936df7f4afcc40c03a49cb52a83f0a'",
        },
      ],
    },
    {
      label: "Windows WSL2",
      value: "wsl2",
      commands: [
        {
          label: "Use Linux install",
          text: "Use WSL2 with any of the Linux install options to run Radicle Desktop on Windows.",
        },
      ],
    },
  ];
  let selectedInstallValue = installOptions[0].value;
  $: selectedInstall =
    installOptions.find((option) => option.value === selectedInstallValue) ??
    installOptions[0];

  const illustrationModules = import.meta.glob(
    "/src/illustrations/*.png",
    {
      eager: true,
      import: "default",
    }
  );
  const illustrationUrls = Object.values(illustrationModules) as string[];

  const desktopHeroImage = "/desktop/screenshot.png";

  $: if (heroEl && illustrationUrls.length > 0) {
    const heroImage =
      illustrationUrls.find((url) => url.includes("illustration9.png")) ??
      illustrationUrls[0];
    heroEl.style.setProperty(
      "--hero-image",
      `url("${heroImage}")`
    );
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    copied = true;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copied = false;
    }, 3000);
  }
</script>

<svelte:head>
  <title>Radicle Desktop</title>
  <meta
    name="description"
    content="Local-first code collaboration on a peer-to-peer network"
  />
</svelte:head>

<div class="site-shell">
  <SiteHeader
    ctaLabel="Install the desktop app"
    ctaIcon="Copy"
    ctaCopyText={selectedInstall.commands
      .map((command) => command.text)
      .join("\n\n")}
    showAuxLinks={false}
  />

  <div class="site-body">
    <SiteRail />
    <div class="space-y-16">
      <section class="site-hero" bind:this={heroEl}>
        <div class="space-y-6">
          <h1 class="hero-title">Radicle collaboration, now on desktop</h1>
          <p class="hero-subtitle">
            A simple, intuitive desktop app that makes contributing to the
            Radicle network easier than ever.
          </p>
          <div class="feature-card space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <p class="text-secondary-light dark:text-secondary-dark">
                Install the desktop app on
              </p>
              <HoverDropdown
                items={installOptions}
                value={selectedInstallValue}
                label={selectedInstall.label}
                ariaLabel="Platform"
                buttonClass="inline-flex items-center gap-1 font-semibold px-3 pr-5 py-0"
                menuClass="absolute left-0 top-full w-max rounded-sm bg-white text-black shadow-lg p-2 z-20"
                itemClass="block w-full text-left px-3 py-2 font-semibold rounded-sm hover:bg-black/5"
                activeClass="bg-black/10"
                chevronClass="icon-text"
                immediateClose={true}
                on:change={(event) => (selectedInstallValue = event.detail)}
              />
            </div>
            <div class="flex flex-col gap-3">
              {#if selectedInstall.value === "wsl2"}
                <p class="text-secondary-light dark:text-secondary-dark max-w-2xl">
                  {selectedInstall.commands[0].text}
                </p>
              {:else}
                {#each selectedInstall.commands as command}
                  <div class="space-y-2">
                    {#if selectedInstall.value === "debian"}
                      <p class="text-secondary-light dark:text-secondary-dark">{command.label}</p>
                    {/if}
                    <div
                      class="inline-flex items-start gap-3 bg-black text-white rounded-sm px-4 py-3 font-mono max-w-[520px] w-auto"
                    >
                      <pre
                        class="truncate whitespace-nowrap overflow-hidden text-ellipsis min-w-0 flex-1">
											{command.text}
										</pre>
                      <button
                        type="button"
                        class="p-1 rounded-sm bg-white/10 text-white relative overflow-hidden flex items-center justify-center flex-shrink-0"
                        aria-label={`Copy ${command.label}`}
                        on:click={() => handleCopy(command.text)}
                      >
                        <span
                          class="relative block h-4 w-4 flex items-center justify-center overflow-hidden"
                        >
                          <Icon
                            name="Copy"
                            size={14}
                            className={`icon-terminal absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${copied ? "top-[120%] opacity-0" : "top-1/2 opacity-100"}`}
                          />
                          <Icon
                            name="Checkmark"
                            size={14}
                            className={`icon-terminal absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${copied ? "top-1/2 opacity-100" : "top-[-60%] opacity-0"}`}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </div>
        </div>
        <div class="hero-art" style="background-image: var(--hero-image);"></div>
      </section>

      <section class="space-y-10">
        <img
          src={desktopHeroImage}
          alt="Radicle Desktop repositories view"
          class="w-full rounded-sm"
          loading="lazy"
        />
        <div class="space-y-6">
          <h2 class="section-heading">What’s in the box?</h2>
          <p class="hero-subtitle">Radicle’s desktop app focuses on the essentials for collaborative code review.</p>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Notifications</h3>
                <p class="feature-text">
                  Stay in the loop with built-in notifications designed for an
                  inbox-zero workflow.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Patches</h3>
                <p class="feature-text">
                  Propose code changes with patches and review your teammates’ work
                  using a familiar workflow.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Rich text &amp; embeds</h3>
                <p class="feature-text">
                  Embed screenshots, videos, and other artifacts with Markdown support
                  and reactions.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Issues</h3>
                <p class="feature-text">
                  Join discussions and manage work through issues directly in the app.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Works offline</h3>
                <p class="feature-text">
                  Write and review code offline, then sync with your team when you’re
                  back online.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Code browser</h3>
                <p class="feature-text">
                  Explore source code right in the app—no need to open your IDE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <SiteFooter currentProduct="desktop" />
</div>
