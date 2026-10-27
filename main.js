const bmi_form = document.getElementById("bmi-form");
const unit_metric_radio = document.getElementById("unit-metric-radio");
const unit_imperial_radio = document.getElementById("unit-imperial-radio");
const height_cm_input = document.getElementById("height-cm-input");
const weight_kg_input = document.getElementById("weight-kg-input");
const height_feet_input = document.getElementById("height-feet-input");
const height_inches_input = document.getElementById("height-inches-input");
const weight_stones_input = document.getElementById("weight-stones-input");
const weight_pounds_input = document.getElementById("weight-pounds-input");
const bmi_welcome_message = document.getElementById("bmi-welcome-message");
const bmi_result_output = document.getElementById("bmi-result-output");
const bmi_value = document.getElementById("bmi-value");
const bmi_classification_text = document.getElementById(
  "bmi-classification-text",
);

const ideal_weight_range = document.getElementById("ideal-weight-range");
const check_bmi_button = document.getElementById("check-bmi-button");



function calculate_bmi() {
  let height_m;
  let weight_kg;

  if (unit_metric_radio.checked) {
    height_m = Number(height_cm_input.value) / 100;

    weight_kg = Number(weight_kg_input.value);

    if (
      height_cm_input.value.trim() === "" ||
      weight_kg_input.value.trim() === "" ||
      height_m <= 0 ||
      weight_kg <= 0
    ) {
      show_welcome();
      return;
    }
  } else {
    const total_inches =
      Number(height_feet_input.value) * 12 + Number(height_inches_input.value);

    height_m = total_inches * 0.0254;

    const total_pounds =
      Number(weight_stones_input.value) * 14 +
      Number(weight_pounds_input.value);

    weight_kg = total_pounds * 0.45359237;

    if (
      (height_feet_input.value.trim() === "" &&
        height_inches_input.value.trim() === "") ||
      (weight_stones_input.value.trim() === "" &&
        weight_pounds_input.value.trim() === "") ||
      height_m <= 0 ||
      weight_kg <= 0
    ) {
      show_welcome();
      return;
    }
  }

  const bmi = weight_kg / (height_m * height_m);

  let classification;

  if (bmi < 18.5) {
    classification = "underweight";
  } else if (bmi < 25) {
    classification = "a healthy weight";
  } else if (bmi < 30) {
    classification = "overweight";
  } else {
    classification = "obesity";
  }

  const minimum_weight = 18.5 * height_m * height_m;
  const maximum_weight = 24.9 * height_m * height_m;

  bmi_value.textContent = bmi.toFixed(1);
  bmi_classification_text.textContent = classification;

  ideal_weight_range.textContent = `${minimum_weight.toFixed(1)}kgs - ${maximum_weight.toFixed(1)}kgs`;

  bmi_welcome_message.hidden = true;
  bmi_result_output.hidden = false;
}

function show_welcome() {
  bmi_welcome_message.hidden = false;
  bmi_result_output.hidden = true;
}


bmi_form.addEventListener("submit", function (event) {
  event.preventDefault();
  calculate_bmi();
});


