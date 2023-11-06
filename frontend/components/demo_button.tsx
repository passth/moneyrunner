import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getUser } from "services/auth";

export const BRIGHT_PURPLE = "#8060FF";
export const LIME_GREEN = "#21BF60";

const useStyles = makeStyles((theme): any => ({
  testMode: {
    color: "#fff",
    padding: theme.spacing(0.5, 1),
    backgroundImage: `linear-gradient(45deg, ${BRIGHT_PURPLE}, ${LIME_GREEN}, ${BRIGHT_PURPLE})`,
    backgroundSize: "200%",
    transition: "all 0.16s cubic-bezier(0.68, -0.25, 0.265, 1.25)",
    overflow: "hidden",
    zIndex: 1,
    "&::after": {
      zIndex: -1,
      position: "absolute",
      top: "-5px",
      left: "-5px",
      right: "-5px",
      bottom: "-5px",
      filter: "blur(10px)",
      content: '""',
      backgroundImage: `linear-gradient(45deg, ${BRIGHT_PURPLE}, ${LIME_GREEN}, ${BRIGHT_PURPLE})`,
      backgroundSize: "200%",
      animation: "$demo 3s linear infinite",
    },
    "&:hover": {
      border: "none",
      "&::after": {
        animationDuration: "0.5s",
      },
    },
    minWidth: "max-content",
  },
  "@keyframes demo": {
    "0%": {
      backgroundPosition: "0%",
    },
    "100%": {
      backgroundPosition: "200%",
    },
  },
}));

function updateReact(input, type, lastValue) {
  const event: any = new Event(type, { bubbles: true });
  // hack React15
  event.simulated = true;
  // hack React16
  // eslint-disable-next-line no-underscore-dangle
  const tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  input.dispatchEvent(event);
}

export function forceInput(selector, value) {
  const element = document.querySelector(selector);

  if (!element) {
    return null;
  }

  if (element.select) {
    element.select();
  }

  element.click();

  const input = element;
  const lastValue = input.value;
  input.value = value;
  updateReact(input, "input", lastValue);
  updateReact(input, "change", lastValue);

  return element;
}

export function DemoButton() {
  const classes: any = useStyles();
  const [forcingInput, setForcingInput] = useState(false);
  const user = getUser();
  const userEmail = user.email;

  async function onTestModeClick() {
    if (forcingInput) return;

    setForcingInput(true);

    const submit: any = document.querySelector("#continue");
    if (submit) {
      submit.click();
    }

    const nextRequired: any = document.querySelector("#section-next-required");
    if (nextRequired) {
      nextRequired.click();
    }

    const yes: any = document.querySelector("#yes");
    if (yes) {
      yes.click();
    }

    const radio: any = document.querySelector('input[type="radio"]');
    if (radio) {
      radio.click();
    }

    const multiSelectCheckbox: any = document.querySelector('input[type="checkbox"]');
    if (multiSelectCheckbox) {
      multiSelectCheckbox.click();
    }

    forceInput('input[value="Submit a W-8 or other form"]', "");
    forceInput("#taxId", "111111111");
    forceInput("#ein", "151111111");
    forceInput("#ssn", "111111111");
    forceInput("#select-question", "Natural Person");
    forceInput("#select-question", "Submit a W-8 or other form");
    forceInput('span[data-test="manual-address-link"]', "");
    forceInput('div[data-test="manual-address-state"] input', "California");
    forceInput('div[data-test="state"] input', "California");
    forceInput('div[data-test="manual-address-postal"] input', "94117");
    forceInput('div[data-test="postal"] input', "94117");
    forceInput('div[data-test="manual-address-city"] input', "San Francisco");
    forceInput('div[data-test="city"] input', "San Francisco");
    forceInput('div[data-test="manual-address-street"] input', "30 Oak Grove Way");
    forceInput('div[data-test="street"] input', "30 Oak Grove Way");
    const stateEl = forceInput('input[data-test="state"]', "California");
    const countryEl = forceInput('input[data-test="country"]', "United States");
    forceInput("#firstName", "John");
    forceInput("#lastName", "Doe");
    forceInput("#legalName", "John Doe");
    forceInput("#title", "Software Engineer");
    const addressEl = forceInput('input[data-test="address-line-1"]', "30 Oak Grove Way");
    forceInput("#dollars", "500,000");
    forceInput('input[type="tel"]', "+1 (123) 456-7890");
    forceInput("#email", userEmail);
    forceInput("#text", "Test");
    forceInput("#bankName", "Bank of America");
    forceInput("#accountName", "Demo LP");
    forceInput("#accountNumber", "12345");
    forceInput("#aba", "123456789");
    forceInput("#date-picker-inline", "01/01/2000");
    forceInput("#dateWithoutYear", "12/31");
    forceInput("#dateYear", "2000");
    forceInput("#percent", "100");
    forceInput('input[type="number"][id="text"]', "1");
    forceInput("#giin", "123456.78901.AB.123");
    forceInput("#placeOfBirth", "New York");

    // for w9 autofill
    forceInput("#name", "John Doe");
    forceInput("#address1", "30 Oak Grove Way");
    forceInput("#address2", "California");

    // there are two sets of radio buttons on the w9 page, this code targets the latter one
    const w9SsnRadio: any = document.querySelector('input[type="radio"][value="SSN"]');
    if (w9SsnRadio) w9SsnRadio.click();

    await new Promise((r) => setTimeout(r, 100));

    if (stateEl) {
      const state: any = document.querySelector(`#${stateEl.id}-option-0`);
      if (state) state.click();
    }

    if (countryEl) {
      const usa: any = document.querySelector(`#${countryEl.id}-option-0`);
      if (usa) usa.click();
    }

    if (addressEl) {
      const home: any = document.querySelector(`#${addressEl.id}-option-0`);
      if (home) home.click();
    }

    setForcingInput(false);
  }

  return (
    <Tooltip
      title={
        <Typography>
          In this environment signatures are not legally binding and data is reset periodically
        </Typography>
      }
    >
      <Button className={classes.testMode} onClick={onTestModeClick} size="small" disableElevation>
        Demo mode
      </Button>
    </Tooltip>
  );
}
