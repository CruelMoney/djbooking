import React, { useState } from "react";
import Button from "../../../../components/common/Button-v2";
import TextField from "../../../../components/common/Textfield";
import MoneyTable, {
  TableItem
} from "../../../../components/common/MoneyTable";
import { localize } from "react-localize-redux";
import moment from "moment-timezone";
import { ConnectedCurrencySelector } from "../../../../components/common/CountrySelector";
import debounce from "lodash.debounce";
import { Mutation } from "react-apollo";
import { CANCEL_GIG, DECLINE_GIG, GET_OFFER, MAKE_OFFER } from "../../gql";
import { useMutation } from "@apollo/react-hooks";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";
import { MY_GIGS } from "../../../../components/gql";

const OfferForm = ({
  gig,
  profileCurrency,
  translate,
  currentLanguage,
  payoutInfoValid,
  event,
  updateGig,
  showPopup
}) => {
  const initOffer = gig.offer || {
    offer: { amount: 0, formatted: 0 },
    serviceFee: { amount: 0, formatted: 0 },
    djFee: { amount: 0, formatted: 0 },
    totalPayment: { amount: 0, formatted: 0 },
    totalPayout: { amount: 0, formatted: 0 }
  };
  const initCurrency = gig.offer
    ? gig.offer.offer.currency
    : profileCurrency.toUpperCase();

  const [offer, setNewOffer] = useState(initOffer);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState(initCurrency);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [getOffer] = useMutation(GET_OFFER);
  const [makeOffer] = useMutation(MAKE_OFFER, {
    refetchQueries: [
      {
        query: MY_GIGS,

        variables: { limit: 100, locale: currentLanguage }
      }
    ]
  });

  const updateOffer = async () => {
    if (payoutInfoValid) {
      setError(null);
      setSubmitLoading(true);
      try {
        const {
          data: { makeOffer: newOffer }
        } = await makeOffer({
          variables: {
            currency,
            amount: offer.offer.amount,
            gigId: gig.id
          }
        });
        setNewOffer(newOffer);
        setSubmitted(true);
      } catch (error) {
        setError(error);
      }
      setSubmitLoading(false);
    }
  };

  const getFeesDebounced = debounce(
    async ({ amount, newCurrency = currency }) => {
      if (amount && amount > 0) {
        setLoading(true);
        setError(null);
        try {
          const {
            data: { getOffer: newOffer }
          } = await getOffer({
            variables: {
              gigId: gig.id,
              amount,
              currency: newCurrency,
              locale: currentLanguage
            }
          });
          setNewOffer(newOffer);
        } catch (error) {
          console.log({ error });
          setError(error);
        }

        setLoading(false);
      }
    },
    1000,
    { trailing: true }
  );

  const getFees = data => {
    setLoading(true);
    getFeesDebounced(data);
  };

  const setCurrencyAndFetch = c => {
    setCurrency(c);
    getFees({ newCurrency: c, amount: offer.offer.amount });
  };

  const canSubmit =
    (offer.offer.amount !== initOffer.offer.amount ||
      currency !== initOffer.offer.currency) &&
    parseInt(offer.offer.amount, 10) > 0 &&
    !loading;

  return (
    <div>
      <div>
        {payoutInfoValid &&
        gig.status !== "CONFIRMED" &&
        gig.status !== "FINISHED" ? (
          <div>
            <div className="row">
              <div className="col-xs-12">
                <p>{translate("gig.offer.intro")}</p>

                {gig.referred ? <p>{translate("gig.offer.direct")}</p> : null}
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-sm-6">
                <TextField
                  name="amount"
                  placeholder="00,00"
                  //onUpdatePipeFunc={(oldVal,val)=>moneyPipe(oldVal,val,"DKK")}
                  disabled={
                    gig.status === "CANCELLED" ||
                    gig.status === "LOST" ||
                    gig.status === "CONFIRMED" ||
                    gig.status === "FINISHED"
                  }
                  type="string"
                  fullWidth={true}
                  onChange={val => getFees({ amount: parseInt(val, 10) * 100 })}
                  initialValue={
                    initOffer.offer.amount && initOffer.offer.amount / 100
                  }
                />
              </div>
              <div className="col-sm-6">
                <ConnectedCurrencySelector
                  initialValue={currency}
                  onChange={setCurrencyAndFetch}
                />
              </div>
            </div>
          </div>
        ) : null}

        {payoutInfoValid ? (
          <div
            className="row card offer-table"
            style={{
              padding: "20px",
              marginBottom: "30px",
              marginTop: "20px"
            }}
          >
            <div className="col-sm-6">
              <h4 style={{ textAlign: "center" }}>
                {translate("Organizer pays")}
              </h4>
              <MoneyTable>
                <TableItem label={translate("Your price")}>
                  {offer.offer.formatted}
                </TableItem>
                <TableItem
                  label={translate("Service fee")}
                  info={<div>{translate("gig.offer.service-fee-info")}</div>}
                >
                  {loading ? "loading..." : offer.serviceFee.formatted}
                </TableItem>
                <TableItem label="Total">
                  {loading ? "loading..." : offer.totalPayment.formatted}
                </TableItem>
              </MoneyTable>
            </div>
            <div className="col-sm-6">
              <h4 style={{ textAlign: "center" }}>{translate("You earn")}</h4>
              <MoneyTable>
                <TableItem label={translate("Your price")}>
                  {offer.offer.formatted}
                </TableItem>
                <TableItem
                  label={translate("Cueup fee")}
                  info={<div>{translate("gig.offer.dj-fee-info")}</div>}
                >
                  {loading ? "loading..." : "-" + offer.djFee.formatted}
                </TableItem>
                <TableItem label="Total">
                  {loading ? "loading..." : offer.totalPayout.formatted}
                </TableItem>
              </MoneyTable>
            </div>
          </div>
        ) : null}

        {gig.status === "LOST" ? <p>{translate("gig.offer.lost")}</p> : null}

        {!payoutInfoValid ? (
          <p>{translate("gig.offer.update-payout")}</p>
        ) : null}

        {moment(event.start.localDate) > moment() ? (
          <div className="offer-buttons">
            <div name={"gig-cancel-" + gig.id}>
              {gig.status === "REQUESTED" || gig.status === "ACCEPTED" ? (
                <Mutation mutation={DECLINE_GIG} variables={{ id: gig.id }}>
                  {(decline, { loading }) => (
                    <Button
                      rounded={true}
                      dangerous
                      valid={true}
                      warning={translate("gig.offer.decline-warning")}
                      name="cancel_gig"
                      isLoading={loading}
                      onClick={_ => decline()}
                    >
                      {translate("Decline gig")}
                    </Button>
                  )}
                </Mutation>
              ) : null}

              {gig.status === "CONFIRMED" ? (
                <Mutation mutation={CANCEL_GIG} variables={{ id: gig.id }}>
                  {(cancel, { loading }) => (
                    <Button
                      rounded={true}
                      dangerous
                      valid={true}
                      warning={translate("gig.offer.cancel-warning")}
                      name="cancel_gig"
                      isLoading={loading}
                      onClick={_ => cancel()}
                    >
                      {translate("Cancel gig")}
                    </Button>
                  )}
                </Mutation>
              ) : null}
            </div>

            {gig.status === "REQUESTED" && payoutInfoValid ? (
              <Button
                disabled={!canSubmit}
                active={canSubmit}
                rounded={true}
                name="send_offer"
                isLoading={submitLoading}
                succes={submitted}
                onClick={updateOffer}
              >
                {translate("Send offer")}
              </Button>
            ) : null}

            {gig.status === "ACCEPTED" && payoutInfoValid ? (
              <Button
                disabled={!canSubmit}
                active={canSubmit}
                rounded={true}
                name="update_offer"
                isLoading={submitLoading}
                succes={submitted}
                onClick={updateOffer}
              >
                {translate("Update offer")}
              </Button>
            ) : null}

            {!payoutInfoValid ? (
              <Button
                rounded={true}
                onClick={showPopup}
                name="show-payout-popup"
              >
                {translate("Update payout information")}
              </Button>
            ) : null}
          </div>
        ) : null}

        <ErrorMessageApollo error={error} />
      </div>
    </div>
  );
};

export default localize(OfferForm, "locale");
