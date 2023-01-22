import "./App.css";
import { ContactsList } from "./ContactsList/ContactsList";
import { CONTACTS } from "./Contacts";

function App() {
  return (
    <div className="App">
      <ContactsList contactsList={CONTACTS} />
    </div>
  );
}

export default App;

// App does not fill whole screen (vertically), meaning it has wasted space
