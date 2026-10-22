# 安装与盘点报告

## 开始前检查
- 初始 pwd：/workspace；ls：library-files、pet-demo、scratch、shared。项目实际目录：/workspace/pet-demo；项目 ls：AGENTS.md、README.md、client、css、hq、index.html、js、merchant、ref、worker。
- git --version：git version 2.52.0；python3 --version：Python 3.12.14；echo $HOME：/home/agent。
- ~/.codex/skills 初始包含 builtins/、remote-skills/；~/.claude/skills 不存在：`ls: cannot access '/home/agent/.claude/skills': No such file or directory`。
- 初始分支 work，git status --short 无输出；未切换或修改 main。AGENTS.md 已读；其引用的两份中文需求文件均不存在。本次不涉及网页改动。

## 来源与下载
两库均最终通过 HTTPS git clone 成功；源 commit 见 SOURCES.json，已先记录后移除两个嵌套 .git，作为普通文件提交。
首次沙箱内 clone 与 codeload tarball 均失败：`Failed to connect to proxy port 8080 after 0 ms: Could not connect to server`。经工具正常网络权限执行 clone 成功，没有绕过代理，最终没有使用 tarball。

## Cheat on Content
- 源码路径：/workspace/pet-demo/vendor-skills/cheat-on-content。
- 完整阅读 install.sh 后运行 `bash install.sh --all`；退出码 1，原文：`mkdir: cannot create directory ‘/home/agent/.claude’: Read-only file system`。申请工具限定目录写入访问后重试，仍同样失败；没有修改脚本、没有改 HOME、没有绕过安装。未出现覆盖确认提示。
- 安装后：Codex 中 cheat 相关条目 0；Claude skills 目录仍不存在，安装子 skill 数为 0。源码与脚本实际有 15 个子 skill（README 的 14 已过时）；预期 Claude 15 个链接，Codex 16 个链接（含根 skill cheat-on-content）。全部源码 SKILL.md 顶部 name/description 已逐个读取，原始证据见 audit/cheat-frontmatter.txt。
- 脚本行为：解析 --all/--codex/--claude/--copy；验证根与 15 份 SKILL.md；检查冲突并询问覆盖；创建目标目录，删除同名目标后建立绝对路径符号链接（默认）或拷贝；Codex 额外安装根 skill。独立 --reinstall-hooks 分支只为已初始化项目更新三份 hook，本次未运行。
- 当前没有安装条目，不能声称已存在符号链接。默认成功时 ~/.codex/skills/cheat-on-content 指向本源码根，其余指向本源码 skills/<名称>，并非拷贝。云主目录只读，且不应作为可持久安装落点；vendor-skills/ 源码副本为随仓库持久保存的落点，新环境需重新安装链接。

|name|一句话用途|触发方式（支持的用户入口）|
|---|---|---|
|cheat-init|首次引导并创建内容项目脚手架|/cheat-init；“初始化”|
|cheat-learn-from|导入对标脚本数据并提炼模式与 rubric|/cheat-learn-from；“学这个账号”|
|cheat-seed|围绕用户主题生成选题与草稿|/cheat-seed；“我想做一条 X”|
|cheat-score|给单稿评分并在控制台输出|/cheat-score；“给这稿子打分”|
|cheat-score-blind|隔离上下文盲评分并返回 JSON|内部 Task 子代理，由 score/predict/bump 调用，不在主会话直接触发|
|cheat-predict|盲评分并写不可改预测日志|/cheat-predict；“启动预测”|
|cheat-shoot|登记拍摄、建视频目录并增加库存|/cheat-shoot；“拍了 X”|
|cheat-publish|登记发布 URL、时间与平台元数据|/cheat-publish；“已发布”|
|cheat-retro|回收发布后数据、复盘并更新观察|/cheat-retro；“复盘 [path]”|
|cheat-persona|从评论复盘构建受众画像|/cheat-persona；“我的观众是谁”|
|cheat-bump|升级 rubric 或轻量重校分桶|/cheat-bump；“升级 rubric”“重校桶”|
|cheat-recommend|按 rubric 推荐候选选题|/cheat-recommend；“推荐选题”|
|cheat-trends|抓热点去重评分并写候选池|/cheat-trends；“抓热点”|
|cheat-status|查看模式、校准进度和待办状态|/cheat-status；“状态”|
|cheat-migrate|按迁移链升级旧 state schema|/cheat-migrate；“迁移”|

前提与消耗：安装需要 Bash、可写 agent skills 目录；使用需要兼容 Claude Code/Codex 及其认证和模型额度。盲评需要 Task 子代理，跨模型审核涉及 mcp__llm-chat__chat。抓取适配器按需需要 Python、Playwright/Chromium、平台账号登录态；转录按需需要 Whisper/ffmpeg；不是本次已安装的依赖。模型生成、盲评分、跨模型审核会消耗对应额度，浏览抓取可能需要网络与平台会话。不得在 pet-demo 内触发初始化，以免生成 vendor-skills 外的文件。源码含 adapters、hooks、migrations、templates、shared-references、starter-rubrics、tools、docs、examples。
许可证：MIT，允许商用、修改和分发，须保留版权与许可，无担保。抓取 cookies 应留在内容工作目录，不提交凭据。

## Skill Training
- 源码路径：/workspace/pet-demo/vendor-skills/skill-training；已完整阅读 README.md、README.zh-CN.md、LICENSE、pyproject.toml。
- 官方说明无需 pip 安装项目或第三方包，直接从源码根运行。Python >=3.10，依赖列表为空；本次使用 Python 3.12.14。
- `uv venv --python 3.12 .venv` 首次失败：`error: Failed to initialize cache at /home/agent/.cache/uv`，原因只读。随后设置 UV_CACHE_DIR=/tmp/pet-demo-uv-cache，原命令成功，虚拟环境位于源码根 .venv（忽略文件，不提交）。没有使用 python3 -m venv 回退。
- 仅执行帮助命令与官方离线单测，没有执行模型任务或示例下载。测试套件内部包含 prepare 临时数据及无参数 train 的参数校验，不会调用模型。

|命令（均用 .venv/bin/python）|结果|
|---|---|
|python -m skilltrain --help|退出 0，21 行|
|python -m skilltrain prepare --help|退出 0，12 行|
|python -m skilltrain diffuse --help|退出 0，17 行|
|python -m skilltrain forward --help|退出 0，15 行|
|python -m skilltrain loss --help|退出 0，15 行|
|python -m skilltrain backward --help|退出 0，15 行|
|python -m skilltrain train --help|退出 0，32 行|
|python -m unittest discover tests|退出 0，60 通过，0 失败，0 错误；1.128 秒|

原始输出在 audit/；其中测试打印的 `[forward] FAILED` 是预期拒绝读取原稿/反馈的负向测试日志，最终 unittest 结果 OK。

### 包模块清单（15 个 Python 文件）
|模块|用途与调用方式|
|---|---|
|__init__.py|包说明，import skilltrain 时加载|
|__main__.py|统一参数路由，由 python -m skilltrain 调用|
|agent.py|Claude CLI 命令构造、重试与归档，工作流调用 run_text/run_agent|
|dataset.py|作品、剧集与大纲数据访问，工作流通过 Work/load/chapters_from 调用|
|memory.py|技能卡格式校验、库布局与 Git 管理，工作流调用 init/lint/reset 等|
|prompts.py|加载并填充 Markdown 占位符，工作流调用 render|
|run.py|运行目录、配置与续跑管理，训练调用 open_run/Run|
|trajectory.py|stream-json 转可读轨迹和读文件清单，agent 调用 render_trajectory/collect_read_trace|
|workflows/__init__.py|流程子包声明，由入口导入|
|workflows/s0_prepare_data.py|文本/PDF 清理、分场、分集，prepare 路由到 main|
|workflows/s1_diffuse.py|将原稿加噪为大纲，diffuse 路由到 main|
|workflows/s2_forward.py|读取技能重建剧本并核验闭卷读取，forward 路由到 main|
|workflows/s3_loss.py|比较模型稿与原稿写反馈，loss 路由到 main|
|workflows/s4_backward.py|聚合反馈、改技能库、校验提交与快照，backward 路由到 main|
|workflows/s5_train.py|训练编排、并行作品、续跑与反向微步，train 路由到 main|

共 15 个 Python 文件（8 个包根模块、7 个 workflows 文件），不含运行缓存。

### prompts/ 全部 7 份模板
|文件|用途与调用方式|
|---|---|
|diffuse_heavy.md|强加噪剥离对白与技法，s1 diffuse_episode 经 render("diffuse_heavy") 使用|
|diffuse_light.md|轻加噪改写为散文保留部分质感，s1 diffuse_episode 经 render("diffuse_light") 使用|
|forward.md|指导读取技能库并重建剧本，s2 run 渲染后交 run_agent|
|loss.md|比较原稿与生成稿的写作差距，s3 run 渲染后交 run_text|
|reduce.md|合并多作品反馈为摘要，s4 reduce 渲染后交 run_text|
|backward.md|指导修改技能卡和提交，s4 run 渲染后交 run_agent|
|memory_policy.md|技能卡格式与长度规范，s4 run 渲染后嵌入 backward 提示|

### 危险参数的只读调用链定位
`skilltrain/agent.py:57` 的 `_base_cmd()` 在第 62 行固定加入 `--dangerously-skip-permissions`；`run_text()`（第 76 行）与 `run_agent()`（第 131 行）都调用它。
- diffuse：s1_diffuse.run → diffuse_episode → run_text → _base_cmd。
- loss：s3_loss.run → run_text → _base_cmd。
- forward：s2_forward.run → run_agent → _base_cmd。
- backward：s4_backward.reduce → run_text；s4_backward.run → run_agent；两者均到 _base_cmd。
- train：s5_train.train → forward_and_loss/_forward_and_loss → s2_forward.run、s3_loss.run；backward_step → s4_backward.reduce、s4_backward.run → 上述 CLI 路径。
用途为无人值守运行时跳过工具权限确认；同一身份能读写环境可访问文件，cwd 不是安全沙箱；run_text 同样有工具权限，提示词没有调用意图不等于禁止调用。默认 --setting-sources 为空且禁用自动记忆，不构成隔离边界。本次仅定位代码，未实际触发此参数执行任务。

使用前提：macOS/Linux、Python >=3.10、Git；真实训练需要已认证 Claude CLI（本环境 command -v claude 无输出），可使用订阅认证、ANTHROPIC_API_KEY 或兼容网关认证。PDF 需 pdftotext（本环境 /usr/bin/pdftotext），示例还需 Bash/curl/diff；uv 是推荐环境工具。真实 diffuse/forward/loss/backward/train 会使用 Claude 已配置账号与额度，重试和多步训练增加消耗；本次无模型额度消耗。

许可证：PolyForm Noncommercial 1.0.0，仅许可规定的非商业用途，分发必须附许可或 URL 和 Required Notice；不转授权，含专利与终止条件，无担保。商用须另向作者取得许可。示例 Valkaama 另用 CC BY-SA 3.0，本次没有下载示例。该代码不是 MIT/Apache/BSD 的宽松依赖，与 AGENTS.md 的依赖偏好不符；本次按用户明确要求仅收录盘点与离线验证，不接入 pet-demo 产品依赖，不表示获得商用授权。
