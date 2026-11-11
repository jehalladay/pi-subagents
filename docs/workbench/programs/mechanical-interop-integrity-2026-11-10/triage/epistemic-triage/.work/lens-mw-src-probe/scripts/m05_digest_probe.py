"""Independent re-computation of the M05 receipt content digests from tarballs packed at a tree copy.
Usage: python3 -I m05_digest_probe.py <copy-root> <receipt.json> <pack-dest-dir> <npm-binary-dir> <label>
Method (as documented in the receipt gate_note and the test): for each package, npm pack --ignore-scripts --json;
files = sorted packed paths; line = path + NUL + sha256hex(extracted bytes) + LF; content digest = sha256 over joined lines.
"""
import hashlib, json, os, subprocess, sys, tarfile, tempfile

copy_root, receipt_path, dest, npm_dir, label = sys.argv[1:6]
receipt = json.load(open(receipt_path))
env = dict(os.environ)
env["PATH"] = npm_dir + os.pathsep + env["PATH"]
env["npm_config_update_notifier"] = "false"
env["npm_config_cache"] = os.path.join(os.path.dirname(dest), "npm-cache")
members = {
    "@mechanical/workflows-development": "packages/development",
    "@mechanical/workflows-coordination": "packages/coordination",
    "@mechanical/development-rig": "apps/development-rig",
}
out = {"label": label, "npm": subprocess.run(["npm", "--version"], env=env, capture_output=True, text=True).stdout.strip(),
       "node": subprocess.run(["node", "--version"], env=env, capture_output=True, text=True).stdout.strip(), "packages": {}}
ok = True
for name, rel in members.items():
    d = tempfile.mkdtemp(prefix="pack-", dir=dest)
    run = subprocess.run(["npm", "pack", "--ignore-scripts", "--json", "--pack-destination", d], cwd=os.path.join(copy_root, rel), env=env, capture_output=True, text=True)
    if run.returncode != 0:
        print("npm pack failed", name, run.stderr[:2000]); sys.exit(2)
    first = json.loads(run.stdout)[0]
    tarball = os.path.join(d, first["filename"])
    files = sorted(f["path"] for f in first["files"])
    whole = "sha256:" + hashlib.sha256(open(tarball, "rb").read()).hexdigest()
    lines = []
    with tarfile.open(tarball, "r:gz") as tf:
        members_by_name = {m.name: m for m in tf.getmembers()}
        for path in files:
            m = members_by_name["package/" + path]
            data = tf.extractfile(m).read()
            lines.append(path + "\0" + hashlib.sha256(data).hexdigest() + "\n")
        modes = {m.name: oct(m.mode) for m in tf.getmembers() if m.name.endswith("dist/cli.js")}
    content = "sha256:" + hashlib.sha256("".join(lines).encode("utf-8")).hexdigest()
    rec = receipt["tarballs"][name]
    row = {
        "files_n": len(files), "receipt_files_n": len(rec["files"]), "files_equal": files == rec["files"],
        "content_sha256": content, "receipt_content_sha256": rec["content_sha256"], "content_equal": content == rec["content_sha256"],
        "whole_sha256": whole, "receipt_whole_sha256": rec["sha256"], "whole_equal": whole == rec["sha256"],
        "cli_modes": modes,
    }
    ok = ok and row["files_equal"] and row["content_equal"]
    out["packages"][name] = row
out["all_content_and_files_equal"] = ok
print(json.dumps(out, indent=1))
