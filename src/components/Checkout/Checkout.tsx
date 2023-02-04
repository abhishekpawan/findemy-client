import { useEffect, useState } from "react";
import { IoMdLock } from "react-icons/io";
import { showNotification } from "../../utils/ToastNotification";
import findemy_UPI_QR from "../../assets/img/findemy_upi_qr.png";
import CheckoutCourse from "./CheckoutCourse";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FindemyLogo from "../../assets/img/Findemy.png";
import CheckoutCompleteModal from "./CheckoutCompleteModal";
import CheckoutSummary from "./CheckoutSummary";

import "./checkout.css";
import { useAppSelector } from "../../redux/store/store";
import { selectStatus } from "../../redux/reducers/cart.reducer";
import CheckoutLoader from "./CheckoutLoader";

export type CardDetails = {
  countey: string;
  state: string;
  nameOnCard: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  paymentMenthod: {};
};

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardDetails>();
  let card_regex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  let expiry_regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

  const status = useAppSelector(selectStatus);
  const { cartCourses } = useAppSelector((store) => store.cartCourses);
  const [cardDetailsIsValid, setCardDetailsIsValid] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<CardDetails>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let totalOriginalPrice: number = 0;
  let totalDiscounts: number = 0;
  let totalPrice: number = 0;

  for (let i = 0; i < cartCourses.length; i++) {
    totalOriginalPrice = totalOriginalPrice + cartCourses[i]?.original_price;
    totalPrice = totalPrice + cartCourses[i]?.discounted_price;
  }

  totalDiscounts = totalOriginalPrice - totalPrice;

  const onSubmit: SubmitHandler<CardDetails> = async (data) => {
    setCardDetailsIsValid(true);

    setCardDetails(data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (cartCourses.length! === 0) {
      showNotification(
        "info",
        "Your cart is empty. Please add courses to your cart before proceding to checkout!"
      );
      navigate("/");
    }
  }, []);

  return (
    <>
      <header className="d-flex align-items-center justify-content-between px-2 px-md-5">
        <div className="header__logo ps-4 ps-md-0">
          <Link className="me-3" to="/">
            <img className="ms-0" src={FindemyLogo} alt="findemy-logo" />
          </Link>
        </div>
        <div className="me-2">
          <Link to="/cart">cancel</Link>
        </div>
      </header>
      {status === "loading" ? (
        <CheckoutLoader />
      ) : (
        <main className="checkout-page">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="checkout-form"
          >
            <div className="col-12 col-lg-7 mb-5">
              <div className="payment col-12 me-lg-0 m-auto">
                <h1 className="fw-bold ">Checkout</h1>
                <h2 className="fw-bold fs-2 mb-4">Billing address</h2>
                <div className="row mb-2">
                  <div className="col-12 col-sm-6 d-flex flex-column">
                    <label
                      className="fw-bold fs-5 pb-2 d-flex justify-content-between"
                      htmlFor="country"
                    >
                      Country <span className="fw-normal">Required</span>
                    </label>
                    <select name="country" id="country">
                      <option value="India">India</option>
                    </select>
                  </div>
                  <div className="col-12 col-sm-6 d-flex flex-column">
                    <label
                      className="fw-bold fs-5 pb-2 d-flex justify-content-between"
                      htmlFor="state"
                    >
                      State / Union Territory{" "}
                      <span className="fw-normal">Required</span>
                    </label>
                    <select
                      defaultValue={"Please select..."}
                      id="state"
                      {...register("state", {
                        required: true,
                      })}
                    >
                      <option value="" disabled>
                        Please select...
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Andaman and Nicobar Islands">
                        Andaman and Nicobar Islands
                      </option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Dadar and Nagar Haveli">
                        Dadar and Nagar Haveli
                      </option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">
                        Jammu and Kashmir
                      </option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                    <p role="alert">
                      {errors.state && (
                        <span className="mb-3 text-danger">
                          Please select your current state/union territory!
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="fs-5">
                  Udemy is required by law to collect applicable transaction
                  taxes for purchases made in certain tax jurisdictions.
                </div>
                <div className="mt-5 d-flex justify-content-between">
                  <h2 className="fw-bold fs-2 mb-0">Payment Method</h2>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="fs-5">Secured connection</span>
                    <IoMdLock />
                  </div>
                </div>

                <div
                  className="accordion accordion-flush my-4"
                  id="accordionWithRadioExample"
                >
                  <div className="accordion-item upi">
                    <h2 className="accordion-header custom-control custom-radio d-flex align-items-center">
                      <input
                        type="radio"
                        id="customRadio1"
                        // name="customRadio"
                        aria-controls="collapseOne"
                        className="custom-control-input"
                        {...register("paymentMenthod", {
                          required: true,
                        })}
                      />
                      <img
                        className="ms-3"
                        src="https://www.udemy.com/staticx/udemy/images/v9/common-upi.svg"
                        alt="upi"
                      />
                      <div
                        className="accordion-opner"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                      >
                        <label
                          className=" fw-bold fs-4  "
                          htmlFor="customRadio1"
                        >
                          UPI
                        </label>
                      </div>
                    </h2>

                    <div
                      id="collapseOne"
                      className="accordion-collapse  collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionWithRadioExample"
                    >
                      <div className="accordion-body">
                        <div className="row justify-content-between">
                          <div className="col-12 col-md-5 d-flex flex-column p-">
                            <p className="fs-4">
                              Enter your UPI ID / VPA and make payment on your
                              UPI app.
                            </p>
                            <label
                              htmlFor="upi-id"
                              className="fw-bold fs-4 mb-2"
                            >
                              UPI ID / VPA
                            </label>
                            <input
                              className="p-3"
                              type="text"
                              id="upi-id"
                              placeholder="UPI ID / VPA"
                            />
                            <button className="upi_payment-btn mt-3 p-3 fw-bold">
                              Make Payment
                            </button>
                          </div>
                          <div className="or col-2">
                            <div>or</div>
                          </div>
                          <div className="col-12 col-md-5">
                            <p className="fs-4">
                              Scan QR code to complete your UPI payment on your
                              mobile device.
                            </p>
                            <div className="d-flex align-items-center justify-content-center">
                              <img
                                className="qr"
                                src={findemy_UPI_QR}
                                alt="upi-payment-qr-code"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header custom-control custom-radio d-flex justify-content-between ">
                      <span>
                        <input
                          type="radio"
                          id="customRadio2"
                          checked
                          // name="customRadio"
                          className="custom-control-input"
                          {...register("paymentMenthod", {
                            required: true,
                          })}
                        />
                        <img
                          className="ms-3"
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-default.svg"
                          alt="card"
                        />

                        <div
                          className="accordion-opner"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                        >
                          <label
                            className=" fw-bold fs-4  "
                            htmlFor="customRadio2"
                          >
                            Credit/Debit Card
                          </label>
                        </div>
                      </span>

                      <span className="d-none d-sm-block">
                        <img
                          className="me-1"
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg
                    "
                          alt="wallet"
                        />
                        <img
                          className="me-1"
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg"
                          alt="wallet"
                        />
                        <img
                          className="me-1"
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg"
                          alt="wallet"
                        />
                        <img
                          className="me-1"
                          src="	https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg
                    "
                          alt="wallet"
                        />
                        <img
                          className="me-1"
                          src="https://www.udemy.com/staticx/udemy/images/v9/card-rupay.svg"
                          alt="wallet"
                        />
                      </span>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionWithRadioExample"
                    >
                      <div className="accordion-body card">
                        <div className="row">
                          <div className="col-12 d-flex flex-column mb-4">
                            <label className="fw-bold fs-4 mb-3" htmlFor="name">
                              Name on card
                            </label>
                            <input
                              className="fs-4 p-3"
                              type="text"
                              id="name"
                              placeholder="Name on card"
                              {...register("nameOnCard", {
                                required: true,
                              })}
                            />
                            <p role="alert">
                              {errors.nameOnCard && (
                                <span className="mb-3 text-danger">
                                  Please enter your name!
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="col-12 d-flex flex-column mb-4">
                            <label className="fw-bold fs-4 mb-3" htmlFor="card">
                              Card number
                            </label>
                            <input
                              className="fs-4 p-3"
                              type="number"
                              id="card"
                              placeholder="0000 0000 0000 0000"
                              {...register("cardNumber", {
                                required: true,
                                pattern: card_regex,
                              })}
                            />
                            <p role="alert">
                              {errors.cardNumber && (
                                <span className="mb-3 text-danger">
                                  Please enter any valid Visa, Mastercard, Amex,
                                  Dinners Club or Rupay Credit or Debit Card
                                  Number!
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="row mb-4 pe-0">
                            <div className="col-12 col-sm-6 d-flex flex-column mb-4 mb-sm-0">
                              <label
                                className="fw-bold fs-4 mb-3"
                                htmlFor="cvv"
                              >
                                CVC / CVV
                              </label>
                              <input
                                className="fs-4 p-3"
                                type="password"
                                id="cvv"
                                placeholder="CVV"
                                {...register("cvv", {
                                  required: true,
                                  minLength: 3,
                                  maxLength: 4,
                                })}
                              />
                              <p role="alert">
                                {errors.cvv && (
                                  <span className="mb-3 text-danger">
                                    Please enter a valid CVV or CVC number!
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="col-12 col-sm-6 d-flex flex-column pe-0 mb-4 mb-sm-0">
                              <label
                                className="fw-bold fs-4 mb-3"
                                htmlFor="expiry"
                              >
                                Expiry date
                              </label>
                              <input
                                className="fs-4 p-3"
                                type="text"
                                id="expiry"
                                placeholder="MM/YY"
                                {...register("expiryDate", {
                                  required: true,
                                  pattern: expiry_regex,
                                })}
                              />
                              <p role="alert">
                                {errors.expiryDate && (
                                  <span className="mb-3 text-danger">
                                    Please enter a valid expiry date!
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="col-12">
                            <input type="checkbox" id="securely-save-card" />

                            <label
                              className="fs-4 mb-3 ms-3"
                              htmlFor="securely-save-card"
                            >
                              Securely save this card for my later purchase
                            </label>
                          </div>
                          <span className="d-block d-sm-none mt-4">
                            <img
                              className="me-1"
                              src="https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg
                    "
                              alt="wallet"
                            />
                            <img
                              className="me-1"
                              src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg"
                              alt="wallet"
                            />
                            <img
                              className="me-1"
                              src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg"
                              alt="wallet"
                            />
                            <img
                              className="me-1"
                              src="	https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg
                    "
                              alt="wallet"
                            />
                            <img
                              className="me-1"
                              src="https://www.udemy.com/staticx/udemy/images/v9/card-rupay.svg"
                              alt="wallet"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header custom-control custom-radio">
                      <input
                        type="radio"
                        id="customRadio3"
                        // name="customRadio"
                        className="custom-control-input"
                        {...register("paymentMenthod", {
                          required: true,
                        })}
                      />
                      <img
                        className="ms-3"
                        src="https://www.udemy.com/staticx/udemy/images/v9/common-onlinebanking-in.svg"
                        alt="onlinebanking"
                      />
                      <div
                        className="accordion-opner"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                      >
                        <label
                          className=" fw-bold fs-4  "
                          htmlFor="customRadio3"
                        >
                          Net Banking
                        </label>
                      </div>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionWithRadioExample"
                    >
                      <div className="accordion-body">
                        <p className="fs-4">
                          In order to complete your transaction, we will
                          transfer you over to Adyen's secure servers.
                        </p>
                        <select
                          className="fs-4"
                          defaultValue={"Select your bank"}
                          name="bank"
                          id="bank"
                        >
                          <option value="Select your bank" disabled>
                            Select your bank
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header custom-control custom-radio wallets ">
                      <input
                        type="radio"
                        id="customRadio4"
                        // name="customRadio"
                        className="custom-control-input"
                        {...register("paymentMenthod", {
                          required: true,
                        })}
                      />
                      <img
                        className="ms-3"
                        src="https://www.udemy.com/staticx/udemy/images/v9/common-wallet-in.svg"
                        alt="wallet"
                      />
                      <div
                        className="accordion-opner"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                      >
                        <label
                          className=" fw-bold fs-4  "
                          htmlFor="customRadio4"
                        >
                          Mobile Wallets
                        </label>
                      </div>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionWithRadioExample"
                    >
                      <div className="accordion-body wallet">
                        <p className="fs-4">
                          In order to complete your transaction, we will
                          transfer you over to Adyen's secure servers.
                        </p>
                        <select
                          className="fs-4"
                          defaultValue={"Select your wallet"}
                          name="wallets"
                          id="wallets"
                        >
                          <option value="Select your wallet">
                            Select your wallet
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="fw-bold fs-2 mt-5 mb-4">Order details</h2>
                {cartCourses.map((cartCourse) => {
                  return (
                    <CheckoutCourse
                      key={cartCourse?._id}
                      course_thumbnail={cartCourse?.course_thumbnail}
                      title={cartCourse?.title}
                      discounted_price={cartCourse?.discounted_price}
                      original_price={cartCourse?.original_price}
                    />
                  );
                })}
              </div>
            </div>
            <CheckoutSummary
              totalDiscounts={totalDiscounts}
              totalOriginalPrice={totalOriginalPrice}
              totalPrice={totalPrice}
            />
            <CheckoutCompleteModal
              cartCourses={cartCourses}
              cardDetails={cardDetails!}
              totalPrice={totalPrice}
              cardDetailsIsValid={cardDetailsIsValid}
              setCardDetailsIsValid={setCardDetailsIsValid}
            />
          </form>
        </main>
      )}
    </>
  );
};

export default Checkout;
