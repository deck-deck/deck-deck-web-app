import Card from "./modules/shared/components/Card";
import MainTemplate from "./modules/shared/components/MainTemplate";

function App() {
  return (
    <>
      <MainTemplate>
        <Card size="md">
          <Card.Front>
            <h1 class="block font-bold text-2xl text-center">Front</h1>
          </Card.Front>
          <Card.Back>
            <h1 class="font-bold text-2xl text-center">Back</h1>
          </Card.Back>
        </Card>
      </MainTemplate>
    </>
  );
}

export default App;
