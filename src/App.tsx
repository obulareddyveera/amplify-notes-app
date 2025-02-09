import { Route, Routes } from "react-router-dom";
import ListNotesPage from "./pages/list-notes";
import NavbarComponent from "./components/navbar.component";
import NotesFormPage from "./pages/notes-form";

function App() {
  return (
    <>
      <NavbarComponent />
      <main className="w-screen h-screen bg-gray-50">
        <section className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<ListNotesPage />} />
            <Route path="/form/:id" element={<NotesFormPage />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
