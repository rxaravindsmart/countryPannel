import { Button } from "react-bootstrap";
import { Facebook, Linkedin, Twitter, Youtube } from "react-bootstrap-icons";

const FooterBar = () => {
  return (
    <>
      <div className="flex-center mb-5 mt-5">
        {[Facebook, Twitter, Linkedin, Youtube].map((Icon, idx) => (
          <Button key={idx} className="button-accounts">
            <Icon className="icon" />
          </Button>
        ))}
      </div>
      <div className="text-center">
        <h6 className="mt-4">example@email.com</h6>
        <h6 className="mt-4 mb-5">Copyright © 2020 Name.All rights reserved</h6>
      </div>
    </>
  );
};

export default FooterBar;
