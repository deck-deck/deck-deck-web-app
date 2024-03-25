import Card from "./modules/shared/components/Card";
import MainTemplate from "./modules/shared/components/MainTemplate";

function App() {
  return (
    <>
      <MainTemplate>
        <Card size="md">
          <Card.Front>
            <span class="font-bold text-4xl">spanish</span>
          </Card.Front>
          <Card.Back>
            <dl class="flex flex-col items-center">
              <dt class="font-mono text-sm">present</dt>
              <dd class="mb-5 font-bold text-xl">present</dd>
              <dt class="font-mono text-sm">simple past</dt>
              <dd class="mb-5 font-bold text-xl">simplePast</dd>
              <dt class="font-mono text-sm">past participle</dt>
              <dd class="font-bold text-xl">pastParticiple</dd>
            </dl>
          </Card.Back>
        </Card>
      </MainTemplate>
    </>
  );
}

export default App;
