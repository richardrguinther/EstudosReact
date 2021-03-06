// Os links abaixo puxam dados de um produto em formato JSON
// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook
// Crie uma interface com 3 botões, um para cada produto.
// Ao clicar no botão faça um fetch a api e mostre os dados do produto na tela.
// Mostre apenas um produto por vez
// Mostre a mensagem carregando... enquanto o fetch é realizado

import React from "react";
import Display from "./ExercicioUseState/Display";
import Header from "./ExercicioUseState/Header";
import Product from "./ExercicioUseState/Product";
import Home from "./ExercicioUseState/Home";

const App = () => {
  const products = ["tablet", "smartphone", "notebook"];
  const [loading, setLoading] = React.useState(null);
  const [activeProduct, setActiveProduct] = React.useState(null);

  const { pathname } = window.location;

  async function handleClick(e) {
    let productName = e.target.innerText;

    setLoading(true);

    let response = await fetch(
      `https://ranekapi.origamid.dev/json/api/produto/${productName}`
    );

    let product = await response.json();
    setActiveProduct(product);
    setLoading(false);
  }

  return (
    <>
      <Header />
      {pathname === "/" && <Home />}
      {pathname === "/products" && <h3>Produtos</h3> &&
        products.map((product) => (
          <Product key={product} handleClick={handleClick} product={product} />
        ))}
      {/* {pathname !== "/" && <h3>Produtos</h3>} */}
      {loading && <p>Carregando...</p>}
      {!loading && activeProduct && (
        <Display key={activeProduct.id} product={activeProduct} />
      )}
    </>
  );
};

export default App;
