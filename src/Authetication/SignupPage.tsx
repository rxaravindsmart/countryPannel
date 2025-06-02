import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { AuthActions } from "../state/Authentication/Action";
import { connect } from "react-redux";
import { AuthState } from "../state/Authentication/Reducer";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignUpPage = (props: any) => {
  const {
    authState,
    setUserList,
    setActiveUser,
  }: {
    authState: AuthState;
    setUserList: (data: any) => any;
    setActiveUser: (data: any) => any;
  } = props;
  const [form, setForm] = useState({
<<<<<<< HEAD
    userName: "",
    password: "",
    confirmPassword: "",
=======
    userName: "abcd@gmail.com",
    password: "Aravind@123",
    confirmPassword: "Aravind@123",
>>>>>>> 0d62f57cdbdd0a91a9ead12edaa9a4a8a88ecc4a
    isValid: false,
  });
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    userName: false,
    password: false,
    confirmPassword: false,
  });

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
    if (name === "userName" && !validateEmail(value)) {
      return "Enter a valid email.";
    }
    if (name === "password" && !validatePassword(value)) {
      return "Min 8 chars, 1 capital, 1 number, 1 symbol.";
    }
    if (name === "confirmPassword" && value !== form.password) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    if (
      touched[name as keyof typeof touched] &&
      typeof fieldValue === "string"
    ) {
      const error = validate(name, fieldValue);

      setErrors((prev) => ({
        ...prev,
        [name]: error,
        ...(name === "password"
          ? {
              confirmPassword: validate(
                "confirmPassword",
                form.confirmPassword
              ),
            }
          : {}),
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
    validateEmail(form.userName) &&
    validatePassword(form.password) &&
    form.isValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userNameError = validate("userName", form.userName);
    const passwordError = validate("password", form.password);
    const confirmPasswordError = validate(
      "confirmPassword",
      form.confirmPassword
    );
    setErrors({
      userName: userNameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!userNameError && !passwordError && !confirmPasswordError) {
      const updatedList = authState.userList.some(
        (obj) => obj.userName === form.userName
      );
      if (!updatedList) {
        const { userName, password } = form;
        const newUser = { userName, password, isUserLoggedIn: true };
        setUserList([...authState.userList, newUser]);
        setActiveUser(newUser);
        setTimeout(() => {
          navigate("/dashboard");
        }, 0);
      } else {
        toast.error("The User Account Already Exist");
      }
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row>
          <Col xl={5} md={6} sm={12}>
            <div className="login-contents mb-4">
              <h1 className="mb-3 title">Sign Up</h1>
              <p className="mb-3 black">
                Login !{" "}
                <Link className="blue" to="/sign-in">
                  Click here.
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
                    name="userName"
                    placeholder="Email"
                    className="form-fields"
                    value={form.userName}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    isInvalid={touched.userName && !!errors.userName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.userName}
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

                <Form.Group
                  controlId="formConfirmPassword"
                  className="mb-4 password-toggle-container"
                >
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-fields"
                    value={form.confirmPassword}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
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
                  label="Agree to Sign Up"
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
                  Sing Up
                </Button>
              </Form>
            </div>
          </Col>
          <Col xl={7} md={6}>
            <div className="right-content">
              <img src="/Sign-up.svg" alt="Sign In" className="sign-Up-image" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export default SignUpPage;

const mapStateToProps = (state: any): any => ({
  authState: state.authState,
});

const mapDispatchToProps = (dispatch: any): any => ({
  setUserList: (user: any) => dispatch(AuthActions.setSignUpStatus(user)),
  setActiveUser: (user: any) => dispatch(AuthActions.setActiveUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
