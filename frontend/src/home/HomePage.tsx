import Header from "./1.Header";
import CardsHeader from "./2.CardsHeader";
import About from "./3.About";
import LocationSection from "./4.Adress";
import Reservations from "./5.Reservations";

function HomePage() {
  return (
    <main>
      <Header />
      <CardsHeader />
      <About />
      <Reservations />
      <LocationSection />
    </main>
  );
}

export default HomePage;
