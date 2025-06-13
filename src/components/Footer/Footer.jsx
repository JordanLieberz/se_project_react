import "./Footer.css";
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__developer">
        Developed by Jordan Lieberz <span>{currentYear}</span>
      </p>
    </footer>
  );
}
export default Footer;
