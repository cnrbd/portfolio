type AboutProps = {
    current: string;
}

export const ContactPage: React.FC<AboutProps> = ({ current }) => {
    return (
      <div
        id="contact-container"
        className={`${
          current == "Contact" ? "flex opacity-100" : "hidden opacity-0"
        }`}
      >
        <span id="contact-body">
          <span id="contact-header">Contact</span>
          Personal Email: phuoc.uonggg@gmail.com <br />
          School Email: kuong3@gatech.edu <br />
          <br />
          <p>Feel free to contact me with any of the emails above!!</p>
          <br />
          <span className="font-bold">
            Github:{" "}
            <a
              href="https://github.com/cnrbd"
              className="hover:text-gray-300 font-normal"
            >
              https://github.com/cnrbd
            </a>
          </span>
          <span className="font-bold">
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/phuoc-connor-uong/"
              className="hover:text-gray-300 font-normal"
            >
              https://www.linkedin.com/in/phuoc-connor-uong/
            </a>
          </span>
        </span>
      </div>
    );
}