<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import SiteContentHeader from "$lib/components/SiteContentHeader.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { page } from "$app/stores";

  let heroEl: HTMLElement;
  let copiedCommand: string | null = null;
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;

  const installOptions = [
    {
      label: "Apple Silicon",
      value: "apple",
      description:
        "Run the command in your terminal to download and open the DMG file. Then drag the Radicle app to your Applications folder.",
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
      description:
        "Download the AppImage, make it executable, and run it from your terminal.",
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
      description:
        "Install the keyring, add the Radicle apt source, then install the desktop package.",
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
      description: "Install the desktop app with yay.",
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
      description: "Run Radicle Desktop directly with nix.",
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
      description:
        "Use WSL2 with any of the Linux install options to run Radicle Desktop on Windows.",
      commands: [
        {
          label: "Use Linux install",
          text: "Use WSL2 with any of the Linux install options to run Radicle Desktop on Windows.",
        },
      ],
    },
  ];
  let expandedInstall = installOptions[0].value;

  const illustrationModules = import.meta.glob("/src/illustrations/*.png", {
    eager: true,
    import: "default",
  });
  const illustrationUrls = Object.values(illustrationModules) as string[];

  const desktopHeroImage = "/desktop/screenshot.png";

  $: if (heroEl && illustrationUrls.length > 0) {
    const heroImage =
      illustrationUrls.find((url) => url.includes("illustration9.png")) ??
      illustrationUrls[0];
    heroEl.style.setProperty("--hero-image", `url("${heroImage}")`);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    copiedCommand = text;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copiedCommand = null;
    }, 3000);
  }

  function toggleInstall(value: string) {
    expandedInstall = expandedInstall === value ? value : value;
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
  <div class="site-body">
    <SiteRail />
    <div class="space-y-16">
      <SiteContentHeader showCta={false} />
      <section class="site-hero" bind:this={heroEl}>
        <div class="space-y-6">
          <h1 class="hero-title">Download Radicle Desktop</h1>
          <p class="hero-subtitle">
            Contribute to the network effortlessly with an intuitive visual interface.
          </p>
          <a class="stack-link desktop-availability" href="#install">
            Available on macOS, Linux and Windows ↓
          </a>
          <div class="install-grid" id="install">
            <div class="install-intro">
              <h2 class="section-heading">
                To download Radicle Desktop, select your OS and follow the
                instructions
              </h2>
            </div>
            <div class="install-list">
              {#each installOptions as option}
                <div class="install-item">
                  <button
                    class="install-trigger"
                    type="button"
                    on:click={() => toggleInstall(option.value)}
                  >
                    <span>{option.label}</span>
                    <Icon
                      name="ChevronDown"
                      size={16}
                      className={`icon-current ${expandedInstall === option.value ? "install-open" : ""}`}
                    />
                  </button>
                  {#if expandedInstall === option.value}
                    <div class="install-body">
                      <p class="app-meta">{option.description}</p>
                      {#if option.value === "wsl2"}
                        <p class="app-meta">{option.commands[0].text}</p>
                      {:else}
                        {#each option.commands as command}
                          <div class="install-command">
                            {#if option.value === "debian"}
                              <p class="app-meta">{command.label}</p>
                            {/if}
                            <div class="install-code">
                              <code>{command.text}</code>
                              <button
                                type="button"
                                class="install-copy"
                                aria-label={`Copy ${command.label}`}
                                on:click={() => handleCopy(command.text)}
                              >
                                {#if copiedCommand === command.text}
                                  <Icon
                                    name="Checkmark"
                                    size={14}
                                    className="icon-current"
                                  />
                                {:else}
                                  <Icon
                                    name="Copy"
                                    size={14}
                                    className="icon-current"
                                  />
                                {/if}
                              </button>
                            </div>
                          </div>
                        {/each}
                        <p class="app-meta">
                          Or check out the <a
                            href="https://seed.radicle.xyz/radicle/radicle-desktop"
                            class="stack-link">source code</a
                          >.
                        </p>
                      {/if}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </div>
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
          <p class="hero-subtitle">
            Radicle’s desktop app focuses on the essentials for collaborative
            code review.
          </p>
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
                  Propose code changes with patches and review your teammates’
                  work using a familiar workflow.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Rich text &amp; embeds</h3>
                <p class="feature-text">
                  Embed screenshots, videos, and other artifacts with Markdown
                  support and reactions.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Issues</h3>
                <p class="feature-text">
                  Join discussions and manage work through issues directly in
                  the app.
                </p>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-dot" aria-hidden="true"></span>
              <div>
                <h3 class="feature-title">Works offline</h3>
                <p class="feature-text">
                  Write and review code offline, then sync with your team when
                  you’re back online.
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
    <SiteFooter currentProduct="desktop" />
  </div>
</div>
