# Previous website archive

Before replacing the AcademicPages/Yixuan-based site with PRISM, the complete source at commit `6aa733206a6f35d4caaa17ff29a06530df6a6ceb` was saved and pushed to:

<https://github.com/JiahaoLiu5/jiahaoliu5.github.io/tree/archive/academicpages-6aa7332>

The archive branch includes its original dependencies, content, assets, tests, deployment workflow, licenses, and full Git history. It remains independent of subsequent changes to `main`.

Additional backups were created in the current cloud workspace:

- `/workspace/archives/personal-website-academicpages-6aa7332.tar.gz` — source snapshot
- `/workspace/archives/personal-website-academicpages-6aa7332.bundle` — complete Git history for the archive branch

The Git bundle passed `git bundle verify`. The remote archive branch can be recovered even if these local backup files are unavailable in a future environment.

To inspect the earlier site, use the archive branch in a separate clone. It builds with `npm ci` followed by `npm run build`. Restoring it to the public website would require an intentional change to `main`; creating the archive did not change the published site.
