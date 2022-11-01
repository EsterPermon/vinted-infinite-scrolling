import GalleryContainer from "./containers/Gallery";
import { PaginationProvider } from "./contexts/PaginationContext";

function App() {
  return (
    <PaginationProvider>
      <GalleryContainer />
    </PaginationProvider>
  );
}

export default App;
