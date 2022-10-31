import GalleryContainer from "./containers/GalleryContainer";
import { PaginationProvider } from "./contexts/PaginationContext";

function App() {
  return (
    <PaginationProvider>
      <GalleryContainer />
    </PaginationProvider>
  );
}

export default App;
