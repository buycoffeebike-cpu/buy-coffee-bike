import CoffeeBikePage from '../components/BuyPage';
import BuyPageSchema from '../components/BuyPageSchema';

// The sales page. Its metadata lives in the root layout; its structured data (components/BuyPageSchema) is printed here,
// on the server, so Google sees it once.
export default function Page() {
  return (
    <>
      <BuyPageSchema />
      <CoffeeBikePage />
    </>
  );
}
