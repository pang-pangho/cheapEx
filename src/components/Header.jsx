import React from "react";
import "./Header.scss";

const Header = ({ currencies, selectedCurrency, setSelectedCurrency }) => {
  return (
    <header className="header">
      <nav className="header__nav">
        {currencies.map((currency) => (
          <button
            key={currency.code}
            className={`header__button ${
              selectedCurrency === currency.code ? "header__button--active" : ""
            }`}
            onClick={() => setSelectedCurrency(currency.code)}
          >
            {currency.name} ({currency.code})
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
