import {
  cancelOrder,
  changePlan,
  closeModalPlans,
  renderPlans,
} from "./modules/Plans.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnProcceedPay").disabled = true;

  document.addEventListener("click", (e) => {
    if (e.target.matches("#btnChangePlan")) {
      renderPlans(".plans");
    }
    if (e.target.matches("#closeModalPlans")) {
      closeModalPlans(".plans");
    }
    if (e.target.matches(".btnSelectPlan")) {
      changePlan("#pricePlan", e.target.id);
    }
    if (e.target.matches("#btnProcceedPay")) alert("Thank you!!!");
    if (e.target.matches("#btnCancelOrder")) cancelOrder();
  });
});
