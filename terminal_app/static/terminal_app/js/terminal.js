/* ============================================================================
   terminal_app/static/terminal_app/js/terminal.js
   ----------------------------------------------------------------------------
   Same command engine as the original static version, with one key change:
   DATA no longer lives here as a hardcoded object. Instead it's read from a
   <script type="application/json"> tag that the Django template renders
   using {{ terminal_data|json_script:"terminal-data" }} — so Python (data.py)
   is the single source of truth, and this file just displays it.
   ============================================================================ */

const DATA = JSON.parse(document.getElementById("terminal-data").textContent);
const BANNER = DATA.banner;

const state = { history: [], historyIndex: -1 };

function L(text, cls){ return { text: text ?? "", cls: cls || "" }; }
function esc(str){
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

const COMMANDS = {
  help(){
    const list = Object.keys(COMMANDS).sort();
    return [
      L("Available commands:", "section-head"),
      L(""),
      { html: `<div class="command-grid">${list.map(c => `<span class="cmd">${c}</span>`).join("")}</div>` },
      L(""),
      L("Tip: press Tab to autocomplete, ↑ / ↓ to reuse previous commands.", "dim"),
    ];
  },

  about(){
    return [L("whoami --verbose", "section-head"), L(""), ...DATA.about.map(l => L(l))];
  },

  whoami(){
    return [L(`${DATA.profile.name} — ${DATA.profile.title}`)];
  },

  education(){
    const out = [L("Education", "section-head"), L("")];
    DATA.education.forEach(e => {
      out.push(L(e.school, "accent"));
      out.push(L(`${e.detail}  ·  ${e.years}`, "dim"));
      out.push(L(""));
    });
    return out;
  },

  skills(){
    const out = [L("Skills", "section-head"), L("")];
    DATA.skills.forEach(s => {
      const tag = s.status === "active" ? "[active] " : "[learning]";
      const cls = s.status === "active" ? "success" : "warn";
      out.push({ html: `<div class="line"><span class="${cls}">${tag}</span> ${esc(s.name)}</div>` });
    });
    out.push(L(""));
    out.push({ html: `<div class="line">GitHub: <a href="${DATA.profile.github}" target="_blank" rel="noopener">${DATA.profile.github.replace("https://","")}</a></div>` });
    return out;
  },

  projects(){
    const out = [L("Projects", "section-head"), L("(run 'project <name>' for full details, e.g. 'project jarvis')", "dim"), L("")];
    DATA.projects.forEach((p, i) => {
      out.push(L(`${i + 1}. ${p.name}`, "accent"));
      out.push(L(`   ${p.oneLiner}`, ""));
      out.push(L(`   status: ${p.status}`, "dim"));
      out.push(L(""));
    });
    return out;
  },

  project(args){
    if (!args.length) return [L("Usage: project <name>", "warn"), L("Try: project jarvis", "dim")];
    const query = args.join(" ").toLowerCase().replace(/\s+/g, "-");
    const p = DATA.projects.find(x => x.slug.includes(query) || x.name.toLowerCase().includes(query));
    if (!p) return [L(`No project matching "${args.join(" ")}". Run 'projects' to see all.`, "err")];

    const out = [L(p.name, "section-head"), L(p.oneLiner, ""), L("")];
    out.push({ html: `<div class="kv"><span class="k">Stack</span><span>${p.stack.join(", ")}</span></div>` });
    out.push({ html: `<div class="kv"><span class="k">Status</span><span>${p.status}</span></div>` });
    out.push({ html: `<div class="kv"><span class="k">GitHub</span><span>${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">${p.github.replace("https://","")}</a>` : "not linked yet"}</span></div>` });
    out.push({ html: `<div class="kv"><span class="k">Live</span><span>${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">${p.live}</a>` : "not deployed yet"}</span></div>` });
    return out;
  },

  contact(){
    const out = [L("Contact", "section-head"), L("")];
    out.push({ html: `<div class="kv"><span class="k">Email</span><a href="mailto:${DATA.profile.email}">${DATA.profile.email}</a></div>` });
    out.push({ html: `<div class="kv"><span class="k">Phone</span><a href="tel:${DATA.profile.phone.replace(/\s+/g,"")}">${DATA.profile.phone}</a></div>` });
    out.push({ html: `<div class="kv"><span class="k">GitHub</span><a href="${DATA.profile.github}" target="_blank" rel="noopener">${DATA.profile.github.replace("https://","")}</a></div>` });
    out.push({ html: `<div class="kv"><span class="k">LinkedIn</span><span>${DATA.profile.linkedin ? `<a href="${DATA.profile.linkedin}" target="_blank" rel="noopener">${DATA.profile.linkedin}</a>` : "not added yet"}</span></div>` });
    out.push({ html: `<div class="kv"><span class="k">Location</span><span>${DATA.profile.location}</span></div>` });
    return out;
  },

  github(){
    window.open(DATA.profile.github, "_blank", "noopener");
    return [L(`Opening ${DATA.profile.github} ...`, "dim")];
  },

  resume(){
    if (DATA.profile.resume){
      window.open(DATA.profile.resume, "_blank", "noopener");
      return [L("Opening resume ...", "dim")];
    }
    return [L("Resume isn't linked yet — email me and I'll send it straight over.", "warn"), L(`  → ${DATA.profile.email}`, "accent")];
  },

  neofetch(){
    const now = new Date();
    const days = Math.max(0, Math.floor((now - new Date("2025-01-01T00:00:00+05:30")) / 86400000));
    const info = [
      ["OS", "Human (Chennai Edition)"],
      ["Host", DATA.profile.location],
      ["Kernel", "B.Com → Cloud Engineer"],
      ["Uptime", `${days} days learning`],
      ["Shell", "zsh"],
      ["Languages", "Python, Django"],
      ["Currently", "Building JARVIS"],
    ];
    const kv = info.map(([k,v]) => `<div class="kv"><span class="k">${k}</span><span>${v}</span></div>`).join("");
    return [{ html: `<pre class="banner-line">${BANNER}</pre>` }, L(""), { html: kv }];
  },

  banner(){
    return [{ html: `<pre class="banner-line">${BANNER}</pre>` }];
  },

  funfact(){
    return [L("I once got out of the bath — mid-shower — because I'd", ""), L("figured out a bug fix in my head and had to write it down", ""), L("before I lost it. That's the level we're operating at. 🛁💻", "accent")];
  },

  date(){
    return [L(new Date().toString(), "dim")];
  },

  history(){
    if (!state.history.length) return [L("No commands run yet.", "dim")];
    return state.history.map((c, i) => L(`  ${i + 1}  ${c}`, "dim"));
  },

  sudo(args){
    if (args.join(" ").toLowerCase().includes("make coffee")){
      return [L("☕ Brewing... done. Now go build something.", "success")];
    }
    return [L(`manoj is not in the sudoers file. This incident will be reported. (not really)`, "err")];
  },

  clear(){
    document.getElementById("term-body").innerHTML = "";
    return null;
  },

  exit(){
    return [L("There's nothing to exit to — this is a website. Nice try though. 👋", "dim")];
  },
};
COMMANDS["ls"] = COMMANDS.help;

/* ---- Rendering + input handling (unchanged from the static version) ---- */
const body = document.getElementById("term-body");
const hiddenInput = document.getElementById("hidden-input");

function appendLines(lines){
  if (!lines) return;
  lines.forEach(item => {
    const div = document.createElement("div");
    if (item.html !== undefined){
      div.innerHTML = item.html;
    } else {
      div.className = "line " + (item.cls || "");
      div.textContent = item.text;
    }
    body.appendChild(div);
  });
  scrollToBottom();
}

function scrollToBottom(){
  body.scrollTop = body.scrollHeight;
}

function renderPromptRow(command){
  const row = document.createElement("div");
  row.className = "prompt-row";
  row.innerHTML = `<span class="prompt-tag">manoj@chennai</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-sep">%</span><span class="typed">${esc(command)}</span>`;
  body.appendChild(row);
}

function runCommand(raw){
  const trimmed = raw.trim();
  if (!trimmed){ renderNewInputLine(); return; }

  renderPromptRow(trimmed);
  state.history.push(trimmed);
  state.historyIndex = state.history.length;

  const [cmd, ...args] = trimmed.split(/\s+/);
  const key = cmd.toLowerCase();

  if (COMMANDS[key]){
    const result = COMMANDS[key](args);
    if (result) appendLines(result);
  } else {
    appendLines([L(`command not found: ${cmd}`, "err"), L("Type 'help' to see everything available.", "dim")]);
  }

  if (key !== "clear") appendLines([L("")]);
  renderNewInputLine();
}

let activeInputLine = null;
function renderNewInputLine(){
  const row = document.createElement("div");
  row.className = "input-line";
  row.innerHTML = `<span class="prompt-tag">manoj@chennai</span><span class="prompt-sep">:</span><span class="prompt-path">~</span><span class="prompt-sep">%</span><span class="typed" id="live-typed"></span><span class="cursor"></span>`;
  body.appendChild(row);
  activeInputLine = row;
  scrollToBottom();
}

function updateLiveTyped(){
  const el = document.getElementById("live-typed");
  if (el) el.textContent = hiddenInput.value;
}

document.querySelector(".term-body").addEventListener("click", () => hiddenInput.focus());
window.addEventListener("load", () => hiddenInput.focus());

hiddenInput.addEventListener("input", updateLiveTyped);

hiddenInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){
    const val = hiddenInput.value;
    hiddenInput.value = "";
    if (activeInputLine) activeInputLine.remove();
    runCommand(val);
  } else if (e.key === "ArrowUp"){
    e.preventDefault();
    if (state.historyIndex > 0){
      state.historyIndex--;
      hiddenInput.value = state.history[state.historyIndex];
      updateLiveTyped();
    }
  } else if (e.key === "ArrowDown"){
    e.preventDefault();
    if (state.historyIndex < state.history.length - 1){
      state.historyIndex++;
      hiddenInput.value = state.history[state.historyIndex];
    } else {
      state.historyIndex = state.history.length;
      hiddenInput.value = "";
    }
    updateLiveTyped();
  } else if (e.key === "Tab"){
    e.preventDefault();
    const partial = hiddenInput.value.toLowerCase();
    if (!partial) return;
    const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
    if (matches.length === 1){
      hiddenInput.value = matches[0] + " ";
      updateLiveTyped();
    } else if (matches.length > 1 && activeInputLine){
      appendLines([L(matches.join("   "), "dim")]);
      scrollToBottom();
    }
  }
});

/* ---- Menu bar clock ---- */
function updateClock(){
  const now = new Date();
  const opts = { hour: "2-digit", minute: "2-digit", weekday: "short", day: "numeric", month: "short" };
  document.getElementById("mb-clock").textContent = now.toLocaleString("en-IN", opts);
}
updateClock();
setInterval(updateClock, 1000 * 30);

/* ---- Traffic light behavior ---- */
const win = document.getElementById("term-window");

document.getElementById("tl-close").addEventListener("click", () => {
  win.classList.add("shake");
  setTimeout(() => win.classList.remove("shake"), 400);
  appendLines([L(""), L("You can't actually close this one — refresh the page if you really want to leave. 👋", "warn")]);
  scrollToBottom();
});

document.getElementById("tl-min").addEventListener("click", () => {
  win.classList.toggle("minimized");
});

document.getElementById("tl-zoom").addEventListener("click", () => {
  win.classList.toggle("fullscreen");
});

/* ---- Boot sequence ---- */
appendLines([
  { html: `<pre class="banner-line">${BANNER}</pre>` },
  L(""),
  L(`${DATA.profile.title}`, "dim"),
  L(`${DATA.profile.location}`, "dim"),
  L(""),
  L("Type 'help' to see what this terminal can do.", "accent"),
  L(""),
]);
renderNewInputLine();
