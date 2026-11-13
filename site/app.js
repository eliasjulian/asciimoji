// Same order as the grid in components/contentgrid.js.
const emoji = [
  "¯＼_(ツ)_／¯",
  "ʕ·͡ᴥ·ʔ",
  "•`_´•",
  "( •͡˘ _•͡˘)ノð",
  "ツ",
  "( ͡° ͜ʖ ͡°)",
  "ಠ_ಠ",
  "( •_•)",
  "(⌐■_■)",
  "༼ つ ◕_◕ ༽つ",
  "ʕ•ᴥ•ʔ",
  "•ᴗ•",
  "(╯°□°)╯︵",
  "ಠᴗಠ",
  "(•̀ᴗ•́)و ̑̑",
  "ฅ^•ﻌ•^ฅ",
  "ಥ_ಥ",
  "◕_◕",
  "[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",
  "(づ￣ ³￣)づ",
  "(⊙_☉)",
  "ლ(ಠ_ಠლ)",
  "ᕦ(ò_óˇ)ᕤ",
  "(ง •̀_•́)ง",
  "(ﾉ◕ヮ◕)ﾉ*:",
  "ʘ‿ʘ",
  "( ˇ෴ˇ )",
  "( ˘ ³˘)♥",
  "(◕‿◕✿)",
  "(~‾▿‾)~",
  "(╥_╥)",
  "(☉_☉)",
  "(=ↀωↀ=)",
  "ᕙ(⇀‸↼‶)ᕗ",
  "V●ᴥ●V",
  "◔_◔",
  "¯＼_(⊙_ʖ⊙)_／¯",
  "(/•-•)/",
  "｡^‿^｡",
  "(●__●)",
  "ヽ(。_°)ノ",
  "(◍•﹏•)",
  "ヽ(ﾟДﾟ)ﾉ",
  "(ᴗ˳ᴗ)",
  "(•̀o•́)ง",
  "¯＼_( ͡° ͜ʖ ͡°)_／¯",
  "ヽ(°◇° )ノ",
  "┌П┐(ಠ_ಠ)",
  "(◕ω◕)♡",
  "ヾ(⌐■_■)ノ♪",
  "ヾ(^_^ )ゞ",
  "( ͡° ͜ʖ ( ͡° ͜ʖ ͡°) ͜ʖ ͡°)",
  "(‘◉⌓◉’)",
  "༼つಠ益ಠ༽つ",
  "(°o°)",
  "※＼(^o^)／※",
  "(✜︵✜)",
  "୧(▲ᴗ▲)ノ",
  "♥‿♥",
  "ʕ •́؈•̀)"
];

const button = document.querySelector("#cycle");
const START_SIZE = 24;
let index = -1;

// Sizes are measured off-screen so the button's font-size transition
// can't feed a half-animated width back into the fit calculation.
const ruler = document.createElement("span");
ruler.setAttribute("aria-hidden", "true");
ruler.className = "ruler";
document.body.appendChild(ruler);

function largestSize() {
  const { clientWidth, clientHeight } = document.documentElement;
  const byViewport = Math.min(clientWidth * 0.14, clientHeight * 0.22);
  return Math.min(200, Math.max(96, byViewport));
}

function sizeFor(step) {
  const max = largestSize();
  return START_SIZE + ((max - START_SIZE) * step) / (emoji.length - 1);
}

function fitted(text, target) {
  const style = getComputedStyle(button);
  const room =
    document.documentElement.clientWidth -
    48 -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight);
  ruler.textContent = text;
  const widthAt100 = ruler.getBoundingClientRect().width;
  if (!widthAt100) return target;
  return Math.min(target, Math.floor((100 * room) / widthAt100));
}

function render() {
  const text = emoji[index];
  button.textContent = text;
  button.setAttribute("aria-label", text + ". Show the next ascii emoji");
  button.style.fontSize = fitted(text, sizeFor(index)) + "px";
}

button.addEventListener("click", () => {
  index = (index + 1) % emoji.length;
  render();
});

window.addEventListener("resize", () => {
  if (index >= 0) render();
});
