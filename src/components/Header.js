import logoPath from "./../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        className="header__group-logo"
        src={logoPath}
        alt="логотип сайта место"
      />
    </header>
  );
}

export default Header;
