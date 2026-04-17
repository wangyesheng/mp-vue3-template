# Git 忽略以前跟踪过的文件（完整指南）

很多同学会遇到：把文件写进了 `.gitignore`，但 Git 仍然提示该文件有改动、还能被提交。原因是 **`.gitignore` 只对“未被跟踪（untracked）”的文件生效**；对已经进入过版本库索引（tracked）的文件不会自动停止跟踪。

本文总结几种常见目标与对应做法。

## 结论速查

- **目标 A：从此不再纳入仓库（不再 tracked），但本地保留文件**
  用 `git rm --cached`（推荐）
- **目标 B：只想本地忽略某些改动，但仓库里仍然保留该文件**
  用 `git update-index --skip-worktree` / `--assume-unchanged`（进阶，谨慎）
- **目标 C：忽略仅对你本地有效，不影响团队**
  用 `.git/info/exclude` 或全局 `~/.gitignore_global`

---

## 目标 A：停止跟踪（tracked → untracked），并让 `.gitignore` 生效（推荐）

### 1）先把规则写进 `.gitignore`

例如：

```gitignore
# 自动生成文件
src/auto-imports.d.ts
components.d.ts
.eslintrc-auto-import.json

# 构建产物
dist/
```

### 2）把该文件从 Git 索引移除（但保留本地文件）

```bash
git rm --cached components.d.ts .eslintrc-auto-import.json src/auto-imports.d.ts
git commit -m "Stop tracking generated auto-import/type files"
```

```bash
git rm --cached path/to/file
```

多个文件：

```bash
git rm --cached file1 file2 file3
```

目录（递归）：

```bash
git rm -r --cached path/to/dir
```

### 3）提交一次，让仓库状态落地

```bash
git commit -m "chore: stop tracking ignored files"
```

### 4）验证

- `git status` 不应再出现这些文件的变更
- 本地文件仍然存在（因为加了 `--cached`）

> 说明：你们项目里 `docs/git.md` 就是这个思路的一个简例。

---

## 目标 A（批量）：历史里曾经跟踪过很多文件，想一次性清理

如果你把忽略规则补充完整了，想让 Git “重新应用”忽略规则，一个常见做法是先清索引再重新加入：

```bash
git rm -r --cached .
git add .
git commit -m "chore: reapply gitignore"
```

注意事项：

- 这会让“停止跟踪的文件”一次性变多，提交 diff 会比较大
- 确保 `.gitignore` 写对了再做（建议先 `git status` 看预期是否正确）

---

## 目标 B：文件仍保留在仓库，但你本地不想看到它的改动（谨慎）

这类需求常见于：某些配置文件必须存在于仓库（便于新同事启动），但每个人本地会有个性化调整；你不希望这些调整天天出现在 `git status`。

### 方案 1：`skip-worktree`（更适合“本地配置”类文件）

```bash
git update-index --skip-worktree path/to/file
```

取消：

```bash
git update-index --no-skip-worktree path/to/file
```

### 方案 2：`assume-unchanged`（更偏性能/你确定很少改）

```bash
git update-index --assume-unchanged path/to/file
```

取消：

```bash
git update-index --no-assume-unchanged path/to/file
```

#### 重要提醒（务必看）

- 这两种方式 **只影响你本机**，不会同步给团队
- 可能导致你 **错过上游对该文件的更新**，甚至合并/拉取时出现意外覆盖
- 如果团队确实需要“每人一份本地配置”，更推荐：
  - 提供 `xxx.example` / `xxx.template` 文件并提交
  - 实际生效文件写进 `.gitignore`（目标 A）

---

## 目标 C：只在本地忽略，不改动仓库里的 `.gitignore`

### 方案 1：仓库级（仅你本机生效）

把规则写到：

```text
.git/info/exclude
```

语法与 `.gitignore` 相同。

### 方案 2：全局级（你所有仓库生效）

配置全局 ignore 文件（示例）：

```bash
git config --global core.excludesfile "~/.gitignore_global"
```

然后在 `~/.gitignore_global` 里写规则（如 `*.log`、`.DS_Store` 等）。

---

## 常见排错

### 1）为什么写了 `.gitignore` 还是能提交？

通常是因为文件已经是 tracked。按「目标 A」执行 `git rm --cached` 后再提交即可。

### 2）我不确定一个文件是不是 tracked，怎么查？

```bash
git ls-files path/to/file
```

有输出就是 tracked；无输出通常是未跟踪或路径不对。

### 3）我已经 `rm --cached` 了，但文件仍出现在 `git status`

检查：

- `.gitignore` 规则路径是否正确（相对仓库根目录）
- 是否有更上层/更具体的规则覆盖（例如 `!` 反向规则）
- 是否有多个同名文件（大小写/路径差异）

---

## 最佳实践建议（团队协作）

- **优先用“模板文件 + 忽略真实文件”**
  例如提交 `.env.example`，忽略 `.env`
- **生成类文件一律忽略**
  如 `auto-imports.d.ts`、构建产物 `dist/`、缓存目录等
- **不要把个人电脑路径/账号信息提交进仓库**
