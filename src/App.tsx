import Card from "./modules/shared/components/Card";
import MainTemplate from "./modules/shared/components/MainTemplate";
import data from "./assets/verbs.json";
import { Show, createEffect, createSignal } from "solid-js";
import render from "./modules/shared/util/render";
import CardInterface from "./modules/shared/interfaces/Card";
import EvaluationButton from "./modules/shared/components/EvaluationButton";
import JSConfetti from "js-confetti";

function App() {
  const [seconds, setSeconds] = createSignal<number>(0);
  let timer: number = 0;
  const [score, setScore] = createSignal<number>(0);
  const [cards, setCards] = createSignal<CardInterface[]>([]);
  const [card, setCard] = createSignal<CardInterface | null>(null);
  const [status, setStatus] = createSignal(Card.Status.Front);
  const {
    templates,
    cards: rawCards,
  }: { templates: Record<string, string>; cards: CardInterface[] } = data;

  const init = () => {
    setCards(
      rawCards.map((card: CardInterface) => {
        card.evaluation = 2;
        card.front.render = render(
          templates[card.front.template],
          card.front.data
        );
        card.back.render = render(
          templates[card.back.template],
          card.back.data
        );
        return card;
      })
    );
    setRandomCard();
    setSeconds(0);
    timer = setInterval(() => setSeconds((seconds) => seconds + 1), 1000);
  };

  createEffect(() => {
    if (card()) {
      console.log(cards().map(({ id, evaluation }) => ({ id, evaluation })));
    }
    return () => {
      clearInterval(timer);
    };
  });

  const setRandomCard = () => {
    setStatus(Card.Status.Front);
    setCard(getCard());
  };

  const shuffleCards = () => {
    setCards((cards) => cards.sort(() => Math.random() - 0.5));
  };

  const getCard = () => {
    shuffleCards();
    console.log(cards().map(({ id, evaluation }) => ({ id, evaluation })));
    const total = cards().reduce((acc, card) => acc + card.evaluation!, 0);
    setScore(cards().length * 4 - total);
    if (total === 0) {
      clearInterval(timer);
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
      return null;
    }
    let random = Math.random() * total;
    for (const card of cards()) {
      random -= card.evaluation!;
      if (random <= 0) {
        return card;
      }
    }
    return null;
  };

  const flipCard = () => {
    setStatus(Card.Status.Back);
  };

  const evaluateCard = (evaluation: number) => {
    card()!.evaluation = evaluation;
  };

  init();
  return (
    <>
      <MainTemplate>
        <span class="flex flex-col items-center font-bold font-mono text-white">
          <span>score</span>
          <span class="text-3xl">
            {score()}/{cards().length * 4}
          </span>
        </span>
        <span class="text-white">
          <span
            class="font-bold font-mono"
            classList={{ "text-5xl": !!card(), "text-8xl": !card() }}
          >
            {seconds()}
          </span>
          <span>s</span>
        </span>
        {card() && (
          <Card
            size="md"
            status={status}
            setStatus={setStatus}
            onClick={flipCard}
          >
            <Card.Front>
              <div innerHTML={card()!.front.render}></div>
            </Card.Front>
            <Card.Back>
              <div innerHTML={card()!.back.render}></div>
            </Card.Back>
          </Card>
        )}
        <div
          class="flex gap-2"
          classList={{ "opacity-0": status() === Card.Status.Front }}
        >
          <EvaluationButton
            disabled={status() === Card.Status.Front}
            onClick={() => {
              evaluateCard(4);
              setRandomCard();
            }}
            type={EvaluationButton.Type.VeryBad}
          />
          <EvaluationButton
            disabled={status() === Card.Status.Front}
            onClick={() => {
              evaluateCard(3);
              setRandomCard();
            }}
            type={EvaluationButton.Type.Bad}
          />
          <EvaluationButton
            disabled={status() === Card.Status.Front}
            onClick={() => {
              evaluateCard(2);
              setRandomCard();
            }}
            type={EvaluationButton.Type.Normal}
          />
          <EvaluationButton
            disabled={status() === Card.Status.Front}
            onClick={() => {
              evaluateCard(1);
              setRandomCard();
            }}
            type={EvaluationButton.Type.Good}
          />
          <EvaluationButton
            disabled={status() === Card.Status.Front}
            onClick={() => {
              evaluateCard(0);
              setRandomCard();
            }}
            type={EvaluationButton.Type.VeryGood}
          />
        </div>
        <Show when={!card()}>
          <span class="mb-10 text-8xl text-white">Congratulations!</span>
          <button
            class="bg-white px-10 py-2 rounded-lg text-4xl text-black"
            onClick={init}
          >
            Reset
          </button>
        </Show>
      </MainTemplate>
    </>
  );
}

export default App;
