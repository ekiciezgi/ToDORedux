import Header from "./components/todo/header.jsx";
import "./App.css"
import Content from "./components/todo/Content.jsx"
import Footer from "./components/todo/Footer.jsx";
function App() {
  return (
    <div >
     
     <section className="todoapp">
       <Header/>
       <Content/>
     </section>
     <Footer/>
    </div>
  );
}

export default App;
