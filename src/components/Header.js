import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип сайта Место" />
      {props.children}
    </header>
  );
}

export default Header;
