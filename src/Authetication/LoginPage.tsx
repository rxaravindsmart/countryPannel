import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import {
  Facebook,
  Google,
  Linkedin,
  Twitter,
  Eye,
  EyeSlash,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router";
import { AuthActions } from "../state/Authentication/Action";
import { connect } from "react-redux";
import { AuthState } from "../state/Authentication/Reducer";
import { toast } from "react-toastify";

const LoginPage = (props: any) => {
  const {
    authState,
    setActiveUser,
  }: { authState: AuthState; setActiveUser: (data: any) => void } = props;
  const [form, setForm] = useState({
    username: "",
    password: "",
    isValid: false,
  });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [touched, setTouched] = useState({ username: false, password: false });
  const [submittedError, setSubmittedError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,150}$/.test(
      password
    );

  const validate = (name: string, value: string) => {
    if (name === "username" && !validateEmail(value)) {
      return "Enter a valid email.";
    }
    if (name === "password" && !validatePassword(value)) {
      return "Min 8 chars, 1 capital, 1 number, 1 symbol.";
    }
    return "";
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    // Only validate string fields
    if (
      touched[name as keyof typeof touched] &&
      typeof fieldValue === "string"
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: validate(name, fieldValue),
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  const isFormValid =
    validateEmail(form.username) &&
    validatePassword(form.password) &&
    form.isValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validate("username", form.username);
    const passwordError = validate("password", form.password);
    setErrors({ username: usernameError, password: passwordError });

    if (!usernameError && !passwordError) {
      const { username, password } = form;
      const userMatch = authState.userList.some(
        (obj) => obj.userName === username
      );
      const passwordMatch = authState.userList.some(
        (obj) => obj.password === password
      );
      if (userMatch && passwordMatch) {
        const { username, password } = form;
        const newUser = { username, password, isUserLoggedIn: true };
        setActiveUser(newUser);
        setTimeout(() => {
          navigate("/dashboard");
        }, 0);
      } else if (!passwordMatch) {
        toast.error("The username or password is incorrect");
      } else {
        toast.error("The User is Not Found");
      }
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row>
          <Col xl={5} md={6} sm={12}>
            <div className="login-contents mb-4">
              <h1 className="mb-3 title">Sign In</h1>
              <p className="mb-3 black">
                New User?{" "}
                <Link className="blue" to="/sign-up">
                  Create an Account
                </Link>
              </p>
              {submittedError && (
                <Alert variant="danger">{submittedError}</Alert>
              )}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-4">
                  <Form.Control
                    required
                    type="email"
                    name="username"
                    placeholder="Email"
                    className="form-fields"
                    value={form.username}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="formPassword"
                  className="mb-4 password-toggle-container"
                >
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="form-fields"
                    value={form.password}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-icon"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </div>
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="Keep me signed in"
                  name="isValid"
                  checked={form.isValid}
                  onChange={handleInput}
                  className="mb-4 mt-3"
                />

                <Button
                  type="submit"
                  className="submit-btn mt-2"
                  variant="none"
                  disabled={!isFormValid}
                >
                  Login
                </Button>
              </Form>

              <div className="flex-center mt-4 mb-4">
                <hr className="line" />
                <p className="text">Or Sign In With</p>
                <hr className="line" />
              </div>
              <div className="flex-center">
                {[Google, Facebook, Linkedin, Twitter].map((Icon, idx) => (
                  <Button key={idx} className="button-accounts">
                    <Icon className="icon" />
                  </Button>
                ))}
              </div>
            </div>
          </Col>
          <Col xl={7} md={6}>
            <div className="right-content">
              <img src="/Sign-In.png" alt="Sign In" className="sign-in-image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export default LoginPage;

const mapStateToProps = (state: any): any => ({
  authState: state.authState,
});

const mapDispatchToProps = (dispatch: any): any => ({
  setActiveUser: (user: any) => dispatch(AuthActions.setActiveUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
