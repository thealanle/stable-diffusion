---
title: Home
template: main.html
---

<!--
  The Docs you find here (/docs/*) are built and deployed via mkdocs. If you want to run a local version to verify your changes, it's as simple as::

  ```bash
  pip install -r requirements-mkdocs.txt
  mkdocs serve
  ```
-->
<div align="center" markdown>

# :material-script-text-outline: Stable Diffusion Dream Script

![project logo](assets/logo.png)

[![discord badge]][discord link]

[![latest release badge]][latest release link] [![github stars badge]][github stars link] [![github forks badge]][github forks link]

[![CI checks on main badge]][CI checks on main link] [![CI checks on dev badge]][CI checks on dev link] [![latest commit to dev badge]][latest commit to dev link]

[![github open issues badge]][github open issues link] [![github open prs badge]][github open prs link]

[CI checks on dev badge]: https://flat.badgen.net/github/checks/invoke-ai/InvokeAI/development?label=CI%20status%20on%20dev&cache=900&icon=github
[CI checks on dev link]: https://github.com/invoke-ai/InvokeAI/actions?query=branch%3Adevelopment
[CI checks on main badge]: https://flat.badgen.net/github/checks/invoke-ai/InvokeAI/main?label=CI%20status%20on%20main&cache=900&icon=github
[CI checks on main link]: https://github.com/invoke-ai/InvokeAI/actions/workflows/test-invoke-conda.yml
[discord badge]: https://flat.badgen.net/discord/members/htRgbc7e?icon=discord
[discord link]: https://discord.com/invite/htRgbc7e
[github forks badge]: https://flat.badgen.net/github/forks/invoke-ai/InvokeAI?icon=github
[github forks link]: https://useful-forks.github.io/?repo=lstein%2Fstable-diffusion
[github open issues badge]: https://flat.badgen.net/github/open-issues/invoke-ai/InvokeAI?icon=github
[github open issues link]: https://github.com/invoke-ai/InvokeAI/issues?q=is%3Aissue+is%3Aopen
[github open prs badge]: https://flat.badgen.net/github/open-prs/invoke-ai/InvokeAI?icon=github
[github open prs link]: https://github.com/invoke-ai/InvokeAI/pulls?q=is%3Apr+is%3Aopen
[github stars badge]: https://flat.badgen.net/github/stars/invoke-ai/InvokeAI?icon=github
[github stars link]: https://github.com/invoke-ai/InvokeAI/stargazers
[latest commit to dev badge]: https://flat.badgen.net/github/last-commit/invoke-ai/InvokeAI/development?icon=github&color=yellow&label=last%20dev%20commit&cache=900
[latest commit to dev link]: https://github.com/invoke-ai/InvokeAI/commits/development
[latest release badge]: https://flat.badgen.net/github/release/invoke-ai/InvokeAI/development?icon=github
[latest release link]: https://github.com/invoke-ai/InvokeAI/releases

</div>

This is a fork of [CompVis/stable-diffusion](https://github.com/CompVis/stable-diffusion), the open
source text-to-image generator. It provides a streamlined process with various new features and
options to aid the image generation process. It runs on Windows, Mac and Linux machines, and runs on
GPU cards with as little as 4 GB or RAM.

!!! note

    This fork is rapidly evolving. Please use the
    [Issues](https://github.com/invoke-ai/InvokeAI/issues) tab to report bugs and make feature
    requests. Be sure to use the provided templates. They will help aid diagnose issues faster.

## :octicons-package-dependencies-24: Installation

This fork is supported across multiple platforms. You can find individual installation instructions
below.

- :fontawesome-brands-linux: [Linux](installation/INSTALL_LINUX.md)
- :fontawesome-brands-windows: [Windows](installation/INSTALL_WINDOWS.md)
- :fontawesome-brands-apple: [Macintosh](installation/INSTALL_MAC.md)

## :fontawesome-solid-computer: Hardware Requirements

### :octicons-cpu-24: System

You wil need one of the following:

- :simple-nvidia: An NVIDIA-based graphics card with 4 GB or more VRAM memory.
- :fontawesome-brands-apple: An Apple computer with an M1 chip.

### :fontawesome-solid-memory: Memory

- At least 12 GB Main Memory RAM.

### :fontawesome-regular-hard-drive: Disk

- At least 6 GB of free disk space for the machine learning model, Python, and all its dependencies.

!!! note

    If you are have a Nvidia 10xx series card (e.g. the 1080ti), please run the invoke script in
    full-precision mode as shown below.

    Similarly, specify full-precision mode on Apple M1 hardware.

    To run in full-precision mode, start `invoke.py` with the `--full_precision` flag:

    ```bash
    (ldm) ~/stable-diffusion$ python scripts/invoke.py --full_precision
    ```
## :octicons-log-16: Latest Changes

### vNEXT <small>(TODO 2022)</small>

  - Deprecated `--full_precision` / `-F`. Simply omit it and `invoke.py` will auto
    configure. To switch away from auto use the new flag like `--precision=float32`.

### v1.14 <small>(11 September 2022)</small>

- Memory optimizations for small-RAM cards. 512x512 now possible on 4 GB GPUs.
- Full support for Apple hardware with M1 or M2 chips.
- Add "seamless mode" for circular tiling of image. Generates beautiful effects.
  ([prixt](https://github.com/prixt)).
- Inpainting support.
- Improved web server GUI.
- Lots of code and documentation cleanups.

### v1.13 <small>(3 September 2022</small>

- Support image variations (see [VARIATIONS](features/VARIATIONS.md)
  ([Kevin Gibbons](https://github.com/bakkot) and many contributors and reviewers)
- Supports a Google Colab notebook for a standalone server running on Google hardware
  [Arturo Mendivil](https://github.com/artmen1516)
- WebUI supports GFPGAN/ESRGAN facial reconstruction and upscaling
  [Kevin Gibbons](https://github.com/bakkot)
- WebUI supports incremental display of in-progress images during generation
  [Kevin Gibbons](https://github.com/bakkot)
- A new configuration file scheme that allows new models (including upcoming stable-diffusion-v1.5)
  to be added without altering the code. ([David Wager](https://github.com/maddavid12))
- Can specify --grid on invoke.py command line as the default.
- Miscellaneous internal bug and stability fixes.
- Works on M1 Apple hardware.
- Multiple bug fixes.

For older changelogs, please visit the **[CHANGELOG](features/CHANGELOG.md)**.

## :material-target: Troubleshooting

Please check out our **[:material-frequently-asked-questions: Q&A](help/TROUBLESHOOT.md)** to get solutions for common installation
problems and other issues.

## :octicons-repo-push-24: Contributing

Anyone who wishes to contribute to this project, whether documentation, features, bug fixes, code
cleanup, testing, or code reviews, is very much encouraged to do so. If you are unfamiliar with how
to contribute to GitHub projects, here is a
[Getting Started Guide](https://opensource.com/article/19/7/create-pull-request-github).

A full set of contribution guidelines, along with templates, are in progress, but for now the most
important thing is to **make your pull request against the "development" branch**, and not against
"main". This will help keep public breakage to a minimum and will allow you to propose more radical
changes.

## :octicons-person-24: Contributors

This fork is a combined effort of various people from across the world.
[Check out the list of all these amazing people](other/CONTRIBUTORS.md). We thank them for their
time, hard work and effort.

## :octicons-question-24: Support

For support, please use this repository's GitHub Issues tracking service. Feel free to send me an
email if you use and like the script.

Original portions of the software are Copyright (c) 2020
[Lincoln D. Stein](https://github.com/lstein)

## :octicons-book-24: Further Reading

Please see the original README for more information on this software and underlying algorithm,
located in the file [README-CompViz.md](other/README-CompViz.md).
