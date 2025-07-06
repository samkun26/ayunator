const questions = [
  "その人のことを考えると胸が高鳴りますか？",
  "朝起きて最初に思い浮かぶのはその人ですか？",
  "目が合ったとき、時間が止まった気がしましたか？",
  "LINEの通知が来るたびに、その人だったらいいのにと思いますか？",
  "寂しいとき、思い浮かぶのはその人ですか？",
  "その人が笑うと、つられて笑ってしまいますか？",
  "その人と話すと、うまく呼吸できない気がしますか？",
  "ふとした瞬間に、その人のことを考えている自分に気づきますか？",
  "夢に出てきたことがありますか？",
  "その人の存在が、あなたの人生を変えたと思いますか？",
];

const osawaImages = Array.from({ length: 10 }, (_, i) => `assets/osawa${i + 1}.jpg`);
const ayumyonImages = Array.from({ length: 5 }, (_, i) => `assets/ayumyon${i + 1}.png`);
const loveMessages = [
  "「あなたの心にいつもいるよ♡」",
  "「運命、感じちゃったね♡」",
  "「好きって気持ちは止まらないよ♡」",
  "「ずっとそばにいてね♡」",
  "「次に会えたら、ぎゅってしてもいい？♡」"
];

let questionIndex = 0;
let maxTurns = 3 + Math.floor(Math.random() * 2); // 3〜4問で終了
let usedQuestions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function typeText(text, targetElement, callback) {
  let i = 0;
  targetElement.textContent = '';
  const interval = setInterval(() => {
    targetElement.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 40);
}

function showThinking(callback) {
  const bubble = document.getElementById("question-text");
  bubble.textContent = "・・・考え中・・・";
  setTimeout(callback, 800);
}

function nextQuestion() {
  if (questionIndex >= maxTurns) {
    showResult();
    return;
  }

  showThinking(() => {
    const remaining = questions.filter(q => !usedQuestions.includes(q));
    const nextQ = remaining[Math.floor(Math.random() * remaining.length)];
    usedQuestions.push(nextQ);

    document.getElementById("question-count").textContent = `質問 ${questionIndex + 1} / ${maxTurns}`;
    typeText(nextQ, document.getElementById("question-text"));

    document.getElementById("osawa-image").src = shuffle(osawaImages)[0];
    questionIndex++;
  });
}

function showResult() {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("ayumyon-img").src = shuffle(ayumyonImages)[0];
  document.getElementById("love-message").textContent = shuffle(loveMessages)[0];

  document.getElementById("bgm").pause();
  document.getElementById("bgm").currentTime = 0;

  const clearSound = document.getElementById("clear-sound");
  clearSound.volume = 0.8;
  clearSound.play();

  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent("アユネーターであゆみょんに会えた♡");
  document.getElementById("share-x").href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  document.getElementById("share-line").href = `https://social-plugins.line.me/lineit/share?url=${url}`;
  document.getElementById("share-insta").href = `https://www.instagram.com/`; // Instagramは直接シェア不可
}

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("game-screen").classList.remove("hidden");

  document.getElementById("bgm").volume = 0.6;
  document.getElementById("bgm").play();

  questionIndex = 0;
  maxTurns = 3 + Math.floor(Math.random() * 2);
  usedQuestions = [];
  nextQuestion();
});

document.querySelectorAll(".answer").forEach(btn => {
  btn.addEventListener("click", () => {
    const click = document.getElementById("click-sound");
    click.currentTime = 0;
    click.play();
    nextQuestion();
  });
});

document.getElementById("restart-button").addEventListener("click", () => {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  document.getElementById("clear-sound").pause();
  document.getElementById("clear-sound").currentTime = 0;

  document.getElementById("bgm").play();

  questionIndex = 0;
  maxTurns = 3 + Math.floor(Math.random() * 2);
  usedQuestions = [];
  nextQuestion();
});
