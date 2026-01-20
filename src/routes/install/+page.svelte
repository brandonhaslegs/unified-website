<script lang="ts">
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import SiteRail from "$lib/components/SiteRail.svelte";
  import SiteContentHeader from "$lib/components/SiteContentHeader.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import CliInstallBlock from "$lib/components/CliInstallBlock.svelte";

  const cliInstallCommand = "curl -sSf https://radicle.xyz/install | sh";
  let copyTimeout: ReturnType<typeof setTimeout> | null = null;
  let copiedCommand: string | null = null;

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

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    copiedCommand = text;
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    copyTimeout = setTimeout(() => {
      copiedCommand = null;
    }, 2000);
  }

  function toggleInstall(value: string) {
    expandedInstall = expandedInstall === value ? value : value;
  }
</script>

<svelte:head>
  <title>Install</title>
</svelte:head>

<div class="site-shell">
  <div class="site-body">
    <SiteRail />
    <div class="install-sections">
      <div class="install-page-intro">
        <SiteContentHeader />
        <section class="install-hero">
          <div class="space-y-4">
            <h1 class="hero-title">Install Radicle CLI 1.5.0</h1>
            <p class="hero-subtitle">
              Manage your projects, remotes, and identities directly from your
              terminal.
            </p>
          </div>
          <CliInstallBlock command={cliInstallCommand} />
        </section>
      </div>

      <section class="install-feature-grid">
        <div class="install-feature-card">
          <div class="install-feature-media"></div>
          <h3>Automate with scripts</h3>
          <p>Integrate Radicle into custom scripts and CI/CD pipelines.</p>
        </div>
        <div class="install-feature-card">
          <div class="install-feature-media"></div>
          <h3>Run headless anywhere</h3>
          <p>Operate on servers or remote machines without a GUI.</p>
        </div>
        <div class="install-feature-card">
          <div class="install-feature-media"></div>
          <h3>Fine-grained controls</h3>
          <p>Access advanced commands and configuration options.</p>
        </div>
      </section>

      <section class="install-split-links">
        <div>
          <h2 class="section-heading">Need more details?</h2>
          <p class="hero-subtitle">Check out the full download guide.</p>
          <a class="stack-link" href="/guides">More info →</a>
        </div>
        <div>
          <h2 class="section-heading">Changelog</h2>
          <p class="hero-subtitle">Radicle 1.5.0 released 30.09.2025</p>
          <a class="stack-link" href="/updates">See what's new →</a>
        </div>
      </section>

      <section class="space-y-8">
        <h2 class="section-heading">More ways to get started</h2>
        <div class="install-compact-grid">
          <div class="install-compact-card">
            <div>
              <h3>Build from source</h3>
              <p>Set up the CLI locally and customize your toolchain.</p>
              <a class="stack-link" href="https://github.com/radicle-dev/radicle-node" target="_blank" rel="noreferrer">
                Read source code →
              </a>
            </div>
            <div class="install-compact-media"></div>
          </div>
          <div class="install-compact-card">
            <div>
              <h3>User guide</h3>
              <p>A comprehensive introduction to using Radicle CLI.</p>
              <a class="stack-link" href="/guides">Read guide →</a>
            </div>
            <div class="install-compact-media install-compact-media-alt"></div>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <div class="space-y-2">
          <h2 class="section-heading">Download Radicle Desktop</h2>
          <p class="hero-subtitle">
            Contribute to the network effortlessly with an intuitive visual
            interface.
          </p>
          <a class="stack-link" href="/install">Available on macOS, Linux and Windows ↓</a>
        </div>
      </section>

      <section class="install-feature-grid">
        <div class="install-feature-card">
          <div class="install-feature-media"></div>
          <h3>Unified project browsing</h3>
          <p>Explore code, issues, and patches visually—all in one place.</p>
        </div>
        <div class="install-feature-card">
          <div class="install-feature-media"></div>
          <h3>Rich collaboration tools</h3>
          <p>Propose changes, review code, discuss issues, and embed media.</p>
        </div>
        <div class="install-feature-card">
          <div class="install-feature-media"></div>
          <h3>Offline-first notifications</h3>
          <p>Work and review offline with built-in updates to keep you informed.</p>
        </div>
      </section>

      <section class="install-downloads">
        <div>
          <h3 class="section-heading">To download Radicle Desktop, select your OS and follow the instructions</h3>
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
                                size={20}
                                className="icon-current"
                              />
                            {:else}
                              <Icon
                                name="Copy"
                                size={20}
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
      </section>
    </div>
    <SiteFooter />
  </div>
</div>
